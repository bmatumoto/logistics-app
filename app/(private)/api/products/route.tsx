import { NextResponse, NextRequest } from "next/server";
import { insertProductSchema } from "@/db/schema/index";
import { z } from "zod";
import { createProduct, getProducts } from "@/lib/actions";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (authHeader !== process.env.FAKE_TOKEN) {
    return NextResponse.json(
      { error: "Credenciais inválidas" },
      { status: 401 }
    );
  }

  try {
    const products = await getProducts();

    if (!products) {
      return NextResponse.json(
        { error: "Erro ao buscar os produtos" },
        { status: 400 }
      );
    }

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Erro inesperado ao criar produto:", error);

    return NextResponse.json(
      { error: "Erro interno no servidor. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (authHeader !== process.env.FAKE_TOKEN) {
    return NextResponse.json(
      { error: "Credenciais inválidas" },
      { status: 401 }
    );
  }

  const body = await request.json();
  const result = insertProductSchema.safeParse(body);

  if (!result.success) {
    const tree = z.treeifyError(result.error);
    const properties = tree.properties ?? { message: "Ops, algo deu errado" };

    return NextResponse.json({ properties }, { status: 400 });
  }

  try {
    const product = await createProduct(result.data);

    if (!product.success) {
      if (product.type === "DUPLICATE") {
        return NextResponse.json({ error: product.error }, { status: 409 });
      }

      return NextResponse.json({ error: product.error }, { status: 400 });
    }

    return NextResponse.json({ product: product.created }, { status: 201 });
  } catch (error) {
    console.error("Erro inesperado ao criar produto:", error);

    return NextResponse.json(
      { error: "Erro interno no servidor. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}
