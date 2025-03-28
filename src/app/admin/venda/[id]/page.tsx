import { notFound } from "next/navigation";

import prisma from "@/lib/prisma";
import { OrderIdPrint } from "@/src/components/orderIdPrint";
import { Order } from "@/src/types/order";

interface OrderDetailPageProps {
  params: {
    id: string;
  };
}

export default async function OrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const order = await prisma.order.findUnique({
    where: {
      id: parseInt(params?.id as string, 10),
    },
    include: {
      orderProduct: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    notFound();
  }

  return <OrderIdPrint order={order as Order} />;
}
