import { Product } from "@prisma/client";

export type Order = {
  id: number;
  total: number;
  clientName: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  orderProduct: OrderProduct[];
};

export type OrderProduct = {
  id: string;
  quantity: number;
  price: number;
  clientName: string;
  productId: string;
  orderId: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  product: Product;
};
