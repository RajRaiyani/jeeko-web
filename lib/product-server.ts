import type { Product } from "@/lib/product";

export type { Product, ProductImage, ProductCategory } from "@/lib/product";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;

type ApiResponse = { data?: Product } | Product;

export async function getProduct(id: string): Promise<Product | null> {
  if (!id || !BASE_URL) return null;
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const raw: ApiResponse = await res.json();
    const product = (raw && "data" in raw ? raw.data : raw) as Product | null;
    return product && typeof product.id === "string" ? product : null;
  } catch {
    return null;
  }
}
