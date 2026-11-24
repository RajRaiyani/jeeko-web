"use client";

import { LabeledProducts } from "@/components/pages/home/labeled-products";

export default function PopularProduct() {
  return (
    <LabeledProducts
      title="Most popular"
      description="Products customers ask for the most."
      label="most popular"
    />
  );
}
