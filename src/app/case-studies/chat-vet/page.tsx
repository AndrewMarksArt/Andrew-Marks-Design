import type { Metadata } from "next";
import CaseShell from "../../../components/case/CaseShell";
import ChatVet from "../../../components/case/content/ChatVet";

export const metadata: Metadata = {
  title: "ChatVET — an AI Suite for Veterinary Medicine — Andrew Marks",
  description: "An AI copilot that saves veterinarians 15 minutes per case, answering from Merck Veterinary Manual instead of the open web.",
};

export default function Page() {
  return (
    <CaseShell current="chat-vet">
      <ChatVet />
    </CaseShell>
  );
}
