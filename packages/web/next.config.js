/** @type { import('next').NextConfig } */
const nextConfig = {
    publicRuntimeConfig: {
        API_URL: process.env.API_URL,
    },
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
}

module.exports = nextConfig
