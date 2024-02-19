import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import winston, { format } from "winston";
import "winston-daily-rotate-file";

import apiRouter from "./routes/apiRoutes.js";

dotenv.config();
const app = express();

export const logger = winston.createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  defaultMeta: { service: "user-service" }, // 为日志添加默认元数据
  transports: [
    new winston.transports.DailyRotateFile({
      dirname: "logs",
      filename: "app-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "5m",
      maxFiles: "14d",
    }),
  ],
});

app.use(express.json()); // 使用express.json()中间件解析请求体
app.use(morgan("tiny")); // morgan会影响并发性能，谨慎考虑使用
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/v1", apiRouter);
app.all("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: `Can not find ${req.originalUrl} on this server!`,
  });
});

export default app;
