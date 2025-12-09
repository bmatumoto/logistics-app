import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: uuid().defaultRandom().primaryKey(),
  sku: text("sku").notNull().unique(),
  title: text("title").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow()
});

export const insertProductSchema = createInsertSchema(products, {
  sku: z.string().min(8, "deve ter no mínimo 8 caracteres"),
  title: z.string().min(3, "deve ter no mínimo 3 caracteres")
}).omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const selectProductSchema = createSelectSchema(products);

export type InsertProductInput = z.infer<typeof insertProductSchema>;
export type SelectProductInput = z.infer<typeof selectProductSchema>;
