/**
 * Külső képek hostnevei — `next/image` + `next.config` `images.remotePatterns` SSOT (Fázis 10 + 13).
 * Új CDN / tárhely: bővítsd a `RULES` tömböt, és/vagy állítsd a `NEXT_PUBLIC_IMAGE_REMOTE_HOSTS` env-et (lásd `.env.example`).
 */
import type { RemotePattern } from 'next/dist/shared/lib/image-config';

type HostRule = {
  hostname: string;
  /** Next `remotePatterns`: `**.host` egy vagy több aldomaint enged */
  wildcardSubdomains?: boolean;
  http?: boolean;
};

const RULES: HostRule[] = [
  { hostname: 'picsum.photos', http: true },
  { hostname: 'images.unsplash.com' },
  { hostname: 'i.imgur.com' },
  { hostname: 'lh3.googleusercontent.com' },
  { hostname: 'avatars.githubusercontent.com' },
  { hostname: 'cdn.discordapp.com' },
  { hostname: 'googleusercontent.com', wildcardSubdomains: true },
  { hostname: 'githubusercontent.com', wildcardSubdomains: true },
];

/**
 * Vesszővel elválasztott hostname lista. Wildcard aldomén: `*.example.com` → `*.example.com` formátumban add meg (lásd parse logika).
 * Példa: `NEXT_PUBLIC_IMAGE_REMOTE_HOSTS=cdn.myorg.hu,*.r2.cloudflarestorage.com`
 */
/** `S3_PUBLIC_BASE_URL` / `NEXT_PUBLIC_S3_PUBLIC_BASE_URL` hostja – `next/image` optimalizáláshoz (Fázis 15). */
export function s3PublicImageHostFromEnv(): HostRule | null {
  const raw =
    process.env.S3_PUBLIC_BASE_URL?.trim() || process.env.NEXT_PUBLIC_S3_PUBLIC_BASE_URL?.trim();
  if (!raw) return null;
  try {
    const u = new URL(raw);
    return { hostname: u.hostname.toLowerCase() };
  } catch {
    return null;
  }
}

export function extraImageHostRulesFromEnv(): HostRule[] {
  const raw = process.env.NEXT_PUBLIC_IMAGE_REMOTE_HOSTS?.trim();
  if (!raw) return [];
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((entry): HostRule => {
      if (entry.startsWith('*.')) {
        return { hostname: entry.slice(2), wildcardSubdomains: true };
      }
      return { hostname: entry };
    });
}

function allRules(): HostRule[] {
  const s3 = s3PublicImageHostFromEnv();
  return [...RULES, ...(s3 ? [s3] : []), ...extraImageHostRulesFromEnv()];
}

function patternForRule(rule: HostRule, protocol: 'http' | 'https'): RemotePattern {
  const hostname = rule.wildcardSubdomains ? `**.${rule.hostname}` : rule.hostname;
  return { protocol, hostname, port: '', pathname: '/**' };
}

/** Next `images.remotePatterns` — import: `next.config.ts` */
export function getNextImageRemotePatterns(): RemotePattern[] {
  const out: RemotePattern[] = [];
  for (const rule of allRules()) {
    out.push(patternForRule(rule, 'https'));
    if (rule.http) out.push(patternForRule(rule, 'http'));
  }
  return out;
}

/** Kliens / szerver: ez a host optimalizálható-e `next/image`-szel (egyébként `<img>` fallback). */
export function isRemoteImageHostOptimizable(url: string): boolean {
  try {
    const { protocol, hostname } = new URL(url);
    if (protocol !== 'https:' && protocol !== 'http:') return false;
    const h = hostname.toLowerCase();
    for (const rule of allRules()) {
      const base = rule.hostname.toLowerCase();
      if (rule.wildcardSubdomains) {
        if (h === base || h.endsWith(`.${base}`)) return true;
      } else if (h === base) {
        return true;
      }
    }
    return false;
  } catch {
    return false;
  }
}
