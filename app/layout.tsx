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
import { AdminLoginModal } from '@/components/layout/AdminLoginModal';
import { AppProvider } from '@/components/layout/AppProvider';
import { Footer } from '@/components/layout/Footer';
import { ModalHost } from '@/components/layout/ModalHost';
import { Navbar } from '@/components/layout/Navbar';
import { ScrollTopButton } from '@/components/layout/ScrollTopButton';
import { ToastViewport } from '@/components/layout/ToastViewport';

/** Next.js metadata API – böngésző fül, keresőmotorok, megosztás előnézet alapja. */
export const metadata = {
  title: 'PTE MIK HÖK Web v14',
  description: 'Footer, jobb landing hírgomb, átrendezett naptár és hangsúlyosabb KKI eredmények',
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
          <Navbar />
          <main>{children}</main>
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
