import type { Metadata } from "next";
import CaseShell from "../../../components/case/CaseShell";
import PlatformOne from "../../../components/case/content/PlatformOne";

export const metadata: Metadata = {
  title: "Platform One AI Assistant & Chat Bot — Andrew Marks",
  description: "Designing an AI assistant projected to cut support tickets by roughly 40% inside the Air Force’s flagship software factory.",
};

export default function Page() {
  return (
    <CaseShell current="platform-one">
      <PlatformOne />
    </CaseShell>
  );
}
