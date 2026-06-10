export const PRODUCT_BRANDS = ["jeeko", "kishan king"] as const;

export type ProductBrand = (typeof PRODUCT_BRANDS)[number];

export function formatProductBrand(brand: ProductBrand): string {
  return brand === "kishan king" ? "Kishan King" : "Jeeko";
}
