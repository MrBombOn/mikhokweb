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
 * - `data-theme="light"`: kezdő téma; a `AppProvider` szinkronban állítja a `document.documentElement.dataset.theme`-et.
 * - `AppProvider`: React Context – nyelv, téma, mock admin, toast, modál állapot.
 * - `Navbar` + `main`: felső navigáció és az aktuális oldal törzse.
 * - `Footer`: lábléc linkekkel.
 * - `ToastViewport`, `ModalHost`, `AdminLoginModal`: globális visszajelzés és felugrók (portál / overlay).
 * - `ScrollTopButton`: „lap tetejére” lebegő gomb.
 *
 * @kapcsolódó
 * - Stílus: `./globals.css` (design tokenek, komponens osztályok).
 * - Metaadat: `metadata` export – SEO és böngészőcím.
 */
import './globals.css';
import type { Metadata } from 'next';
import { AdminLoginModal } from '@/components/layout/AdminLoginModal';
import { AppProvider } from '@/components/layout/AppProvider';
import { Footer } from '@/components/layout/Footer';
import { ModalHost } from '@/components/layout/ModalHost';
import { Navbar } from '@/components/layout/Navbar';
import { ScrollTopButton } from '@/components/layout/ScrollTopButton';
import { ToastViewport } from '@/components/layout/ToastViewport';
import { SITE_NAME, getBaseUrl } from '@/lib/seo';

/** Next.js metadata API – böngésző fül, keresőmotorok, megosztás előnézet alapja. */
export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: `${SITE_NAME} portal`,
    template: `%s | ${SITE_NAME}`,
  },
  description: 'PTE MIK HÖK hivatalos hallgatói portál: hírek, események, útmutatók és ügyintézési információk.',
  openGraph: {
    siteName: SITE_NAME,
    locale: 'hu_HU',
    type: 'website',
  },
};

/**
 * Gyökér layout komponens – **szerverkomponens** (nincs `'use client'`).
 * A gyerekek (`children`) az aktuális `app/.../page.tsx` kimenete.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu" data-theme="light">
      <body>
        <AppProvider>
          <a href="#main-content" className="skip-link">
            Ugrás a tartalomra
          </a>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
          <ToastViewport />
          <ModalHost />
          <AdminLoginModal />
          <ScrollTopButton />
        </AppProvider>
      </body>
    </html>
  );
}
