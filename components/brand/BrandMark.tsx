/**
 * @file HÖK brand logó – `public/brand/` SVG-k, light/dark váltás CSS-sel
 *
 * @description
 * D2: a téma `html[data-theme='dark']` alapján két export vált (nincs „villanás”, SSR-barát).
 * Világos mód: jel (`logo-hok-mark-color.svg`) a `logopack/POTTY NELKUL/szines_natur.svg`, szójel (`logo-hok-wordmark-light-bg.svg`) a `logopack/LOGO TELJES/minimal_teljes.svg` – nincs fehér keret. További cserék: `docs/design-pack.md`.
 * SVG-k: `next/image` + `unoptimized` (lásd `docs/design-pack.md` §4).
 * Nav jel px: `lib/layout/topbar-layout.ts` ↔ `--layout-nav-brand-mark-size` (`styles/design-tokens.css`).
 */
import Image from 'next/image';

import { LAYOUT_NAV_BRAND_MARK_PX } from '@/lib/layout/topbar-layout';

export type BrandMarkVariant = 'nav' | 'hero' | 'footer' | 'internal';

const MARK_LIGHT = '/brand/logo-hok-mark-color.svg';
const MARK_DARK = '/brand/logo-hok-mark-on-dark.svg';
const WORD_LIGHT = '/brand/logo-hok-wordmark-light-bg.svg';
const WORD_DARK = '/brand/logo-hok-wordmark-dark-bg.svg';

const dims: Record<
  BrandMarkVariant,
  { light: string; dark: string; swapClass: string; width: number; height: number; decorative: boolean }
> = {
  nav: {
    light: MARK_LIGHT,
    dark: MARK_DARK,
    swapClass: 'brand-mark-swap--nav',
    width: LAYOUT_NAV_BRAND_MARK_PX,
    height: LAYOUT_NAV_BRAND_MARK_PX,
    decorative: true,
  },
  internal: {
    light: MARK_LIGHT,
    dark: MARK_DARK,
    swapClass: 'brand-mark-swap--internal',
    width: 32,
    height: 32,
    decorative: true,
  },
  footer: {
    light: WORD_LIGHT,
    dark: WORD_DARK,
    swapClass: 'brand-mark-swap--footer',
    width: 280,
    height: 56,
    decorative: false,
  },
  hero: {
    light: WORD_LIGHT,
    dark: WORD_DARK,
    swapClass: 'brand-mark-swap--hero',
    width: 300,
    height: 56,
    decorative: false,
  },
};

export function BrandMark({
  variant,
  className = '',
  'aria-label': ariaLabel = 'PTE MIK HÖK',
}: {
  variant: BrandMarkVariant;
  className?: string;
  'aria-label'?: string;
}) {
  const d = dims[variant];
  const heroPriority = variant === 'hero';

  const pair = (
    <>
      <Image
        src={d.light}
        alt=""
        width={d.width}
        height={d.height}
        className="brand-mark brand-mark--light-bg"
        unoptimized
        priority={heroPriority}
        aria-hidden
      />
      <Image
        src={d.dark}
        alt=""
        width={d.width}
        height={d.height}
        className="brand-mark brand-mark--dark-bg"
        unoptimized
        priority={false}
        aria-hidden
      />
    </>
  );

  if (d.decorative) {
    return <span className={`brand-mark-swap ${d.swapClass} ${className}`.trim()}>{pair}</span>;
  }

  return (
    <span className={`brand-mark-swap ${d.swapClass} ${className}`.trim()} role="img" aria-label={ariaLabel}>
      {pair}
    </span>
  );
}
