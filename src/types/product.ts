import { Category } from "@prisma/client";

export type Product = {
  id: string;
  name: string;
  code: string;
  description: string;
  price: number;
  image?: string;
  category: Category;
  quantity: number;
};
