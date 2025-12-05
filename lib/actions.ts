"use server";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema/index";

export const findUser = async (email: string) => {
  const user = (await db.select().from(users)).find((user) => user.email === email);
  return user;
}
