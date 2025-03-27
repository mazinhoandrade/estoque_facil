"use client";
import { Pencil, Trash } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useDelProduct } from "../server/useMutations";
import { useProducts } from "../server/useQueries";
import { Button } from "./ui/button";
export default function ProductList() {
  const products = useProducts();
  const delProduct = useDelProduct();

  const handleUpdate = async (id: string) => {};

  const handleDelete = async (id: string) => {
    window.confirm("Tem certeza que deseja excluir?");
    delProduct.mutate(id);
  };

  return (
    <div className="rounded p-4 shadow">
      {products.isLoading && (
        <div className="flex animate-spin justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </div>
      )}
      <h2 className="mb-4 text-xl font-semibold">Lista de produtos</h2>
      {!products.isLoading && (
        <>
          {products.data?.length === 0 ? (
            <p>Não há produtos cadastrados</p>
          ) : (
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Nome</TableHead>
                    <TableHead>Codigo</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead className="text-right">Quantidade</TableHead>
                    <TableHead className="text-right">Preço</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products?.data?.map((product) => (
                    <TableRow key={product.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell>{product.code}</TableCell>
                      <TableCell>{product.description}</TableCell>
                      <TableCell className="text-right">
                        {product.quantity}
                      </TableCell>
                      <TableCell className="text-right">
                        {product.price}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button onClick={() => handleUpdate(product.id)}>
                            <Pencil />
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
