import { useQuery } from "@tanstack/react-query";
import { listProducts, getProduct } from "@/services/api/product";
import type { ProductBrand } from "@/lib/product-brands";
import type { ProductLabel } from "@/lib/product-labels";

export function useProducts(params?: {
  category_id?: string;
  brand?: ProductBrand;
  label?: ProductLabel;
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

