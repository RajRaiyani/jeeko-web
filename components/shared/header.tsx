"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AlignJustify, Instagram, X, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProductCategories } from "@/hooks/useProductCategories";
import { asList, type ProductCategory } from "@/lib/product";
import { NAV_LINKS, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { data } = useProductCategories();
  const categories = asList<ProductCategory>(data);

  return (
    <header className="sticky top-0 z-50 px-4 py-3 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 rounded-xl bg-white px-4 shadow-sm sm:px-6">
        <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
          <Image
            src="/logos/primary.svg"
            alt={SITE.name}
            width={100}
            height={40}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground",
                link.href === "/kishan-king" &&
                  "bg-[#1B4332] text-white hover:bg-[#2D6A4F] hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <a
            href={SITE.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="rounded-full border p-2 text-primary transition-colors hover:bg-primary/5"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a
            href={SITE.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="rounded-full border p-2 text-primary transition-colors hover:bg-primary/5"
          >
            <Youtube className="h-4 w-4" />
          </a>
          <Button asChild>
            <Link href="/contact">Contact</Link>
          </Button>
        </div>

        <Button
          variant="default"
          size="icon"
          className="lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <AlignJustify className="h-5 w-5" />}
        </Button>
      </div>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-40 bg-black/30 lg:hidden"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-4 left-4 z-50 mt-2 max-h-[80vh] overflow-y-auto rounded-xl border bg-white p-3 shadow-lg sm:right-6 lg:hidden">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted",
                    link.href === "/kishan-king" &&
                      "bg-[#1B4332] text-white hover:bg-[#2D6A4F]"
                  )}
                >
                  {link.label}
                </Link>
              ))}

              {categories.length > 0 && (
                <div className="mt-2 border-t pt-2">
                  <p className="px-3 pb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Categories
                  </p>
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/products?category=${category.id}`}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}

              <Button asChild className="mt-3 w-full">
                <Link href="/contact" onClick={() => setOpen(false)}>
                  Contact Us
                </Link>
              </Button>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
