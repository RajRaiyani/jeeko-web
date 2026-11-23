"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/pages/contact/ContactForm";
import { SITE } from "@/lib/site";

const details = [
  { icon: Phone, label: "Call us", value: SITE.phone, href: SITE.phoneHref },
  { icon: Mail, label: "Email", value: SITE.email, href: SITE.emailHref },
  { icon: Clock, label: "Hours", value: SITE.hours },
  { icon: MapPin, label: "Location", value: SITE.address },
];

export default function ContactUs() {
  return (
    <section className="w-full bg-primary py-12">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="text-white">
          <h2 className="text-3xl font-bold sm:text-4xl">Get in touch</h2>
          <p className="mt-3 max-w-md text-sm text-white/90 sm:text-base">
            Questions about products, pricing, or support? Send a message and
            our team will help you out.
          </p>

          <div className="mt-6 space-y-3">
            {details.map((item) => {
              const Icon = item.icon;
              const content = (
                <div className="flex items-start gap-3 rounded-xl bg-white p-4 text-foreground shadow-sm">
                  <span className="rounded-lg bg-primary p-2 text-white">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-semibold">{item.label}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {item.value}
                    </p>
                  </div>
                </div>
              );

              return item.href ? (
                <a key={item.label} href={item.href} className="block">
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              );
            })}
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
