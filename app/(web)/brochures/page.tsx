import type { Metadata } from "next";
import BrochuresClient from "./BrochuresClient";

const SITE_NAME = "Jeeko Agro Industries";

export const metadata: Metadata = {
  title: "Download Brochures | Product Manuals & Technical Catalogs",
  description:
    "Download technical brochures, product manuals, and catalogs for Jeeko Generators, tillers, pumpsets, and Kishan King agricultural tools. Compare specifications and features.",
  keywords: [
    "download brochures",
    "Jeeko manual pdf",
    "Kishan King brochure",
    "farm equipment catalogs",
    "technical specifications",
    "product pamphlets",
    "Jeeko agritech download",
  ],
  openGraph: {
    title: "Download Brochures & Product Catalogs | Jeeko & Kishan King",
    description:
      "Get complete technical catalogs, guides, and manuals for our power tillers, water pumpsets, and generator systems.",
    url: "/brochures",
    type: "website",
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: "Download Brochures | Jeeko Agro Industries",
    description:
      "Access complete technical manuals and product catalog files for Jeeko and Kishan King farm machinery.",
  },
};

export default function BrochuresPage() {
  return <BrochuresClient />;
}
