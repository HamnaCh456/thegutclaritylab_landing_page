import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The practitioner page moved to the home page. Not permanent: the split may come back.
  async redirects() {
    return [{ source: "/practitioners", destination: "/", permanent: false }];
  },
};

export default nextConfig;
