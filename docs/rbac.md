# RBAC

Guest, Office és Admin szerepkörök, valamint szerveroldali permission ellenőrzés: a `PROJECT_MASTER_SPEC.md` 6. fejezete az irányadó.

## Jelenlegi megvalósítás (Fázis 3 – első körben)

| Szerepkör | Adatmodell | `/admin` hozzáférés |
|-----------|------------|---------------------|
| **Guest** | Nincs `User` sor, nincs session cookie | Nem (middleware → `/?admin=denied`) |
| **Office** | `User.role = OFFICE` | Igen (JWT `role` claim) |
| **Admin** | `User.role = ADMIN` | Igen |

### ADMIN-only belső útvonalak

A `middleware.ts` az alábbi prefixekre **csak** `ADMIN` role-lal enged át; `OFFICE` → redirect `/admin?rbac=admin_only` + toast az irányítópulton.

| Útvonal | Middleware | API |
|---------|------------|-----|
| `/admin/users` | Csak ADMIN | `GET`/`POST` `/api/users` – `isAdmin` |
| `/admin/audit` | Csak ADMIN | `GET` `/api/audit` – `isAdmin` |

### OFFICE / ADMIN közös (tartalom)

- `canManageNews` (`OFFICE` vagy `ADMIN`): hírek, naptár, galéria, útmutatók, about, office snapshot, foglalás státusz, kalkulátor, **kategóriák** GET/POST, `GET /api/admin/db-overview` (OFFICE-nak a válaszból kiesnek a `User` és `AuditLog` sorok).

- **Bejelentkezés:** `POST /api/auth/login` – Prisma `User` + `bcryptjs` jelszóellenőrzés, válaszul **httpOnly** `hok_session` JWT (`jose`, HS256, `AUTH_SECRET`).
- **Session lekérés:** `GET /api/auth/session` – `{ user: { id, username, role } | null }`.
- **Kijelentkezés:** `DELETE /api/auth/session` – cookie törlés.
- **Kliens:** `AppProvider` – `isAdmin` / `isStaff` = van staff session (OFFICE vagy ADMIN); `isAdminRole` = `role === 'ADMIN'`. A **publikus oldalakon** a szerkesztői / „admin” eszköztárak és a nav **`/admin` link** csak `isAdminRole` esetén látszanak; OFFICE továbbra is beléphet közvetlenül `/admin` alá (kategóriák, tartalom), kivéve users/audit.
