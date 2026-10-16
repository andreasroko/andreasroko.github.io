import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
  },
  output: 'export',
  basePath: '',
  assetPrefix: '',
};

export default nextConfig;