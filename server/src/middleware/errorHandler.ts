import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  logger.error(`${status} - ${message} - ${req.method} ${req.path}`);
  res.status(status).json({ success: false, error: message });
};

export class AppError extends Error {
  constructor(public message: string, public status: number = 400) {
    super(message);
  }
}