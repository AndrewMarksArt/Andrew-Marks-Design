import type { Metadata } from "next";
import CaseShell from "../../../components/case/CaseShell";
import KnowledgeOs from "../../../components/case/content/KnowledgeOs";

export const metadata: Metadata = {
  title: "AI Powered Personal Knowledge OS — Andrew Marks",
  description: "A multi-agent system that reads hundreds of sources a week into a living corpus of thousands — built solo, in production since week one.",
};

export default function Page() {
  return (
    <CaseShell current="knowledge-os">
      <KnowledgeOs />
    </CaseShell>
  );
}
