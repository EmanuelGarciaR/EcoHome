import { Router } from "express";
import type { Response } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { achievement } from "../db/schema.js";
import type { AuthenticatedRequest } from "../lib/types.js";
import { successResponse } from "../lib/types.js";

const router = Router();

/**
 * GET /api/v1/achievements
 * Returns all achievements for the authenticated user.
 */
router.get("/", async (req, res: Response): Promise<void> => {
  const authReq = req as AuthenticatedRequest;

  const achievements = await db
    .select()
    .from(achievement)
    .where(eq(achievement.userId, authReq.user.id));

  res.json(successResponse(achievements));
});

export default router;
