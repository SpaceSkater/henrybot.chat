import { useForm } from "react-hook-form";
import { useMessages } from "../context/MessagesContext";
import { fetchStream } from "../service/fetchStream";
import toast from "react-hot-toast";
import { TbSend } from "react-icons/tb";

function InputBar() {
  const { chatKey, messages, setMessages, setIsTyping } = useMessages();
  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm();

  function onSubmit(data) {
    if (!chatKey) return toast.error("Please fill the chat-key first : )"); // 验证是否输入chat-key

    const newAsk = [
      {
        role: "user",
        content: data.input,
      },
    ];

    setMessages((preMessages) => [...preMessages, ...newAsk]);

    // 执行fetchStream函数 获取流式回复
    fetchStream(newAsk, messages, setMessages, setIsTyping, chatKey);

    reset(); // 重置表单
  }

  function onError(errors) {
    toast.error(errors.input.message); // 前端验证是否输入内容
  }

  return (
    <div className="flex h-[60px] items-center justify-center gap-2  rounded-lg bg-zinc-300 dark:bg-zinc-700">
      <form
        className="flex h-full w-full justify-between gap-2"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <textarea
          className="grow resize-none rounded-lg bg-zinc-50 px-2 pt-[17px] shadow-inner focus:outline-none focus:ring focus:ring-zinc-400 dark:bg-zinc-900"
          placeholder="Start chatting..."
          autoFocus={true}
          {...register("input", { required: "Please enter chat content : )" })}
        />
        <button className="flex items-center justify-center rounded-lg bg-blue-700 px-4 text-xs text-zinc-200 shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-zinc-400 sm:w-[95px] sm:text-base">
          <TbSend size="1.8rem" />
        </button>
      </form>
    </div>
  );
}

export default InputBar;
