import Image from "next/image";
import Link from "next/link";
import { ProductLabelBadge } from "@/components/shared/ProductLabelBadge";
import {
  formatPrice,
  getDiscountPercent,
  getPriceBeforeDiscount,
  getProductImageUrl,
  getProductPrice,
  hasDiscount,
  type Product,
} from "@/lib/product";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const price = getProductPrice(product);
  const before = getPriceBeforeDiscount(product);
  const percent = getDiscountPercent(product);
  const discounted = hasDiscount(product);
  const showMrp = discounted && before > price;

  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border/80 bg-white transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-square bg-muted/30">
        <ProductLabelBadge
          label={product.label}
          compact
          className="absolute top-2 left-2 z-10"
        />
        {discounted && (
          <span className="absolute top-2 right-2 z-10 rounded-md bg-primary px-2 py-1 text-xs font-bold text-white shadow-sm">
            {percent}% OFF
          </span>
        )}
        <Image
          src={getProductImageUrl(product)}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        {product.category?.name && (
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {product.category.name}
          </p>
        )}
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug sm:text-base group-hover:text-primary">
          {product.name}
        </h3>
        {!!product.points?.length && (
          <ul className="mt-1 space-y-1 text-xs text-muted-foreground sm:text-sm">
            {product.points.slice(0, 2).map((point) => (
              <li key={point} className="line-clamp-1">
                · {point}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto space-y-1 pt-2">
          <div className="flex flex-wrap items-baseline gap-2">
            <p className="text-lg font-bold text-primary">{formatPrice(price)}</p>
            {discounted && (
              <span className="rounded bg-primary/10 px-1.5 py-0.5 text-xs font-semibold text-primary">
                {percent}% off
              </span>
            )}
          </div>
          {showMrp && (
            <p className="text-sm text-muted-foreground line-through">
              {formatPrice(before)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
