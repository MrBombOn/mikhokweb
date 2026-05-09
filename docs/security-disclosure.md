# Felelős disclosure (Fázis 16)

## Cél

Külső kutatók és hallgatók számára **egyértelmű csatorna** a potenciális biztonsági hibák jelzésére, a `security.txt` (RFC 9116) konvencióval összhangban.

## Hol van a `security.txt`?

- Publikus fájl: [`public/.well-known/security.txt`](../public/.well-known/security.txt) → éles környezetben: `https://<domain>/.well-known/security.txt`
- **Go-live:** a `Contact:` sorban szereplő `mailto:` cím legyen valós, monitored alias (pl. `security@<saját-domain>`).

## Befogadási folyamat (javasolt)

1. **Bejelentés** – email a `Contact` címre: rövid leírás, érintett URL / modul, reprodukálhatóság, (opcionális) PoC nélkül is.
2. **Visszaigazolás** – 3 munkanapon belül automatikus vagy manuális „megkaptuk” üzenet.
3. **Triage** – súlyosság (CVSS-hez igazított), érintett verzió / környezet.
4. **Javítás** – patch, teszt, deploy; szükség esetén ideiglenes mitigáció (WAF szabály, feature flag).
5. **Közzététel** – a bejelentővel egyeztetett disclosure dátum (tipikusan 90 napon belül, ha nincs aktív kihasználás).

## Mit ne várjunk el?

- **Jogosulatlan** tesztelés más rendszerein, adatok letöltése vagy megváltoztatása.
- **DDoS** vagy szolgáltatásbénítás „teszt” címen.

## Reverse proxy / WAF

Az edge middleware **nem** helyettesíti a CDN vagy nginx szintű `limit_req` / WAF szabályokat. Éles forgalomban kombináld a kettőt: a proxy véd a TLS és a volumen ellen, az alkalmazás a business logikát. Konkrét minták és táblázat: [`security-waf-proxy-rulebook.md`](./security-waf-proxy-rulebook.md).

## Belső kapcsolódások

- Biztonsági séta (JWT, CSRF, rate limit): [`docs/security-walkthrough.md`](./security-walkthrough.md)
- ASVS önellenőrzés: [`docs/security-asvs-self-audit.md`](./security-asvs-self-audit.md)
