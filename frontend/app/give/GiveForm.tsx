"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PRESET_AMOUNTS = [
  { cents: 1000, label: "$10.00" },
  { cents: 2500, label: "$25.00" },
  { cents: 5000, label: "$50.00" },
];

type GiveFormProps = {
  causes: string[];
};

export function GiveForm({ causes }: GiveFormProps) {
  const [cause, setCause] = useState<string>("");
  const [presetCents, setPresetCents] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const customCents = (() => {
    const cleaned = customAmount.replace(/[^0-9.]/g, "");
    const n = parseFloat(cleaned);
    if (Number.isNaN(n) || n < 0) return null;
    return Math.round(n * 100);
  })();

  const amountCents = presetCents ?? customCents;
  const canSubmit =
    cause && amountCents != null && amountCents > 0 && !loading;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: cause,
          unitAmount: amountCents,
          quantity: 1,
          description: `Donation: ${cause}`,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "Checkout failed");
        return;
      }
      if (data?.url) {
        window.location.href = data.url;
        return;
      }
      setError("No checkout URL returned");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="overflow-hidden border-0 shadow-md">
      <CardContent className="p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Cause */}
          <div className="space-y-3">
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                Step 1: Choose Your Cause
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                There are many ways to support the MAGIC Foundation. Choose from
                the drop-down list.
              </p>
            </div>
            <Select value={cause} onValueChange={setCause} required>
              <SelectTrigger className="h-12 w-full rounded-xl border-2 bg-background">
                <SelectValue placeholder="Please make a selection" />
              </SelectTrigger>
              <SelectContent>
                {causes.map((name) => (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Step 2: Amount */}
          <div className="space-y-3">
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                Step 2: Choose Amount
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {PRESET_AMOUNTS.map(({ cents, label }) => (
                <button
                  key={cents}
                  type="button"
                  onClick={() => {
                    setPresetCents(cents);
                    setCustomAmount("");
                  }}
                  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl"
                >
                  <Card
                    className={`h-24 transition-all ${
                      presetCents === cents
                        ? "border-2 border-primary bg-amber-100 dark:bg-amber-950/30"
                        : "border bg-amber-50 hover:bg-amber-100/80 dark:bg-amber-950/20 dark:hover:bg-amber-950/40"
                    }`}
                  >
                    <CardContent className="flex h-full items-center justify-center p-0">
                      <span className="text-lg font-bold text-foreground">
                        {label}
                      </span>
                    </CardContent>
                  </Card>
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <span className="text-sm text-muted-foreground">
                Or choose an amount yourself:
              </span>
              <Input
                type="text"
                placeholder="$0.00"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setPresetCents(null);
                }}
                className="h-11 w-32 rounded-lg"
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}

          <Button
            type="submit"
            size="lg"
            disabled={!canSubmit}
            className="w-full rounded-xl py-6 text-base font-semibold sm:w-auto sm:min-w-[240px]"
          >
            {loading ? "Redirecting…" : "Proceed to donate"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
