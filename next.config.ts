import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
  },
  output: 'export',
  basePath: isProd ? '/andreasroko.github.io' : '',
  assetPrefix: isProd ? '/andreasroko.github.io/' : '',
};

export default nextConfig;