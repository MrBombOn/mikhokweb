# Testing

Minimális tesztfutás és polish checklist (Fázis 15 első kör).

## Lokális futtatás

- `npm run test` – node:test + tsx alapon futó unit/smoke tesztek.
- `npm run lint`
- `npm run build`

## Jelenlegi tesztlefedés (első kör)

- `tests/calculator.compute.test.ts`
  - KKI domain számítások (ghost kizárás, weighted/KI/KKI, üres input).
- `tests/csrf-and-rate-limit.test.ts`
  - CSRF origin ellenőrzés alaplogikája.
  - Login rate-limit küszöb és reset.

## Következő kör

- API route contract tesztek (status code + response shape).
- Admin flow smoke tesztek (login → users/categories/audit listázás).
- CI pipeline-ba `npm run test` beépítése.

