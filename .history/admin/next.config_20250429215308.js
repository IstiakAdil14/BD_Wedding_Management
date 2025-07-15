module.exports = {
  async rewrites() {
    return [
      {
        source: "/admin/:path*",
        destination: "/:path*",
      },
    ];
  },
};
