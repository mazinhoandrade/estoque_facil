"use client";
import { Pencil, Trash } from "lucide-react";

import { DeleteButton } from "@/components/deleteButton";
import { Button } from "@/components/ui/button";
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
export default function ProductList() {
  const products = useProducts();
  const delProduct = useDelProduct();

  // const handleUpdate = async (id: string) => {};

  const handleDelete = async (id: string) => {
    delProduct.mutate(id);
  };

  return (
    <div className="rounded p-4 shadow">
      <h2 className="mb-4 text-xl font-semibold">Lista de produtos</h2>
      
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Nome</TableHead>
                    <TableHead>Codigo</TableHead>
                    <TableHead className="hidden md:table-cell">Descrição</TableHead>
                    <TableHead className="text-right">Uni</TableHead>
                    <TableHead className="text-right">Preço</TableHead>
                    <TableHead className="text-right hidden md:table-cell">Categoria</TableHead>
                    <TableHead className="text-right">Açoes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                {products?.isLoading && (
                <TableRow>
                  <TableCell colSpan={7}>
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
                  {!products.isLoading && products?.data?.map((product) => (
                    <TableRow key={product.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell>{product.code}</TableCell>
                      <TableCell className="hidden md:table-cell">{product.description}</TableCell>
                      <TableCell className="text-right">
                        {product.quantity}
                      </TableCell>
                      <TableCell className="text-right">
                      {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(product.price))}
                      </TableCell>
                      <TableCell className="text-right hidden md:table-cell">
                        {product.category.name}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button onClick={() => handleUpdate(product.id)}>
                            <Pencil />
                          </Button>
                          <DeleteButton onClick={() => handleDelete(product.id)} name={product.name} />
                          
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            {!products.isLoading && 
               products.data?.length === 0 &&
              <p className="text-center">Não há produtos cadastrados</p>
            }
    </div>
  );
}
