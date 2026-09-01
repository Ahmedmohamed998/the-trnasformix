import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produces a standalone folder with only the files needed to run the server.
  // Required for the multi-stage Docker build.
  output: "standalone",
};

export default nextConfig;
