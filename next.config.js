/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        { hostname: "images.unsplash.com" },
        {hostname: "lh3.googleusercontent.com"},
        {hostname: "flomaster.top"},
        {
          protocol: 'https',
          hostname: '**',
        },
      ],
    },
    experimental: {
      serverActions: true,
    },
  };
  
  module.exports = nextConfig;