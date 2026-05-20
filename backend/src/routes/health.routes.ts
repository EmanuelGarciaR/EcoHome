import { Router } from "express";
import type { Request, Response } from "express";

const router = Router();

/**
 * GET /api/health
 * Public health check endpoint.
 */
router.get("/", (_req: Request, res: Response): void => {
  res.json({
    success: true,
    data: {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    },
  });
});

export default router;
