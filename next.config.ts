import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol:'http',
        hostname:"localhost",
        port:"1337",
        pathname:"/public/**/*",
      },
      {
        protocol:'http',
        hostname:"localhost",
        port:"1337",
        pathname:"/uploads/**",
      },
      {
        protocol:'https',
        hostname:"res.cloudinary.com",
      },
    ],
  }
};

export default nextConfig;
