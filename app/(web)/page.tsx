import Hero from "@/components/pages/home/hero";
import PopularProduct from "@/components/pages/home/popular-product";
import Brands from "@/components/pages/home/brands";
import WhyUs from "@/components/pages/home/why-us";
import Testimonials from "@/components/pages/home/testimonials";
import ContactUs from "@/components/pages/home/contact-us";
import ProductCategories from "@/components/pages/home/product-categories";

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
