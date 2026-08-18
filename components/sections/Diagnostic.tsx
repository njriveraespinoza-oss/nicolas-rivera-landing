"use client";

import { useMemo, useState } from "react";
import { diagnosticCopy } from "@/config/copy";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { useLanding } from "@/components/providers/LandingProvider";
import { track } from "@/lib/analytics";
import { cx } from "@/lib/cx";
import {
  buildDiagnostic,
  type AssetId,
  type DiagnosticAnswers,
  type FrequencyId,
  type GoalId,
  type ProfileId,
} from "@/lib/diagnostic";

type Step = "profile" | "assets" | "frequency" | "goal" | "result";

const order: Step[] = ["profile", "assets", "frequency", "goal"];

export function Diagnostic() {
  const { setDiagnostic } = useLanding();
  const [step, setStep] = useState<Step>("profile");
  const [profile, setProfile] = useState<ProfileId | null>(null);
  const [assets, setAssets] = useState<AssetId[]>([]);
  const [frequency, setFrequency] = useState<FrequencyId | null>(null);
  const [goal, setGoal] = useState<GoalId | null>(null);
  const [started, setStarted] = useState(false);

  const result = useMemo(() => {
    if (!profile || !frequency || !goal) return null;
    return buildDiagnostic({
      profile,
      assets,
      frequency,
      goal,
    });
  }, [profile, assets, frequency, goal]);

  function start() {
    if (!started) {
      track("system_demo_start", { source: "diagnostic", module: "diagnostic" });
      setStarted(true);
    }
  }

  function toggleAsset(id: AssetId) {
    start();
    setAssets((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function goNext() {
    const i = order.indexOf(step as (typeof order)[number]);
    if (i < order.length - 1) setStep(order[i + 1]);
    else if (result) {
      setDiagnostic(result);
      setStep("result");
      track("system_demo_complete", {
        module: "diagnostic",
        profile: profile ?? "",
        goal: goal ?? "",
      });
    }
  }

  function goBack() {
    if (step === "result") {
      setStep("goal");
      return;
    }
    const i = order.indexOf(step as (typeof order)[number]);
    if (i > 0) setStep(order[i - 1]);
  }

  function reset() {
    setStep("profile");
    setProfile(null);
    setAssets([]);
    setFrequency(null);
    setGoal(null);
    setStarted(false);
  }

  const canNext =
    (step === "profile" && profile) ||
    (step === "assets" && assets.length > 0) ||
    (step === "frequency" && frequency) ||
    (step === "goal" && goal);

  const stepIndex = step === "result" ? 4 : order.indexOf(step);
  const answers: Partial<DiagnosticAnswers> = { profile: profile ?? undefined, assets, frequency: frequency ?? undefined, goal: goal ?? undefined };

  return (
    <Section id="diagnostic" number={diagnosticCopy.number} eyebrow={diagnosticCopy.eyebrow} title={diagnosticCopy.title} intro={diagnosticCopy.intro}>
      <div className="border border-ink bg-paper">
        <div className="flex items-center justify-between border-b border-line px-5 py-3 md:px-8">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-warm">
            {step === "result" ? "Cartographie" : `Étape ${stepIndex + 1} / 4`}
          </p>
          <div className="flex gap-1" aria-hidden>
            {order.map((s, i) => (
              <span
                key={s}
                className={cx("h-1 w-8", i <= stepIndex ? "bg-red" : "bg-line")}
              />
            ))}
          </div>
        </div>

        <div key={step} className="artifact-enter p-5 md:p-8">
          {step === "profile" && (
            <ChoiceGroup
              question={diagnosticCopy.steps.profile.question}
              hint={diagnosticCopy.steps.profile.hint}
              options={diagnosticCopy.steps.profile.options}
              selected={profile}
              onSelect={(id) => {
                start();
                setProfile(id as ProfileId);
              }}
            />
          )}
          {step === "assets" && (
            <ChoiceGroup
              question={diagnosticCopy.steps.assets.question}
              hint={diagnosticCopy.steps.assets.hint}
              options={diagnosticCopy.steps.assets.options}
              selected={assets}
              multiple
              onSelect={(id) => toggleAsset(id as AssetId)}
            />
          )}
          {step === "frequency" && (
            <ChoiceGroup
              question={diagnosticCopy.steps.frequency.question}
              hint={diagnosticCopy.steps.frequency.hint}
              options={diagnosticCopy.steps.frequency.options}
              selected={frequency}
              onSelect={(id) => {
                start();
                setFrequency(id as FrequencyId);
              }}
            />
          )}
          {step === "goal" && (
            <ChoiceGroup
              question={diagnosticCopy.steps.goal.question}
              hint={diagnosticCopy.steps.goal.hint}
              options={diagnosticCopy.steps.goal.options}
              selected={goal}
              onSelect={(id) => {
                start();
                setGoal(id as GoalId);
              }}
            />
          )}

          {step === "result" && result ? (
            <div>
              <p className="font-serif text-2xl italic leading-snug md:text-3xl">{result.headline}</p>
              <p className="mt-4 text-warm-strong">{result.sourceLine}</p>
              <ul className="mt-8 space-y-0 border-l-2 border-red">
                {result.system.map((item) => (
                  <li key={item} className="flex gap-3 border-t border-line py-3 pl-5 first:border-t-0">
                    <span className="num text-sm">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-warm-strong">{result.cadence}</p>
              <p className="mt-3 font-medium">{result.firstMove}</p>
              <p className="mt-6 text-sm text-warm">{diagnosticCopy.noRevenueNote}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="#candidater" arrow>
                  {diagnosticCopy.optionalCta}
                </Button>
                <Button variant="secondary" onClick={reset}>
                  {diagnosticCopy.restartLabel}
                </Button>
              </div>
            </div>
          ) : null}

          {step !== "result" ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {stepIndex > 0 ? (
                <Button variant="secondary" onClick={goBack}>
                  {diagnosticCopy.backLabel}
                </Button>
              ) : null}
              <Button onClick={goNext} disabled={!canNext}>
                {step === "goal" ? diagnosticCopy.resultLabel : diagnosticCopy.nextLabel}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {step} {JSON.stringify(answers.profile)}
      </p>
    </Section>
  );
}

function ChoiceGroup({
  question,
  hint,
  options,
  selected,
  onSelect,
  multiple,
}: {
  question: string;
  hint: string;
  options: { id: string; label: string }[];
  selected: string | string[] | null;
  onSelect: (id: string) => void;
  multiple?: boolean;
}) {
  return (
    <fieldset>
      <legend className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{question}</legend>
      <p className="mt-2 text-sm text-warm">{hint}</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {options.map((opt) => {
          const active = Array.isArray(selected) ? selected.includes(opt.id) : selected === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelect(opt.id)}
              aria-pressed={active}
              className={cx(
                "min-h-14 border px-4 py-3 text-left font-medium transition-colors",
                active ? "border-ink bg-ink text-ivory" : "border-line bg-ivory hover:border-ink",
              )}
            >
              {multiple ? (
                <span className="mr-2 font-display text-xs uppercase tracking-widest opacity-70">
                  {active ? "Oui" : "—"}
                </span>
              ) : null}
              {opt.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
