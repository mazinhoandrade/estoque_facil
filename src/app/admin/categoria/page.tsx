import Link from "next/link";

import { CategoryForm } from "@/src/components/categoryForm";
import CategoryList from "@/src/components/categoryList";
import { Button } from "@/src/components/ui/button";

export default function Categories() {
  return (
    <div className="mb-20 mt-10 space-y-8">
      <div className="mx-2 mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Categorias</h1>
        <Link href="/admin/venda/new">
          <Button>Adicionar Categoria</Button>
        </Link>
      </div>
      <CategoryForm />
      <CategoryList />
    </div>
  );
}
