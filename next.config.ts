/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cdn.sanity.io'], // Keep for Sanity assets
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'e0wq2fmrhxfqihyx.public.blob.vercel-storage.com',
                pathname: '/festival/media/**', // Restrict to your upload path
            },
        ],
    },
    experimental: {
        serverActions: {
            enabled: true,
        },
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
