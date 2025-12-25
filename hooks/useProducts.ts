import { useQuery } from "@tanstack/react-query";
import { listProducts, getProduct } from "@/services/api/product";

export function useProducts(params?: {
  category_id?: string;
  search?: string;
  offset?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => listProducts(params),
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    enabled: !!id,
  });
}

