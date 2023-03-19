/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'media.giphy.com',
      'i.ytimg.com',
      'yt3.ggpht.com',
      'lh3.googleusercontent.com',
    ],
  },
};

module.exports = nextConfig;
