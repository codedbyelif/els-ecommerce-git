import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xiunlqsyghlmiedespim.supabase.co",
      },
    ],
  },
};

export default nextConfig;
