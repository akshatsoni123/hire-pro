import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    domains: ["lh3.googleusercontent.com","s.gravatar.com"],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://hirepro-ztf5.onrender.com/api/:path*'
      },
      {
        source: '/login',
        destination: 'https://hirepro-ztf5.onrender.com/login'
      },
      {
        source: '/logout',
        destination: 'https://hirepro-ztf5.onrender.com/logout'
      },
      {
        source: '/callback',
        destination: 'https://hirepro-ztf5.onrender.com/callback'
      }
    ]
  }
};

export default nextConfig;
