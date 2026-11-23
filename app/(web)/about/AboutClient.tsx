import Image from "next/image";
import Link from "next/link";
import { FaAward, FaHandsHelping, FaLeaf, FaSeedling } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/SectionHeader";
import Journey from "@/components/pages/about/journey";
import bannerMobile from "@/public/images/banners/about_mb.png";

const values = [
  {
    icon: FaSeedling,
    title: "Innovation",
    desc: "Practical solutions built for Indian agriculture.",
  },
  {
    icon: FaHandsHelping,
    title: "Support",
    desc: "Help from purchase through after-sales service.",
  },
  {
    icon: FaAward,
    title: "Quality",
    desc: "Products tested for reliability and durability.",
  },
  {
    icon: FaLeaf,
    title: "Sustainability",
    desc: "Designed with efficiency and the future in mind.",
  },
];

const brands = [
  {
    name: "Jeeko",
    logo: "/logos/primary.svg",
    desc: "Generators, tillers, and pumps trusted for performance.",
  },
  {
    name: "Kishan King",
    logo: "/images/pages/home/kk-logo.png",
    desc: "Agricultural equipment made for Indian farmers.",
  },
];

export default function AboutClient() {
  return (
    <section className="pb-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl bg-white shadow-sm">
          <Image
            src={bannerMobile}
            alt="About Jeeko"
            width={1980}
            height={709}
            priority
            className="block w-full object-contain md:hidden"
          />
          <Image
            src="/images/banners/1.svg"
            alt="About Jeeko"
            width={1980}
            height={709}
            priority
            quality={100}
            className="hidden w-full object-contain md:block"
          />
        </div>
      </div>

      <Journey />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeader title="Our values" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className="rounded-xl bg-white p-5 text-center shadow-sm"
              >
                <Icon className="mx-auto h-7 w-7 text-primary" />
                <h3 className="mt-3 font-semibold text-primary">{value.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{value.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <SectionHeader title="Our brands" />
        <div className="mx-auto mt-8 grid max-w-3xl gap-4 md:grid-cols-2">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="rounded-xl bg-white p-6 text-center shadow-sm"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={72}
                height={72}
                className="mx-auto object-contain"
              />
              <h3 className="mt-3 font-bold text-primary">{brand.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{brand.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <div className="rounded-xl bg-primary/10 p-8">
          <h3 className="text-xl font-semibold">Ready to equip your farm?</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Talk to us about products, pricing, or the right fit for your needs.
          </p>
          <Button asChild className="mt-5">
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
