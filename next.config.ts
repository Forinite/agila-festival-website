import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        domains: ['cdn.sanity.io'],
    },
    experimental: {
        serverActions: true,
    },
    matcher: ['/studio/:path*'],
};

export default nextConfig;
