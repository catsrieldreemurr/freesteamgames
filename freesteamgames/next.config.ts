import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.gamerpower.com',
        port: '',
        pathname: '/**',
      },
    ],
  }
};

export default nextConfig;
