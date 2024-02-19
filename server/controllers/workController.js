import { logger } from "../app.js";

export async function isWork(req, res) {
  try {
    res.status(200).json({
      message: "Ok",
    });
  } catch (error) {
    logger.error(`testIsWork error - ${error.message}`);
    res.status(500).json({
      status: "fail",
      message: "Something went wrong!",
    });
  }
}
