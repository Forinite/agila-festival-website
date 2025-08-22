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
        ignoreDuringBuilds: true, // ignore lint errors
    },
    typescript: {
        ignoreBuildErrors: true, // ignore TS errors
    },
};

export default nextConfig;
