import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, ListChecks, Search, MessageSquare, HardHat, Scale, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Disclaimer } from "@/components/Disclaimer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WISE WIZARD Assistant — Workplace Rights & Safety AI" },
      {
        name: "description",
        content:
          "AI assistant for workplace rights and safety: draft emails, plan actions, research your rights and chat for guidance. We fight for your rights your voice is heard.",
      },
      { property: "og:title", content: "WISE WIZARD Assistant — Workplace Rights & Safety AI" },
      {
        property: "og:description",
        content:
          "Draft emails, plan actions, research your rights and get AI guidance on workplace safety hazards.",
      },
    ],
  }),
  component: Dashboard,
});

const tools = [
  {
    to: "/email",
    icon: Mail,
    title: "Smart Email Generator",
    desc: "Draft grievances, hazard reports and requests in a professional tone.",
  },
  {
    to: "/planner",
    icon: ListChecks,
    title: "AI Task Planner",
    desc: "Turn an issue into a prioritised plan with evidence and escalation steps.",
  },
  {
    to: "/research",
    icon: Search,
    title: "AI Research Assistant",
    desc: "Plain-language briefings on rights, obligations and safety standards.",
  },
  {
    to: "/chat",
    icon: MessageSquare,
    title: "AI Chatbot",
    desc: "Talk it through and get practical next steps, any time.",
  },
  {
    to: "/hazards",
    icon: HardHat,
    title: "Safety Hazards",
    desc: "Spot, record and report the most common workplace hazards.",
  },
  {
    to: "/rights",
    icon: Scale,
    title: "Know Your Rights",
    desc: "Quick answers on unsafe work, retaliation, pay and grievances.",
  },
] as const;

function Dashboard() {
  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          WISE WIZARD Assistant
        </p>
        <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
          Your rights at work, backed by AI
        </h1>
        <p className="mt-4 text-xl font-bold text-primary sm:text-2xl">
          We fight for your rights your voice is heard
        </p>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Automate the paperwork of standing up for yourself — reports, plans, research and
          guidance on workplace safety hazards, all in one clean workspace.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to="/chat">
              Start with the chatbot <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/hazards">Report a hazard</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {tools.map((t) => (
          <Link key={t.to} to={t.to} className="group">
            <Card className="h-full transition-colors group-hover:border-primary">
              <CardHeader>
                <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <t.icon className="size-5" />
                </span>
                <CardTitle className="mt-3 text-lg">{t.title}</CardTitle>
                <CardDescription>{t.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Open <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      <Disclaimer />
    </div>
  );
}
