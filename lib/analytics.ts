import { site } from "@/config/site";
import type { PageEvent } from "@/config/analytics";

type Props = Record<string, string | number | boolean | null | undefined>;

/**
 * Adaptateur analytics.
 * No-op tant que [OUTIL_ANALYTICS] n’est pas renseigné.
 * Aucun tracker n’est chargé — donc aucun bandeau cookies pour l’instant.
 */
export function track(event: PageEvent, properties: Props = {}) {
  if (typeof window === "undefined") return;

  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", event, properties);
  }

  if (!site.analyticsTool) return;

  const w = window as Window & {
    dataLayer?: unknown[];
    nicolasTrack?: (e: string, p: Props) => void;
  };

  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event, ...properties });
  w.nicolasTrack?.(event, properties);
}
