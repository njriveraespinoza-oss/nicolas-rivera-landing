"use client";

import { hero } from "@/config/copy";
import { Button } from "@/components/ui/Button";
import { track } from "@/lib/analytics";

export function Hero() {
  return (
    <section id="hero" className="relative border-b border-line px-[6vw] py-16 md:py-24 lg:min-h-[88vh] lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-9">
          <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-red md:text-xs">
            {hero.eyebrow}
          </p>
          <h1 className="mt-6 font-display text-[2.35rem] font-semibold leading-[1.02] tracking-tight md:text-6xl lg:text-[4.35rem]">
            {hero.title}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-warm-strong md:text-xl">
            {hero.subtitle}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              href={hero.primaryHref}
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
        <aside className="flex flex-col justify-end border-t border-line pt-8 lg:col-span-3 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <p className="font-serif text-xl italic leading-snug">{hero.audienceNote}</p>
          <p className="mt-6 font-display text-xs uppercase tracking-[0.16em] text-warm">{hero.audience}</p>
        </aside>
      </div>
    </section>
  );
}
