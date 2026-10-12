
import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      {
        source: "/model",
        destination: "/my-model",
        permanent: false,
      },
      {
        source: "/closet",
        destination: "/collection",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    const backendUrl =
      process.env.BACKEND_URL || "http://localhost:5001";

    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
      {
        source: "/uploads/:path*",
        destination: `${backendUrl}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
