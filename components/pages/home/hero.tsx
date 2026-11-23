"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const banners = [
  {
    mobile: "/images/banners/banner-1-sm.webp",
    desktop: "/images/banners/4.svg",
  },
  {
    mobile: "/images/banners/banner-2-sm.webp",
    desktop: "/images/banners/5.svg",
  },
  {
    mobile: "/images/banners/banner-3-sm.webp",
    desktop: "/images/banners/6.svg",
  },
];

const certifications = [
  { src: "/images/pages/home/isi-logo.png", alt: "ISI" },
  { src: "/images/pages/home/iso-logo.png", alt: "ISO" },
  { src: "/images/pages/home/fmtti-logo.png", alt: "FMTTI" },
];

export default function Hero() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl bg-white shadow-sm">
        <Carousel opts={{ loop: true }} className="w-full">
          <CarouselContent>
            {banners.map((banner, index) => (
              <CarouselItem key={banner.desktop}>
                <Image
                  src={banner.mobile}
                  alt={`Jeeko banner ${index + 1}`}
                  width={1980}
                  height={709}
                  priority={index === 0}
                  className="block w-full object-contain md:hidden"
                />
                <Image
                  src={banner.desktop}
                  alt={`Jeeko banner ${index + 1}`}
                  width={1980}
                  height={709}
                  priority={index === 0}
                  quality={100}
                  className="hidden w-full object-contain md:block"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-3 border-primary text-primary hover:bg-primary/10" />
          <CarouselNext className="right-3 border-primary text-primary hover:bg-primary/10" />
        </Carousel>
      </div>

      <div className="mx-auto mt-4 grid max-w-7xl grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        <div className="col-span-2 flex items-center justify-around rounded-xl bg-white px-4 py-6">
          {certifications.map((item) => (
            <Image
              key={item.alt}
              src={item.src}
              alt={item.alt}
              width={80}
              height={80}
              className="size-16 object-contain sm:size-20"
            />
          ))}
        </div>
        <div className="flex flex-col items-center justify-center rounded-xl bg-white py-6">
          <p className="text-3xl font-bold text-primary sm:text-4xl">100+</p>
          <p className="mt-2 text-sm font-medium">Happy customers</p>
        </div>
        <div className="flex flex-col items-center justify-center rounded-xl bg-white py-6">
          <p className="text-3xl font-bold text-primary sm:text-4xl">3+</p>
          <p className="mt-2 text-sm font-medium">Years of experience</p>
        </div>
      </div>
    </section>
  );
}
