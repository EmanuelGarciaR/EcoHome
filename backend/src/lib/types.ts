import type { Request } from "express";
import type { auth } from "../auth/index.js";

// ── Better Auth Session Types ──────────────────────────────────────
type AuthSession = typeof auth.$Infer.Session;

export interface AuthenticatedRequest extends Request {
  session: AuthSession["session"];
  user: AuthSession["user"];
}

// ── API Response Envelope ──────────────────────────────────────────
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    message: string;
    code: string;
    details?: unknown;
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// ── Helper to build success responses ──────────────────────────────
export function successResponse<T>(data: T): ApiSuccessResponse<T> {
  return { success: true, data };
}

// ── Re-export schema types ─────────────────────────────────────────
export type {
  UserSelect,
  UserInsert,
  SessionSelect,
  SessionInsert,
  AccountSelect,
  AccountInsert,
  VerificationSelect,
  VerificationInsert,
  ProfileSelect,
  ProfileInsert,
  DeviceSelect,
  DeviceInsert,
  ReadingSelect,
  ReadingInsert,
  HourlyStatsSelect,
  HourlyStatsInsert,
  DailyStatsSelect,
  DailyStatsInsert,
  RangeStatsSelect,
  RangeStatsInsert,
  AlertSelect,
  AlertInsert,
  AchievementSelect,
  AchievementInsert,
} from "../db/schema.js";
