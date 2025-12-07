import { pgTable, pgEnum, text, uuid, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { z } from "zod";
import { insertRegisterProductSchema, registerProducts } from "@/db/schema/register-product";

export const typeOperation = pgEnum('type_operation', ['inbound', 'outbound']);

export const registers = pgTable("registers", {
  id: uuid().defaultRandom().primaryKey(),
  type_operation: typeOperation("type_operation").notNull(),
  delivery_location: text("delivery_location").notNull(),
  origin_location: text("origin_location").notNull(),
  order_code: text("order_code").notNull().unique(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow()
});

// Schema para INSERT (recebe do form)
export const insertRegisterSchema = createInsertSchema(registers, {
  type_operation: z.enum(["inbound", "outbound"]),
  delivery_location: z.string().min(3, "nome deve ter no mínimo 3 caracteres"),
  origin_location: z.string().min(3, "nome deve ter no mínimo 3 caracteres"),
  order_code: z.string().min(3, "nome deve ter no mínimo 3 caracteres")
}).omit({
  // dados gerados pelo db
  id: true,
  created_at: true,
  updated_at: true,
});

export const registersRelations = relations(registers, ({ many }) => ({
  itens: many(registerProducts),
}));

export const registerProductsRelations = relations(registerProducts, ({ one }) => ({
  register: one(registers, {
    fields: [registerProducts.register_id],
    references: [registers.id],
  }),
}));

export const insertCombinedRegisterSchema = insertRegisterSchema.extend({
  itens: z.array(insertRegisterProductSchema)
});

export const selectCombinedRegisterSchema = insertRegisterSchema.extend({
  id: z.uuid(),
  created_at: z.string(),
  updated_at: z.string(),
  itens: z.array(insertRegisterProductSchema)
})

// Schema para SELECT (dados que saem do banco)
export const selectRegisterSchema = createSelectSchema(registers);

// Zod (input validation)
export type InsertRegisterInput = z.infer<typeof insertRegisterSchema>;
export type SelectRegisterInput = z.infer<typeof selectRegisterSchema>;
export type InsertCombinedRegisterInput = z.infer<typeof insertCombinedRegisterSchema>;
export type SelectCombinedRegisterInput = z.infer<typeof selectCombinedRegisterSchema>;
