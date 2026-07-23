import type { Metadata } from "next";
import CaseShell from "../../../components/case/CaseShell";
import KnowledgeOs from "../../../components/case/content/KnowledgeOs";

export const metadata: Metadata = {
  title: "AI Powered Personal Knowledge OS — Andrew Marks",
  description: "A multi-agent system that reads 300–400 sources a week into a 4,000+ source living corpus — built solo, in production.",
};

export default function Page() {
  return (
    <CaseShell current="knowledge-os">
      <KnowledgeOs />
    </CaseShell>
  );
}
