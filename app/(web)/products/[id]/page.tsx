"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight, Tag, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useProduct } from "@/hooks/useProducts";

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
  category?: ProductCategory;
  images?: ProductImage[];
}

// Skeleton Component
function ProductDetailSkeleton() {
  return (
    <div className="w-full min-h-screen px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button Skeleton */}
        <div className="mb-6">
          <div className="h-10 w-24 bg-slate-200 rounded animate-pulse" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Image Gallery Skeleton */}
          <div className="space-y-4">
            <div className="relative w-full aspect-square bg-slate-200 rounded-lg animate-pulse" />
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-slate-200 rounded-lg animate-pulse"
                />
              ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="space-y-6">
            <div className="h-8 w-32 bg-slate-200 rounded animate-pulse" />
            <div className="h-10 w-full bg-slate-200 rounded animate-pulse" />
            <div className="h-6 w-24 bg-slate-200 rounded animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-slate-200 rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse" />
            </div>
            <div className="h-12 w-full bg-slate-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;

  const { data: productResponse, isLoading, error } = useProduct(productId);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Extract product from API response
  const product: Product | undefined = useMemo(() => {
    if (!productResponse) return undefined;
    if (Array.isArray(productResponse)) {
      return productResponse[0];
    }
    if (
      typeof productResponse === "object" &&
      "data" in productResponse &&
      !Array.isArray(productResponse.data)
    ) {
      return productResponse.data as Product;
    }
    return productResponse as Product;
  }, [productResponse]);

  // Get all product images
  const productImages = useMemo(() => {
    if (!product?.images || product.images.length === 0) {
      return [{ url: "/images/placeholder-product.png", alt: product?.name || "Product" }];
    }

    return product.images.map((img) => {
      if (img.image?.url) {
        return { url: img.image.url, alt: img.alt || product.name };
      }
      if (img.url) {
        return { url: img.url, alt: img.alt || product.name };
      }
      return { url: "/images/placeholder-product.png", alt: product.name };
    });
  }, [product]);

  // Get primary image or first image
  const primaryImage = productImages[selectedImageIndex] || productImages[0];

  // Get product price
  const productPrice = product
    ? product.sale_price_in_rupees || product.sale_price || 0
    : 0;

  // Get category name
  const categoryName = product?.category?.name || "General";

  // Navigation handlers
  const handlePreviousImage = () => {
    setSelectedImageIndex((prev) =>
      prev > 0 ? prev - 1 : productImages.length - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev < productImages.length - 1 ? prev + 1 : 0
    );
  };

  // Loading state
  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  // Error state
  if (error || !product) {
    return (
      <div className="w-full min-h-screen px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <div className="max-w-7xl mx-auto">
          <Card className="p-8 sm:p-12 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Product Not Found
            </h2>
            <p className="text-slate-600 mb-6">
              {error
                ? "Error loading product. Please try again later."
                : "The product you're looking for doesn't exist."}
            </p>
            <Button onClick={() => router.push("/products")} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Main Product Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative w-full aspect-square bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm">
              {productImages.length > 1 && (
                <>
                  <button
                    onClick={handlePreviousImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-md transition-all"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5 text-slate-700" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-md transition-all"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5 text-slate-700" />
                  </button>
                </>
              )}
              <Image
                src={primaryImage.url}
                alt={primaryImage.alt}
                fill
                className="object-contain p-4 sm:p-6"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Thumbnail Gallery */}
            {productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index
                        ? "border-primary shadow-md"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <Image
                      src={img.url}
                      alt={img.alt}
                      fill
                      className="object-contain p-2"
                      sizes="(max-width: 640px) 25vw, 12.5vw"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Category Badge */}
            <div className="flex items-center gap-3">
              <Link
                href={`/products?category=${product.category_id}`}
                className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
              >
                <Tag className="h-4 w-4" />
                {categoryName}
              </Link>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-bold text-primary">
                ₹{productPrice.toLocaleString("en-IN")}
              </span>
            </div>

            {/* Description */}
            {product.description && (
              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-slate-900">
                  Description
                </h2>
                <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            )}

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-slate-900">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Metadata */}
            {product.metadata && Object.keys(product.metadata).length > 0 && (
              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-slate-900">
                  Specifications
                </h2>
                <Card className="p-4 bg-white">
                  <CardContent className="p-0">
                    <dl className="space-y-2">
                      {Object.entries(product.metadata).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between items-start py-2 border-b border-slate-100 last:border-0"
                        >
                          <dt className="text-sm font-medium text-slate-700 capitalize">
                            {key.replace(/_/g, " ")}:
                          </dt>
                          <dd className="text-sm text-slate-600 text-right ml-4">
                            {typeof value === "object"
                              ? JSON.stringify(value)
                              : String(value)}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                size="lg"
                className="flex-1 text-base sm:text-lg py-6 sm:py-7"
                onClick={() => {
                  // TODO: Add to cart or inquiry functionality
                  window.location.href = `/contact?product=${product.id}`;
                }}
              >
                <Package className="h-5 w-5 mr-2" />
                Request Inquiry
              </Button>
            </div>

            {/* Additional Info */}
            <Card className="p-4 bg-white border-slate-200">
              <CardContent className="p-0 space-y-2 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Product ID:</span>
                  <span className="text-slate-500">{product.id}</span>
                </div>
                {product.category && (
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Category:</span>
                    <Link
                      href={`/products?category=${product.category_id}`}
                      className="text-primary hover:underline"
                    >
                      {product.category.name}
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Products Section - Placeholder for future implementation */}
        {product.category_id && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Related Products
              </h2>
              <Link
                href={`/products?category=${product.category_id}`}
                className="text-primary hover:underline text-sm sm:text-base font-medium"
              >
                View All
              </Link>
            </div>
            <p className="text-slate-600 text-center py-8">
              Related products feature coming soon
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

