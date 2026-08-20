import { createFileRoute, Link } from "@tanstack/react-router";
import { Scale } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Disclaimer } from "@/components/Disclaimer";

export const Route = createFileRoute("/rights")({
  head: () => ({
    meta: [
      { title: "Know Your Rights | WISE WIZARD Assistant" },
      {
        name: "description",
        content:
          "Plain-language answers on unsafe work, unfair treatment, pay, leave and retaliation at work.",
      },
      { property: "og:title", content: "Know Your Rights | WISE WIZARD Assistant" },
      {
        property: "og:description",
        content: "Plain-language workplace rights guidance you can act on.",
      },
    ],
  }),
  component: RightsPage,
});

const topics = [
  {
    q: "Can I refuse work that I believe is unsafe?",
    a: "In most jurisdictions a worker may stop or refuse work presenting a serious and imminent danger, provided the refusal is reported promptly and in good faith. Record the hazard, tell your supervisor in writing, and notify your safety representative the same day.",
  },
  {
    q: "What if I'm punished for reporting a hazard?",
    a: "Retaliation for a good-faith safety report — demotion, roster cuts, dismissal, harassment — is generally unlawful. Keep a dated log of every incident, keep copies of your report, and escalate to your union or the labour authority.",
  },
  {
    q: "What should a hazard report contain?",
    a: "Date and time, exact location, what the hazard is, who is exposed, who you told and when, photographs where safe to take them, and the action you are requesting with a response deadline.",
  },
  {
    q: "What are my basic pay and hours protections?",
    a: "Most systems guarantee a minimum wage, a written record of hours, overtime treatment, paid rest breaks and limits on maximum weekly hours. Compare your payslip against your contract and your roster records every month.",
  },
  {
    q: "How do I raise a grievance properly?",
    a: "Follow the internal procedure first: written grievance, meeting, right to be accompanied, written outcome, then appeal. Put everything in writing and keep your own copies outside work systems.",
  },
];

function RightsPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Scale className="size-5" />
          </span>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Know Your Rights</h1>
        </div>
        <p className="max-w-2xl text-muted-foreground">
          Common questions answered in plain language. For your specific country and contract, use
          the AI Research Assistant.
        </p>
      </header>

      <Accordion type="single" collapsible className="rounded-xl border border-border bg-card px-4">
        {topics.map((t) => (
          <AccordionItem key={t.q} value={t.q}>
            <AccordionTrigger className="text-left">{t.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{t.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Button asChild>
        <Link to="/research">Research my situation</Link>
      </Button>

      <Disclaimer />
    </div>
  );
}
