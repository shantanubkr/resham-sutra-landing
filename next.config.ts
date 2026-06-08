import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/gramsootra",
        destination: "https://gramsootra.in/",
        permanent: true,
      },
      {
        source: "/products/gramsootra",
        destination: "https://gramsootra.in/",
        permanent: true,
      },
      {
        source: "/products/services/gramsootra",
        destination: "https://gramsootra.in/",
        permanent: true,
      },
      {
        source: "/contact",
        has: [{ type: "query", key: "item", value: "gramsootra" }],
        destination: "https://gramsootra.in/",
        permanent: false,
      },
      {
        source: "/contact",
        has: [{ type: "query", key: "program", value: "gramsootra" }],
        destination: "https://gramsootra.in/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
