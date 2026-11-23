"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import type { ProductCategory } from "@/lib/product";

export default function ProductCategoriesSlider({
  categories,
}: {
  categories: ProductCategory[];
}) {
  return (
    <div className="mt-12 [&_.swiper-slide]:!h-auto [&_.swiper-pagination-bullet]:bg-primary">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={categories.length > 4}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 24 },
          768: { slidesPerView: 3, spaceBetween: 28 },
          1024: { slidesPerView: 4, spaceBetween: 32 },
        }}
        className="!pb-12"
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            <Link
              href={`/products?category=${category.id}`}
              className="block h-full"
            >
              <div className="group relative flex h-96 flex-col justify-end transition-transform duration-300 hover:-translate-y-1">
                <div className="relative flex flex-col rounded-xl bg-white p-4 shadow-md">
                  <div className="absolute top-0 left-1/2 z-10 flex -translate-x-1/2 -translate-y-[40%] items-center justify-center">
                    <div className="relative size-56 sm:size-60">
                      <Image
                        fill
                        sizes="240px"
                        src={
                          category.image?.url ||
                          "/images/placeholder-category.png"
                        }
                        alt={category.name}
                        className="object-contain transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  <div className="pt-28 text-center sm:pt-32">
                    <h3 className="text-lg font-semibold transition-colors group-hover:text-primary sm:text-xl">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground sm:text-sm">
                        {category.description}
                      </p>
                    )}
                    <div className="mt-4 flex items-center justify-center gap-1.5">
                      <span className="h-0.5 w-10 rounded-full bg-primary transition-all duration-300 group-hover:w-14" />
                      <span className="h-0.5 w-2 rounded-full bg-muted-foreground/30" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
