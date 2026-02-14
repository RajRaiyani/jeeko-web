import type { Metadata } from "next";
import Hero from "@/components/pages/home/hero";
import PopularProduct from "@/components/pages/home/popular-product";
import Brands from "@/components/pages/home/brands";
import WhyUs from "@/components/pages/home/why-us";
import Testimonials from "@/components/pages/home/testimonials";
import ContactUs from "@/components/pages/home/contact-us";
import ProductCategories from "@/components/pages/home/product-categories";

const SITE_NAME = "Jeeko Agro Industries";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Jeeko Agro Industries – Quality generators, tillers, pumps and agricultural equipment for Indian farmers. Explore products, brands and get in touch for sales and support.",
  openGraph: {
    title: `${SITE_NAME} | Agricultural Equipment & Power Solutions`,
    description:
      "Quality generators, tillers, pumps and agricultural equipment. Trusted by Indian farmers.",
    url: "/",
  },
};

export const revalidate = 180;
export default function Home() {
  return (
    <>
      <Hero />
      <ProductCategories />
      <PopularProduct />
      <Brands />
      <WhyUs />
      <Testimonials />
      <ContactUs />
    </>
  );
}
