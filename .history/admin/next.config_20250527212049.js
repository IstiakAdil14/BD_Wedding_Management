/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: 'http://localhost:5000/uploads/:path*', // Proxy to backend uploads folder
      },
    ];
  },
};

module.exports = nextConfig;
