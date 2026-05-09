/**
 * Topbar / navbar layout — TS tükör a `styles/design-tokens.css` tokenjeihez.
 * A `next/image` intrinsic `width` / `height` csak számot fogad; a vizuális méret a CSS `--layout-nav-brand-mark-size` SSOT.
 * A görgetési küszöbök a vékonyabb topbarhoz igazítva — változáskor ellenőrizd a `styles/design-tokens.css` `--layout-landing-scroll-offset` értékét is.
 *
 * @see styles/design-tokens.css — `--layout-topbar-*`, `--layout-nav-brand-mark-size`
 */
/** Számnak meg kell egyeznie a `:root` `--layout-nav-brand-mark-size` értékével (px). */
export const LAYOUT_NAV_BRAND_MARK_PX = 48;

/** Becsült sticky topbar + jel clearance görgetési horgonyhoz — közelítse a `--layout-landing-scroll-offset`-et. */
export const LAYOUT_TOPBAR_SCROLL_CLEARANCE_PX = 80;

/** Főoldal: ennyi scroll után jelenik meg a landing hír blokk (`HomePageClient`). */
export const LAYOUT_LANDING_NEWS_REVEAL_SCROLL_PX = 96;
