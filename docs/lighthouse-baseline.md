# Lighthouse baseline (D8)

Egyszeru vizualis regresszio checklist a D8 masodik merfoldkohez.

## Scope

- `/`
- `/news`
- `/calendar`

## Meresi beallitas

- Desktop profil (Chrome Lighthouse default)
- Mobile profil (Chrome Lighthouse default)
- azonos build (`npm run build && npm run start`)
- cache torles minden meres elott

## Eredmeny sablon

| Oldal | Profil | Performance | Accessibility | Best Practices | SEO | Megjegyzes |
|-------|--------|-------------|---------------|----------------|-----|-----------|
| `/` | desktop | TBD | TBD | TBD | TBD | baseline |
| `/` | mobile | TBD | TBD | TBD | TBD | baseline |
| `/news` | desktop | TBD | TBD | TBD | TBD | baseline |
| `/news` | mobile | TBD | TBD | TBD | TBD | baseline |
| `/calendar` | desktop | TBD | TBD | TBD | TBD | baseline |
| `/calendar` | mobile | TBD | TBD | TBD | TBD | baseline |

## Regresszio trigger

- >10 pont eses barmelyik kategoriaban ugyanazon oldalon/profilon.
- Accessibility vagy SEO 90 ala esik.
- uj critical issue jelenik meg (LCP/CLS/contrast/navigation).
