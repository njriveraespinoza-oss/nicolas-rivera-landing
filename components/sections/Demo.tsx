"use client";

import { useState } from "react";
import { demo } from "@/config/copy";
import { site } from "@/config/site";
import { Section } from "@/components/ui/Section";
import { ProofSlot } from "@/components/ui/ProofSlot";
import { Frame } from "@/components/ui/Frame";
import { Reveal } from "@/components/ui/Reveal";
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
        <Reveal as="article" className="lg:col-span-5">
          <Frame>
            <div className="border border-ink bg-paper p-6 md:p-8">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-red">
                {demo.sourceEyebrow}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold">{demo.sourceLabel}</h3>
              <blockquote className="mt-6 font-serif text-xl italic leading-snug md:text-[1.35rem]">
                {demo.source}
              </blockquote>
              <p className="mt-8 border-t border-line pt-6">
                <span className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-warm">
                  {demo.ideaLabel}
                </span>
                <span className="mt-2 block text-lg font-medium">{demo.idea}</span>
              </p>
            </div>
          </Frame>
        </Reveal>

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
                  "min-h-11 border px-3 py-2 font-display text-xs font-semibold uppercase tracking-[0.12em] transition-colors",
                  active === out.id ? "border-ink bg-ink text-ivory" : "border-line hover:border-ink",
                )}
              >
                {out.format}
              </button>
            ))}
          </div>

          <div key={current.id} className="artifact-enter mt-4">
            <Artifact output={current} />
          </div>
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

function Artifact({ output }: { output: (typeof demo.outputs)[number] }) {
  return (
    <article className="border border-ink bg-ivory">
      <div className="flex items-center justify-between border-b border-line px-4 py-2 md:px-5">
        <p className="font-display text-[0.65rem] uppercase tracking-[0.16em] text-warm">{output.format}</p>
        <p className="font-display text-[0.65rem] uppercase tracking-[0.14em] text-red">Brouillon · à valider</p>
      </div>
      <div className="p-5 md:p-7">
        <h3 className="font-display text-2xl font-semibold">{output.title}</h3>
        {output.id === "carousel" && "slides" in output && output.slides ? (
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {output.slides.map((slide, i) => (
              <div key={slide} className="slide-card">
                <span className="num text-sm">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-4 text-[0.95rem] leading-snug">{slide}</p>
              </div>
            ))}
          </div>
        ) : output.id === "post" && "body" in output ? (
          <div className="mt-6 border border-line bg-paper p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center bg-ink font-display text-xs text-ivory">
                NR
              </span>
              <div>
                <p className="font-medium leading-none">Nicolas Rivera</p>
                <p className="mt-1 text-sm text-warm">Publication · non diffusée</p>
              </div>
            </div>
            <pre className="mt-5 whitespace-pre-wrap font-sans text-[1.05rem] leading-relaxed">
              {output.body}
            </pre>
          </div>
        ) : output.id === "email" && "body" in output ? (
          <div className="mt-6 border border-line">
            <div className="border-b border-line bg-paper px-4 py-3 font-display text-xs uppercase tracking-[0.14em] text-warm">
              Message · suivi commercial
            </div>
            <pre className="whitespace-pre-wrap p-5 font-sans text-base leading-relaxed text-warm-strong">
              {output.body}
            </pre>
          </div>
        ) : "body" in output && output.body ? (
          <dl className="mt-6 grid gap-4">
            {output.body.split("\n").map((line) => {
              const [label, ...rest] = line.split(" : ");
              return (
                <div key={line} className="border-t border-line pt-3">
                  <dt className="font-display text-xs uppercase tracking-[0.14em] text-red">{label}</dt>
                  <dd className="mt-1 text-warm-strong">{rest.join(" : ")}</dd>
                </div>
              );
            })}
          </dl>
        ) : null}
      </div>
    </article>
  );
}
