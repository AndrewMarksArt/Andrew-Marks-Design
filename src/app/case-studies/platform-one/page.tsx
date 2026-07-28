import type { Metadata } from "next";
import CaseShell from "../../../components/case/CaseShell";
import PlatformOne from "../../../components/case/content/PlatformOne";

export const metadata: Metadata = {
  title: "Platform One AI Assistant & Chat Bot · Andrew Marks",
  description: "Designing an AI assistant projected to cut support tickets by roughly 40% inside the Air Force’s flagship software factory.",
  // Judge-panel pass (research 005): without a per-page block, shared
  // case-study links previewed as the home page.
  openGraph: {
    title: "Platform One AI Assistant & Chat Bot · Andrew Marks",
    description: "Designing an AI assistant projected to cut support tickets by roughly 40% inside the Air Force’s flagship software factory.",
    url: "https://andrewmarks.net/case-studies/platform-one",
  },
  twitter: {
    title: "Platform One AI Assistant & Chat Bot · Andrew Marks",
    description: "Designing an AI assistant projected to cut support tickets by roughly 40% inside the Air Force’s flagship software factory.",
  },
};

export default function Page() {
  return (
    <CaseShell current="platform-one">
      <PlatformOne />
    </CaseShell>
  );
}
