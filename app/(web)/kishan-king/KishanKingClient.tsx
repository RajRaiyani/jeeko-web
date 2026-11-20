"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, Shield, Settings, Zap, ArrowRight, Download, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import { useProductCategories } from "@/hooks/useProductCategories";
import type { ProductBrand } from "@/lib/product-brands";

interface ProductImage {
  image_id?: string;
  is_primary?: boolean;
  image?: {
    id: string;
    key: string;
    url: string;
  };
  url?: string;
  alt?: string;
}

interface ProductCategory {
  id: string;
  name: string;
  description?: string;
}

interface Product {
  id: string;
  category_id?: string;
  brand?: ProductBrand;
  name: string;
  description?: string;
  tags?: string[];
  metadata?: Record<string, unknown>;
  sale_price?: number;
  sale_price_in_rupees?: number;
  created_at?: string;
  updated_at?: string;
  points?: string[];
  category?: ProductCategory;
  images?: ProductImage[];
}

export default function KishanKingClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<"all" | "weeder" | "pump">("all");

  // Fetch products and categories from server
  const { data: productsResponse, isLoading: productsLoading, error: productsError } = useProducts({
    brand: "kishan king",
    limit: 50,
  });
  const { data: categoriesResponse } = useProductCategories();

  // Extract products
  const products: Product[] = useMemo(() => {
    if (!productsResponse) return [];
    if (Array.isArray(productsResponse)) return productsResponse;
    if (typeof productsResponse === "object" && "data" in productsResponse && Array.isArray(productsResponse.data)) {
      return productsResponse.data;
    }
    return [];
  }, [productsResponse]);

  const kishanKingProducts = products;

  // Apply search and sub-category filtering
  const filteredProducts = useMemo(() => {
    return kishanKingProducts.filter((product) => {
      // Category filter match
      const categoryName = product.category?.name?.toLowerCase() || "";
      if (activeCategoryFilter === "weeder" && !categoryName.includes("weeder")) {
        return false;
      }
      if (activeCategoryFilter === "pump" && !categoryName.includes("pump")) {
        return false;
      }

      // Search term match
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        return (
          product.name?.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query) ||
          (product.points && product.points.some(p => p.toLowerCase().includes(query)))
        );
      }

      return true;
    });
  }, [kishanKingProducts, activeCategoryFilter, searchTerm]);

  const getProductImageUrl = (product: Product): string => {
    if (product.images && product.images.length > 0) {
      const firstImage = product.images[0];
      if (firstImage.image?.url) return firstImage.image.url;
      if (firstImage.url) return firstImage.url;
    }
    return "/images/placeholder-product.png";
  };

  return (
    <div className="w-full min-h-screen bg-slate-50/50 pb-16">
      {/* Premium Agriculture Hero Banner */}
      <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#102a13] via-[#1B4332] to-[#2D6A4F] text-white overflow-hidden">
        {/* Background shapes & leaves overlays for visual wow */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-yellow-400 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start gap-5">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-300 border border-emerald-500/30">
                Premium Farming Brand
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none bg-gradient-to-r from-white via-slate-100 to-emerald-200 bg-clip-text text-transparent">
                Kishan King
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-emerald-100/90 max-w-2xl leading-relaxed">
                Engineered for maximum endurance and productivity. Kishan King provides high-performance agricultural weeders, power tillers, and self-priming pump sets tailored specifically to conquer tough Indian soils.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-2">
                <Button asChild size="lg" className="bg-[#40916C] hover:bg-[#2D6A4F] text-white font-semibold shadow-lg hover:shadow-emerald-900/20 transition-all duration-300">
                  <a href="#products">Explore Products</a>
                </Button>
                <Button asChild size="lg" className="bg-transparent hover:bg-white/10 text-white border border-white/40 hover:border-white/70 backdrop-blur-sm transition-all duration-300">
                  <a href="#brochure">Download Catalog</a>
                </Button>
              </div>
            </div>

            {/* Hero Right Brand Emblem Card */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative group w-72 h-72 sm:w-80 sm:h-80 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl flex flex-col justify-center items-center transition-all duration-500 hover:scale-105 hover:border-emerald-400/40">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent rounded-2xl pointer-events-none"></div>
                <div className="relative w-48 h-48 sm:w-56 sm:h-56">
                  <Image
                    src="/images/pages/home/kk-logo.png"
                    alt="Kishan King Logo"
                    fill
                    className="object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)] group-hover:scale-110 transition-transform duration-500"
                    priority
                  />
                </div>
                <div className="mt-4 text-center">
                  <span className="text-xs uppercase tracking-widest text-emerald-300 font-bold">Uncompromising Quality</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Value Pillars Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1 */}
          <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow duration-300 rounded-xl overflow-hidden group">
            <CardContent className="p-6 sm:p-8 flex flex-col gap-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl w-fit group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                <Shield className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-800">Rugged & Durable</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Forged from heavy-duty industrial chassis and robust gearboxes, Kishan King machinery is structurally reinforced to handle long hours of farm work in clay, sand, or dry soil.
              </p>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow duration-300 rounded-xl overflow-hidden group">
            <CardContent className="p-6 sm:p-8 flex flex-col gap-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl w-fit group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                <Settings className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-800">Advanced 4-Stroke Engineering</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Utilizing high-power, fuel-efficient engines like original KAMA diesel and Ducar BS-V petrol setups to ensure peak soil penetration torque with minimum fuel consumption.
              </p>
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow duration-300 rounded-xl overflow-hidden group">
            <CardContent className="p-6 sm:p-8 flex flex-col gap-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl w-fit group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                <Zap className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-800">High Yield Efficiency</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Designed to deliver superb soil aeration, high-volume irrigation transfer, and pristine weeding depth which promotes optimal root respiration and healthier crops.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Dynamic Products Catalog Grid */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 scroll-mt-24">
        {/* Title Block */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Kishan King Catalog
          </h2>
          <div className="w-24 h-1 bg-[#40916C] mx-auto mt-3 rounded-full"></div>
          <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto mt-4">
            View our specialized collection of robust agricultural power tillers, weeding machinery, and portable high-flow pumpsets.
          </p>
        </div>

        {/* Filter Toolbar (Tabs & Search) */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
          {/* Category Tabs */}
          <div className="flex gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setActiveCategoryFilter("all")}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                activeCategoryFilter === "all"
                  ? "bg-[#40916C] text-white shadow-sm"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-600"
              }`}
            >
              All Products
            </button>
            <button
              onClick={() => setActiveCategoryFilter("weeder")}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                activeCategoryFilter === "weeder"
                  ? "bg-[#40916C] text-white shadow-sm"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-600"
              }`}
            >
              Power Tillers & Weeders
            </button>
            <button
              onClick={() => setActiveCategoryFilter("pump")}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                activeCategoryFilter === "pump"
                  ? "bg-[#40916C] text-white shadow-sm"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-600"
              }`}
            >
              Water Pump Sets
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search Kishan King..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-8 border-slate-200 focus:border-emerald-500 rounded-lg text-xs sm:text-sm h-10 w-full"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Products Output */}
        {productsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="overflow-hidden border border-slate-100 bg-white rounded-xl shadow-sm animate-pulse">
                <div className="w-full aspect-square bg-slate-200"></div>
                <div className="p-4 flex flex-col gap-3">
                  <div className="h-4 bg-slate-200 rounded w-20"></div>
                  <div className="h-5 bg-slate-200 rounded"></div>
                  <div className="h-3 bg-slate-200 rounded w-5/6"></div>
                  <div className="h-6 bg-slate-200 rounded w-24 mt-2"></div>
                </div>
              </Card>
            ))}
          </div>
        ) : productsError ? (
          <Card className="p-8 text-center bg-white border border-slate-200">
            <p className="text-red-600 mb-2 font-semibold">Error loading Kishan King products</p>
            <p className="text-xs text-slate-500">Please verify connection or try again later</p>
          </Card>
        ) : filteredProducts.length === 0 ? (
          <Card className="p-12 text-center bg-white border border-slate-100 rounded-xl">
            <p className="text-lg font-bold text-slate-800 mb-1">No matches found</p>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              We couldn't find any Kishan King products matching your active filters. Try adjusting your query or tabs!
            </p>
            {(activeCategoryFilter !== "all" || searchTerm) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategoryFilter("all");
                }}
                className="mt-4 border-slate-200"
              >
                Reset Filters
              </Button>
            )}
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, idx) => {
              const price = product.sale_price_in_rupees || product.sale_price || 0;
              const categoryName = product.category?.name || "Kishan King";
              
              return (
                <Link href={`/products/${product.id}`} key={product.id}>
                  <Card className="group bg-white border border-slate-200 hover:border-emerald-500/30 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col cursor-pointer">
                    {/* Image Box */}
                    <div className="relative aspect-square w-full bg-white overflow-hidden p-4">
                      <Image
                        src={getProductImageUrl(product)}
                        alt={product.name}
                        fill
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    {/* Details Box */}
                    <CardContent className="p-4 pt-0 flex flex-col gap-2 flex-1">
                      {/* Badge */}
                      <span className="inline-flex items-center gap-1.5 w-fit rounded-full bg-emerald-50 text-[10px] sm:text-xs font-semibold uppercase px-2.5 py-1 text-emerald-700 tracking-wide">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                        {categoryName.replace("Kishanking", "Kishan King")}
                      </span>

                      {/* Name */}
                      <h3 className="font-bold text-slate-800 text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-emerald-700 transition-colors duration-200">
                        {product.name}
                      </h3>

                      {/* Specs */}
                      {product.points && product.points.length > 0 ? (
                        <ul className="text-xs text-slate-500 space-y-0.5 mt-1">
                          {product.points.slice(0, 3).map((pt, index) => (
                            <li key={index} className="flex items-start gap-1">
                              <span className="text-emerald-600 mt-1 size-1 rounded-full bg-emerald-600 shrink-0"></span>
                              <span className="line-clamp-1">{pt}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        product.description && (
                          <p className="text-xs text-slate-500 line-clamp-3 mt-1 leading-normal">
                            {product.description}
                          </p>
                        )
                      )}

                      {/* Price Block */}
                      <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
                        <div>
                          <p className="text-[10px] text-slate-400 uppercase tracking-wider">Starting Price</p>
                          <p className="text-lg font-extrabold text-[#1B4332]">
                            ₹{price.toLocaleString("en-IN")}
                          </p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                          <Eye className="w-4 h-4" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Brochure / Catalog Showcase Section */}
      <section id="brochure" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 scroll-mt-24">
        <div className="bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] rounded-2xl shadow-xl overflow-hidden text-white relative">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-yellow-300 via-transparent to-transparent pointer-events-none"></div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-8 sm:p-12 lg:p-16">
            {/* Brochure Visual */}
            <div className="md:col-span-4 flex justify-center">
              <div className="relative group w-48 h-64 sm:w-56 sm:h-72 shadow-2xl rounded-lg overflow-hidden border border-white/20 transition-transform duration-500 group-hover:rotate-1 hover:scale-105">
                <Image
                  src="/images/pages/home/kk-brochure.png"
                  alt="Kishan King Brochure Cover"
                  fill
                  className="object-contain md:object-cover bg-[#fdfdfd]"
                />
              </div>
            </div>

            {/* Brochure Details */}
            <div className="md:col-span-8 flex flex-col gap-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Kishan King Technical Catalog
              </h2>
              <div className="w-16 h-0.5 bg-emerald-400 rounded-full"></div>
              <p className="text-slate-100 text-sm sm:text-base leading-relaxed max-w-2xl">
                Get full detailed specifications, blade settings, gearbox configuration guides, attachment maps, and troubleshooting tips for Kishan King machines. Download the free PDF catalog and find the right machinery match for your farm.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-2">
                <Button asChild size="lg" className="bg-white text-[#1B4332] hover:bg-slate-100 font-bold transition-colors">
                  <a href="/images/pages/home/kk-brochure.png" download="Kishan_King_Brochure.png">
                    <Download className="w-5 h-5 mr-2" />
                    Download Brochure
                  </a>
                </Button>
                <Button asChild variant="ghost" className="text-white hover:bg-white/10 hover:text-white border border-white/20">
                  <Link href="/brochures">
                    View All Brochures
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agro-Dealership Call to Action */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mt-20 text-center">
        <div className="bg-[#40916C]/10 p-8 sm:p-12 rounded-2xl border border-[#40916C]/20 flex flex-col items-center gap-4 shadow-sm">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
            Become a Registered Kishan King Dealer
          </h3>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl leading-relaxed">
            Join our nationwide distributor network and equip local farmers in your region with India's most rugged agricultural tools. We support our dealer network with spare parts, technical service training, and marketing materials.
          </p>
          <Button asChild className="mt-2 bg-[#1B4332] hover:bg-[#2D6A4F] text-white px-8 py-3 rounded-lg font-semibold shadow transition-transform hover:scale-105 duration-200">
            <Link href="/contact">Inquire for Dealership</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
