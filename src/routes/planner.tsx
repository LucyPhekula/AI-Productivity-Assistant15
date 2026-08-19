import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";

import { AiWorkspace } from "@/components/AiWorkspace";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner | WISE WIRAZAD Assistant" },
      {
        name: "description",
        content:
          "Break workplace goals, safety actions and grievance processes into a prioritised, dated action plan.",
      },
      { property: "og:title", content: "AI Task Planner | WISE WIRAZAD Assistant" },
      {
        property: "og:description",
        content: "Prioritised action plans for workplace safety and rights cases.",
      },
    ],
  }),
  component: PlannerPage,
});

function PlannerPage() {
  return (
    <AiWorkspace
      title="AI Task Planner"
      description="Turn a goal or a workplace issue into a prioritised plan with owners, deadlines and evidence to collect."
      icon={<ListChecks className="size-5" />}
      cta="Build plan"
      system="You are WISE WIRAZAD Assistant, a workplace task-planning assistant focused on worker rights and occupational safety. Produce a structured markdown-style plan: Objective, Priority Actions (numbered, each with owner, suggested due date offset, and expected outcome), Evidence to Collect, Escalation Path, and Risks. Be concrete and practical. Never invent legal citations."
      fields={[
        {
          name: "goal",
          label: "Goal or issue",
          placeholder: "e.g. Get PPE supplied to the night shift within a month",
          required: true,
          rows: 3,
        },
        {
          name: "context",
          label: "Context (team, workplace, constraints)",
          placeholder: "e.g. Warehouse, 24 workers, supervisor resistant, union present",
          rows: 4,
        },
        {
          name: "deadline",
          label: "Timeframe",
          placeholder: "e.g. 4 weeks",
        },
      ]}
      buildPrompt={(v) => `Create an action plan.
Goal/issue: ${v["goal"]}
Context: ${v["context"] || "(none provided)"}
Timeframe: ${v["deadline"] || "flexible"}`}
    />
  );
}
