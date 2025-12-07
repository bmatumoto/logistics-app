import { pgTable, uuid, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { registers } from "@/db/schema/register";
import { products } from "@/db/schema/product";

export const registerProducts = pgTable("register_products", {
  id: uuid().defaultRandom().primaryKey(),
  register_id: uuid("register_id").notNull().references(() => registers.id, { onDelete: "cascade" }),
  product_id: uuid("product_id").notNull().references(() => products.id),
  quantity: integer("quantity").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow()
});

export const insertRegisterProductSchema = createInsertSchema(registerProducts, {
  product_id: z.uuid("utilize id existente do produto cadastrado"),
  quantity: z.coerce.number().int().min(1, "quantidade deve ser maior que zero.")
}).omit({
  id: true,
  created_at: true,
  updated_at: true,
  register_id: true
});

export const selectRegisterProductSchema = createSelectSchema(registerProducts);

export type InsertRegisterProductInput = z.infer<typeof insertRegisterProductSchema>;
export type SelectRegisterProductInput = z.infer<typeof selectRegisterProductSchema>;
