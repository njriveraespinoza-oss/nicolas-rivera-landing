# Carte des événements analytiques

Aucun tracker n’est chargé tant que `site.analyticsTool` (`[OUTIL_ANALYTICS]`) est vide.
`lib/analytics.ts` reste un no-op en production dans ce cas. En développement, les événements sont loggés dans la console.

Pas de bandeau cookies : il n’y a pas de traceurs non essentiels.

## Événements de page

| Événement | Quand | Propriétés |
|---|---|---|
| `hero_primary_cta_click` | Clic CTA principal du hero | `cta_label`, `location` |
| `system_demo_start` | Début du diagnostic ou de la démo 90s | `source`, `module` |
| `system_demo_complete` | Cartographie affichée ou démo terminée | `module`, `profile`, `goal` |
| `offer_view` | Offre visible dans le viewport | `offer_id` |
| `offer_select` | Choix via orientation ou carte d’offre | `offer_id`, `source` |
| `qualification_form_start` | Premier focus sur le formulaire | `prefilled_from_diagnostic` |
| `qualification_form_submit` | Soumission valide | `situation`, `offer_hint` |
| `calendar_open` | Clic sur le lien calendrier | `location` |
| `appointment_booked` | À brancher quand le calendrier émet un callback | `source` |

`appointment_booked` n’est pas émis tant que `[LIEN_CALENDRIER]` n’est pas connecté à un événement de confirmation.

## Indicateurs commerciaux (hors page)

À suivre dans le CRM / tableur, pas uniquement le taux de formulaire :

- qualification des demandes
- rendez-vous tenus
- opportunités
- ventes
- revenu
- offre sélectionnée
- délai de conversion
- source d’acquisition

Le taux de formulaires n’est pas l’indicateur unique. Une demande filtrée et tenue vaut mieux que dix formulaires hors cible.
