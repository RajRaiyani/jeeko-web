import { listProductCategories } from "@/services/api/product-category";
import ProductCategoriesSlider from "./product-categories-slider";

interface Category {
  id: string;
  name: string;
  description?: string;
  image?: {
    id: string;
    key: string;
    url: string;
  };
}

const categories = (await listProductCategories()) as Category[];

export default async function ProductCategories() {
  // No categories state
  if (!categories.length) {
    return (
      <section className="w-full py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl text-center font-bold">Product Category</h2>
          <div className="red-line w-32 h-1 bg-red-600 mx-auto my-6"></div>
          <div className="mt-12 text-center text-gray-600">
            No categories available
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-8 px-4 sm:px-6 lg:px-8">
      {/* Same width container structure as Hero - Perfect match */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl text-center font-bold">Product Category</h2>
        <div className="red-line w-32 h-1 bg-red-600 mx-auto my-2"></div>

        <ProductCategoriesSlider categories={categories} />
      </div>
    </section>
  );
}
