# WAF és reverse proxy szabálykönyv (Fázis 16)

## Cél

Az **alkalmazáson kívüli** réteg (TLS terminálás, rate limit, WAF) összhangban legyen a Next **middleware** burst limitjével és az üzemeltetői elvárásokkal. Ez a szabálykönyv **sablon**; a konkrét szintaxis host (nginx, Caddy, Cloudflare, AWS ALB + WAF) szerint változik.

## Alkalmazásréteg (referencia – már implementálva)

| Útvonal (POST) | Edge burst ablak | Küszöb (10 perc / IP) | Forrás |
|----------------|------------------|----------------------|--------|
| `/api/feedback` | 10 perc | 24 | `lib/security/edge-critical-post-limit.ts` |
| `/api/bookings` | 10 perc | 16 | ugyanaz |
| `/api/auth/login` | 10 perc | 48 | ugyanaz |

A proxy szintű limit **nem** kell, hogy szigorúbb legyen minden esetben, de **volumen / sharding** ellen (bot farm) erősen ajánlott. Tipikus minta: proxy = durva küszöb (pl. 100 req/min/IP az egész site-ra), app = finom üzleti limit.

## Általános elvek

1. **Valós kliens IP:** `X-Forwarded-For` első megbízható hopja vagy a proxy saját `remote_addr` megbízható hálózaton; ne fogadj el tetszőleges `X-Forwarded-For`-ot a nyílt internet felől validáció nélkül.
2. **TLS:** élesben TLS 1.2+; HSTS a Next `headers` réteggel egyeztetve (`next.config.ts`).
3. **Méret:** `client_max_body_size` (nginx) / megfelelő limit a legnagyobb feltöltési útvonalhoz igazítva (galéria / útmutató policy: [`lib/media/upload-policy.ts`](../lib/media/upload-policy.ts)).
4. **Path alapú szabályok:** admin (`/admin`, `/api/admin/*`) opcionálisan szűkebb IP allowlist vagy VPN mögé tehető intézményi policy szerint.

## nginx (példa – illusztráció)

```nginx
# Globális soft limit (példa érték – hangold forgalom szerint)
limit_req_zone $binary_remote_addr zone=site_per_ip:10m rate=30r/s;

server {
    location / {
        limit_req zone=site_per_ip burst=80 nodelay;
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Külön `location` blokkban szigorítható a `/api/auth/login` (pl. kisebb `rate=`).

## Cloudflare / CDN

- **Rate limiting rules** URI prefix szerint: `/api/auth`, `/api/feedback`, `/api/bookings`.
- **Bot fight / managed rules** bekapcsolása; **false positive** esetén szabály kivétel dokumentálása.
- **OWASP CRS** (ha elérhető a csomagban) szűrt mód → fokozatos szigorítás.

## Naplózás és incidens

- 429 / WAF block események korrelációja az alkalmazás `x-request-id` headerével (ha a proxy továbbítja).
- Riasztási minták: [`alerting-rules.md`](./alerting-rules.md).

## Kapcsolódó

- Disclosure + proxy szöveg: [`security-disclosure.md`](./security-disclosure.md)
- Middleware séta: [`security-walkthrough.md`](./security-walkthrough.md)
