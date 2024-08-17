/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['localhost', 'res.cloudinary.com', 'lh3.googleusercontent.com', 'superbio.blr1.digitaloceanspaces.com'],
    },
};

module.exports = nextConfig
