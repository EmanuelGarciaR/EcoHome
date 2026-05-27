import type { Request, Response, NextFunction } from "express";
import { env } from "../lib/env.js";
import { AppError } from "../lib/app-error.js";

/**
 * Express middleware that validates the X-Device-Api-Key header.
 * Used for IoT device ingestion endpoints (Python collector → backend).
 */
export function requireDeviceApiKey(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  const apiKey = req.headers["x-device-api-key"];

  if (!apiKey || apiKey !== env.DEVICE_API_KEY) {
    next(AppError.unauthorized("Invalid or missing device API key"));
    return;
  }

  next();
}
