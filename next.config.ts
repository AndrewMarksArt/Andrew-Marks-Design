import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Dev only: serve images as-is instead of transcoding them through the
    // uncached dev optimizer — a synchronous ~1.2MB sharp transcode used to
    // land mid-boot-film on every refresh, inflating dev-vs-prod judgment
    // of the film. Prod optimization is unchanged.
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
