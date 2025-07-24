import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
  pageExtensions: ["tsx", "mdx"],
  images: {
    unoptimized: true,
  },
};

const withMDX = createMDX({
  options: {},
});

export default withMDX(nextConfig);
