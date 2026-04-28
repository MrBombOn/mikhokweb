'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Lang, Theme, ToastItem } from '@/types';

type LoginForm = { username: string; password: string };
type AppContextValue = {
  lang: Lang; setLang: (lang: Lang) => void; toggleLang: () => void;
  theme: Theme; setTheme: (theme: Theme) => void; toggleTheme: () => void;
  isAdmin: boolean; setIsAdmin: (value: boolean) => void; setGuestMode: () => void;
  toast: (text: string, type?: ToastItem['type']) => void;
  toasts: ToastItem[]; removeToast: (id: number) => void;
  modal: { title: string; content: string } | null; openModal: (title: string, content: string) => void; closeModal: () => void;
  showAdminLogin: boolean; openAdminLogin: () => void; closeAdminLogin: () => void; loginForm: LoginForm; setLoginForm: (value: LoginForm) => void; submitAdminLogin: () => void;
};
const AppContext = createContext<AppContextValue | null>(null);
const STORAGE = { lang: 'v26-lang', theme: 'v26-theme', admin: 'v26-admin' };
const getSystemTheme = (): Theme => 'light';
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('hu');
  const [theme, setTheme] = useState<Theme>('light');
  const [isAdmin, setIsAdmin] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [modal, setModal] = useState<{ title: string; content: string } | null>(null);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [loginForm, setLoginForm] = useState<LoginForm>({ username: '', password: '' });
  useEffect(() => {
    const savedLang = window.localStorage.getItem(STORAGE.lang) as Lang | null;
    const savedTheme = window.localStorage.getItem(STORAGE.theme) as Theme | null;
    const savedAdmin = window.localStorage.getItem(STORAGE.admin) === 'true';
    if (savedLang === 'hu' || savedLang === 'en') setLang(savedLang);
    setTheme(savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : getSystemTheme());
    setIsAdmin(savedAdmin);
  }, []);
  useEffect(() => { document.documentElement.dataset.theme = theme; window.localStorage.setItem(STORAGE.theme, theme); }, [theme]);
  useEffect(() => { window.localStorage.setItem(STORAGE.lang, lang); }, [lang]);
  useEffect(() => { window.localStorage.setItem(STORAGE.admin, String(isAdmin)); }, [isAdmin]);
  function toggleLang(){ setLang((prev)=> prev === 'hu' ? 'en' : 'hu'); }
  function toggleTheme(){ setTheme((prev)=> prev === 'light' ? 'dark' : 'light'); }
  function setGuestMode(){ setIsAdmin(false); setShowAdminLogin(false); toast(lang === 'hu' ? 'Guest mód aktív.' : 'Guest mode active.', 'info'); }
  function toast(text: string, type: ToastItem['type'] = 'info') {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, text, type }]);
    window.setTimeout(() => setToasts((prev) => prev.filter((item) => item.id !== id)), 2500);
  }
  function removeToast(id: number) { setToasts((prev) => prev.filter((item) => item.id !== id)); }
  function openModal(title: string, content: string) { setModal({ title, content }); }
  function closeModal() { setModal(null); }
  function openAdminLogin() { setShowAdminLogin(true); }
  function closeAdminLogin() { setShowAdminLogin(false); }
  function submitAdminLogin() {
    if (loginForm.username.trim() && loginForm.password.trim()) {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setLoginForm({ username: '', password: '' });
      toast(lang === 'hu' ? 'Admin mód aktiválva.' : 'Admin mode enabled.', 'success');
      return;
    }
    toast(lang === 'hu' ? 'Add meg a felhasználónevet és a jelszót.' : 'Please provide username and password.', 'warning');
  }
  const value = useMemo(() => ({ lang, setLang, toggleLang, theme, setTheme, toggleTheme, isAdmin, setIsAdmin, setGuestMode, toast, toasts, removeToast, modal, openModal, closeModal, showAdminLogin, openAdminLogin, closeAdminLogin, loginForm, setLoginForm, submitAdminLogin }), [lang, theme, isAdmin, toasts, modal, showAdminLogin, loginForm]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp csak AppProvider alatt használható.');
  return context;
}
