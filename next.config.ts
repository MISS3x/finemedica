import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/AGENTS.md",
        destination: "/agents.md",
      },
      {
        source: "/AGENTS.txt",
        destination: "/agents.md",
      },
      {
        source: "/LLMS.txt",
        destination: "/llms.txt",
      },
      {
        source: "/LLMS.md",
        destination: "/llms.md",
      },
    ];
  },
};

export default nextConfig;
