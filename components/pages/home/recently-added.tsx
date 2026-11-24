"use client";

import { LabeledProducts } from "@/components/pages/home/labeled-products";

export default function RecentlyAdded() {
  return (
    <LabeledProducts
      title="Recently added"
      description="Fresh arrivals in the Jeeko lineup."
      label="recently added"
    />
  );
}
