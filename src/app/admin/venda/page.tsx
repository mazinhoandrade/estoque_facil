import prisma from "@/lib/prisma";
import { Sale } from "@/src/components/sale/sale";

export default async function SalesPage() {
  const orders = await prisma.order.findMany({
    include: {
      orderProduct: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return <Sale orders={orders} />;
}
