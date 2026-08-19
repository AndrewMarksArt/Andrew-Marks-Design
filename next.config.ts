import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Dev only: serve images as-is instead of transcoding them through the
    // uncached dev optimizer — a synchronous ~1.2MB sharp transcode used to
    // land mid-boot-film on every refresh, inflating dev-vs-prod judgment
    // of the film. Prod optimization is unchanged.
    unoptimized: process.env.NODE_ENV === "development",
  },
  async redirects() {
    return [
      // The pre-rebuild portfolio served case studies at root-level
      // "/<slug>-case-study" URLs (/battle-warriors-case-study,
      // /shogun-war-case-study, …) that Google still indexes and old
      // links still point at — Vercel's top "page" was one of these
      // 404s. The current site keeps that namespace under
      // /case-studies/<slug>, so a ROOT-LEVEL *-case-study path can
      // only ever be a stale inbound link: send it home permanently
      // so visitors land on the live site and search engines drop
      // the dead URLs. [^/]* keeps the match to one segment — a
      // future /case-studies/<slug ending in -case-study> must not
      // be swallowed.
      {
        source: "/:slug([^/]*-case-study)",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
