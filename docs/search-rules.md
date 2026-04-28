# Search rules

## Scope (Fázis 20 – első kör)

- A globális kereső jelenleg három publikus modulban keres:
  - `news` (`GET /api/news`)
  - `events` (`GET /api/events`)
  - `guides` (`GET /api/guides`)
- A kliens aggregálja a találatokat, nincs külön központi index backend ebben a körben.

## Matching szabályok

- Kis/nagybetű érzéketlen részszó-keresés.
- Keresett mezők:
  - hírek: cím + szöveg (HU/EN),
  - események: cím + megjegyzés,
  - útmutatók: cím + kivonat (HU/EN).
- Maximum 40 találat listázása.

## Mentett keresések

- Mentés `localStorage`-ba történik (`v25_20-global-search-saved` kulcs).
- Maximum 20 keresés kerül tárolásra.
- A tárolás eszközszintű, nincs szerveroldali profil szinkron ebben a körben.

## Visszajelzési csatorna

- Nyilvános `POST /api/feedback` végpont.
- Validáció: `module`, `message`, opcionális `email`.
- Rate limit: 5 kérés / 10 perc / kliens kulcs (`x-forwarded-for`).
- Üzenetek szerver logba kerülnek strukturált eseményként (`public_feedback_received`), érzékeny mezők redakciós policy mellett.

## A11y minimum

- A keresőmező natív `type="search"` és `aria-label` attribútummal elérhető.
- A mentett keresések billentyűzettel aktiválható gombok.

# Keresési szabályok

Modulonkénti szűrési logika és közös keresési alapok: a `PROJECT_MASTER_SPEC.md` 19. fejezete az irányadó.
