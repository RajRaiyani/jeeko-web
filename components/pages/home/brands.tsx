import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/SectionHeader";

const brands = [
  {
    name: "Jeeko",
    logo: "/logos/primary.svg",
    brochure: "/images/pages/home/jeeko-brochure.png",
    href: "/products?brand=jeeko",
    description:
      "Generators and power equipment built for homes, farms, and businesses.",
  },
  {
    name: "Kishan King",
    logo: "/images/pages/home/kk-logo.png",
    brochure: "/images/pages/home/kk-brochure.png",
    href: "/kishan-king",
    description:
      "Agricultural tools designed to help Indian farmers work more efficiently.",
  },
];

export default function Brands() {
  return (
    <section className="w-full px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader title="Our brands" />

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="rounded-xl bg-white p-5 shadow-sm sm:p-6"
            >
              <div className="flex items-start gap-4">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={72}
                  height={72}
                  className="size-16 object-contain"
                />
                <div>
                  <h3 className="text-lg font-bold text-primary">{brand.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {brand.description}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-4 border-t pt-5 sm:flex-row">
                <Image
                  src={brand.brochure}
                  alt={`${brand.name} brochure`}
                  width={160}
                  height={220}
                  className="h-auto w-full rounded border object-contain sm:w-40"
                />
                <div className="flex flex-1 flex-col justify-between gap-3">
                  <div>
                    <p className="font-semibold">Brochures & support</p>
                    <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground">
                      <li>Products</li>
                      <li>Pricing</li>
                      <li>Service & support</li>
                    </ul>
                  </div>
                  <Button asChild className="w-full sm:w-fit">
                    <Link href={brand.href}>Explore {brand.name}</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
