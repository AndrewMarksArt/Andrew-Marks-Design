import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://andrewmarks.net";
  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    {
      url: `${base}/case-studies/platform-one`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/case-studies/chat-vet`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/case-studies/knowledge-os`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
