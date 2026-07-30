import type { Metadata } from "next";
import CaseShell from "../../../components/case/CaseShell";
import ChatVet from "../../../components/case/content/ChatVet";

export const metadata: Metadata = {
  title: "ChatVET: an AI Copilot for Veterinary Medicine · Andrew Marks",
  description: "An AI copilot vets report saves them about 15 minutes per case, answering from the MSD Veterinary Manual instead of the open web.",
  // Judge-panel pass (research 005): without a per-page block, shared
  // case-study links previewed as the home page. Description also aligned
  // to the study's own hedges (self-reported; MSD, not Merck).
  openGraph: {
    title: "ChatVET: an AI Copilot for Veterinary Medicine · Andrew Marks",
    description: "An AI copilot vets report saves them about 15 minutes per case, answering from the MSD Veterinary Manual instead of the open web.",
    url: "https://www.andrewmarks.design/case-studies/chat-vet",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChatVET: an AI Copilot for Veterinary Medicine · Andrew Marks",
    description: "An AI copilot vets report saves them about 15 minutes per case, answering from the MSD Veterinary Manual instead of the open web.",
  },
};

export default function Page() {
  return (
    <CaseShell current="chat-vet">
      <ChatVet />
    </CaseShell>
  );
}
