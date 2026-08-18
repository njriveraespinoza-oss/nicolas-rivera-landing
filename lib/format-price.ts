import type { Currency } from "@/config/locales";

/**
 * Format suisse : CHF 1'200 — apostrophe, sans conversion de devise.
 */
export function formatAmount(amount: number): string {
  return Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, "’");
}

export function formatPrice(amount: number | null, currency: Currency, missingLabel: string) {
  if (amount === null) return missingLabel;
  return `${currency} ${formatAmount(amount)}`;
}

export function formatOfferPrice(opts: {
  setup: number | null;
  recurring: number | null;
  currency: Currency;
  missingLabel: string;
  setupLabel: string;
  thenLabel: string;
  perMonth: string;
}): string {
  const { setup, recurring, currency, missingLabel, setupLabel, thenLabel, perMonth } = opts;

  if (setup === null && recurring === null) return missingLabel;

  if (setup !== null && recurring !== null) {
    return `${formatPrice(setup, currency, missingLabel)} ${setupLabel}, ${thenLabel} ${formatPrice(recurring, currency, missingLabel)} ${perMonth}`;
  }

  if (setup !== null) {
    return formatPrice(setup, currency, missingLabel);
  }

  return `${formatPrice(recurring, currency, missingLabel)} ${perMonth}`;
}
