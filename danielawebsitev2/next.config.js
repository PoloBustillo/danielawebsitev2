/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    domains:["firebasestorage.googleapis.com"]
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
