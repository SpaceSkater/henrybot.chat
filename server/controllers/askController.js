import axios from "axios";
import { logger } from "../app.js";

export async function ask(req, res) {
  const chats = req.body;
  const { authorization: CHAT_KEY, model: chatModel } = req.headers;

  // console.log(Object.keys(chats).length);  // 验证body是否是空对象

  if (!CHAT_KEY || !Object.keys(chats).length) {
    logger.error("No chat key or chats provided!");
    return res.status(400).json({
      status: "fail",
      message: "No chat key or chats provided!",
    });
  }

  try {
    const { data } = await axios.post(
      process.env.CHATAPI_URL,
      {
        model: chatModel,
        messages: chats,
        stream: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CHAT_KEY}`,
        },
        responseType: "stream",
      }
    );

    res.setHeader("Content-Type", "text/event-stream");

    // 流式数据传输
    // 使用.pipe()方法将axios的响应流发送给Express的响应对象
    data.pipe(res);
  } catch (error) {
    logger.error(`ask error - ${error.message}`);
    res.status(500).json({
      status: "fail",
      message: "Something went wrong!",
    });
  }
}
