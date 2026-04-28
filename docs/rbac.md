# RBAC

Guest, Office és Admin szerepkörök, valamint szerveroldali permission ellenőrzés: a `PROJECT_MASTER_SPEC.md` 6. fejezete az irányadó.

## Jelenlegi megvalósítás (Fázis 3 – első körben)

| Szerepkör | Adatmodell | `/admin` hozzáférés |
|-----------|------------|---------------------|
| **Guest** | Nincs `User` sor, nincs session cookie | Nem (middleware → `/?admin=denied`) |
| **Office** | `User.role = OFFICE` | Igen (JWT `role` claim) |
| **Admin** | `User.role = ADMIN` | Igen |

- **Bejelentkezés:** `POST /api/auth/login` – Prisma `User` + `bcryptjs` jelszóellenőrzés, válaszul **httpOnly** `hok_session` JWT (`jose`, HS256, `AUTH_SECRET`).
- **Session lekérés:** `GET /api/auth/session` – `{ user: { id, username, role } | null }`.
- **Kijelentkezés:** `DELETE /api/auth/session` – cookie törlés.
- **Finomabb permissionök** (pl. csak Admin törölhet user-t): következő iteráció; a kliens csak UI-t rejthet, a döntés mindig API-n marad.
