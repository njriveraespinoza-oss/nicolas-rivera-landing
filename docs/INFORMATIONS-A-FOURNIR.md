# Informations à fournir avant mise en production publique

Ne rien inventer. Remplacer les placeholders dans `config/site.ts` et `config/locales.ts`.

## Identité et contact

| Clé | Statut | Où |
|---|---|---|
| `[NOM_MARQUE]` | Renseigné : Nicolas Rivera — à confirmer s’il existe un nom de produit | `site.brandName` |
| `[NOM_COMPLET]` | Renseigné : Nicolas Rivera | `site.fullName` |
| `[PHOTO_NICOLAS]` | Manquant — portrait authentique (pas d’image générée) | `site.photo.src` |
| `[EMAIL]` | Valeur de travail : `nj.riveraespinoza@gmail.com` — **à confirmer comme email public** | `site.email` |
| `[TÉLÉPHONE]` | Manquant | `site.phone` |
| `[LIEN_CALENDRIER]` | Manquant | `site.calendarUrl` |
| `[LIEN_LINKEDIN]` | Manquant (profil exact à confirmer) | `site.linkedinUrl` |
| Domaine public | Manquant | `site.domain` |

## Légal

| Clé | Statut |
|---|---|
| `[PAYS]` | Suisse (affichage). Variante EU préparée, non activée. |
| `[DEVISE]` | CHF actif. EUR préparé, tarifs vides. |
| `[STATUT_TVA]` | Manquant |
| `[ADRESSE_LÉGALE]` | Manquant |
| Raison sociale / forme juridique | Manquant |
| Hébergeur | Manquant |
| Délai de réponse (`responseSla`) | Manquant — la page de confirmation le dit clairement |
| Durée de conservation des données | Manquant |

## Offres

| Clé | Statut |
|---|---|
| `[PRIX_DIAGNOSTIC]` | CHF 1’200 (Suisse) |
| `[PRIX_SPRINT]` | CHF 3’900 (Suisse) |
| `[PRIX_ENGINE]` | CHF 1’490 / mois (Suisse) |
| `[PRIX_OS_SETUP]` | CHF 5’900 (Suisse) |
| `[PRIX_OS_MAINTENANCE]` | CHF 690 / mois (Suisse) |
| Tarifs Europe (EUR) | Tous manquants — affichage « Tarif Europe : à définir » si la locale `eu-fr` est activée. **Pas de conversion.** |

## Outils

| Clé | Statut |
|---|---|
| `[OUTIL_FORMULAIRE]` | Manquant — fallback local `data/submissions.jsonl` |
| `[OUTIL_ANALYTICS]` | Manquant — aucun tracker chargé |

## Preuves

| Clé | Statut |
|---|---|
| `[PREUVES_VALIDÉES]` | Vide — slots visibles, non remplis |
| `[CAS_CLIENTS_VALIDÉS]` | Vide — slots visibles, non remplis |

## Après branchement analytics

Prévoir consentement avant chargement des traceurs, puis bandeau cookies. Aujourd’hui : inutile.
