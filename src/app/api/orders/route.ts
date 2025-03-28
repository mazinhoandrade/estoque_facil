import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import prisma from "@/lib/prisma";

import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { clientName, products } = await req.json();

    // Calculate total
    const productDetails = await prisma.product.findMany({
      where: {
        id: {
          in: products.map((p: { id: string }) => p.id),
        },
      },
    });

    const total = products.reduce(
      (sum: number, item: { id: string; quantity: number }) => {
        const product = productDetails.find((p) => p.id === item.id);
        return sum + (product?.price || 0) * item.quantity;
      },
      0,
    );

    // Create order and OrderProducts in a transaction
    const order = await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          clientName,
          total,
        },
      });

      await tx.orderProduct.createMany({
        data: products.map((product: { id: string; quantity: number }) => ({
          orderId: order.id,
          productId: product.id,
          quantity: product.quantity,
          price: productDetails.find((p) => p.id === product.id)?.price || 0,
          clientName: clientName, // Add the missing clientName
        })),
      });

      // Update inventory
      for (const product of products) {
        await tx.product.update({
          where: { id: product.id },
          data: { quantity: { decrement: product.quantity } },
        });
      }

      return order;
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("[ORDERS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
