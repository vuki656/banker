/** @type { import('next').NextConfig } */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    publicRuntimeConfig: {
        API_URL: process.env.API_URL,
    },
    reactStrictMode: true,
}

module.exports = nextConfig
