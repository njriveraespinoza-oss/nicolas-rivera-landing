"use client";

import { useEffect, useState } from "react";
import { mechanism } from "@/config/copy";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Pipeline } from "@/components/ui/Pipeline";
import { track } from "@/lib/analytics";
import { cx } from "@/lib/cx";

const STEP_MS = 6500;

export function Mechanism() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => {
      setIndex((i) => {
        if (i >= mechanism.steps.length - 1) {
          setPlaying(false);
          if (!completed) {
            track("system_demo_complete", { module: "mechanism" });
            setCompleted(true);
          }
          return i;
        }
        return i + 1;
      });
    }, STEP_MS);
    return () => window.clearTimeout(id);
  }, [playing, index, completed]);

  useEffect(() => {
    const onPlay = () => play();
    window.addEventListener("nr:play-system", onPlay);
    return () => window.removeEventListener("nr:play-system", onPlay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function play() {
    track("system_demo_start", { source: "mechanism", module: "mechanism" });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIndex(mechanism.steps.length - 1);
      setPlaying(false);
      if (!completed) {
        track("system_demo_complete", { module: "mechanism" });
        setCompleted(true);
      }
      return;
    }
    if (index >= mechanism.steps.length - 1) setIndex(0);
    setPlaying(true);
  }

  const step = mechanism.steps[index];

  return (
    <Section
      id="systeme"
      number={mechanism.number}
      eyebrow={mechanism.eyebrow}
      title={mechanism.title}
      intro={mechanism.intro}
      dark
    >
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <Button variant="invert" onClick={playing ? () => setPlaying(false) : play} arrow={!playing}>
          {playing ? mechanism.pause : index > 0 ? mechanism.resume : mechanism.play}
        </Button>
        <Button
          variant="ghost"
          className="text-ivory hover:border-ivory hover:text-ivory"
          onClick={() => {
            setPlaying(false);
            setIndex(mechanism.steps.length - 1);
          }}
        >
          {mechanism.skip}
        </Button>
        <p className="text-sm text-ivory/80">{mechanism.playingHint}</p>
      </div>

      <div className="mb-10 hidden md:block">
        <Pipeline active={index} onSelect={(i) => { setPlaying(false); setIndex(i); }} dark />
      </div>

      <ol className="mb-8 flex flex-wrap gap-2 md:hidden" aria-label="Étapes du système">
        {mechanism.steps.map((s, i) => (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => {
                setPlaying(false);
                setIndex(i);
              }}
              className={cx(
                "min-h-11 border px-3 py-2 font-display text-xs font-semibold uppercase tracking-[0.12em]",
                i === index ? "border-ivory bg-ivory text-ink" : "border-ivory/30 text-ivory/80 hover:border-ivory",
              )}
              aria-current={i === index ? "step" : undefined}
            >
              {String(i + 1).padStart(2, "0")} {s.title}
            </button>
          </li>
        ))}
      </ol>

      <article key={step.id} className="artifact-enter border border-ivory/25 p-6 md:p-10" aria-live="polite">
        <p className="num text-sm">
          {String(index + 1).padStart(2, "0")} / {String(mechanism.steps.length).padStart(2, "0")}
        </p>
        <h3 className="mt-3 font-display text-3xl font-semibold md:text-4xl">{step.title}</h3>
        <p className="mt-4 max-w-3xl text-lg text-ivory/85">{step.what}</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Role label="Nicolas" text={step.nicolas} />
          <Role label="L’IA" text={step.ia} />
          <Role label="Vous" text={step.client} />
        </div>
        {playing ? (
          <div className="progress-bar mt-8" aria-hidden>
            <span style={{ animationDuration: `${STEP_MS}ms` }} />
          </div>
        ) : null}
      </article>
    </Section>
  );
}

function Role({ label, text }: { label: string; text: string }) {
  return (
    <div className="border-t border-ivory/20 pt-4">
      <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-ivory/75">{label}</p>
      <p className="mt-2 text-ivory/90">{text}</p>
    </div>
  );
}
