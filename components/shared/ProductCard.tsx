import Image from "next/image";
import Link from "next/link";
import {
  formatPrice,
  getProductImageUrl,
  getProductPrice,
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

  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border/80 bg-white transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-square bg-muted/30">
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
        <p className="mt-auto pt-2 text-lg font-bold text-primary">
          {formatPrice(price)}
        </p>
      </div>
    </Link>
  );
}
