/**
 * @file Next.js futásidejű konfiguráció
 *
 * @description
 * A `next.config.ts` exportál egy `NextConfig` objektumot. Itt lehet beállítani
 * többek között: `images`, `redirects`, `headers`, `experimental` flag-eket.
 * **Fázis 13–15:** `images.remotePatterns` = `getNextImageRemotePatterns()` (beépített hostok + S3 publikus host + `NEXT_PUBLIC_IMAGE_REMOTE_HOSTS`).
 *
 * **P2 (security headers):** production CSP + HSTS; dev CSP engedi a Next dev overlay-t (`unsafe-eval`).
 */
import type { NextConfig } from 'next';
import { getNextImageRemotePatterns } from './lib/remote-image-hosts';

const isProdBuild = process.env.NODE_ENV === 'production';

const PROD_SECURITY_HEADERS: { key: string; value: string }[] = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-site' },
  { key: 'X-DNS-Prefetch-Control', value: 'off' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://challenges.cloudflare.com https://*.ingest.sentry.io https://*.ingest.de.sentry.io",
      "frame-src 'self' https://challenges.cloudflare.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      'upgrade-insecure-requests',
    ].join('; '),
  },
];

const DEV_SECURITY_HEADERS: { key: string; value: string }[] = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' ws: http: https: https://challenges.cloudflare.com https://*.ingest.sentry.io https://*.ingest.de.sentry.io",
      "frame-src 'self' https://challenges.cloudflare.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: getNextImageRemotePatterns(),
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: isProdBuild ? PROD_SECURITY_HEADERS : DEV_SECURITY_HEADERS,
      },
    ];
  },
};

export default nextConfig;
