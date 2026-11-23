import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-10 border-t bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <Image
            src="/logos/primary.svg"
            alt={SITE.name}
            width={140}
            height={48}
          />
          <p className="text-sm leading-relaxed text-muted-foreground">
            Quality agricultural equipment and power solutions trusted by Indian
            farmers.
          </p>
          <Button asChild className="w-full bg-[#25D366] hover:bg-[#1ebe5d]">
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="h-4 w-4" />
              Enquire on WhatsApp
            </a>
          </Button>
        </div>

        <div>
          <h3 className="mb-3 font-semibold text-primary">Contact</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-primary" />
              <a href={SITE.phoneHref} className="hover:text-foreground">
                {SITE.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-primary" />
              <a href={SITE.emailHref} className="hover:text-foreground">
                {SITE.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0 text-primary" />
              {SITE.hours}
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{SITE.address}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-semibold text-primary">Quick links</h3>
          <ul className="space-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-muted-foreground hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="text-muted-foreground hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-semibold text-primary">Follow us</h3>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" size="sm">
              <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a href={SITE.social.youtube} target="_blank" rel="noopener noreferrer">
                YouTube
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t bg-primary/5 py-4 text-xs text-muted-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 sm:flex-row sm:px-6 lg:px-8">
          <span>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </span>
          <a
            href="https://rajraiyani.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            rajraiyani.com
          </a>
        </div>
      </div>
    </footer>
  );
}
