"use client";

import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ProductCard } from "@/components/shared/ProductCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { useProducts } from "@/hooks/useProducts";
import { useProductCategories } from "@/hooks/useProductCategories";
import {
  formatProductBrand,
  PRODUCT_BRANDS,
  type ProductBrand,
} from "@/lib/product-brands";
import { asList, type Product, type ProductCategory } from "@/lib/product";
import { cn } from "@/lib/utils";

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-medium">{title}</h3>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full rounded-md px-3 py-2 text-left text-sm transition-colors",
        active
          ? "bg-primary font-medium text-white"
          : "bg-muted/60 text-foreground hover:bg-muted"
      )}
    >
      {children}
    </button>
  );
}

function ProductFilters({
  categories,
  selectedCategoryId,
  selectedBrand,
  onCategoryChange,
  onBrandChange,
  onClear,
}: {
  categories: ProductCategory[];
  selectedCategoryId?: string;
  selectedBrand?: ProductBrand;
  onCategoryChange: (id: string | null) => void;
  onBrandChange: (brand: ProductBrand | null) => void;
  onClear: () => void;
}) {
  const hasFilters = !!(selectedCategoryId || selectedBrand);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Filters</h2>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={onClear}>
            Clear
          </Button>
        )}
      </div>

      <FilterGroup title="Brand">
        <FilterButton active={!selectedBrand} onClick={() => onBrandChange(null)}>
          All brands
        </FilterButton>
        {PRODUCT_BRANDS.map((brand) => (
          <FilterButton
            key={brand}
            active={selectedBrand === brand}
            onClick={() => onBrandChange(brand)}
          >
            {formatProductBrand(brand)}
          </FilterButton>
        ))}
      </FilterGroup>

      <FilterGroup title="Category">
        <FilterButton
          active={!selectedCategoryId}
          onClick={() => onCategoryChange(null)}
        >
          All categories
        </FilterButton>
        {categories.map((category) => (
          <FilterButton
            key={category.id}
            active={selectedCategoryId === category.id}
            onClick={() => onCategoryChange(category.id)}
          >
            {category.name}
          </FilterButton>
        ))}
      </FilterGroup>
    </div>
  );
}

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [mobileOpen, setMobileOpen] = useState(false);

  const selectedCategoryId = searchParams.get("category") || undefined;
  const brandParam = searchParams.get("brand");
  const selectedBrand = PRODUCT_BRANDS.includes(brandParam as ProductBrand)
    ? (brandParam as ProductBrand)
    : undefined;

  const queryParams = useMemo(
    () => ({
      limit: 30,
      ...(selectedCategoryId ? { category_id: selectedCategoryId } : {}),
      ...(selectedBrand ? { brand: selectedBrand } : {}),
      ...(search.trim() ? { search: search.trim() } : {}),
    }),
    [selectedCategoryId, selectedBrand, search]
  );

  const { data: productsData, isLoading, error } = useProducts(queryParams);
  const { data: categoriesData } = useProductCategories();
  const products = asList<Product>(productsData);
  const categories = asList<ProductCategory>(categoriesData);

  function updateParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    const qs = params.toString();
    router.push(qs ? `/products?${qs}` : "/products");
  }

  function clearFilters() {
    setSearch("");
    router.push("/products");
  }

  const hasFilters = !!(selectedCategoryId || selectedBrand || search.trim());

  const filters = (
    <ProductFilters
      categories={categories}
      selectedCategoryId={selectedCategoryId}
      selectedBrand={selectedBrand}
      onCategoryChange={(id) => {
        updateParams({ category: id });
        setMobileOpen(false);
      }}
      onBrandChange={(brand) => {
        updateParams({ brand });
        setMobileOpen(false);
      }}
      onClear={() => {
        clearFilters();
        setMobileOpen(false);
      }}
    />
  );

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          as="h1"
          title="Our products"
          description="Agricultural equipment and power solutions for every need."
        />

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1 sm:max-w-md">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => {
                const value = e.target.value;
                setSearch(value);
                updateParams({ search: value.trim() || null });
              }}
              placeholder="Search products..."
              className="pl-9"
            />
            {search && (
              <button
                type="button"
                aria-label="Clear search"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground"
                onClick={() => {
                  setSearch("");
                  updateParams({ search: null });
                }}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6">{filters}</div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="mt-6 flex gap-6">
          <aside className="hidden w-60 shrink-0 lg:block">
            <div className="sticky top-24 rounded-xl bg-white p-5 shadow-sm">
              {filters}
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            {hasFilters && (
              <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
                <span className="text-muted-foreground">Active:</span>
                {selectedBrand && (
                  <button
                    type="button"
                    onClick={() => updateParams({ brand: null })}
                    className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-primary"
                  >
                    {formatProductBrand(selectedBrand)}
                    <X className="h-3 w-3" />
                  </button>
                )}
                {selectedCategoryId && (
                  <button
                    type="button"
                    onClick={() => updateParams({ category: null })}
                    className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-primary"
                  >
                    {categories.find((c) => c.id === selectedCategoryId)?.name ||
                      "Category"}
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            )}

            {isLoading && (
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[3/4] animate-pulse rounded-xl bg-white"
                  />
                ))}
              </div>
            )}

            {error && (
              <p className="rounded-xl bg-white p-8 text-center text-sm text-destructive">
                Failed to load products.
              </p>
            )}

            {!isLoading && !error && products.length === 0 && (
              <div className="rounded-xl bg-white p-10 text-center">
                <p className="font-medium">No products found</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try adjusting your filters.
                </p>
                {hasFilters && (
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={clearFilters}
                  >
                    Clear filters
                  </Button>
                )}
              </div>
            )}

            {products.length > 0 && (
              <>
                <p className="mb-3 text-sm text-muted-foreground">
                  {products.length} product{products.length === 1 ? "" : "s"}
                </p>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
                  {products.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      priority={index < 4}
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

export default function ProductsClient() {
  return (
    <Suspense
      fallback={
        <section className="px-4 py-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader as="h1" title="Our products" description="Loading..." />
          </div>
        </section>
      }
    >
      <ProductsPageContent />
    </Suspense>
  );
}
