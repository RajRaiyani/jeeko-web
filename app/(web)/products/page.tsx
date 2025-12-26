"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Search, X, Filter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useProducts } from "@/hooks/useProducts";
import { useProductCategories } from "@/hooks/useProductCategories";

// Type definitions
interface ProductImage {
  image_id?: string;
  is_primary?: boolean;
  image?: {
    id: string;
    key: string;
    url: string;
  };
  url?: string;
  alt?: string;
}

interface ProductCategory {
  id: string;
  name: string;
  description?: string;
}

interface Product {
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

// Skeleton Component
function ProductSkeleton() {
  return (
    <Card className="p-0 h-full overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
      <div className="flex flex-col h-full">
        {/* Image skeleton */}
        <div className="relative w-full aspect-square bg-slate-200 animate-pulse" />
        {/* Content skeleton */}
        <CardContent className="p-4 flex flex-col gap-3">
          <div className="h-4 bg-slate-200 rounded animate-pulse w-20" />
          <div className="h-5 bg-slate-200 rounded animate-pulse" />
          <div className="h-5 bg-slate-200 rounded animate-pulse w-3/4" />
          <div className="space-y-2">
            <div className="h-3 bg-slate-200 rounded animate-pulse" />
            <div className="h-3 bg-slate-200 rounded animate-pulse w-2/3" />
          </div>
          <div className="h-6 bg-slate-200 rounded animate-pulse w-24 mt-2" />
        </CardContent>
      </div>
    </Card>
  );
}

// Product Card Component
function ProductCard({ product, index }: { product: Product; index: number }) {
  const getProductImageUrl = (product: Product): string => {
    if (product.images && product.images.length > 0) {
      const firstImage = product.images[0];
      if (firstImage.image?.url) {
        return firstImage.image.url;
      }
      if (firstImage.url) {
        return firstImage.url;
      }
    }
    return "/images/placeholder-product.png";
  };

  const getCategoryName = (product: Product): string => {
    if (product.category?.name) {
      return product.category.name;
    }
    return "General";
  };

  const getProductPrice = (product: Product): number => {
    return product.sale_price_in_rupees || product.sale_price || 0;
  };

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="group p-0 gap-0 h-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30 cursor-pointer">
        {/* Product Image */}
        <div className="relative w-full aspect-square bg-white overflow-hidden">
          <Image
            className="object-contain p-4 sm:p-6 transition-transform duration-300 group-hover:scale-110"
            src={getProductImageUrl(product)}
            alt={product.name || "Product"}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            quality={100}
            priority={index < 4}
          />
        </div>

        {/* Product Details */}
        <div className="p-4 pt-0 sm:p-5 sm:pt-0 flex flex-col gap-2">
          {/* Category Badge */}
          <p className="inline-flex items-center gap-1.5 w-fit rounded-full bg-slate-100 px-2.5 py-1 text-[10px] sm:text-xs font-medium uppercase tracking-wide text-slate-600">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {getCategoryName(product)}
          </p>

          {/* Product Name */}
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {product.name}
          </h3>

          {/* Points or Description */}
          {product.points && product.points.length >= 2 ? (
            <ul className="text-md sm:text-base text-green-700 space-y-0">
              {product.points.slice(0, 2).map((point, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-primary mt-0.5 bg-green-700 size-2 rounded-full"></span>
                  <span className="line-clamp-1">{point}</span>
                </li>
              ))}
            </ul>
          ) : (
            product.description && (
              <p className="text-xs sm:text-sm text-slate-500 line-clamp-2">
                {product.description}
              </p>
            )
          )}

          {/* Price and CTA */}
          <div className="mt-auto pt-2 flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] sm:text-xs text-slate-400 mb-0.5">
                Starting from
              </p>
              <p className="text-xl sm:text-2xl font-bold text-primary">
                ₹{getProductPrice(product)}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

// Category Filter Component (reusable for desktop and mobile)
interface CategoryFilterProps {
  categories: ProductCategory[];
  categoriesLoading: boolean;
  selectedCategoryId?: string;
  hasActiveFilters: boolean;
  onCategoryChange: (categoryId: string | null) => void;
  onClearFilters: () => void;
  onClose?: () => void;
}

function CategoryFilter({
  categories,
  categoriesLoading,
  selectedCategoryId,
  hasActiveFilters,
  onCategoryChange,
  onClearFilters,
  onClose,
}: CategoryFilterProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Categories</h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onClearFilters();
              onClose?.();
            }}
            className="text-xs"
          >
            Clear
          </Button>
        )}
      </div>
      {categoriesLoading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-8 bg-slate-200 rounded animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          <button
            onClick={() => {
              onCategoryChange(null);
              onClose?.();
            }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              !selectedCategoryId
                ? "bg-primary text-white font-medium"
                : "bg-slate-50 hover:bg-slate-100 text-slate-700"
            }`}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                onCategoryChange(category.id);
                onClose?.();
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedCategoryId === category.id
                  ? "bg-primary text-white font-medium"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-700"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Get category from URL params
  const categoryParam = searchParams.get("category");
  const selectedCategoryId =
    categoryParam && categoryParam !== "undefined" && categoryParam !== "null"
      ? categoryParam
      : undefined;

  // Build query params - only include defined values
  const queryParams: {
    category_id?: string;
    search?: string;
    limit: number;
  } = {
    limit: 30,
  };

  if (selectedCategoryId) {
    queryParams.category_id = selectedCategoryId;
  }

  if (searchTerm && searchTerm.trim()) {
    queryParams.search = searchTerm.trim();
  }

  // Fetch products and categories
  const {
    data: productsResponse,
    isLoading: productsLoading,
    error: productsError,
  } = useProducts(queryParams);

  const { data: categoriesResponse, isLoading: categoriesLoading } =
    useProductCategories();

  // Extract products from API response
  const products: Product[] = useMemo(() => {
    if (!productsResponse) return [];
    if (Array.isArray(productsResponse)) {
      return productsResponse;
    }
    if (
      typeof productsResponse === "object" &&
      "data" in productsResponse &&
      Array.isArray(productsResponse.data)
    ) {
      return productsResponse.data;
    }
    return [];
  }, [productsResponse]);

  // Extract categories
  const categories: ProductCategory[] = useMemo(() => {
    if (!categoriesResponse) return [];
    if (Array.isArray(categoriesResponse)) {
      return categoriesResponse;
    }
    if (
      typeof categoriesResponse === "object" &&
      "data" in categoriesResponse &&
      Array.isArray(categoriesResponse.data)
    ) {
      return categoriesResponse.data;
    }
    return [];
  }, [categoriesResponse]);

  // Handle category filter
  const handleCategoryChange = (categoryId: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (categoryId) {
      params.set("category", categoryId);
    } else {
      params.delete("category");
    }
    router.push(`/products?${params.toString()}`);
  };

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) {
      params.set("search", value.trim());
    } else {
      params.delete("search");
    }
    router.push(`/products?${params.toString()}`);
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm("");
    router.push("/products");
  };

  const hasActiveFilters = !!(selectedCategoryId || searchTerm);

  return (
    <section className="w-full min-h-screen px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-2 px-2">
            Our Products
          </h1>
          <div className="w-24 sm:w-32 h-1 bg-primary mx-auto mb-4 sm:mb-6"></div>
          <p className="text-center text-slate-600 max-w-2xl mx-auto text-sm sm:text-base px-4">
            Discover our wide range of high-quality agricultural equipment and
            power solutions
          </p>
        </div>

        {/* Search and Mobile Filter */}
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="relative flex-1 w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-10 border-primary h-10 sm:h-9 text-base sm:text-sm"
            />
            {searchTerm && (
              <button
                onClick={() => handleSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          {/* Mobile Filter Sheet */}
          <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="sm:hidden w-full sm:w-auto">
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {hasActiveFilters && (
                  <span className="ml-2 px-2 py-0.5 bg-primary text-white text-xs rounded-full">
                    {[selectedCategoryId, searchTerm].filter(Boolean).length}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[300px]">
              <SheetHeader>
                <SheetTitle>Filter Products</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <CategoryFilter
                  categories={categories}
                  categoriesLoading={categoriesLoading}
                  selectedCategoryId={selectedCategoryId}
                  hasActiveFilters={hasActiveFilters}
                  onCategoryChange={handleCategoryChange}
                  onClearFilters={clearFilters}
                  onClose={() => setMobileFilterOpen(false)}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Filters and Products Grid */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Desktop Sidebar - Category Filter */}
          <aside className="hidden lg:block lg:w-64 shrink-0">
            <Card className="p-4 md:p-6 bg-white sticky top-24 lg:top-28">
              <CategoryFilter
                categories={categories}
                categoriesLoading={categoriesLoading}
                selectedCategoryId={selectedCategoryId}
                hasActiveFilters={hasActiveFilters}
                onCategoryChange={handleCategoryChange}
                onClearFilters={clearFilters}
              />
            </Card>
          </aside>

          {/* Products Grid */}
          <div className="flex-1 min-w-0">
            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="mb-4 sm:mb-6 flex flex-wrap gap-2 items-center">
                <span className="text-xs sm:text-sm text-slate-600 w-full sm:w-auto">
                  Active filters:
                </span>
                {selectedCategoryId && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm">
                    {categories.find((c) => c.id === selectedCategoryId)
                      ?.name || "Category"}
                    <button
                      onClick={() => handleCategoryChange(null)}
                      className="hover:text-primary/80 ml-0.5"
                      aria-label="Remove category filter"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {searchTerm && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm">
                    <span className="hidden sm:inline">Search: </span>
                    <span className="truncate max-w-[120px] sm:max-w-none">
                      {searchTerm}
                    </span>
                    <button
                      onClick={() => handleSearch("")}
                      className="hover:text-primary/80 ml-0.5 flex-shrink-0"
                      aria-label="Clear search"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Loading State */}
            {productsLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                {[...Array(4)].map((_, i) => (
                  <ProductSkeleton key={i} />
                ))}
              </div>
            )}

            {/* Error State */}
            {productsError && (
              <Card className="p-6 sm:p-8 text-center">
                <p className="text-red-600 mb-2 text-sm sm:text-base">
                  Error loading products
                </p>
                <p className="text-xs sm:text-sm text-slate-500">
                  {productsError.message || "Please try again later"}
                </p>
              </Card>
            )}

            {/* Empty State */}
            {!productsLoading && !productsError && products.length === 0 && (
              <Card className="p-8 sm:p-12 text-center">
                <p className="text-base sm:text-lg font-semibold text-slate-900 mb-2">
                  No products found
                </p>
                <p className="text-xs sm:text-sm text-slate-500 mb-4">
                  {hasActiveFilters
                    ? "Try adjusting your filters to see more results"
                    : "Check back later for new products"}
                </p>
                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="text-sm sm:text-base"
                  >
                    Clear Filters
                  </Button>
                )}
              </Card>
            )}

            {/* Products Grid */}
            {!productsLoading && !productsError && products.length > 0 && (
              <>
                <div className="mb-3 sm:mb-4 text-xs sm:text-sm text-slate-600">
                  Showing {products.length} product
                  {products.length !== 1 ? "s" : ""}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                  {products.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={index}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
