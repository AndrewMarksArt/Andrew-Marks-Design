import type { Metadata } from "next";
import CaseShell from "../../../components/case/CaseShell";
import KnowledgeOs from "../../../components/case/content/KnowledgeOs";

export const metadata: Metadata = {
  title: "AI Powered Personal Knowledge OS — Andrew Marks",
  description: "A multi-agent system that reads a hundred-plus sources a week into a 4,300+ source living corpus — built solo, in production since week one.",
  // Judge-panel pass (research 005): without a per-page block, shared
  // case-study links previewed as the home page.
  openGraph: {
    title: "AI Powered Personal Knowledge OS — Andrew Marks",
    description: "A multi-agent system that reads a hundred-plus sources a week into a 4,300+ source living corpus — built solo, in production since week one.",
    url: "https://andrewmarks.net/case-studies/knowledge-os",
  },
  twitter: {
    title: "AI Powered Personal Knowledge OS — Andrew Marks",
    description: "A multi-agent system that reads a hundred-plus sources a week into a 4,300+ source living corpus — built solo, in production since week one.",
  },
};

export default function Page() {
  return (
    <CaseShell current="knowledge-os">
      <KnowledgeOs />
    </CaseShell>
  );
}
