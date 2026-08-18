export type OfferId = "diagnostic" | "sprint" | "engine" | "os";

export type Offer = {
  id: OfferId;
  number: string;
  maturity: string;
  name: string;
  verb: string;
  orientationLabel: string;
  orientationNeed: string;
  summary: string;
  includes: string[];
  priceKeys: {
    setup?: "diagnostic" | "sprint" | "osSetup";
    recurring?: "engine" | "osMaintenance";
  };
  cadence?: string;
};

export const offers: Offer[] = [
  {
    id: "diagnostic",
    number: "01",
    maturity: "Comprendre",
    name: "Diagnostic",
    verb: "Clarifier",
    orientationLabel: "Clarifier mon système.",
    orientationNeed: "clarifier",
    summary:
      "Un audit IA, communication et acquisition. Vous repartez avec une architecture de message et un plan d’action de 30 jours — pas une pile de slides.",
    includes: [
      "Entretien stratégique",
      "Audit des actifs existants",
      "Opportunités prioritaires",
      "Architecture de message",
      "Plan d’action de 30 jours",
      "Restitution",
    ],
    priceKeys: { setup: "diagnostic" },
  },
  {
    id: "sprint",
    number: "02",
    maturity: "Construire",
    name: "Sprint",
    verb: "Construire",
    orientationLabel: "Construire mes actifs commerciaux.",
    orientationNeed: "construire",
    summary:
      "Le système commercial initial : positionnement, page, présentation, cas type, suivi — et un assistant fondé sur vos sources, pas sur un modèle générique.",
    includes: [
      "Positionnement",
      "Landing page",
      "Présentation commerciale",
      "Cas client type",
      "Séquence de suivi",
      "Assistant fondé sur vos sources",
      "Documentation et validation",
    ],
    priceKeys: { setup: "sprint" },
  },
  {
    id: "engine",
    number: "03",
    maturity: "Faire fonctionner",
    name: "Engine",
    verb: "Produire",
    orientationLabel: "Produire régulièrement.",
    orientationNeed: "produire",
    summary:
      "L’abonnement mensuel. Une conversation stratégique alimente le système. Vous validez. Rien ne part sans vous.",
    includes: [
      "Conversation stratégique mensuelle",
      "Plan éditorial",
      "Contenus et carrousels",
      "Newsletter",
      "Actif commercial mensuel",
      "Validation",
      "Amélioration continue",
    ],
    priceKeys: { recurring: "engine" },
    cadence: "par mois",
  },
  {
    id: "os",
    number: "04",
    maturity: "Installer",
    name: "AI Communication OS",
    verb: "Installer",
    orientationLabel: "Installer ce système dans mon entreprise.",
    orientationNeed: "installer",
    summary:
      "Un système interne complet : base de connaissance, voix, assistants, contrôles. Pour les équipes qui veulent opérer elles-mêmes, avec un cadre.",
    includes: [
      "Base de connaissance",
      "Guide de voix",
      "Assistants et workflows",
      "Modèles",
      "Contrôles qualité",
      "Tableau de pilotage",
      "Formation",
      "Maintenance",
    ],
    priceKeys: { setup: "osSetup", recurring: "osMaintenance" },
    cadence: "par mois",
  },
];

export const offerById = Object.fromEntries(
  offers.map((offer) => [offer.id, offer]),
) as Record<OfferId, Offer>;
