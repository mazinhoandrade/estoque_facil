import Link from "next/link";

import ProductList from "@/components/ProductList";
import { ProductForm } from "@/src/components/ProductForm";
import { Button } from "@/src/components/ui/button";

export default function Products() {
  return (
    <div className="mb-20 mt-10 space-y-8">
      <div className="mx-2 mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Estoque</h1>
        <Link href="/admin/venda/new">
          <Button>Adicionar Produto</Button>
        </Link>
      </div>
      <ProductForm />
      <ProductList />
    </div>
  );
}
