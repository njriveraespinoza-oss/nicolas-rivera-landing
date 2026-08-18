export type QualifyPayload = {
  name: string;
  company: string;
  presence: string;
  situation: string;
  outcome: string;
  email: string;
  consent: boolean;
  marketing: boolean;
  offerHint?: string;
  diagnosticSummary?: string;
};

export type FieldErrors = Partial<Record<keyof QualifyPayload, string>>;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateQualify(input: QualifyPayload): FieldErrors {
  const errors: FieldErrors = {};

  if (!input.name?.trim() || input.name.trim().split(/\s+/).length < 2) {
    errors.name = "Indiquez prénom et nom.";
  }
  if (!input.company?.trim()) {
    errors.company = "Indiquez l’entreprise.";
  }
  if (!input.presence?.trim()) {
    errors.presence = "Un site ou un profil LinkedIn permet de se préparer.";
  }
  if (!input.situation?.trim() || input.situation.trim().length < 20) {
    errors.situation = "Décrivez la situation en quelques phrases (20 caractères minimum).";
  }
  if (!input.outcome?.trim() || input.outcome.trim().length < 12) {
    errors.outcome = "Indiquez le résultat que vous cherchez.";
  }
  if (!input.email?.trim() || !emailRe.test(input.email.trim())) {
    errors.email = "Indiquez un email professionnel valide.";
  }
  if (!input.consent) {
    errors.consent = "Le consentement est nécessaire pour traiter cette demande.";
  }

  return errors;
}
