/**
 * @file Gyökér layout (Next.js App Router)
 *
 * @description
 * Ez a fájl az **egész alkalmazás HTML burkát** definiálja: minden útvonal
 * (`/`, `/calendar`, `/admin`, …) ebbe a layout-ba ágyazódik bele a `children`
 * propon keresztül.
 *
 * @szerkezet
 * - `html lang="hu"`: alapértelmezett dokumentumnyelv (a kliens `AppProvider` váltja a tartalmi nyelvet).
 * - `data-theme="dark"`: kezdő téma; a `AppProvider` szinkronban állítja a `document.documentElement.dataset.theme`-et.
 * - `AppProvider`: React Context – nyelv, téma, mock admin, toast, modál állapot.
 * - `Navbar` + `main`: felső navigáció és az aktuális oldal törzse.
 * - `Footer`: lábléc (kliens; `messages.footer` + `nav`).
 * - `ToastViewport`, `ModalHost`, `AdminLoginModal`: globális visszajelzés és felugrók (portál / overlay).
 * - `ScrollTopButton`: „lap tetejére” lebegő gomb.
 *
 * @kapcsolódó
 * - Stílus: `./globals.css` (design tokenek, komponens osztályok).
 * - Metaadat: `metadata` export – SEO és böngészőcím.
 * - Shell összefoglaló: `docs/global-shell.md`.
 */
import './globals.css';
import type { Metadata, Viewport } from 'next';
import { AdminLoginModal } from '@/components/layout/AdminLoginModal';
import { AppProvider } from '@/components/layout/AppProvider';
import { SkipLink } from '@/components/layout/SkipLink';
import { Footer } from '@/components/layout/Footer';
import { GlobalUiInteractions } from '@/components/layout/GlobalUiInteractions';
import { ModalHost } from '@/components/layout/ModalHost';
import { Navbar } from '@/components/layout/Navbar';
import { ScrollTopButton } from '@/components/layout/ScrollTopButton';
import { ToastViewport } from '@/components/layout/ToastViewport';
import { CookieConsentBar } from '@/components/legal/CookieConsentBar';
import { messages } from '@/lib/i18n/messages';
import { DocumentMetaSync } from '@/components/layout/DocumentMetaSync';
import { SITE_NAME, getBaseUrl } from '@/lib/seo';
import { SeoJsonLd, buildRootJsonLdGraph } from '@/lib/seo/jsonld';
import { getSiteDesignInlineCssCached } from '@/lib/site-design/layout-css';

/** Next.js metadata API – böngésző fül, keresőmotorok, megosztás előnézet alapja. */
export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: `${messages.hu.routeMeta.fallback.title} | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: messages.hu.routeMeta.fallback.description,
  openGraph: {
    siteName: SITE_NAME,
    locale: 'hu_HU',
    type: 'website',
  },
};

/** Mobil nézet, notch / home indicator (`viewport-fit=cover` a safe-area CSS-hez). */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

/**
 * Gyökér layout komponens – **szerverkomponens** (nincs `'use client'`).
 * A gyerekek (`children`) az aktuális `app/.../page.tsx` kimenete.
 */
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const designCss = await getSiteDesignInlineCssCached();

  return (
    <html lang="hu" data-theme="dark">
      <body>
        <SeoJsonLd data={buildRootJsonLdGraph()} />
        {designCss ? <style dangerouslySetInnerHTML={{ __html: designCss }} /> : null}
        <AppProvider>
          <DocumentMetaSync />
          <SkipLink />
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
          <ToastViewport />
          <ModalHost />
          <AdminLoginModal />
          <ScrollTopButton />
          <CookieConsentBar />
          <GlobalUiInteractions />
        </AppProvider>
      </body>
    </html>
  );
}
