# Rapport QA — landing Nicolas Rivera

Audit après implémentation et corrections (contraste fond sombre, démo 90s déclenchée depuis le hero, textes atténués relevés).

Notes /10. N/D = dépend d’une information que Nicolas doit encore fournir. Pas de gonflage.

| Dimension | Note | Commentaire |
|---|---|---|
| Clarté | 9 | Hero : pour qui, problème, résultat, mécanisme, action — lisible en quelques secondes. |
| Pertinence pour la cible | 9 | Consultants, formateurs, coachs, dirigeants, organismes, PME d’expertise. Filtre « ce n’est pas pour vous » dans le formulaire. |
| Force de la proposition de valeur | 9 | Transformation d’expertise en système, pas un volume de contenus. |
| Différenciation | 9 | Conversation → infrastructure → validation. Tagline tenue partout. |
| Crédibilité | 8 | Processus visible, ton honnête, aucun faux résultat. Reste en deçà de 9 sans portrait ni raison sociale. Slot photo et mentions sont explicites. |
| Qualité des preuves | N/D | Aucun cas client ni témoignage validé. Slots `[PREUVES_VALIDÉES]` / `[CAS_CLIENTS_VALIDÉS]`. Démo sur le propre système de Nicolas à la place. |
| Fluidité du parcours | 9 | Diagnostic → dispersion → mécanisme → démo → offres → orientation → FAQ → candidature. |
| Réduction des objections | 9 | 12 questions, réponses honnêtes, réglementé = évaluation individuelle. |
| Lisibilité | 9 | Hiérarchie éditoriale, phrases courtes, respiration. |
| Expérience mobile | 9 | Pas de carrousel horizontal, tap targets ≥ 44px, sections empilées, CTA sticky desktop seulement. |
| Accessibilité | 9 | Skip link, focus visible, labels, erreurs, `prefers-reduced-motion`, contrastes fond sombre corrigés. À retester avec un lecteur d’écran une fois en ligne. |
| Vitesse | 9 | Pages statiques, pas d’images lourdes, pas de trackers. OG/icon générés. Mesure Lighthouse terrain à faire sur l’hébergeur réel. |
| Cohérence des CTA | 9 | Hero → diagnostic / système. Offres et orientation → formulaire. Header / sticky → candidature. |
| Qualité du formulaire | 9 | 6 champs, consentement non précoché, marketing séparé, erreurs claires, préremplissage diagnostic. |
| Conformité | 8 | Collecte minimale, pas de cookies non essentiels. Mentions et confidentialité structurées mais incomplètes (`[ADRESSE_LÉGALE]`, `[STATUT_TVA]`, hébergeur). |
| Capacité à être déclinée | 9 | `getPageContent(segment)` + overlays. Routes segments non créées, comme demandé. Locales CH/EU séparées, sans conversion. |

## Corrections appliquées pendant l’audit

1. Numéros rouges illisibles sur fond noir → rouge clair sur `.bg-ink`.
2. Textes atténués (ivoire 50–60 %) relevés sur footer, mécanisme, formulaire.
3. CTA « Voir le système en 90 secondes » lance la lecture guidée, pas seulement l’ancre.
4. `prefers-reduced-motion` : la démo affiche toutes les étapes sans autoplay.

## Vérifications binaires

- Aucun témoignage, logo ou résultat inventé.
- Aucune promesse de leads, ventes ou revenus.
- Aucune urgence artificielle, popup, chatbot, discount.
- Prix suisses depuis `config/locales.ts`. Prix EU non convertis (vides).
- Consentement marketing séparé, non précoché.
- Aucun tracker chargé.

## Reste bloqué par des infos manquantes

Voir `docs/INFORMATIONS-A-FOURNIR.md`. Tant que photo, calendrier, analytics, formulaire et identité légale manquent, crédibilité / preuves / conformité ne peuvent pas honnêtement passer à 9.
