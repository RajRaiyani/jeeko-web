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
        port: "443",
        pathname: "/**",
      },
    ],
    // Allow unoptimized images in development to bypass private IP restrictions
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
