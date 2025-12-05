import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

const baseInsertSchema = createInsertSchema(users);

export const createUserSchema = baseInsertSchema
  .omit({
    id: true,
    created_at: true,
    name: true,
  })
  .extend({
    password: z.string().min(8, "Deve ter no mínimo 8 caracteres"),
    email: z.email("Email inválido"),
  });

export const updateUserSchema = createUserSchema.partial();
export const selectUserSchema = createSelectSchema(users);

export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type SelectUser = z.infer<typeof selectUserSchema>;
