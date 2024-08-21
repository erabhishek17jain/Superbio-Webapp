/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "localhost",
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
      "superbio.blr1.digitaloceanspaces.com",
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://business.loqo.ai/:path*", // Proxy to Backend
      },
    ];
  },
};

module.exports = nextConfig;
