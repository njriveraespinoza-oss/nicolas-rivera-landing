"use client";

import { orientation } from "@/config/copy";
import { offers } from "@/config/offers";
import { Section } from "@/components/ui/Section";
import { useLanding } from "@/components/providers/LandingProvider";
import { track } from "@/lib/analytics";

export function Orientation() {
  const { highlightOffer, highlightedOffer } = useLanding();

  return (
    <Section
      id="orientation"
      number={orientation.number}
      eyebrow={orientation.eyebrow}
      title={orientation.title}
      intro={orientation.intro}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {offers.map((offer) => (
          <button
            key={offer.id}
            type="button"
            onClick={() => {
              highlightOffer(offer.id);
              track("offer_select", { offer_id: offer.id, source: "orientation" });
              document.getElementById(`offre-${offer.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
            className={`min-h-16 border px-5 py-4 text-left font-display text-lg font-semibold transition-colors duration-300 ${
              highlightedOffer === offer.id ? "border-ink bg-ink text-ivory" : "border-line hover:border-ink"
            }`}
          >
            <span className="mr-3 num text-sm">{offer.number}</span>
            {offer.orientationLabel}
          </button>
        ))}
      </div>
    </Section>
  );
}
