import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import prisma from "@/lib/prisma";

import { authOptions } from "../../auth/[...nextauth]/route";
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  // Verifica se o parâmetro ID existe
  if (!params?.id) {
    return NextResponse.json(
      { error: "ID do produto é obrigatório" },
      { status: 400 },
    );
  }

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { name, email } = await request.json();

    const updatedUser = await prisma.user.update({
      where: {
        id: params.id,
      },
      data: {
        name,
        email,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
  if (!params?.id) {
    return NextResponse.json(
      { error: "ID do produto é obrigatório" },
      { status: 400 },
    );
  }
  try {
    await prisma.product.delete({
      where: {
        id: params.id as string,
      },
    });

    return NextResponse.json(
      { message: "product deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 },
    );
  }
}
