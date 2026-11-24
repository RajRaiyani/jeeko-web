import {
  getProductLabelStyle,
  type ProductLabel,
} from "@/lib/product-labels";
import { cn } from "@/lib/utils";

export function ProductLabelBadge({
  label,
  compact = false,
  className,
}: {
  label?: ProductLabel | "" | null;
  compact?: boolean;
  className?: string;
}) {
  const style = getProductLabelStyle(label);
  if (!style) return null;

  const { Icon, text, short } = style;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-bold tracking-wide uppercase shadow-md sm:text-xs",
        style.className,
        className
      )}
    >
      <Icon className="size-3.5 shrink-0" strokeWidth={2.5} />
      <span>{compact ? short : text}</span>
    </span>
  );
}
