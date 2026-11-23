import Image from "next/image";
import { Fuel, Headset, ScrollText, ShieldCheck } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";

const points = [
  {
    icon: (
      <Image
        src="/icons/india-icon.svg"
        alt=""
        width={32}
        height={32}
        className="size-8"
      />
    ),
    title: "Made in India",
    description:
      "Manufactured for Indian conditions, supporting local industry.",
  },
  {
    icon: <ShieldCheck className="size-7" />,
    title: "Durable & reliable",
    description: "Built with quality materials and rigorous testing.",
  },
  {
    icon: <Fuel className="size-7" />,
    title: "Fuel efficient",
    description: "Designed to lower operating costs day after day.",
  },
  {
    icon: <ScrollText className="size-7" />,
    title: "Easy to operate",
    description: "Simple controls and clear instructions for every user.",
  },
  {
    icon: <Headset className="size-7" />,
    title: "Customer support",
    description: "Help when you need it — before and after purchase.",
  },
];

export default function WhyUs() {
  return (
    <section className="w-full px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader title="Why choose Jeeko?" />

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            {points.map((point) => (
              <div
                key={point.title}
                className="flex gap-3 rounded-xl bg-white p-4 shadow-sm"
              >
                <div className="shrink-0 text-primary">{point.icon}</div>
                <div>
                  <h3 className="font-semibold">{point.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative min-h-72 overflow-hidden rounded-xl shadow-sm lg:min-h-full">
            <Image
              src="/images/pages/home/banner.png"
              alt="Jeeko quality products"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
