import { seo as baseSeo } from "./copy";
import type { OfferId } from "./offers";

/**
 * Overlays pour de futures pages :
 * /consultants /formateurs /coachs /dirigeants /organismes-formation
 *
 * Ne pas créer ces routes tant que la page principale n’est pas seule en production.
 * Chaque overlay ne surcharge que ce qui doit changer.
 */

export type SegmentId =
  | "consultants"
  | "formateurs"
  | "coachs"
  | "dirigeants"
  | "organismes-formation";

export type SegmentOverlay = {
  id: SegmentId;
  path: `/${SegmentId}`;
  audienceLabel: string;
  problem?: string;
  vocabulary?: Record<string, string>;
  examples?: string[];
  featuredOffer?: OfferId;
  objections?: { q: string; a: string }[];
  ctas?: { primary?: string; secondary?: string };
  seo?: Partial<{ title: string; description: string }>;
};

export const segments: Record<SegmentId, SegmentOverlay> = {
  consultants: {
    id: "consultants",
    path: "/consultants",
    audienceLabel: "Consultants",
    problem:
      "Votre diagnostic est brillant en rendez-vous. En ligne, il tient en trois phrases génériques.",
    featuredOffer: "engine",
    vocabulary: {
      expertise: "votre cadre d’intervention",
      offre: "votre mission type",
    },
  },
  formateurs: {
    id: "formateurs",
    path: "/formateurs",
    audienceLabel: "Formateurs",
    problem:
      "La salle a entendu l’essentiel. Le marché n’a vu qu’un catalogue.",
    featuredOffer: "sprint",
    vocabulary: {
      expertise: "vos programmes",
      offre: "vos parcours",
    },
  },
  coachs: {
    id: "coachs",
    path: "/coachs",
    audienceLabel: "Coachs professionnels",
    problem:
      "La relation est votre métier. La publication vous demande d’être quelqu’un d’autre.",
    featuredOffer: "engine",
  },
  dirigeants: {
    id: "dirigeants",
    path: "/dirigeants",
    audienceLabel: "Dirigeants visibles",
    problem:
      "On vous demande d’être présent. On ne vous donne pas un système pour l’être sans vous épuiser.",
    featuredOffer: "os",
  },
  "organismes-formation": {
    id: "organismes-formation",
    path: "/organismes-formation",
    audienceLabel: "Organismes de formation",
    problem:
      "Les programmes existent. Les actifs commerciaux qui les portent restent artisanaux.",
    featuredOffer: "os",
  },
};

export type PageContent = {
  seo: { title: string; description: string };
  featuredOffer?: OfferId;
  problem?: string;
};

export function getPageContent(segment?: SegmentId): PageContent {
  if (!segment) {
    return { seo: { title: baseSeo.title, description: baseSeo.description } };
  }
  const overlay = segments[segment];
  return {
    seo: {
      title: overlay.seo?.title ?? `${overlay.audienceLabel} — ${baseSeo.title}`,
      description: overlay.seo?.description ?? baseSeo.description,
    },
    featuredOffer: overlay.featuredOffer,
    problem: overlay.problem,
  };
}
