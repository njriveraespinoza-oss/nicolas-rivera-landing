"use client";

import { useState } from "react";
import { demo } from "@/config/copy";
import { site } from "@/config/site";
import { Section } from "@/components/ui/Section";
import { ProofSlot } from "@/components/ui/ProofSlot";
import { cx } from "@/lib/cx";

type OutputId = (typeof demo.outputs)[number]["id"];

export function Demo() {
  const [active, setActive] = useState<OutputId>(demo.outputs[0].id);
  const current = demo.outputs.find((o) => o.id === active) ?? demo.outputs[0];

  return (
    <Section
      id="demonstration"
      number={demo.number}
      eyebrow={demo.eyebrow}
      title={demo.title}
      intro={demo.intro}
    >
      <div className="grid gap-6 lg:grid-cols-12">
        <article className="border border-ink bg-paper p-6 md:p-8 lg:col-span-5">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-red">
            {demo.sourceEyebrow}
          </p>
          <h3 className="mt-2 font-display text-xl font-semibold">{demo.sourceLabel}</h3>
          <blockquote className="mt-6 font-serif text-xl italic leading-snug">
            {demo.source}
          </blockquote>
          <p className="mt-8 border-t border-line pt-6">
            <span className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-warm">
              {demo.ideaLabel}
            </span>
            <span className="mt-2 block text-lg font-medium">{demo.idea}</span>
          </p>
        </article>

        <div className="lg:col-span-7">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Formats produits">
            {demo.outputs.map((out) => (
              <button
                key={out.id}
                type="button"
                role="tab"
                aria-selected={active === out.id}
                onClick={() => setActive(out.id)}
                className={cx(
                  "min-h-11 border px-3 py-2 font-display text-xs font-semibold uppercase tracking-[0.12em]",
                  active === out.id ? "border-ink bg-ink text-ivory" : "border-line hover:border-ink",
                )}
              >
                {out.format}
              </button>
            ))}
          </div>

          <article role="tabpanel" className="mt-4 min-h-[280px] border border-ink p-6 md:p-8">
            <p className="font-display text-xs uppercase tracking-[0.16em] text-warm">{current.format}</p>
            <h3 className="mt-2 font-display text-2xl font-semibold">{current.title}</h3>
            {"slides" in current && current.slides ? (
              <ol className="mt-6 space-y-3">
                {current.slides.map((slide, i) => (
                  <li key={slide} className="flex gap-4 border-t border-line pt-3">
                    <span className="num text-sm">{String(i + 1).padStart(2, "0")}</span>
                    <span>{slide}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <pre className="mt-6 whitespace-pre-wrap font-sans text-base leading-relaxed text-warm-strong">
                {"body" in current ? current.body : ""}
              </pre>
            )}
          </article>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="font-display text-2xl font-semibold">{demo.proofTitle}</h3>
        <p className="mt-3 max-w-2xl text-warm-strong">{demo.proofIntro}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <ProofSlot
            label="Témoignages clients"
            hint={
              site.validatedProofs.length === 0
                ? "Aucun témoignage validé pour l’instant. [PREUVES_VALIDÉES]"
                : undefined
            }
          />
          <ProofSlot
            label="Cas clients"
            hint={
              site.validatedCaseStudies.length === 0
                ? "Aucun cas publié. [CAS_CLIENTS_VALIDÉS] — uniquement avec autorisation."
                : undefined
            }
          />
        </div>
      </div>
    </Section>
  );
}
