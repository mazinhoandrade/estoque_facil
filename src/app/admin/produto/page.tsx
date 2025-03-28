import { ContentHeader } from "@/src/components/contentHeader";
import ProductList from "@/src/components/product/ProductList";

export default function Products() {
  return (
    <div className="mb-20 mt-10 space-y-8">
      <ContentHeader label="produto" />
      <ProductList />
    </div>
  );
}
