import {
  pgTable,
  text,
  boolean,
  timestamp,
  uuid,
  serial,
  real,
  pgEnum,
  integer,
} from "drizzle-orm/pg-core";

// ════════════════════════════════════════════════════════════════════
//  Better Auth Core Tables
// ════════════════════════════════════════════════════════════════════

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  idToken: text("id_token"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// ════════════════════════════════════════════════════════════════════
//  EcoHome Domain Tables
// ════════════════════════════════════════════════════════════════════

// ── Profile ────────────────────────────────────────────────────────
export const profile = pgTable("profile", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: "cascade" }),
  displayName: text("display_name"),
  bio: text("bio"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// ── Device ─────────────────────────────────────────────────────────
export const device = pgTable("device", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  deviceId: text("device_id").notNull().unique(),
  name: text("name").notNull(),
  location: text("location"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// ── Reading (raw sensor data → frontend RawReading) ────────────────
export const reading = pgTable("reading", {
  id: serial("id").primaryKey(),
  deviceId: uuid("device_id")
    .notNull()
    .references(() => device.id, { onDelete: "cascade" }),
  recordedAt: timestamp("recorded_at").notNull().defaultNow(),
  voltageV: real("voltage_v").notNull(),
  currentA: real("current_a").notNull(),
  powerW: real("power_w").notNull(),
  energyKwh: real("energy_kwh"),
  powerFactor: real("power_factor"),
  frequencyHz: real("frequency_hz"),
});

// ── Hourly Stats (→ frontend TimeSeriesPoint) ──────────────────────
export const hourlyStats = pgTable("hourly_stats", {
  id: serial("id").primaryKey(),
  deviceId: uuid("device_id")
    .notNull()
    .references(() => device.id, { onDelete: "cascade" }),
  timestamp: timestamp("timestamp").notNull(),
  avgPowerW: real("avg_power_w").notNull(),
  maxPowerW: real("max_power_w").notNull(),
  minPowerW: real("min_power_w").notNull(),
  kwh: real("kwh").notNull(),
});

// ── Daily Stats (→ frontend TimeSeriesPoint) ───────────────────────
export const dailyStats = pgTable("daily_stats", {
  id: serial("id").primaryKey(),
  deviceId: uuid("device_id")
    .notNull()
    .references(() => device.id, { onDelete: "cascade" }),
  timestamp: timestamp("timestamp").notNull(),
  avgPowerW: real("avg_power_w").notNull(),
  maxPowerW: real("max_power_w").notNull(),
  minPowerW: real("min_power_w").notNull(),
  kwh: real("kwh").notNull(),
});

// ── Range Stats (→ frontend RangePoint) ────────────────────────────
export const periodEnum = pgEnum("period_type", [
  "mensual",
  "trimestral",
  "anual",
]);

export const rangeStats = pgTable("range_stats", {
  id: serial("id").primaryKey(),
  deviceId: uuid("device_id")
    .notNull()
    .references(() => device.id, { onDelete: "cascade" }),
  period: periodEnum("period").notNull(),
  label: text("label").notNull(),
  currentKwh: real("current_kwh").notNull(),
  previousKwh: real("previous_kwh").notNull(),
  costCop: real("cost_cop").notNull(),
  savingsCop: real("savings_cop").notNull(),
});

// ── Alert (→ frontend Alert) ───────────────────────────────────────
export const alertTypeEnum = pgEnum("alert_type", [
  "savings",
  "peak",
  "carbon",
  "scheduling",
  "achievement",
]);

export const highlightTypeEnum = pgEnum("highlight_type", [
  "saving",
  "warning",
  "milestone",
  "tip",
]);

export const alert = pgTable("alert", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  type: alertTypeEnum("type").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  highlightText: text("highlight_text"),
  highlightType: highlightTypeEnum("highlight_type"),
  isNew: boolean("is_new").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ── Achievement (→ frontend Achievement) ───────────────────────────
export const achievementIconEnum = pgEnum("achievement_icon", [
  "leaf",
  "zap",
  "cloud",
  "sun",
]);

export const achievement = pgTable("achievement", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  icon: achievementIconEnum("icon").notNull(),
  value: text("value").notNull(),
  label: text("label").notNull(),
  subtext: text("subtext").notNull(),
});

// ════════════════════════════════════════════════════════════════════
//  Drizzle Inferred Types
// ════════════════════════════════════════════════════════════════════

export type UserSelect = typeof user.$inferSelect;
export type UserInsert = typeof user.$inferInsert;

export type SessionSelect = typeof session.$inferSelect;
export type SessionInsert = typeof session.$inferInsert;

export type AccountSelect = typeof account.$inferSelect;
export type AccountInsert = typeof account.$inferInsert;

export type VerificationSelect = typeof verification.$inferSelect;
export type VerificationInsert = typeof verification.$inferInsert;

export type ProfileSelect = typeof profile.$inferSelect;
export type ProfileInsert = typeof profile.$inferInsert;

export type DeviceSelect = typeof device.$inferSelect;
export type DeviceInsert = typeof device.$inferInsert;

export type ReadingSelect = typeof reading.$inferSelect;
export type ReadingInsert = typeof reading.$inferInsert;

export type HourlyStatsSelect = typeof hourlyStats.$inferSelect;
export type HourlyStatsInsert = typeof hourlyStats.$inferInsert;

export type DailyStatsSelect = typeof dailyStats.$inferSelect;
export type DailyStatsInsert = typeof dailyStats.$inferInsert;

export type RangeStatsSelect = typeof rangeStats.$inferSelect;
export type RangeStatsInsert = typeof rangeStats.$inferInsert;

export type AlertSelect = typeof alert.$inferSelect;
export type AlertInsert = typeof alert.$inferInsert;

export type AchievementSelect = typeof achievement.$inferSelect;
export type AchievementInsert = typeof achievement.$inferInsert;
