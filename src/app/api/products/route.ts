import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import prisma from "@/lib/prisma";

import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: Request) {
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  // }
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('q') || ''
  try {
    const posts = await prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
            },
          },
          {
            code: {
              contains: query,
            },
          },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true,
      },
      take: 10,
    });
    return  NextResponse.json(posts);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
  try {
    const { name, description, quantity, price, categoryId, code } =
      await request.json();

    if (!name || !code || !quantity || !price || !categoryId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const codeProduct = await prisma.product.findMany({
      where: {
        code,
      },
    });

    if (codeProduct.length > 0) {
      return NextResponse.json(
        { error: "Product already exists" },
        { status: 400 },
      );
    }

    await prisma.product.create({
      data: {
        name,
        description,
        quantity,
        price,
        categoryId,
        code,
      },
    });

    return NextResponse.json({ status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 },
    );
  }
}
