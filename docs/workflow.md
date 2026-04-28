# Git, GitHub és GitLab – munkafolyamat

Ez a projekt a **PROJECT_MASTER_SPEC.md** és a **docs/roadmap.md** szerint halad. A távoli repók (GitHub, GitLab) csak akkor hasznosak, ha a lokális mappa is git alapú és szinkronban van velük.

## 1. Lokális git hiánya esetén

Ha a klónozott / másolt mappában nincs `.git`:

```powershell
cd f:\WEB\source\pte-mik-hok-web
git init
git branch -M main
```

Adj hozzá **legalább egy** távoli repót (cseréld a URL-t a sajátodra):

```powershell
git remote add origin https://github.com/SZERVEZET/pte-mik-hok-web.git
# opcionálisan második tükör:
git remote add gitlab https://gitlab.com/SZERVEZET/pte-mik-hok-web.git
```

Első feltöltés:

```powershell
git add .
git commit -m "chore: initial commit with roadmap and repo hygiene"
git push -u origin main
```

## 2. Két remote (GitHub + GitLab)

- **origin**: elsődleges (ahol a PR / review történik).
- **gitlab** (vagy `mirror`): másodlagos; ugyanaz a `main` ág ide is pusholható.

```powershell
git push origin main
git push gitlab main
```

Ha a GitLab repó **importált tükör** a GitHubról, elég az **origin**-ra pusholni; a tükör szolgáltatás frissít. Ilyenkor a `gitlab` remote nem kötelező.

## 3. Ágak és commitok

| Szabály | Indok |
|--------|--------|
| `main` mindig futtatható / buildelhető | CI és demó |
| Feature: `feature/<rövid-leírás>` vagy `feat/<ticket>` | Áttekinthető PR-ek |
| Egy PR = egy fókusz (spec szerinti „fókuszált diff”) | Könnyebb review |

Commit üzenetek: értelmes mondat vagy **Conventional Commits** (`feat:`, `fix:`, `chore:`, `docs:`).

## 4. Pull request

- Leírás: **mit**, **miért**, hogyan teszteltük (`npm run build`, manuális lépések).
- Ha a változás spec-pontot érint: hivatkozás a **roadmap fázisra** vagy a master spec §-ára (opcionális, de ajánlott).

## 5. Titkok

- Soha ne kerüljön a repóba: `.env`, `.env.local`, jelszavak, kulcsok.
- Csak **`.env.example`** maradhat követendő mintaként; érzékeny értékek nélkül.
