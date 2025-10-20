import winston from "winston";
import "winston-daily-rotate-file";

// Format Configuration
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(
    (info) =>
      `[${info.timestamp}] [${info.level.toUpperCase()}]: ${info.message}`
  )
);

// File Configuration
const transport = new winston.transports.DailyRotateFile({
  filename: "logs/%DATE%-combined.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "10m",
  maxFiles: "14d",
});

const logger = winston.createLogger({
  level: "info", //Low Lever Logger
  format: logFormat,
  transports: [
    transport,
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
  ],
});

export default logger;
