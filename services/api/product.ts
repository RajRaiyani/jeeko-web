import axiosInstance from "./httpServices";
import type { ProductBrand } from "@/lib/product-brands";
import type { ProductLabel } from "@/lib/product-labels";

export async function listProducts(params?: {
  category_id?: string;
  brand?: ProductBrand;
  label?: ProductLabel;
  search?: string;
  offset?: number;
  limit?: number;
}) {
  const url = "/products";
  
  // Filter out undefined values to prevent sending "undefined" as string
  const filteredParams = params
    ? Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== undefined && value !== null)
      )
    : undefined;
  
  return axiosInstance({ method: "GET", url, params: filteredParams });
}


export async function getProduct(id: string): Promise<any> {
  const url = `/products/${id}`;
  return axiosInstance({ method: "GET", url });
}

