# Biztonsági séta (réteg D – Fázis 5)

Célzott útmutató a **JWT session**, **admin útvonal védelem**, **CSRF / same-origin**, **rate limit** és **aktuális felhasználó** lekéréshez. Nem helyettesíti a `docs/rbac.md` és `docs/api.md` teljes szövegét — kereshető kiindulópont.

---

## 1. Edge: `middleware.ts`

| Kérdés | Válasz |
|--------|--------|
| **Mit véd?** | `matcher`: `/admin`, `/admin/*`, valamint **`POST`** célú végpontok: `/api/feedback`, `/api/bookings`, `/api/auth/login` (Fázis 16: burst rate limit IP + útvonal szerint, lásd `lib/security/edge-critical-post-limit.ts`). |
| **Mit nem használ?** | Prisma — Edge-kompatibilitás; admin ágban csak `jose` `jwtVerify`. |
| **Sikeres admin kérés** | `SESSION_COOKIE` JWT érvényes, `role` ∈ `{ OFFICE, ADMIN }` → `NextResponse.next()`. |
| **Sikertelen admin** | Redirect `/` + `?admin=denied` (titok hiba, hiányzó süti, lejárt/rossz JWT, rossz szerepkör). |
| **Kritikus POST túl gyakran** | `429` JSON (`rate_limited`) — kiegészíti a route-on belüli limitereket; élesben érdemes WAF/proxy is: [`security-disclosure.md`](./security-disclosure.md), [`security-waf-proxy-rulebook.md`](./security-waf-proxy-rulebook.md). |

**Titok:** `getSessionSecretBytes()` — `lib/auth/session.ts`; productionban kötelező `AUTH_SECRET` (≥32 karakter).

---

## 2. JWT session: `lib/auth/session.ts`

- **Süti neve:** `SESSION_COOKIE` (`hok_session`).
- **Aláírás:** HS256 (`SignJWT` / `jwtVerify`), payload: `sub` (user id), `role` (`OFFICE` | `ADMIN`).
- **Élettartam:** `SESSION_MAX_AGE_SEC` (7 nap).
- **Login után:** `signSessionToken` — hívás: `app/api/auth/login/route.ts` (bcrypt ellenőrzés után).

A fájl **fejléc kommentje** részletezi Edge vs Node használatot.

---

## 3. Jelszó: `lib/auth/password.ts`

- `bcryptjs` hash / verify — regisztráció nélküli demó userek seedből; élesben ugyanígy ne tároljunk plaintext jelszót.

---

## 4. API route-okban: `lib/auth/current-user.ts`

| Funkció | Szerep |
|---------|--------|
| `getCurrentUser()` | `cookies()` → JWT verify → `prisma.user.findUnique` — **szerver** route handlerben. |
| `canManageNews` / `isAdmin` | RBAC segédek Prisma `UserRole` enumhoz. |

Minden védett **írás** előtt: session + szerepkör ellenőrzés a konkrét route-ban (minták: `app/api/news/*`, `app/api/about/*`, …).

---

## 5. CSRF / same-origin: `lib/security/csrf.ts`

**`enforceSameOrigin(request)`**

- Összehasonlítja a kérés **URL origin**jét a `Origin` fejléc originjével, vagy ha nincs `Origin`, a `Referer` originjével.
- **Production:** ha mindkettő hiányzik → `403` (védett böngészős POST/PATCH/DELETE).
- **Development:** engedélyezés origin nélkül (curl / Postman) — fejléc komment a fájlban.

**Bekötés:** state-changing `app/api/**/route.ts` handlerek elején — részletes lista a repo `grep enforceSameOrigin` paranccsal; összefoglaló: `docs/decision-log.md` (origin/referer guard döntés), `docs/api.md`.

**Teszt:** `tests/csrf-and-rate-limit.test.ts`.

---

## 6. Rate limit

| Fájl | Cél |
|------|-----|
| `lib/security/login-rate-limit.ts` | Sikertelen belépések ablak szerint; blokkolás IP kulccsal. |
| `lib/security/feedback-rate-limit.ts` | Publikus `POST /api/feedback` — `X-Forwarded-For` (vagy `unknown`) szerinti kulcs; ablakonként max posztok. |

Mindkettő **memória** alapú (egy Node folyamat) — horizontális skálán érdemes később Redis / közös store (külön döntés).

---

## 7. Olvasási sorrend javaslat

1. `middleware.ts` + `lib/auth/session.ts`
2. `app/api/auth/login/route.ts` + `app/api/auth/session/route.ts`
3. Egy minta védett resource: pl. `app/api/news/route.ts` (POST) — `enforceSameOrigin` + `getCurrentUser` + Zod
4. `lib/security/csrf.ts` + tesztek

**Kapcsolódó:** `docs/rbac.md`, `docs/api.md`, `docs/decision-log.md`, `docs/modules/search.md` (feedback).

---

*Fázis 5 kimenet — réteg D rövid séta; bővítés incidens / threat model után.*
