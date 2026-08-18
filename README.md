# Nicolas Rivera — site commercial

Landing B2B : systèmes de communication et d’acquisition assistés par IA.

L’IA en coulisses. Votre expertise au premier plan.

## Démarrer

```bash
npm install
npm run dev
```

Build de production :

```bash
npm run build
npm start
```

## Modifier le contenu

Tout passe par `config/` :

| Fichier | Rôle |
|---|---|
| `config/site.ts` | Marque, contact, placeholders, preuves |
| `config/locales.ts` | Suisse (CHF) et Europe (EUR, tarifs distincts) |
| `config/offers.ts` | Offres et structure de prix |
| `config/copy.ts` | Textes de la page |
| `config/analytics.ts` | Carte d’événements |
| `config/segments.ts` | Overlays futurs (`/consultants`, etc.) — non routés |

Les tarifs européens **ne sont jamais** une conversion des tarifs suisses.

## Pages

- `/` — landing
- `/confirmation` — après candidature
- `/mentions-legales`
- `/confidentialite`

## Formulaire et mesure

Sans `[OUTIL_FORMULAIRE]`, les candidatures sont enregistrées localement dans `data/submissions.jsonl` (fichier ignoré par git).

Sans `[OUTIL_ANALYTICS]`, `track()` ne charge aucun cookie. Voir `docs/ANALYTICS.md`.

## Infos encore manquantes

Voir `docs/INFORMATIONS-A-FOURNIR.md`.

## QA

Voir `docs/QA.md`.
