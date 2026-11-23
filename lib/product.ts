import type { ProductBrand } from "@/lib/product-brands";

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
  image?: { id: string; key: string; url: string };
}

export interface Product {
  id: string;
  category_id?: string;
  brand?: ProductBrand;
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

/** Normalize list API responses that may be an array or `{ data: [] }`. */
export function asList<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[];
  if (
    value &&
    typeof value === "object" &&
    "data" in value &&
    Array.isArray((value as { data: unknown }).data)
  ) {
    return (value as { data: T[] }).data;
  }
  return [];
}

export function getProductImageUrl(product: Product): string {
  const first = product.images?.[0];
  return (
    first?.image?.url ||
    first?.url ||
    "/images/placeholder-product.png"
  );
}

export function getProductPrice(product: Product): number {
  return product.sale_price_in_rupees ?? product.sale_price ?? 0;
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
