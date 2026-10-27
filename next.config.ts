import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Products used to have numeric ids; those URLs may still be indexed.
      { source: "/products/:id(\\d+)", destination: "/listings", permanent: true },
    ];
  },
};

export default nextConfig;
