"use client";

import { useEffect, useRef } from "react";
import { offersCopy } from "@/config/copy";
import { offers } from "@/config/offers";
import { activeLocale } from "@/config";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { useLanding } from "@/components/providers/LandingProvider";
import { formatOfferPrice, formatPrice } from "@/lib/format-price";
import { track } from "@/lib/analytics";
import { cx } from "@/lib/cx";

export function Offers() {
  const locale = activeLocale();
  const { highlightedOffer, highlightOffer } = useLanding();
  const seen = useRef(new Set<string>());

  useEffect(() => {
    const nodes = document.querySelectorAll("[data-offer]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).dataset.offer;
          if (entry.isIntersecting && id && !seen.current.has(id)) {
            seen.current.add(id);
            track("offer_view", { offer_id: id });
          }
        }
      },
      { threshold: 0.45 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <Section id="offres" number={offersCopy.number} eyebrow={offersCopy.eyebrow} title={offersCopy.title} intro={offersCopy.intro}>
      <div className="mb-8 flex flex-wrap items-center gap-4 text-sm">
        <span className="border border-ink px-3 py-1 font-display text-xs uppercase tracking-[0.14em]">
          {offersCopy.localeBadge}
        </span>
        <p className="text-warm">{offersCopy.euNote}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {offers.map((offer) => {
          const setupKey = offer.priceKeys.setup;
          const recKey = offer.priceKeys.recurring;
          const setup = setupKey ? locale.prices[setupKey] : null;
          const recurring = recKey ? locale.prices[recKey] : null;
          const price = formatOfferPrice({
            setup: setupKey ? setup : null,
            recurring: recKey ? recurring : null,
            currency: locale.currency,
            missingLabel: locale.missingPriceLabel,
            setupLabel: offersCopy.setup,
            thenLabel: offersCopy.then,
            perMonth: offersCopy.perMonth,
          });

          const highlighted = highlightedOffer === offer.id;

          return (
            <article
              key={offer.id}
              id={`offre-${offer.id}`}
              data-offer={offer.id}
              className={cx(
                "flex flex-col border p-6 md:p-8",
                highlighted ? "border-red bg-paper" : "border-ink bg-ivory",
              )}
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="num text-sm">{offer.number}</span>
                <span className="font-display text-xs uppercase tracking-[0.16em] text-warm">
                  {offer.maturity}
                </span>
              </div>
              <h3 className="mt-4 font-display text-3xl font-semibold">{offer.name}</h3>
              <p className="mt-4 text-warm-strong">{offer.summary}</p>
              <p className="mt-6 font-display text-xl font-semibold tracking-tight">{price}</p>
              {setupKey && recKey && setup !== null && recurring !== null ? (
                <p className="sr-only">
                  {formatPrice(setup, locale.currency, locale.missingPriceLabel)} {offersCopy.setup},{" "}
                  {formatPrice(recurring, locale.currency, locale.missingPriceLabel)} {offersCopy.perMonth}
                </p>
              ) : null}
              <ul className="mt-6 flex-1 space-y-2 text-sm">
                {offer.includes.map((item) => (
                  <li key={item} className="border-t border-line pt-2">
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button
                  href="#candidater"
                  variant={highlighted ? "primary" : "secondary"}
                  className="w-full"
                  onClick={() => {
                    highlightOffer(offer.id);
                    track("offer_select", { offer_id: offer.id, source: "offer_card" });
                  }}
                >
                  {offersCopy.cta}
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
