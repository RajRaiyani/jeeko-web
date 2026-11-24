"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/shared/ProductCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { useProducts } from "@/hooks/useProducts";
import { asList, type Product } from "@/lib/product";
import type { ProductLabel } from "@/lib/product-labels";

export function LabeledProducts({
  title,
  description,
  label,
  limit = 8,
}: {
  title: string;
  description?: string;
  label: ProductLabel;
  limit?: number;
}) {
  const { data, isLoading, error } = useProducts({ label, limit });
  const products = asList<Product>(data).slice(0, limit);

  if (!isLoading && !error && products.length === 0) {
    return null;
  }

  return (
    <section className="w-full px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader title={title} description={description} />

        <div className="mt-4 flex justify-end">
          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            See all
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {isLoading && (
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-5">
            {Array.from({ length: limit }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] animate-pulse rounded-xl bg-white"
              />
            ))}
          </div>
        )}

        {error && (
          <p className="mt-8 text-center text-sm text-destructive">
            Couldn’t load products. Please refresh.
          </p>
        )}

        {products.length > 0 && (
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-5">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={index < 4}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
