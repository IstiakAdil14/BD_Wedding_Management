module.exports = {
  async rewrites() {
    return [
      {
        source: "/admin/:path*",
        destination: "/:path*",
      },
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/api/:path*",
      },
    ];
  },
};
