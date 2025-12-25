import { useQuery } from "@tanstack/react-query";
import { listProductCategories } from "@/services/api/product-category";

export function useProductCategories() {
  return useQuery({
    queryKey: ["product-categories"],
    queryFn: listProductCategories,
  });
}

