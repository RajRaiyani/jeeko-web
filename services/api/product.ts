import axiosInstance from "./httpServices";

export async function listProducts(params?: {
  category_id?: string;
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

export async function getProduct(id: string) {
  const url = `/products/${id}`;
  return axiosInstance({ method: "GET", url });
}

