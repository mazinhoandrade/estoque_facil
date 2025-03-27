import { useQuery } from "@tanstack/react-query";

import { getCategories, getProducts } from "./admin";

//produtos
export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });
};

//categorias
export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
};
