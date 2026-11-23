import Image from "next/image";
import { Star } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";

const testimonials = [
  {
    name: "Visal Kumar",
    role: "Farm owner",
    image: "/images/pages/home/testimonials/person-1.jpg",
    rating: 5,
    comment:
      "The Jeeko generator has been reliable even in peak summer. Great fuel efficiency and low maintenance.",
  },
  {
    name: "Amit Patel",
    role: "Business owner",
    image: "/images/pages/home/testimonials/person-2.jpeg",
    rating: 5,
    comment:
      "I needed dependable backup power for my business. Jeeko hasn’t let me down — and support is excellent.",
  },
  {
    name: "Vallabhbhai",
    role: "Farmer",
    image: "/images/pages/home/testimonials/person-3.jpeg",
    rating: 4,
    comment:
      "Quiet, efficient, and starts instantly during power cuts. I’d recommend it to other farmers.",
  },
];

export default function Testimonials() {
  return (
    <section className="w-full px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader title="What customers say" />

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="rounded-xl bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={48}
                  height={48}
                  className="size-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.role}</p>
                </div>
              </div>

              <div className="mt-3 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-4 ${
                      i < item.rating
                        ? "fill-primary text-primary"
                        : "text-muted"
                    }`}
                  />
                ))}
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.comment}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
