export type ProfileId =
  | "consultant"
  | "formateur"
  | "coach"
  | "dirigeant"
  | "organisme"
  | "pme";

export type AssetId =
  | "offres"
  | "documents"
  | "formations"
  | "entretiens"
  | "cas"
  | "presentations";

export type FrequencyId = "jamais" | "irregulier" | "mensuel" | "hebdo";
export type GoalId = "visibilite" | "credibilite" | "acquisition" | "systeme";

export type DiagnosticAnswers = {
  profile: ProfileId;
  assets: AssetId[];
  frequency: FrequencyId;
  goal: GoalId;
};

export type DiagnosticResult = {
  headline: string;
  sourceLine: string;
  system: string[];
  cadence: string;
  firstMove: string;
  offerHint: "diagnostic" | "sprint" | "engine" | "os";
};

const profileNoun: Record<ProfileId, string> = {
  consultant: "une pratique de conseil",
  formateur: "une activité de formation",
  coach: "une pratique de coaching",
  dirigeant: "une parole de dirigeant",
  organisme: "un organisme de formation",
  pme: "une société de services fondée sur l’expertise",
};

const assetPhrase: Record<AssetId, string> = {
  offres: "vos offres",
  documents: "vos documents existants",
  formations: "vos supports de formation",
  entretiens: "vos entretiens",
  cas: "vos cas (même non publiés)",
  presentations: "vos présentations",
};

const frequencyLine: Record<FrequencyId, string> = {
  jamais:
    "Aujourd’hui presque rien ne sort. Le système sert d’abord à poser un rythme tenable, pas à « rattraper » un volume.",
  irregulier:
    "Vous produisez par à-coups. Le système sert à cesser de recommencer — pas à publier plus pour publier.",
  mensuel:
    "Vous communiquez déjà un peu. Le système relie ces efforts à une base unique, pour que chaque pièce en nourrisse une autre.",
  hebdo:
    "Le rythme est là. Ce qui manque, c’est la capitalisation : moins de page blanche, plus d’actifs réutilisables.",
};

const goalLine: Record<GoalId, { systemExtra: string; firstMove: string; offerHint: DiagnosticResult["offerHint"] }> = {
  visibilite: {
    systemExtra: "Priorité : un calendrier éditorial court, une voix stable, des publications et un carrousel récurrent — sans autopublication.",
    firstMove: "Commencer par clarifier le message et le rythme, puis produire à partir d’une seule source.",
    offerHint: "engine",
  },
  credibilite: {
    systemExtra: "Priorité : un point de vue net, des contenus de fond, un cas type ou un support qui montre comment vous travaillez.",
    firstMove: "Construire d’abord les actifs qui portent la crédibilité — page, cas, présentation — avant d’accélérer le volume.",
    offerHint: "sprint",
  },
  acquisition: {
    systemExtra: "Priorité : relier contenus, page, emails de suivi et support commercial. La visibilité sans préparation de la vente reste décorative.",
    firstMove: "Cartographier le chemin de l’idée jusqu’à la conversation commerciale, puis combler les trous.",
    offerHint: "sprint",
  },
  systeme: {
    systemExtra: "Priorité : une base interne (voix, sources, modèles, validation) que l’équipe peut opérer, plutôt qu’une prestation qui recommence chaque mois.",
    firstMove: "Installer le cadre — connaissance, voix, contrôles — avant de déléguer la production.",
    offerHint: "os",
  },
};

function joinFr(items: string[]): string {
  if (items.length === 0) return "ce que vous savez déjà";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} et ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} et ${items[items.length - 1]}`;
}

export function buildDiagnostic(answers: DiagnosticAnswers): DiagnosticResult {
  const assets = answers.assets.length
    ? answers.assets.map((id) => assetPhrase[id])
    : ["votre expertise orale, encore peu documentée"];

  const source = joinFr(assets);
  const goal = goalLine[answers.goal];

  const system: string[] = [
    "Un calendrier éditorial ancré dans une conversation récurrente",
    "Des publications et carrousels dans votre voix — à valider avant diffusion",
    "Une newsletter ou une note périodique, si elle sert vraiment l’offre",
  ];

  if (answers.assets.includes("offres") || answers.goal === "acquisition") {
    system.push("Une page ou un support qui dit l’offre comme vous la dites en rendez-vous");
  }
  if (answers.assets.includes("cas")) {
    system.push("Un cas type — anonyme si besoin — qui rend le métier visible");
  }
  if (answers.assets.includes("formations")) {
    system.push("Des extraits de formation transformés en actifs courts, pas en catalogue");
  }
  if (answers.assets.includes("presentations")) {
    system.push("Une présentation commerciale alignée sur le même message que vos contenus");
  }
  if (answers.goal === "acquisition") {
    system.push("Une séquence de suivi courte, écrite une fois, réutilisable");
  }
  if (answers.goal === "systeme") {
    system.push("Une base de connaissance, un guide de voix, des contrôles qualité");
  }

  const unique = [...new Set(system)].slice(0, 6);

  const hasLittle =
    answers.frequency === "jamais" || answers.frequency === "irregulier";
  const offerHint: DiagnosticResult["offerHint"] = hasLittle && answers.goal !== "systeme"
    ? answers.assets.length <= 1
      ? "diagnostic"
      : goal.offerHint
    : goal.offerHint;

  return {
    headline: `Une conversation régulière + ${source} peuvent alimenter un système cohérent — pas une file de posts isolés.`,
    sourceLine: `À partir de ${profileNoun[answers.profile]}, ${source} deviennent la matière première.`,
    system: unique,
    cadence: frequencyLine[answers.frequency],
    firstMove: goal.firstMove,
    offerHint,
  };
}
