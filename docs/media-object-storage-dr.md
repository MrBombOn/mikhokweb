# Média és objektumtár (§12 Fázis 15) – üzemeltetés és DR

## Módok

| `STORAGE_DRIVER` | Viselkedés |
|------------------|------------|
| *(üres vagy `local`)* | Fájlok a repó `public/uploads/...` alá íródnak (fejlesztői / egyszerű VPS). |
| `s3` | Galéria és útmutató feltöltések **S3-kompatibilis** tárolóba kerülnek (`PutObject`). A DB-ben tárolt `imageUrl` / `documentUrl` a **`S3_PUBLIC_BASE_URL`** alatti publikus HTTPS URL (CDN vagy bucket website / path-style endpoint). |

## Kötelező env (`STORAGE_DRIVER=s3`)

- `S3_BUCKET`, `S3_REGION` (vagy `AWS_REGION`)
- `S3_PUBLIC_BASE_URL` – példa: `https://cdn.example.com` vagy `https://mybucket.s3.eu-central-1.amazonaws.com` (ne legyen trailing `/`)
- `S3_ACCESS_KEY_ID` + `S3_SECRET_ACCESS_KEY` (vagy `AWS_ACCESS_KEY_ID` + `AWS_SECRET_ACCESS_KEY`)

## Opcionális

- `S3_ENDPOINT` + `S3_FORCE_PATH_STYLE=1` – MinIO / Cloudflare R2 stb.
- `UPLOAD_SCAN_WEBHOOK_URL` – feltöltés után JSON POST (`storageKey`, `mimeType`, `sizeBytes`, `purpose`, `at`) – nem blokkolja a választ.
- `NEXT_PUBLIC_S3_PUBLIC_BASE_URL` – ha a kliensen is kell `next/image` host felismerés (alternatíva: `NEXT_PUBLIC_IMAGE_REMOTE_HOSTS`).

## Presigned URL API-k

- **`POST /api/admin/storage/presign-put`** – közvetlen böngésző PUT S3-ra (JSON: `purpose`, `filename`, `contentType`, `contentLength`). CSRF + OFFICE/ADMIN.
- **`GET /api/admin/storage/presign-get?key=uploads/...`** – rövid élettartamú letöltési URL (privát buckethez).

## DR és bizonyíték

1. **Objektumok léteznek-e a bucketben:** `npm run ops:s3-upload-inventory` – kilistázza az `uploads/` prefix alatti objektumok számát (paginált).
2. **Visszaállítási próba:** másolj le egy ismert kulcsot (`aws s3 cp` vagy MinIO console), töröld tesztkörnyezetben, állítsd vissza replikából / lifecycle verzióból – dokumentáld a dátumot és az eszközt.
3. **Adatbázis:** a galéria / útmutató URL-ek a DR után továbbra is a `S3_PUBLIC_BASE_URL`-re mutassanak (CDN CNAME változásnál frissítsd az env-et és indíts újra az appot).

## Biztonság

- Bucket policy: **ne** legyen nyilvános lista; elég a **GetObject** a `uploads/*` prefixre (vagy CDN OAC).
- Élesben kerüld a forráskódba tett titkokat – OIDC / instance role ahol lehetséges.
