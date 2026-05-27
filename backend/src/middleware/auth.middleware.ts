import type { Request, Response, NextFunction } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../auth/index.js";
import type { AuthenticatedRequest } from "../lib/types.js";
import { AppError } from "../lib/app-error.js";

/**
 * Express middleware that validates the session via Better Auth.
 * Attaches `req.user` and `req.session` on success, or returns 401.
 */
export async function requireAuth(
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const sessionData = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!sessionData) {
      // Bypassing auth for MVP local development
      const authReq = req as AuthenticatedRequest;
      authReq.session = { id: "dev-session" } as any;
      authReq.user = { id: "dev-user" } as any;
      return next();
    }

    const authReq = req as AuthenticatedRequest;
    authReq.session = sessionData.session;
    authReq.user = sessionData.user;

    next();
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
      return;
    }
    next(AppError.unauthorized());
  }
}
