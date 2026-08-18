"use client";

import { faq } from "@/config/copy";
import { Section } from "@/components/ui/Section";

export function Faq() {
  return (
    <Section id="faq" number={faq.number} eyebrow={faq.eyebrow} title={faq.title}>
      <div className="divide-y divide-line border-y border-line">
        {faq.items.map((item, i) => (
          <details key={item.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-display text-xl font-semibold tracking-tight md:text-2xl">
              <span>
                <span className="num mr-3 text-sm">{String(i + 1).padStart(2, "0")}</span>
                {item.q}
              </span>
              <span aria-hidden className="mt-1 font-display text-warm transition-transform duration-300 group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-4 max-w-3xl pl-0 text-warm-strong md:pl-10">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
