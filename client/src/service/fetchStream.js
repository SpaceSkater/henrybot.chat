import { fetchEventSource } from "@microsoft/fetch-event-source";
import toast from "react-hot-toast";

export async function fetchStream({
  newAsk,
  messages,
  setMessages,
  setIsTyping,
  chatKey,
  chatModel,
}) {
  let answer = ""; // 用于拼接每次传输来的一个字或词
  setIsTyping(true);
  const abortController = new AbortController();

  const eventSource = await fetchEventSource(import.meta.env.VITE_VERCEL_ASK, {
    method: "POST",
    body: JSON.stringify([...messages, ...newAsk]), // 将新的对话拼接到原有对话中 形成上下文理解
    headers: {
      "Content-Type": "application/json",
      Authorization: chatKey,
      Model: chatModel,
    },
    signal: abortController.signal,

    // 打开流式数据接收
    onmessage(e) {
      if (e.data === "[DONE]") {
        abortController.abort(); // 关闭请求
        // console.log("输出结束");
        setIsTyping(false);
        eventSource.close(); // 关闭 EventSource
      }

      // console.log("开始输出");
      const data = JSON.parse(e.data);
      const dataObj = data.choices[0].delta; // { role: "assistant", content: 'x' }

      if (dataObj && dataObj.content) {
        answer += dataObj.content; // 将每次传输来的一个字或词累加到answer中
      }
      // console.log(answer);  // 每次通信后打印的比上一次多一个或几个字或词

      setMessages((preMessages) => {
        const copyMshs = [...preMessages]; // 拷贝一份原有对话

        // 如果最后一条对话是assistant, 说明是流式输出增加内容
        // 否则说明是新的一轮对话, 需要添加一条assistant 以便后面流式输出内容复制到状态以便重新渲染页面
        // answer保存了每次通信后的回答内容, 用于拼接到最后一条assistant的content中

        if (copyMshs[copyMshs.length - 1].role === "assistant") {
          copyMshs[copyMshs.length - 1].content = answer; // 将列表最后一条的content替换为拼接后的内容

          return copyMshs; // 每次替换多一个字或词触发react渲染以达到流式效果
        } else {
          copyMshs.push({
            role: "assistant",
            content: "",
          });

          return copyMshs;
        }
      });
    },
    onclose() {
      console.log("close");
      abortController.abort();
      eventSource.close();
    },
    onerror() {
      toast.error(
        "Service returned error: Check whether the HenryBot is online or whether the Chat-Key is correct",
      );
      console.error(
        "Service returned error: Check whether the HenryBot is online or whether the Chat-Key is correct",
      );
      setIsTyping(false);
      abortController.abort();
      eventSource.close();
    },
  });
}
