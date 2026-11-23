"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Settings, Shield, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/shared/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { asList, type Product } from "@/lib/product";
import { cn } from "@/lib/utils";

const pillars = [
  {
    icon: Shield,
    title: "Rugged & durable",
    description:
      "Heavy-duty chassis and gearboxes built for long hours in tough soil.",
  },
  {
    icon: Settings,
    title: "Efficient engines",
    description:
      "Fuel-efficient power setups that deliver torque when it matters.",
  },
  {
    icon: Zap,
    title: "High yield focus",
    description:
      "Better aeration, irrigation, and weeding for healthier crops.",
  },
];

type Filter = "all" | "weeder" | "pump";

export default function KishanKingClient() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const { data, isLoading, error } = useProducts({
    brand: "kishan king",
    limit: 50,
  });

  const products = useMemo(() => {
    const list = asList<Product>(data);
    const q = search.trim().toLowerCase();

    return list.filter((product) => {
      const category = product.category?.name?.toLowerCase() || "";
      if (filter === "weeder" && !category.includes("weeder")) return false;
      if (filter === "pump" && !category.includes("pump")) return false;
      if (!q) return true;
      return (
        product.name.toLowerCase().includes(q) ||
        product.description?.toLowerCase().includes(q) ||
        product.points?.some((p) => p.toLowerCase().includes(q))
      );
    });
  }, [data, filter, search]);

  return (
    <div className="pb-16">
      <section className="bg-[#1B4332] px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-emerald-200">
              Premium farming brand
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Kishan King
            </h1>
            <p className="mt-4 max-w-xl text-emerald-50/90">
              Weeders, tillers, and pump sets engineered for tough Indian farms
              — built for endurance and everyday productivity.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="bg-[#40916C] hover:bg-[#2D6A4F]">
                <a href="#products">Explore products</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/40 bg-transparent text-white hover:bg-white/10"
              >
                <Link href="/brochures">Brochures</Link>
              </Button>
            </div>
          </div>

          <div className="mx-auto flex size-64 items-center justify-center rounded-2xl border border-white/20 bg-white/10 sm:size-72">
            <div className="relative size-44 sm:size-52">
              <Image
                src="/images/pages/home/kk-logo.png"
                alt="Kishan King"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:grid-cols-3 sm:px-6 lg:px-8">
        {pillars.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="rounded-xl bg-white p-5 shadow-sm">
              <span className="inline-flex rounded-lg bg-emerald-50 p-2 text-emerald-700">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-3 font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          );
        })}
      </section>

      <section
        id="products"
        className="mx-auto max-w-7xl scroll-mt-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold">Kishan King catalog</h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#40916C]" />
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Power tillers, weeders, and high-flow pump sets.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2 overflow-x-auto">
            {(
              [
                ["all", "All"],
                ["weeder", "Tillers & weeders"],
                ["pump", "Pump sets"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
                className={cn(
                  "shrink-0 rounded-md px-3 py-2 text-sm font-medium",
                  filter === value
                    ? "bg-[#40916C] text-white"
                    : "bg-muted text-foreground hover:bg-muted/80"
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="pl-9"
            />
            {search && (
              <button
                type="button"
                aria-label="Clear search"
                className="absolute top-1/2 right-3 -translate-y-1/2"
                onClick={() => setSearch("")}
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>

        {isLoading && (
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] animate-pulse rounded-xl bg-white"
              />
            ))}
          </div>
        )}

        {error && (
          <p className="mt-8 text-center text-sm text-destructive">
            Couldn’t load products.
          </p>
        )}

        {!isLoading && !error && products.length === 0 && (
          <p className="mt-8 text-center text-sm text-muted-foreground">
            No matching products.
          </p>
        )}

        {products.length > 0 && (
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={index < 4}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
