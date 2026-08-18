/**
 * Configuration unique du site.
 * Remplacer les `null` et tableaux vides — ne jamais inventer une preuve,
 * un tarif européen ou une information légale manquante.
 */

export const PLACEHOLDER = {
  photo: "[PHOTO_NICOLAS]",
  email: "[EMAIL]",
  phone: "[TÉLÉPHONE]",
  calendar: "[LIEN_CALENDRIER]",
  linkedin: "[LIEN_LINKEDIN]",
  country: "[PAYS]",
  currency: "[DEVISE]",
  vat: "[STATUT_TVA]",
  address: "[ADRESSE_LÉGALE]",
  formTool: "[OUTIL_FORMULAIRE]",
  analytics: "[OUTIL_ANALYTICS]",
  proofs: "[PREUVES_VALIDÉES]",
  cases: "[CAS_CLIENTS_VALIDÉS]",
  brand: "[NOM_MARQUE]",
  fullName: "[NOM_COMPLET]",
} as const;

export type LocaleId = "ch-fr" | "eu-fr";

export const site = {
  brandName: "Nicolas Rivera",
  fullName: "Nicolas Rivera",
  firstName: "Nicolas",

  photo: {
    src: null as string | null,
    alt: "Portrait de Nicolas Rivera — à fournir",
    placeholder: PLACEHOLDER.photo,
  },

  email: {
    value: "nj.riveraespinoza@gmail.com",
    publicConfirmed: false,
    placeholder: PLACEHOLDER.email,
  },

  phone: null as string | null,
  calendarUrl: null as string | null,
  linkedinUrl: null as string | null,

  country: "CH" as const,
  activeLocale: "ch-fr" as LocaleId,
  domain: null as string | null,
  legalEntity: null as string | null,
  legalAddress: null as string | null,
  vatStatus: null as string | null,
  responseSla: null as string | null,

  formTool: null as string | null,
  analyticsTool: null as string | null,

  validatedProofs: [] as ReadonlyArray<{
    id: string;
    quote: string;
    author: string;
    role: string;
    company?: string;
  }>,
  validatedCaseStudies: [] as ReadonlyArray<{
    id: string;
    title: string;
    summary: string;
    href?: string;
  }>,

  tagline: "L’IA en coulisses. Votre expertise au premier plan.",
  origin: "Suisse romande",
} as const;

export type SiteConfig = typeof site;
