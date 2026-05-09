# About modul (UI pilot, Fázis 4)

| Réteg | Hely |
|--------|------|
| **UI** | `AboutModule.tsx` — ebben a mappában |
| **Domain / API** | `features/about/server.ts`, `app/api/about/*` |
| **Típusok** | `types/about.ts` |
| **Stílus** | `styles/modules/about.css` (import: `app/globals.css`) |
| **Szöveg SSOT** | `lib/i18n/messages.ts` → `about` + `common` |

Új moduloknál követendő minta: nagy, route-hoz kötött kliens UI → `components/modules/<név>/`; megosztott szerverlogika → `features/<név>/`.
