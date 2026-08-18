"use client";

import { useEffect, useRef, useState } from "react";
import { hero } from "@/config/copy";
import { mechanism } from "@/config/copy";
import { Button } from "@/components/ui/Button";
import { Frame } from "@/components/ui/Frame";
import { Pipeline } from "@/components/ui/Pipeline";
import { track } from "@/lib/analytics";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const TITLE = [
  "Transformez votre expertise",
  "en un système qui attire,",
  "convainc et prépare la vente.",
];

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const paused = useRef(false);
  const step = mechanism.steps[active];

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      if (paused.current) return;
      setActive((i) => (i + 1) % mechanism.steps.length);
    }, 2400);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <section
      id="hero"
      className="relative grid-page overflow-hidden border-b border-ink px-[6vw] py-16 md:py-24 lg:min-h-[92vh] lg:py-28"
    >
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-12 lg:gap-10 lg:items-end">
        <div className="lg:col-span-8">
          <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-red md:text-xs">
            {hero.eyebrow}
          </p>
          <h1 className="mt-6 font-display text-[2.35rem] font-semibold leading-[1.02] tracking-tight md:text-6xl lg:text-[4.15rem]">
            {TITLE.map((line) => (
              <span key={line} className="hero-line">
                <span>{line}</span>
              </span>
            ))}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-warm-strong md:text-xl">
            {hero.subtitle}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              href={hero.primaryHref}
              arrow
              onClick={() =>
                track("hero_primary_cta_click", {
                  cta_label: hero.primaryCta,
                  location: "hero",
                })
              }
            >
              {hero.primaryCta}
            </Button>
            <Button
              href={hero.secondaryHref}
              variant="secondary"
              arrow
              onClick={() => {
                track("system_demo_start", { source: "hero", module: "mechanism" });
                window.dispatchEvent(new Event("nr:play-system"));
              }}
            >
              {hero.secondaryCta}
            </Button>
          </div>
          <p className="mt-5 text-sm text-warm">{hero.reassurance}</p>
        </div>

        <aside className="lg:col-span-4">
          <Frame>
            <div className="border border-ink bg-paper/80 p-5 backdrop-blur-[2px] md:p-6">
              <p className="font-display text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-red">
                Le mécanisme
              </p>
              <p className="mt-3 font-serif text-xl italic leading-snug">{hero.audienceNote}</p>
              <div className="mt-6">
                <Pipeline
                  active={active}
                  compact
                  onSelect={(i) => {
                    paused.current = true;
                    setActive(i);
                  }}
                />
              </div>
              <p className="mt-6 min-h-[3.5rem] border-t border-line pt-4 text-sm text-warm-strong">
                <span className="font-display text-xs uppercase tracking-[0.14em] text-ink">
                  {String(active + 1).padStart(2, "0")} {step.title}.
                </span>{" "}
                {step.what}
              </p>
            </div>
          </Frame>
          <p className="mt-4 font-display text-[0.65rem] uppercase tracking-[0.16em] text-warm">
            {hero.audience}
          </p>
        </aside>
      </div>
    </section>
  );
}
