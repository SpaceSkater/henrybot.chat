import axios from "axios";
import { logger } from "../app.js";

export async function getBalance(req, res) {
  const { authorization: CHAT_KEY } = req.headers;

  if (!CHAT_KEY) {
    logger.error("No chat key provided!");
    return res.status(400).json({
      status: "fail",
      message: "No chat key provided!",
    });
  }

  try {
    // 此处为api2d的余额查询请求头，如需更改请自行更改
    const { data } = await axios.get(process.env.GETBALANCE_URL, {
      headers: {
        Authorization: `Bearer ${CHAT_KEY}`,
        "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
        "Content-Type": "application/json",
      },
    });

    res.status(200).json({
      status: "success",
      details: data,
    });
  } catch (error) {
    logger.error(`balance error - ${error.message}`);
    res.status(500).json({
      status: "fail",
      message: "Something went wrong!",
    });
  }
}
