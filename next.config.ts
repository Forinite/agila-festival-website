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
};

export default nextConfig;
