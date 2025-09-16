import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  investorType: text("investor_type").notNull().default("balanced"), // conservative, balanced, aggressive
  interests: jsonb("interests").notNull().default(sql`'[]'::jsonb`), // fundamental, technical, pattern
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const stocks = pgTable("stocks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  symbol: text("symbol").notNull().unique(),
  name: text("name").notNull(),
  sector: text("sector").notNull(),
  price: integer("price").notNull(), // stored in paise/cents
  change: integer("change").notNull(),
  changePercent: integer("change_percent").notNull(), // stored as basis points (100 = 1%)
  marketCap: text("market_cap").notNull(),
  volume: text("volume").notNull(),
  sentiment: integer("sentiment").notNull().default(50), // 0-100
  sentimentLabel: text("sentiment_label").notNull().default("neutral"), // bullish, bearish, neutral
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

export const watchlists = pgTable("watchlists", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  stockId: varchar("stock_id").notNull().references(() => stocks.id),
  addedAt: timestamp("added_at").notNull().default(sql`now()`),
});

export const alerts = pgTable("alerts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  stockId: varchar("stock_id").notNull().references(() => stocks.id),
  type: text("type").notNull(), // price, sentiment, volume, news
  condition: text("condition").notNull(), // above, below, change
  value: integer("value").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  isTriggered: boolean("is_triggered").notNull().default(false),
  emailNotification: boolean("email_notification").notNull().default(false),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  triggeredAt: timestamp("triggered_at"),
});

export const news = pgTable("news", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  source: text("source").notNull(),
  sentiment: text("sentiment").notNull(), // bullish, bearish, neutral
  stockIds: jsonb("stock_ids").notNull().default(sql`'[]'::jsonb`),
  publishedAt: timestamp("published_at").notNull(),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  investorType: true,
  interests: true,
});

export const insertStockSchema = createInsertSchema(stocks).omit({
  id: true,
  updatedAt: true,
});

export const insertWatchlistSchema = createInsertSchema(watchlists).omit({
  id: true,
  addedAt: true,
});

export const insertAlertSchema = createInsertSchema(alerts).omit({
  id: true,
  isTriggered: true,
  createdAt: true,
  triggeredAt: true,
});

export const insertNewsSchema = createInsertSchema(news).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertStock = z.infer<typeof insertStockSchema>;
export type Stock = typeof stocks.$inferSelect;

export type InsertWatchlist = z.infer<typeof insertWatchlistSchema>;
export type Watchlist = typeof watchlists.$inferSelect;

export type InsertAlert = z.infer<typeof insertAlertSchema>;
export type Alert = typeof alerts.$inferSelect;

export type InsertNews = z.infer<typeof insertNewsSchema>;
export type News = typeof news.$inferSelect;
