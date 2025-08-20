/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cdn.sanity.io'],
    },
    experimental: {
        serverActions: {
            enabled: true,
        },
    },
    eslint: {
        ignoreDuringBuilds: true, // Temporary workaround
    },
};
export default nextConfig;
