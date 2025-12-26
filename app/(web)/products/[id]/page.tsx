"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight, Tag, Package, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProduct } from "@/hooks/useProducts";
import { useCreateInquiry, type CreateInquiryData } from "@/hooks/useInquiry";

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

// Inquiry form schema
const inquiryFormSchema = z.object({
  fullname: z
    .string()
    .min(1, "Full name is required")
    .max(100, "Full name cannot exceed 100 characters"),
  phonenumber: z
    .string()
    .min(1, "Phone number is required")
    .max(20, "Phone number cannot exceed 20 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(100, "Email cannot exceed 100 characters"),
});

type InquiryFormValues = z.infer<typeof inquiryFormSchema>;

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
  const [isInquiryDialogOpen, setIsInquiryDialogOpen] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState<string>("");

  const createInquiryMutation = useCreateInquiry();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquiryFormSchema),
    mode: "onChange",
    defaultValues: {
      fullname: "",
      phonenumber: "",
      email: "",
    },
  });

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

  // Handle inquiry form submission
  const handleInquirySubmit = async (data: InquiryFormValues) => {
    try {
      setFormError("");
      setFormSuccess(false);

      // Prepare submission data with product name in the message field
      const submissionData: CreateInquiryData = {
        fullname: data.fullname.trim(),
        phonenumber: data.phonenumber.trim(),
        email: data.email.trim().toLowerCase(),
        description: `Inquiry for product: ${product?.name || "Product"}`,
      };

      await createInquiryMutation.mutateAsync(submissionData);

      setFormSuccess(true);
      reset();

      // Close dialog after 2 seconds
      setTimeout(() => {
        setIsInquiryDialogOpen(false);
        setFormSuccess(false);
      }, 2000);
    } catch (error: unknown) {
      const apiError = error as {
        response?: {
          data?: {
            error?: string;
            details?: string | string[];
          };
        };
        message?: string;
      };
      const errorMessage =
        apiError.response?.data?.error ||
        apiError.response?.data?.details?.[0] ||
        apiError.message ||
        "Failed to submit inquiry. Please try again.";
      setFormError(errorMessage);
    }
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

            {/* Key Features (Points) */}
            {product.points && product.points.length >= 2 && (
              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-slate-900">
                  Key Features
                </h2>
                <ul className="text-md sm:text-base text-green-700 space-y-2">
                  {product.points.map((point, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="bg-green-700 size-2 rounded-full flex-shrink-0"></span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

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
                onClick={() => setIsInquiryDialogOpen(true)}
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

      {/* Inquiry Dialog */}
      <Dialog open={isInquiryDialogOpen} onOpenChange={setIsInquiryDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Request Inquiry</DialogTitle>
            <DialogDescription>
              Fill in your details to request more information about this product.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(handleInquirySubmit)} className="space-y-4 mt-4">
            {/* Success Message */}
            {formSuccess && (
              <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-800 text-sm">
                Inquiry submitted successfully! We'll get back to you soon.
              </div>
            )}

            {/* Error Message */}
            {formError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm">
                {formError}
              </div>
            )}

            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullname">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="fullname"
                type="text"
                placeholder="Enter your full name"
                {...register("fullname")}
                disabled={isSubmitting}
                className={errors.fullname ? "border-red-500" : ""}
              />
              {errors.fullname && (
                <p className="text-sm text-red-500">{errors.fullname.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                disabled={isSubmitting}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phonenumber">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phonenumber"
                type="tel"
                placeholder="Enter your phone number"
                {...register("phonenumber")}
                disabled={isSubmitting}
                className={errors.phonenumber ? "border-red-500" : ""}
              />
              {errors.phonenumber && (
                <p className="text-sm text-red-500">{errors.phonenumber.message}</p>
              )}
            </div>

            {/* Product Name Display */}
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <p className="text-xs text-slate-500 mb-1">Product:</p>
              <p className="text-sm font-medium text-slate-900">{product.name}</p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsInquiryDialogOpen(false);
                  reset();
                  setFormError("");
                  setFormSuccess(false);
                }}
                disabled={isSubmitting}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Inquiry"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

