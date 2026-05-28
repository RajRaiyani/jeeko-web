import type { Metadata } from "next";
import AboutClient from "./AboutClient";

const SITE_NAME = "Jeeko Agro Industries";

export const metadata: Metadata = {
  title: "About Us | Agricultural Machinery Manufacturers",
  description:
    "Discover the history, values, and vision of Jeeko Agro Industries. Founded in 2010, we are dedicated to manufacturing premium quality agricultural tillers, power weeders, pumpsets, and generators for Indian farmers.",
  keywords: [
    "About Jeeko",
    "agricultural manufacturers India",
    "Jeeko history",
    "Jeeko vision",
    "farming tools manufacturers Rajkot",
    "agricultural equipment engineering",
    "Jeeko Agro Industries",
    "about Kishan King",
  ],
  openGraph: {
    title: "About Jeeko Agro Industries | Empowering Indian Agriculture",
    description:
      "Learn about our journey, core values, and premium brand offerings (Jeeko & Kishan King) that power Indian farms.",
    url: "/about",
    type: "website",
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Jeeko Agro Industries",
    description:
      "Find out how Jeeko Agro Industries has been manufacturing reliable, innovative farm equipment since 2010.",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
