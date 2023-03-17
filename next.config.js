/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['media.giphy.com', 'i.ytimg.com', 'yt3.ggpht.com'],
  },
};

module.exports = nextConfig;
