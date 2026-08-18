import type { LocaleId } from "./site";

export type Currency = "CHF" | "EUR";

export type PriceKey =
  | "diagnostic"
  | "sprint"
  | "engine"
  | "osSetup"
  | "osMaintenance";

export type LocaleConfig = {
  id: LocaleId;
  label: string;
  countryLabel: string;
  currency: Currency;
  legalFrame: string;
  priceNote: string | null;
  missingPriceLabel: string;
  prices: Record<PriceKey, number | null>;
};

/**
 * Les tarifs européens ne sont jamais une conversion des tarifs suisses.
 * Tant qu’ils ne sont pas fournis, l’UI affiche « Tarif Europe : à définir ».
 */
export const locales: Record<LocaleId, LocaleConfig> = {
  "ch-fr": {
    id: "ch-fr",
    label: "Suisse",
    countryLabel: "Suisse romande",
    currency: "CHF",
    legalFrame:
      "Prestations conçues et fournies depuis la Suisse. Les conditions, la TVA et les mentions applicables relèvent du droit suisse.",
    priceNote: null,
    missingPriceLabel: "Tarif à préciser",
    prices: {
      diagnostic: 1200,
      sprint: 3900,
      engine: 1490,
      osSetup: 5900,
      osMaintenance: 690,
    },
  },
  "eu-fr": {
    id: "eu-fr",
    label: "Europe",
    countryLabel: "France, Belgique et Union européenne",
    currency: "EUR",
    legalFrame:
      "Les conditions commerciales, la TVA et les mentions applicables dans l’Union européenne seront précisées lorsque cette variante locale sera activée. Elles ne sont pas déduites des conditions suisses.",
    priceNote:
      "Les tarifs européens sont définis séparément. Ils ne sont pas une conversion des tarifs suisses.",
    missingPriceLabel: "Tarif Europe : à définir",
    prices: {
      diagnostic: null,
      sprint: null,
      engine: null,
      osSetup: null,
      osMaintenance: null,
    },
  },
};

export function getLocale(id: LocaleId): LocaleConfig {
  return locales[id];
}
