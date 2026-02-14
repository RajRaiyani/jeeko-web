import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_NAME = "Jeeko Agro Industries";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://jeeko.in"),
  title: {
    default: `${SITE_NAME} | Agricultural Equipment & Power Solutions`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Jeeko Agro Industries – Quality generators, tillers, pumps and agricultural equipment. Trusted by Indian farmers. Contact for sales and support.",
  keywords: [
    "Jeeko",
    "agricultural equipment",
    "generators",
    "tillers",
    "pumps",
    "agritech",
    "farm equipment",
    "India",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/fav.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
