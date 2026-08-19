import { useState, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Sparkles, Copy, RotateCcw } from "lucide-react";
import { toast } from "sonner";

import { runAi } from "@/lib/ai.functions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Disclaimer } from "@/components/Disclaimer";

export type Field = {
  name: string;
  label: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
};

type Props = {
  title: string;
  description: string;
  icon: ReactNode;
  fields: Field[];
  system: string;
  buildPrompt: (values: Record<string, string>) => string;
  cta?: string;
};

export function AiWorkspace({
  title,
  description,
  icon,
  fields,
  system,
  buildPrompt,
  cta = "Generate",
}: Props) {
  const call = useServerFn(runAi);
  const [values, setValues] = useState<Record<string, string>>({});
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const missing = fields.filter((f) => f.required && !values[f.name]?.trim());

  async function generate() {
    if (missing.length) {
      toast.error(`Please fill in: ${missing.map((m) => m.label).join(", ")}`);
      return;
    }
    setLoading(true);
    try {
      const res = await call({
        data: { system, messages: [{ role: "user", content: buildPrompt(values) }] },
      });
      setOutput(res.text);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            {icon}
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{title}</h1>
        </div>
        <p className="max-w-2xl text-muted-foreground">{description}</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Structured prompt</CardTitle>
            <CardDescription>The more detail you give, the better the result.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <label
                  htmlFor={field.name}
                  className="text-sm font-medium text-foreground"
                >
                  {field.label}
                  {field.required ? <span className="text-primary"> *</span> : null}
                </label>
                <Textarea
                  id={field.name}
                  rows={field.rows ?? 2}
                  placeholder={field.placeholder}
                  value={values[field.name] ?? ""}
                  onChange={(e) => setValues((v) => ({ ...v, [field.name]: e.target.value }))}
                />
              </div>
            ))}
            <Button onClick={generate} disabled={loading} className="w-full">
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Sparkles className="size-4" />
              )}
              {loading ? "Working…" : cta}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-start justify-between gap-4 space-y-0">
            <div>
              <CardTitle>Editable output</CardTitle>
              <CardDescription>Review and edit before you use it.</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                aria-label="Copy output"
                disabled={!output}
                onClick={() => {
                  void navigator.clipboard.writeText(output);
                  toast.success("Copied to clipboard");
                }}
              >
                <Copy className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                aria-label="Regenerate"
                disabled={loading}
                onClick={generate}
              >
                <RotateCcw className="size-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              rows={18}
              placeholder="Your AI draft will appear here — fully editable."
              className="font-mono text-sm"
            />
          </CardContent>
        </Card>
      </div>

      <Disclaimer />
    </div>
  );
}
