import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // ✅ ეს დაამატეთ!
      },
    ],
  },
  output: "standalone",
};

export default nextConfig;
