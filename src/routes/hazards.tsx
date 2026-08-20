import { createFileRoute } from "@tanstack/react-router";
import { HardHat, Flame, Volume2, Biohazard, Zap, Footprints, Wind } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Disclaimer } from "@/components/Disclaimer";

export const Route = createFileRoute("/hazards")({
  head: () => ({
    meta: [
      { title: "Workplace Safety Hazards | WISE WIZARD Assistant" },
      {
        name: "description",
        content:
          "A quick-reference guide to common workplace safety hazards, warning signs and the actions to take when you spot one.",
      },
      { property: "og:title", content: "Workplace Safety Hazards | WISE WIZARD Assistant" },
      {
        property: "og:description",
        content: "Spot, report and escalate common workplace safety hazards.",
      },
    ],
  }),
  component: HazardsPage,
});

const hazards = [
  {
    icon: Footprints,
    title: "Slips, trips & falls",
    signs: "Wet floors, trailing cables, missing guardrails, poor lighting.",
    action: "Isolate the area, report in writing the same day, photograph the hazard.",
  },
  {
    icon: Flame,
    title: "Fire & explosion",
    signs: "Blocked exits, faulty extinguishers, flammables stored near heat.",
    action: "Never work behind a blocked exit. Report to the fire warden immediately.",
  },
  {
    icon: Zap,
    title: "Electrical",
    signs: "Exposed wiring, overloaded boards, no lockout/tagout.",
    action: "Stop work, tag the equipment, request a competent electrician.",
  },
  {
    icon: Biohazard,
    title: "Chemical & biological",
    signs: "Unlabelled containers, missing safety data sheets, no ventilation.",
    action: "Request the safety data sheet and correct PPE before handling.",
  },
  {
    icon: Volume2,
    title: "Noise & vibration",
    signs: "Raised voices needed at 1m, ringing ears, numb hands after shifts.",
    action: "Ask for a noise assessment and hearing protection; log your exposure.",
  },
  {
    icon: Wind,
    title: "Ergonomic & fatigue",
    signs: "Heavy manual lifting, long shifts, no rest breaks, poor workstations.",
    action: "Record hours and symptoms; request a workstation or roster review.",
  },
];

function HazardsPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <HardHat className="size-5" />
          </span>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Safety Hazards</h1>
        </div>
        <p className="max-w-2xl text-muted-foreground">
          Spot it, record it, report it. Use this quick reference, then generate a written report
          with the Smart Email Generator.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {hazards.map((h) => (
          <Card key={h.title}>
            <CardHeader className="flex-row items-center gap-3 space-y-0">
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <h.icon className="size-4" />
              </span>
              <CardTitle className="text-base">{h.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">Warning signs: </span>
                {h.signs}
              </p>
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">Do this: </span>
                {h.action}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Disclaimer />
    </div>
  );
}
