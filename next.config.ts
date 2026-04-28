/**
 * @file Next.js futásidejű konfiguráció
 *
 * @description
 * A `next.config.ts` exportál egy `NextConfig` objektumot. Itt lehet beállítani
 * többek között: `images`, `redirects`, `headers`, `experimental` flag-eket.
 *
 * @jelenlegi
 * - `reactStrictMode: true` – dupla render fejlesztésben segít a mellékhatás-hibák felderítésében.
 */
import type { NextConfig } from 'next';

const nextConfig: NextConfig = { reactStrictMode: true };

export default nextConfig;
