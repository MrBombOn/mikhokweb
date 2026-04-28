import './globals.css';
import { AdminLoginModal } from '@/components/layout/AdminLoginModal';
import { AppProvider } from '@/components/layout/AppProvider';
import { Footer } from '@/components/layout/Footer';
import { ModalHost } from '@/components/layout/ModalHost';
import { Navbar } from '@/components/layout/Navbar';
import { ScrollTopButton } from '@/components/layout/ScrollTopButton';
import { ToastViewport } from '@/components/layout/ToastViewport';
export const metadata = { title: 'PTE MIK HÖK Web v14', description: 'Footer, jobb landing hírgomb, átrendezett naptár és hangsúlyosabb KKI eredmények' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="hu" data-theme="light"><body><AppProvider><Navbar /><main>{children}</main><Footer /><ToastViewport /><ModalHost /><AdminLoginModal /><ScrollTopButton /></AppProvider></body></html>;
}