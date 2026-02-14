import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { getProduct } from "@/lib/product-server";
import { ProductDetailClient } from "@/components/pages/product/ProductDetailClient";

const SITE_NAME = "Jeeko Agro Industries";
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://jeeko.in";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 300;

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id ?? "");

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The product you're looking for doesn't exist.",
      robots: { index: false, follow: true },
    };
  }

  const name = product.name ?? "Product";
  const description =
    typeof product.description === "string" && product.description
      ? product.description.slice(0, 160)
      : `View ${name} – agricultural equipment and power solutions from ${SITE_NAME}.`;

  const imageList = product.images;
  const firstImage = imageList?.[0]?.image?.url ?? imageList?.[0]?.url ?? null;
  const canonicalUrl = `${BASE_URL}/products/${id}`;

  const keywords = [
    name,
    product.category?.name,
    "agricultural equipment",
    "Jeeko",
    "farm equipment",
  ].filter(Boolean) as string[];

  return {
    title: name,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${name} | ${SITE_NAME}`,
      description,
      url: canonicalUrl,
      type: "website",
      siteName: SITE_NAME,
      locale: "en_IN",
      ...(firstImage && {
        images: [{ url: firstImage, alt: name, width: 1200, height: 630 }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} | ${SITE_NAME}`,
      description,
      ...(firstImage && { images: [firstImage] }),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

function ProductJsonLd({
  product,
}: {
  product: NonNullable<Awaited<ReturnType<typeof getProduct>>>;
}) {
  const imageList = product.images;
  const imageUrl = imageList?.[0]?.image?.url ?? imageList?.[0]?.url ?? null;
  const price = product.sale_price_in_rupees ?? product.sale_price ?? 0;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description:
      typeof product.description === "string"
        ? product.description.slice(0, 500)
        : undefined,
    image: imageUrl ? [imageUrl] : undefined,
    sku: product.id,
    offers: {
      "@type": "Offer",
      price: price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${BASE_URL}/products/${product.id}`,
    },
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    category: product.category?.name,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return (
      <div className="w-full min-h-screen px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <div className="max-w-7xl mx-auto">
          <Card className="p-8 sm:p-12 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Product Not Found
            </h2>
            <p className="text-slate-600 mb-6">
              The product you&apos;re looking for doesn&apos;t exist or could
              not be loaded.
            </p>
            <Button asChild variant="outline">
              <Link href="/products">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Products
              </Link>
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <>
      <ProductJsonLd product={product} />
      <ProductDetailClient product={product} />
    </>
  );
}
