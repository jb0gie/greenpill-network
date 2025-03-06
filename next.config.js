/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ['three'],
  images: { unoptimized: true },
};

module.exports = nextConfig;
