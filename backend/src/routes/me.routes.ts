import { Router } from "express";
import type { Response } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { profile, user } from "../db/schema.js";
import type { AuthenticatedRequest } from "../lib/types.js";
import { successResponse } from "../lib/types.js";

const router = Router();

/**
 * GET /api/v1/me
 * Returns the authenticated user's profile.
 * Auto-creates a profile on first access if none exists.
 */
router.get("/", async (req, res: Response): Promise<void> => {
  const authReq = req as AuthenticatedRequest;
  const userId = authReq.user.id;

  // Try to find existing profile
  let existingProfile = await db.query.profile.findFirst({
    where: eq(profile.userId, userId),
  });

  // Auto-create profile on first access
  if (!existingProfile) {
    const [newProfile] = await db
      .insert(profile)
      .values({
        userId,
        displayName: authReq.user.name,
      })
      .returning();

    existingProfile = newProfile;
  }

  // Fetch user data
  const userData = await db.query.user.findFirst({
    where: eq(user.id, userId),
  });

  res.json(
    successResponse({
      user: userData,
      profile: existingProfile,
    }),
  );
});

export default router;
