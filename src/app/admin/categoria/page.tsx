import { CategoryForm } from "@/src/components/categoryForm";
import CategoryList from "@/src/components/categoryList";
import { ContentHeader } from "@/src/components/contentHeader";

export default function Categories() {
  return (
    <div className="mb-20 mt-10 space-y-8">
      <ContentHeader label="categoria" />
      <CategoryForm />
      <CategoryList />
    </div>
  );
}
