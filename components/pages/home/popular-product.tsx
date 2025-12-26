"use client";

import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";

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
function PopularProductSkeleton() {
  return (
    <section className="w-full mx-auto mb-8 px-4 sm:px-6 lg:px-8 pb-4 sm:pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Title skeleton */}
        <div className="text-center">
          <div className="h-10 bg-gray-200 rounded-lg w-80 mx-auto animate-pulse"></div>
        </div>

        {/* Red line skeleton */}
        <div className="w-32 h-1 bg-gray-200 mx-auto my-2 animate-pulse rounded"></div>

        {/* See all link skeleton */}
        <div className="flex justify-end mb-5">
          <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
        </div>

        {/* Products grid skeleton */}
        <div className="grid my-5 grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {/* Generate 8 skeleton cards */}
          {[...Array(4)].map((_, index) => (
            <Card key={index} className="h-full">
              <CardContent className="p-4 flex h-full gap-4">
                {/* Image skeleton */}
                <div className="w-5/12 flex items-center">
                  <div className="w-full h-32 md:h-40 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>

                {/* Content skeleton */}
                <div className="w-7/12 flex flex-col">
                  {/* Product name skeleton */}
                  <div className="mb-2">
                    <div className="h-5 bg-gray-200 rounded animate-pulse mb-1"></div>
                    <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  </div>

                  {/* Description skeleton */}
                  <div className="flex-grow mb-3 space-y-1">
                    <div className="h-3.5 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3.5 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3.5 bg-gray-200 rounded animate-pulse w-2/3"></div>
                  </div>

                  {/* Price skeleton */}
                  <div className="mt-auto">
                    <div className="h-5 bg-gray-200 rounded animate-pulse w-20"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function PopularProduct() {
  const containerRef = useRef<HTMLElement>(null);
  const { data: productsResponse, isLoading, error } = useProducts();

  // Extract products from API response - handle both direct array and wrapped response
  let popularProducts: Product[] = [];
  if (productsResponse) {
    if (Array.isArray(productsResponse)) {
      popularProducts = productsResponse;
    } else if (
      typeof productsResponse === "object" &&
      "data" in productsResponse &&
      Array.isArray(productsResponse.data)
    ) {
      popularProducts = productsResponse.data;
    }
  }

  const getProductImageUrl = (product: Product): string => {
    if (product.images && product.images.length > 0) {
      // Handle nested image structure: images[].image.url
      const firstImage = product.images[0];
      if (firstImage.image?.url) {
        return firstImage.image.url;
      }
      // Fallback to direct url
      if (firstImage.url) {
        return firstImage.url;
      }
    }
    return "/images/placeholder-product.png";
  };

  const getProductImageAlt = (product: Product): string => {
    // Use product name as alt text since API doesn't provide alt text
    return product.name || "Product";
  };

  const getCategoryName = (product: Product): string => {
    if (product.category?.name) {
      return product.category.name;
    }
    return "General";
  };

  const getProductPrice = (product: Product): number => {
    // Use sale_price_in_rupees if available, otherwise sale_price
    return product.sale_price_in_rupees || product.sale_price || 0;
  };

  // Show skeleton during loading
  if (isLoading) {
    return <PopularProductSkeleton />;
  }

  if (error) {
    return (
      <section ref={containerRef} className="w-full mx-auto mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl text-center font-bold">Popular Products</h2>
          <div className="w-32 h-1 bg-primary mx-auto my-2"></div>
          <div className="text-center mt-8">
            <p className="text-red-600">
              Error loading products: {error?.message || "Unknown error"}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Please try refreshing the page
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!popularProducts.length) {
    return (
      <section ref={containerRef} className="w-full mx-auto mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl text-center font-bold">Popular Products</h2>
          <div className="w-32 h-1 bg-primary mx-auto my-2"></div>
          <div className="text-center mt-8">
            <p className="text-gray-600">No products available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="w-full mx-auto mb-8 px-4 sm:px-6 lg:px-8 pb-4 sm:pb-8"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl text-center font-bold">Popular Products</h2>
        <div className="w-32 h-1 bg-primary mx-auto my-2"></div>
        <div className="flex justify-end">
          <Link
            href="/products"
            className="flex gap-2 text-primary font-bold hover:underline"
          >
            See all <ChevronRight />
          </Link>
        </div>
        {/* Grid: single column on mobile, two columns from md up */}
        <div className="grid my-5 grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {popularProducts.slice(0, 6).map((product, index) => (
            <Link key={product.id || index} href={`/products/${product.id}`}>
              <Card className="p-0 h-full min-h-[260px] md:min-h-[320px] lg:min-h-[340px] overflow-hidden rounded-2xl border border-slate-100 bg-white/90 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg cursor-pointer">
                <CardContent className="p-4 md:p-5 flex h-full gap-4 md:gap-5">
                  {/* Image side */}
                  <div className="w-5/12 flex items-stretch">
                    <div className="relative w-full h-40 md:h-48 lg:h-52 self-center rounded-2xl bg-slate-50">
                      <Image
                        className="p-2 md:p-3 object-contain"
                        src={getProductImageUrl(product)}
                        alt={getProductImageAlt(product)}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        quality={100}
                        priority={index < 4}
                      />
                    </div>
                  </div>

                  {/* Details side */}
                  <div className="w-7/12 flex flex-col">
                    {/* Category */}
                    <p className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {getCategoryName(product)}
                    </p>

                    {/* Product Name */}
                    <h3 className="mt-2 text-base md:text-lg font-semibold text-slate-900 leading-snug line-clamp-2">
                      {product.name}
                    </h3>

                    {/* Points or Description */}
                    {product.points && product.points.length >= 3 ? (
                      <ul className="mt-2 text-xs md:text-sm text-green-700 space-y-0 flex-grow">
                        {product.points
                          .slice(0, 5)
                          .map((point: string, idx: number) => (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="text-primary mt-0.5 bg-green-700 size-2 rounded-full flex-shrink-0"></span>
                              <span className="line-clamp-1">{point}</span>
                            </li>
                          ))}
                      </ul>
                    ) : (
                      product.description && (
                        <p className="mt-2 text-xs md:text-sm text-slate-500 flex-grow line-clamp-3">
                          {product.description}
                        </p>
                      )
                    )}

                    {/* Price + CTA */}
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                          Starting from
                        </p>
                        <p className="text-sm mt-0.5">
                          <span className="text-primary text-xl md:text-2xl font-bold">
                            ₹{getProductPrice(product)}
                          </span>
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-[11px] font-medium text-primary transition-colors duration-200 hover:bg-primary/10">
                        View details
                        <ChevronRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
