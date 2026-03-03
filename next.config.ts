import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: false,

  transpilePackages: ["uploadthing", "@uploadthing/react", "@uploadthing/shared", "@uploadthing/mime-types"],
};

export default nextConfig;
