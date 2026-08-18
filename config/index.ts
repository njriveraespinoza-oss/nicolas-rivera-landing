import { site } from "./site";
import { getLocale } from "./locales";
import { offers } from "./offers";

export { site } from "./site";
export { locales, getLocale } from "./locales";
export { offers, offerById } from "./offers";
export { segments, getPageContent } from "./segments";
export { pageEvents, eventCatalog } from "./analytics";
export * as copy from "./copy";

export function activeLocale() {
  return getLocale(site.activeLocale);
}

export function allOffers() {
  return offers;
}
