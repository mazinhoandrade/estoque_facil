
import ProductList from "@/components/ProductList";
import { ProductForm } from "@/src/components/ProductForm";


export default function Products() {

  return (
    <div className="space-y-8 mb-20">
      <h1 className="text-2xl font-bold">Estoque</h1>
      <ProductForm />
      <ProductList />
    </div>
  );
}
