/**
 * Carte des événements.
 * Rien n’est envoyé tant que site.analyticsTool n’est pas configuré.
 */

export const pageEvents = [
  "hero_primary_cta_click",
  "system_demo_start",
  "system_demo_complete",
  "offer_view",
  "offer_select",
  "qualification_form_start",
  "qualification_form_submit",
  "calendar_open",
  "appointment_booked",
] as const;

export type PageEvent = (typeof pageEvents)[number];

export const commercialEvents = [
  "request_qualification",
  "appointment_held",
  "opportunity_created",
  "sale_closed",
  "revenue_recorded",
  "offer_selected",
  "time_to_conversion",
  "acquisition_source",
] as const;

export type CommercialEvent = (typeof commercialEvents)[number];

export const eventCatalog: Record<
  PageEvent,
  { meaning: string; properties: string[] }
> = {
  hero_primary_cta_click: {
    meaning: "Clic sur le CTA principal du hero (vers le diagnostic).",
    properties: ["cta_label", "location"],
  },
  system_demo_start: {
    meaning: "Le visiteur commence le diagnostic ou la démonstration du système.",
    properties: ["source", "module"],
  },
  system_demo_complete: {
    meaning: "Le visiteur a obtenu une cartographie ou terminé la démo 90s.",
    properties: ["module", "profile", "goal"],
  },
  offer_view: {
    meaning: "Une offre est entrée dans le viewport.",
    properties: ["offer_id"],
  },
  offer_select: {
    meaning: "Une offre est choisie via le sélecteur d’orientation ou un CTA d’offre.",
    properties: ["offer_id", "source"],
  },
  qualification_form_start: {
    meaning: "Premier focus ou interaction sur le formulaire.",
    properties: ["prefilled_from_diagnostic"],
  },
  qualification_form_submit: {
    meaning: "Soumission valide du formulaire de qualification.",
    properties: ["situation", "offer_hint"],
  },
  calendar_open: {
    meaning: "Ouverture du lien de prise de rendez-vous.",
    properties: ["location"],
  },
  appointment_booked: {
    meaning: "Réservation confirmée — à brancher quand le calendrier émet un callback.",
    properties: ["source"],
  },
};
