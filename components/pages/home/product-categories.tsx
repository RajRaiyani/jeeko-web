import { listProductCategories } from "@/services/api/product-category";
import { asList, type ProductCategory } from "@/lib/product";
import { SectionHeader } from "@/components/shared/SectionHeader";
import ProductCategoriesSlider from "./product-categories-slider";

export default async function ProductCategories() {
  let categories: ProductCategory[] = [];
  try {
    categories = asList<ProductCategory>(await listProductCategories());
  } catch {
    categories = [];
  }

  return (
    <section className="w-full px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader title="Product categories" />
        {categories.length === 0 ? (
          <p className="mt-8 text-center text-sm text-muted-foreground">
            No categories available.
          </p>
        ) : (
          <ProductCategoriesSlider categories={categories} />
        )}
      </div>
    </section>
  );
}
