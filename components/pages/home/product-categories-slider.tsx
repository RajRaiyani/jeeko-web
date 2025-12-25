"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const paginationStyles = `
  .swiper-pagination-bullet {
    background: #dc2626 !important;
    opacity: 0.4;
    width: 8px;
    height: 8px;
    transition: all 0.3s ease;
  }

  .swiper-slide {
    height: auto !important;
  }
  .product-categories-slider .swiper-slide > a {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

interface Category {
  id: string;
  name: string;
  description?: string;
  image?: {
    id: string;
    key: string;
    url: string;
  };
}

interface ProductCategoriesSliderProps {
  categories: Category[];
}

export default function ProductCategoriesSlider({
  categories,
}: ProductCategoriesSliderProps) {
  return (
    <>
      <style jsx global>
        {paginationStyles}
      </style>
      <div className="mt-12">
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 28,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 32,
            },
          }}
          className="!pb-12"
        >
          {categories.map((category, index) => (
            <SwiperSlide key={category.id || index}>
              <Link
                href={`/products?category=${category.id}`}
                className="block"
              >
                <div className="group relative flex flex-col justify-end h-96 transition-all duration-300 hover:-translate-y-1">
                  {/* Image Section */}
                  <div className="bg-white shadow-md flex flex-col relative p-4 rounded-xl">
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-4/6 z-50 flex-1 flex items-center justify-center">
                      <div className="size-60 aspect-square">
                        <div className="w-full h-full transition-transform duration-300">
                          <Image
                            fill
                            sizes="(max-width: 640px) 160px, (max-width: 768px) 180px, 200px"
                            src={
                              category.image?.url ||
                              "/images/placeholder-category.png"
                            }
                            alt={category.name}
                            className="object-cover size-64 transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="text-center h-fit pt-20">
                      <h3 className="text-lg sm:text-xl font-semibold text-slate-900 transition-colors duration-300 group-hover:text-red-600">
                        {category.name}
                      </h3>
                      {category.description && (
                        <p className="mt-1.5 text-xs sm:text-sm text-slate-500 line-clamp-2">
                          {category.description}
                        </p>
                      )}
                      <div className="mt-4 flex items-center justify-center gap-1.5">
                        <span className="h-0.5 w-10 rounded-full bg-red-500 transition-all duration-300 group-hover:w-14 group-hover:bg-red-600" />
                        <span className="h-0.5 w-2 rounded-full bg-slate-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
