import type { LucideIcon } from "lucide-react";
import { Award, Sparkles, TrendingUp } from "lucide-react";

export const PRODUCT_LABELS = [
  "best seller",
  "recently added",
  "most popular",
] as const;

export type ProductLabel = (typeof PRODUCT_LABELS)[number];

type LabelStyle = {
  text: string;
  short: string;
  Icon: LucideIcon;
  className: string;
};

const LABEL_STYLES: Record<ProductLabel, LabelStyle> = {
  "best seller": {
    text: "Best seller",
    short: "Best seller",
    Icon: Award,
    className:
      "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-amber-500/30",
  },
  "recently added": {
    text: "New arrival",
    short: "New",
    Icon: Sparkles,
    className:
      "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-emerald-500/30",
  },
  "most popular": {
    text: "Most popular",
    short: "Popular",
    Icon: TrendingUp,
    className:
      "bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-rose-500/30",
  },
};

export function getProductLabelStyle(
  label?: ProductLabel | "" | null
): LabelStyle | null {
  if (!label || !(label in LABEL_STYLES)) return null;
  return LABEL_STYLES[label as ProductLabel];
}

export function formatProductLabel(
  label?: ProductLabel | "" | null
): string | null {
  return getProductLabelStyle(label)?.text ?? null;
}
