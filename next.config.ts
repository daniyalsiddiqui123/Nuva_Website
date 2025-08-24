import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io", // Sanity image CDN
      },
      {
        protocol: "https",
        hostname: "assets.example.com", // example pattern
        pathname: "/account123/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // prevents ESLint from breaking production builds
  },
};

export default nextConfig;
