import type { Metadata } from "next";
import KishanKingClient from "./KishanKingClient";

const SITE_NAME = "Jeeko Agro Industries";

export const metadata: Metadata = {
  title: "Kishan King | Premium Power Tillers & Water Pumpsets",
  description:
    "Explore Kishan King by Jeeko Agro Industries. High-performance agricultural weeders, power tillers, and self-priming water pumpsets engineered for Indian farmers to conquer tough soil conditions and maximize crop yields.",
  keywords: [
    "Kishan King",
    "KishanKing",
    "Kishan King power tiller",
    "Kishan King weeder",
    "Kishan King pumpset",
    "agricultural equipment India",
    "Jeeko",
    "Jeeko Agro Industries",
    "Jeeko agritech",
    "power tillers Rajkot",
    "farming tools Gujarat",
    "4 stroke pumpset",
  ],
  openGraph: {
    title: "Kishan King | Premium Agricultural Equipment & Power Solutions",
    description:
      "High-performance agricultural weeders, power tillers, and self-priming pumpsets designed for Indian farmers. Trusted quality by Jeeko.",
    url: "/kishan-king",
    type: "website",
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: "Kishan King | Premium Power Tillers & Water Pumpsets",
    description:
      "Explore Kishan King by Jeeko. High-performance weeders and tillers built for Indian farm conditions.",
  },
};

export default function KishanKingPage() {
  return <KishanKingClient />;
}
