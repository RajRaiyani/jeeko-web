import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/pages/contact/ContactForm";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Jeeko Agro Industries for product inquiries, support, or dealership questions.",
  openGraph: {
    title: `Contact | ${SITE.name}`,
    description:
      "Reach our team in Rajkot for sales, support, and dealership inquiries.",
    url: "/contact",
  },
};

const details = [
  { icon: Phone, label: "Call", value: SITE.phone, href: SITE.phoneHref },
  { icon: Mail, label: "Email", value: SITE.email, href: SITE.emailHref },
  { icon: Clock, label: "Hours", value: `${SITE.hours} · Mon–Sat` },
  { icon: MapPin, label: "Visit", value: SITE.address },
];

export default function ContactPage() {
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        <SectionHeader
          as="h1"
          title="Contact us"
          description="Product questions, support, or dealership — we’re happy to help."
        />

        <div className="overflow-hidden rounded-xl shadow-sm">
          <iframe
            title="Jeeko Agro Industries location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3904.0382621220806!2d70.63602267529136!3d22.259444179715963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959cd0078ebc8eb%3A0xc22087af2a2420dd!2sJEEKO%20AGRITECH%20LLP!5e1!3m2!1sen!2sin!4v1757067033891!5m2!1sen!2sin"
            width="100%"
            height="360"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-3">
            {details.map((item) => {
              const Icon = item.icon;
              const body = (
                <div className="flex items-start gap-3 rounded-xl bg-white p-5 shadow-sm">
                  <span className="rounded-lg bg-primary p-2.5 text-white">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-semibold">{item.label}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.value}
                    </p>
                  </div>
                </div>
              );

              return item.href ? (
                <a key={item.label} href={item.href} className="block">
                  {body}
                </a>
              ) : (
                <div key={item.label}>{body}</div>
              );
            })}

            <Button asChild className="w-full bg-[#25D366] hover:bg-[#1ebe5d]">
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="h-4 w-4" />
                Enquire on WhatsApp
              </a>
            </Button>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
