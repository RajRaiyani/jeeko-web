import type { Metadata } from "next";
import ProductsClient from "./ProductsClient";

const SITE_NAME = "Jeeko Agro Industries";

export const metadata: Metadata = {
  title: "Our Products | Generators, Power Tillers & Water Pumps",
  description:
    "Browse our complete catalog of high-performance agricultural equipment. High-durability power weeders, 4-stroke tillers, portable petrol water pumpsets, and remote-start generators engineered by Jeeko and Kishan King.",
  keywords: [
    "agricultural products catalog",
    "diesel generators",
    "petrol pumpsets",
    "power tillers Rajkot",
    "weeder machinery",
    "Jeeko generator models",
    "Kishan King tillers",
    "agriculture tools price",
  ],
  openGraph: {
    title: "Jeeko & Kishan King Product Catalog | Agricultural Solutions",
    description:
      "Explore high-quality agricultural machinery, generators, weeders, and water pumpsets trusted by Indian farmers.",
    url: "/products",
    type: "website",
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Products | Jeeko Agro Industries",
    description:
      "Detailed specs and reviews of Jeeko and Kishan King agricultural equipment catalog.",
  },
};

export default function ProductsPage() {
  return <ProductsClient />;
}
