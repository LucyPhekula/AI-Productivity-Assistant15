import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import { Loader2, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";

import { runAi } from "@/lib/ai.functions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Disclaimer } from "@/components/Disclaimer";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chatbot | WISE WIZARD Assistant" },
      {
        name: "description",
        content:
          "Chat with the WISE WIZARD Assistant about workplace rights, safety hazards and what to do next.",
      },
      { property: "og:title", content: "AI Chatbot | WISE WIZARD Assistant" },
      {
        property: "og:description",
        content: "Ask anything about your rights and safety at work.",
      },
    ],
  }),
  component: ChatPage,
});

const SYSTEM =
  "You are WISE WIZARD Assistant, a supportive workplace-rights and occupational safety chatbot. Slogan: 'We fight for your rights your voice is heard.' Answer in plain language, short paragraphs and bullet points. Always: acknowledge the worker's situation, give practical next steps, tell them what to document, and note when a union rep, safety officer or labour lawyer should be involved. Never fabricate statutes, section numbers or case law, and never claim to give legal advice.";

const STARTERS = [
  "My supervisor ignored my report about a broken machine guard.",
  "Can I be fired for refusing unsafe work?",
  "How do I document workplace harassment properly?",
];

type Msg = { role: "user" | "assistant"; content: string };

function ChatPage() {
  const call = useServerFn(runAi);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hello, I'm the WISE WIZARD Assistant. Tell me what's happening at your workplace and I'll help you understand your rights and plan your next step.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await call({ data: { system: SYSTEM, messages: next } });
      setMessages([...next, { role: "assistant", content: res.text }]);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
      setMessages(next);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-full flex-col gap-6">
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <MessageSquare className="size-5" />
          </span>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">AI Chatbot</h1>
        </div>
        <p className="max-w-2xl text-muted-foreground">
          A private space to talk through a workplace issue and get practical next steps.
        </p>
      </header>

      <div className="flex min-h-[420px] flex-1 flex-col rounded-xl border border-border bg-card">
        <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" /> Thinking…
            </div>
          ) : null}
          <div ref={endRef} />
        </div>

        {messages.length === 1 ? (
          <div className="flex flex-wrap gap-2 px-4 pb-2 sm:px-6">
            {STARTERS.map((s) => (
              <Button key={s} variant="outline" size="sm" onClick={() => void send(s)}>
                {s}
              </Button>
            ))}
          </div>
        ) : null}

        <div className="flex items-end gap-2 border-t border-border p-4 sm:p-6">
          <Textarea
            value={input}
            rows={2}
            placeholder="Describe your situation…"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send(input);
              }
            }}
          />
          <Button
            size="icon"
            aria-label="Send message"
            disabled={loading}
            onClick={() => void send(input)}
          >
            <Send className="size-4" />
          </Button>
        </div>
      </div>

      <Disclaimer />
    </div>
  );
}
