import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";

import { AiWorkspace } from "@/components/AiWorkspace";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator | WISE WIZARD Assistant" },
      {
        name: "description",
        content:
          "Draft professional workplace emails — grievances, safety reports, leave requests — with AI you can edit before sending.",
      },
      { property: "og:title", content: "Smart Email Generator | WISE WIZARD Assistant" },
      {
        property: "og:description",
        content: "AI-drafted workplace emails for grievances, safety reports and requests.",
      },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  return (
    <AiWorkspace
      title="Smart Email Generator"
      description="Turn a rough note into a clear, professional email to your manager, HR, union or safety officer."
      icon={<Mail className="size-5" />}
      cta="Generate email"
      system="You are WISE WIZARD Assistant, a workplace-rights and occupational health & safety writing assistant. You write clear, calm, professional emails that protect the worker's position: factual, dated, specific, non-aggressive, and referencing relevant workplace policy or safety obligations in general terms. Never invent laws, case numbers, or quotes. Output only the email with a Subject line, then the body, then a sign-off placeholder."
      fields={[
        {
          name: "recipient",
          label: "Who is it for?",
          placeholder: "e.g. HR Manager, Site Supervisor, Union Rep",
          required: true,
        },
        {
          name: "purpose",
          label: "Purpose of the email",
          placeholder: "e.g. Report an unsafe scaffold and request an inspection",
          required: true,
          rows: 3,
        },
        {
          name: "details",
          label: "Key facts (dates, people, what happened)",
          placeholder: "e.g. On 14 Aug the guardrail was missing on level 3; I told the foreman twice.",
          rows: 5,
        },
        {
          name: "tone",
          label: "Tone & outcome you want",
          placeholder: "e.g. Firm but respectful; ask for a written response within 5 working days",
          rows: 2,
        },
      ]}
      buildPrompt={(v) => `Write a workplace email.
Recipient: ${v["recipient"]}
Purpose: ${v["purpose"]}
Key facts: ${v["details"] || "(none provided)"}
Desired tone and outcome: ${v["tone"] || "professional and constructive"}`}
    />
  );
}
