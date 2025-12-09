"use server";

import { revalidatePath } from "next/cache";
import { desc, eq } from 'drizzle-orm';
import { db } from "@/db/drizzle";
import { 
  users,
  registers,
  registerProducts,
  insertCombinedRegisterSchema,
  InsertCombinedRegisterInput,
  SelectCombinedRegisterInput,
  InsertProductInput,
  products
} from "@/db/schema/index";
import { z } from "zod";

export const findUser = async (email: string) => {
  const user = (await db.select().from(users)).find((user) => user.email === email);
  return user;
}

export async function getRegister(id: string): Promise<SelectCombinedRegisterInput | null> {
  const data = await db.query.registers.findFirst({
    where: eq(registers.id, id),
    with: { itens: true }
  });

  if (!data) return null;

  return {
    ...data,
    created_at: data.created_at?.toISOString() ?? "",
    updated_at: data.updated_at?.toISOString() ?? "",
  };
}

export const getRegisters = async () => {
  const rows = await db.select({
    id: registers.id,
    type_operation: registers.type_operation,
    delivery_location: registers.delivery_location,
    origin_location: registers.origin_location,
    order_code: registers.order_code,
    created_at: registers.created_at
  }).from(registers).orderBy(desc(registers.created_at));

  return rows;
}

export const createRegister = async (formData: InsertCombinedRegisterInput) => {
  try {
    const parsed = insertCombinedRegisterSchema.safeParse(formData);

    if (parsed.data) {
      const [register] = await db.insert(registers).values(parsed.data).returning();

      await db.insert(registerProducts).values(parsed.data.itens.map((item) => ({
        register_id: register.id,
        product_id: item.product_id,
        quantity: item.quantity,
      })));

      return {
        success: true,
        id: register.id
      };
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Dados inválidos",
        details: error.message,
      };
    }

    return {
      success: false,
      error: "Erro ao criar propriedade. Tente novamente.",
    };
  }
};

export const updateRegister = async (id: string, formData: InsertCombinedRegisterInput) => {
  try {
    const parsed = insertCombinedRegisterSchema.safeParse(formData);

    if (parsed.data) {
      await db.update(registers).set(parsed.data).where(eq(registers.id, id));

      await db.delete(registerProducts).where(eq(registerProducts.register_id, id));

      await db.insert(registerProducts).values(parsed.data.itens.map((item) => ({
        register_id: id,
        product_id: item.product_id,
        quantity: item.quantity,
      })));

      return {
        success: true,
        id: id
      };
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Dados inválidos",
        details: error.message,
      };
    }

    return {
      success: false,
      error: "Erro ao criar propriedade. Tente novamente.",
    };
  }
};

export const deleteRegister = async (id: string) => {
  try {
    await db.delete(registers).where(eq(registers.id, id));

    revalidatePath("/dashboard");

    return {
      success: true,
      id: id
    };
  } catch (error) {
    return {
      success: false,
      error: "Erro ao deletar propriedade. Tente novamente.",
    };
  }
};

export const getProducts = async () => {
  const rows = await db.select({
    id: products.id,
    title: products.title,
    sku: products.sku,
    created_at: products.created_at
  }).from(products).limit(10);

  return rows;
}

export const createProduct = async (product: InsertProductInput) => {
  const hasProduct = await db.query.products.findFirst({
    where: eq(products.sku, product.sku),
  });

  if (hasProduct) {
    return {
      success: false,
      type: "DUPLICATE" as const,
      error: "Produto já cadastrado",
    };
  }

  const [created] = await db.insert(products).values(product).returning();

  return {
    created,
    success: true
  };
}
