import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io", // for Sanity images
      },
      {
        protocol: "https",
        hostname: "assets.example.com", // example you gave
        pathname: "/account123/**",
      },
    ],
  },
};

export default nextConfig;
