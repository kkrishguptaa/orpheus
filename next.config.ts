import { withSentryConfig } from "@sentry/nextjs";
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

export default withSentryConfig(withMDX(nextConfig), {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  silent: !process.env.CI,
  widenClientFileUpload: true,
  disableLogger: true,
  automaticVercelMonitors: true,
});
