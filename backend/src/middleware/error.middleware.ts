import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../lib/app-error.js";

/**
 * Centralized error handler. Must be registered last in the middleware chain.
 * Returns consistent JSON error responses for all error types.
 */
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  // ── Zod validation errors ────────────────────────────────────────
  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      error: {
        message: "Validation failed",
        code: "VALIDATION_ERROR",
        details: err.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
    });
    return;
  }

  // ── Known application errors ─────────────────────────────────────
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message,
        code: err.code,
      },
    });
    return;
  }

  // ── Unknown errors ───────────────────────────────────────────────
  const message =
    err instanceof Error ? err.message : "An unexpected error occurred";

  console.error("Unhandled error:", err);

  res.status(500).json({
    success: false,
    error: {
      message:
        process.env.NODE_ENV === "production"
          ? "Internal server error"
          : message,
      code: "INTERNAL_ERROR",
    },
  });
}
