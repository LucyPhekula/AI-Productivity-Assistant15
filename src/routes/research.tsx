import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";

import { AiWorkspace } from "@/components/AiWorkspace";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant | WISE WIRAZAD Assistant" },
      {
        name: "description",
        content:
          "Get plain-language briefings on workplace rights, safety standards and employer obligations, with next steps.",
      },
      { property: "og:title", content: "AI Research Assistant | WISE WIRAZAD Assistant" },
      {
        property: "og:description",
        content: "Plain-language briefings on workplace rights and safety obligations.",
      },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  return (
    <AiWorkspace
      title="AI Research Assistant"
      description="Ask a workplace-rights or safety question and get a structured briefing you can share with colleagues."
      icon={<Search className="size-5" />}
      cta="Research topic"
      system="You are WISE WIRAZAD Assistant, a workplace-rights research assistant. Produce a structured briefing: Summary, Key Points, What Your Employer Must Generally Do, What You Can Do Next, Questions to Ask a Specialist, and Limitations. Write in plain language. Be explicit that rules vary by country/state and by employment contract. NEVER fabricate statutes, section numbers, case law, or figures — if unsure, say the reader must verify with the local labour authority."
      fields={[
        {
          name: "topic",
          label: "Your question or topic",
          placeholder: "e.g. Can I refuse unsafe work without being dismissed?",
          required: true,
          rows: 3,
        },
        {
          name: "jurisdiction",
          label: "Country / region",
          placeholder: "e.g. South Africa",
        },
        {
          name: "situation",
          label: "Your situation (optional)",
          placeholder: "e.g. Contract worker on a mining site, no written safety induction",
          rows: 4,
        },
      ]}
      buildPrompt={(v) => `Research briefing request.
Topic: ${v.topic}
Jurisdiction: ${v.jurisdiction || "unspecified — cover general principles"}
Situation: ${v.situation || "(none provided)"}`}
    />
  );
}
