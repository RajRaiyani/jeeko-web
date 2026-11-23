"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Phone,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCreateInquiry } from "@/hooks/useInquiry";
import { formatProductBrand } from "@/lib/product-brands";
import {
  formatPrice,
  getProductImageUrl,
  getProductPrice,
  type Product,
} from "@/lib/product";
import { SITE } from "@/lib/site";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone_number: z
    .string()
    .trim()
    .regex(/^[0-9]{10}$/, "Enter a valid 10-digit phone number"),
  email: z.string().trim().email("Enter a valid email"),
});

type FormValues = z.infer<typeof schema>;

export function ProductDetailClient({ product }: { product: Product }) {
  const router = useRouter();
  const [imageIndex, setImageIndex] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const createInquiry = useCreateInquiry();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone_number: "", email: "" },
  });

  const images = useMemo(() => {
    if (!product.images?.length) {
      return [{ url: getProductImageUrl(product), alt: product.name }];
    }
    return product.images.map((img) => ({
      url: img.image?.url || img.url || "/images/placeholder-product.png",
      alt: img.alt || product.name,
    }));
  }, [product]);

  const current = images[imageIndex] || images[0];
  const price = getProductPrice(product);
  const busy = form.formState.isSubmitting || createInquiry.isPending;

  async function onSubmit(values: FormValues) {
    setSuccess(false);
    try {
      await createInquiry.mutateAsync({
        ...values,
        message: `Inquiry for product: ${product.name}`,
      });
      setSuccess(true);
      form.reset();
      setTimeout(() => {
        setDialogOpen(false);
        setSuccess(false);
      }, 1800);
    } catch (error) {
      form.setError("root", {
        message:
          error instanceof Error ? error.message : "Failed to submit inquiry",
      });
    }
  }

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Button
          variant="ghost"
          className="mb-4 -ml-2 text-muted-foreground"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-3">
            <div className="relative aspect-square overflow-hidden rounded-xl border bg-white">
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Previous image"
                    className="absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow"
                    onClick={() =>
                      setImageIndex((i) =>
                        i > 0 ? i - 1 : images.length - 1
                      )
                    }
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next image"
                    className="absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow"
                    onClick={() =>
                      setImageIndex((i) =>
                        i < images.length - 1 ? i + 1 : 0
                      )
                    }
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
              <Image
                src={current.url}
                alt={current.alt}
                fill
                priority
                className="object-contain p-6"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, index) => (
                  <button
                    key={`${img.url}-${index}`}
                    type="button"
                    onClick={() => setImageIndex(index)}
                    className={`relative aspect-square overflow-hidden rounded-lg border-2 bg-white ${
                      imageIndex === index
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      src={img.url}
                      alt=""
                      fill
                      className="object-contain p-2"
                      sizes="20vw"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-5">
            <div className="flex flex-wrap gap-2 text-sm">
              {product.brand && (
                <span className="rounded-md bg-muted px-2.5 py-1">
                  {formatProductBrand(product.brand)}
                </span>
              )}
              {product.category && (
                <Link
                  href={`/products?category=${product.category_id}`}
                  className="rounded-md bg-primary/10 px-2.5 py-1 text-primary hover:bg-primary/15"
                >
                  {product.category.name}
                </Link>
              )}
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {product.name}
            </h1>
            <p className="text-3xl font-bold text-primary">
              {formatPrice(price)}
            </p>

            {!!product.points?.length && (
              <ul className="space-y-2 text-sm">
                {product.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}

            {product.description && (
              <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            )}

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Button
                size="lg"
                className="flex-1"
                onClick={() => setDialogOpen(true)}
              >
                Request inquiry
              </Button>
              <Button
                asChild
                size="lg"
                className="flex-1 bg-[#25D366] hover:bg-[#1ebe5d]"
              >
                <a
                  href={`https://wa.me/919925232951?text=${encodeURIComponent(
                    `Hello, I would like to inquire about: ${product.name}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className="h-4 w-4" />
                  WhatsApp
                </a>
              </Button>
            </div>

            <a
              href={SITE.phoneHref}
              className="flex items-center gap-3 rounded-xl border bg-white p-4 hover:border-primary/40"
            >
              <span className="rounded-full bg-primary/10 p-2 text-primary">
                <Phone className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">Call us</p>
                <p className="font-semibold">{SITE.phone}</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Request inquiry</DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {success && (
              <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                Inquiry sent. We’ll get back to you soon.
              </p>
            )}
            {form.formState.errors.root && (
              <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {form.formState.errors.root.message}
              </p>
            )}

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Full name</label>
              <Input {...form.register("name")} disabled={busy} />
              {form.formState.errors.name && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Email</label>
              <Input type="email" {...form.register("email")} disabled={busy} />
              {form.formState.errors.email && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Phone</label>
              <Input {...form.register("phone_number")} disabled={busy} />
              {form.formState.errors.phone_number && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.phone_number.message}
                </p>
              )}
            </div>

            <p className="rounded-md bg-muted px-3 py-2 text-sm">
              Product: <span className="font-medium">{product.name}</span>
            </p>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                disabled={busy}
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={busy}>
                {busy ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
