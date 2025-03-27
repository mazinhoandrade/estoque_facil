"use client";
import { Pencil } from "lucide-react";

import { DeleteButton } from "@/components/deleteButton";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useDelCategory } from "../server/useMutations";
import { useCategories } from "../server/useQueries";
export default function CategoryList() {
  const categories = useCategories();
  const delCategory = useDelCategory();
  const handleUpdate = async (id: string) => {};

  const handleDelete = async (id: string) => {
    delCategory.mutate(id);
  };

  return (
    <div className="rounded p-4 shadow">
      <h2 className="mb-4 text-xl font-semibold">Lista de Categorias</h2>
      
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Id</TableHead>
                    <TableHead className="w-[100px]">Nome</TableHead>
                    <TableHead className="w-[100px]">Produtos</TableHead>
                    <TableHead className="text-right">Açoes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                {categories?.isLoading && (
                <TableRow>
                  <TableCell colSpan={7}>
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
                  {!categories.isLoading && categories?.data?.map((category) => (
                    <TableRow key={category.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        {category.id.slice(0, 5)}
                      </TableCell>
                      <TableCell className="font-medium">
                        {category.name}
                      </TableCell>
                      <TableCell className="font-medium">
                        {category.product.length}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button onClick={() => handleUpdate(category.id)}>
                            <Pencil />
                          </Button>
                          <DeleteButton onClick={() => handleDelete(category.id)} name={category.name} label="Category" />
                    
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {!categories.isLoading && 
              categories.data?.length === 0 &&
              <p className="text-center">Não há categorias cadastrados</p>
            }

            
    </div>
  );
}
