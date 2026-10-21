import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "zjww8izb.ap-southeast.insforge.app", pathname: "/api/storage/buckets/portfolio-images/**" }],
  },
};

export default nextConfig;
