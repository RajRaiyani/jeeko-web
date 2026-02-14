const BASE_URL = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;

export interface ProductImage {
  image_id?: string;
  is_primary?: boolean;
  image?: { id: string; key: string; url: string };
  url?: string;
  alt?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  description?: string;
}

export interface Product {
  id: string;
  category_id?: string;
  name: string;
  description?: string;
  tags?: string[];
  metadata?: Record<string, unknown>;
  sale_price?: number;
  sale_price_in_rupees?: number;
  created_at?: string;
  updated_at?: string;
  points?: string[];
  category?: ProductCategory;
  images?: ProductImage[];
}

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
