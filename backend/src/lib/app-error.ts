type ErrorCode =
  | "VALIDATION_ERROR"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "INTERNAL_ERROR";

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: ErrorCode;

  constructor(message: string, statusCode: number, code: ErrorCode) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;
    Object.setPrototypeOf(this, AppError.prototype);
  }

  static badRequest(message: string): AppError {
    return new AppError(message, 400, "VALIDATION_ERROR");
  }

  static unauthorized(message = "Authentication required"): AppError {
    return new AppError(message, 401, "UNAUTHORIZED");
  }

  static forbidden(message = "Access denied"): AppError {
    return new AppError(message, 403, "FORBIDDEN");
  }

  static notFound(message = "Resource not found"): AppError {
    return new AppError(message, 404, "NOT_FOUND");
  }

  static conflict(message: string): AppError {
    return new AppError(message, 409, "CONFLICT");
  }

  static internal(message = "Internal server error"): AppError {
    return new AppError(message, 500, "INTERNAL_ERROR");
  }
}
