/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'https://stuffix.online',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  images: {
    domains: ['stuffix.online', 'www.stuffix.online', 'ui-avatars.com'],
  },
  reactStrictMode: true,
}

module.exports = nextConfig 