/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "links.papareact.com",
      "spng.pngfind.com",
      "press.hulu.com",
      "image.tmdb.org",
      "cdn-icons-png.flaticon.com",
      "www.supernova-colosseum.hr",
      "www.metrolibrary.org",
      "static.vecteezy.com",
    ],
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
