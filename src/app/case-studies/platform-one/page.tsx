import type { Metadata } from "next";
import CaseShell from "../../../components/case/CaseShell";
import PlatformOne from "../../../components/case/content/PlatformOne";
import { isUnlocked } from "./gate";

export const metadata: Metadata = {
  title: "Platform One AI Assistant & Chat Bot · Andrew Marks",
  description: "Designing an AI assistant projected to cut support tickets by roughly 40% inside the Air Force’s flagship software factory.",
  // Judge-panel pass (research 005): without a per-page block, shared
  // case-study links previewed as the home page.
  openGraph: {
    title: "Platform One AI Assistant & Chat Bot · Andrew Marks",
    description: "Designing an AI assistant projected to cut support tickets by roughly 40% inside the Air Force’s flagship software factory.",
    url: "https://www.andrewmarks.design/case-studies/platform-one",
  },
  twitter: {
    card: "summary_large_image",
    title: "Platform One AI Assistant & Chat Bot · Andrew Marks",
    description: "Designing an AI assistant projected to cut support tickets by roughly 40% inside the Air Force’s flagship software factory.",
  },
};

// Reading the unlock cookie makes this route dynamic (server-rendered
// per request) — the price of the gate actually withholding content.
// The rest of the site stays static.
export default async function Page() {
  const unlocked = await isUnlocked();
  return (
    <CaseShell current="platform-one">
      <PlatformOne locked={!unlocked} />
    </CaseShell>
  );
}
