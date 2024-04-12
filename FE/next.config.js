/** @type {import('next').NextConfig} */
const nextConfig = {
  // rewrite
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
