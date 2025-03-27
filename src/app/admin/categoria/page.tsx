import { CategoryForm } from "@/src/components/categoryForm";
import CategoryList from "@/src/components/categoryList";


export default function Categories() {

  return (
    <div className="space-y-8 mb-20 ">
      <h1 className="text-2xl font-bold">Categorias</h1>
      <CategoryForm />
      <CategoryList />
    </div>
  );
}