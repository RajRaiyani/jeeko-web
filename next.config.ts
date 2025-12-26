import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3007",
        pathname: "/files/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "3007",
        pathname: "/files/**",
      },
      {
        protocol: "https",
        hostname: "server.jeeko.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "server.jeeko.com",
        pathname: "/**",
      },
    ],
    // Disable image optimization to ensure images load in production
    // If you have a Next.js image optimization service, you can set this to false
    unoptimized: true,
    // Allow SVG images
    // dangerouslyAllowSVG: true,
    // contentDispositionType: "attachment",
    // contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
