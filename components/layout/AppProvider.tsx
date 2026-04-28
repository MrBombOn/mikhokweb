/**
 * @file Globális alkalmazás-kontextus (React Context + kliens állapot)
 *
 * @description
 * Az **egész oldalfa** egyetlen provider alatt van (`app/layout.tsx`), így bármely
 * `'use client'` komponens eléri a `useApp()` hookot: nyelv, téma, „bejelentkezett”
 * állapot, toastok, egyszerű modál.
 *
 * @auth_folyamat
 * 1. Első mount: **GET `/api/auth/session`** – ha van érvényes JWT süti, `user` jön vissza → `isAdmin` igaz.
 * 2. Belépés gomb: modál megnyitása; submit: **POST `/api/auth/login`** – Prisma user + jelszó ellenőrzés, session süti.
 * 3. Guest mód: **DELETE `/api/auth/session`** – süti törlése.
 *
 * @localStorage
 * - Nyelv és téma: azonnali visszaállítás újratöltéskor (`STORAGE` kulcsok).
 * - `admin` kulcs: UI-hoz kapcsolódó cache jelleg (a valódi auth a session süti).
 *
 * @megjegyzés
 * `isAdmin` név történelmi: valójában „van bejelentkezett felhasználó” (OFFICE/ADMIN szerepkör a JWT-ben).
 */
'use client';

import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import type { Lang, Theme, ToastItem } from '@/types';
import { loginFormSchema } from '@/lib/validation/auth';

/** Belépési űrlap mezői – lokális state, nem ugyanaz mint a Zod infer (egyszerűsített). */
type LoginForm = { username: string; password: string };

/**
 * Context érték típusa – minden mezőt a `useMemo` value objektum tölt ki.
 * A függvény referenciák (`toast`, `setGuestMode`, `submitAdminLogin`) `useCallback`-kel stabilak.
 */
type AppContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
  setGuestMode: () => void;
  toast: (text: string, type?: ToastItem['type']) => void;
  toasts: ToastItem[];
  removeToast: (id: number) => void;
  modal: { title: string; content: string } | null;
  openModal: (title: string, content: string) => void;
  closeModal: () => void;
  showAdminLogin: boolean;
  openAdminLogin: () => void;
  closeAdminLogin: () => void;
  loginForm: LoginForm;
  setLoginForm: (value: LoginForm) => void;
  submitAdminLogin: () => void;
};

const AppContext = createContext<AppContextValue | null>(null);

/** localStorage kulcsok – verzió prefix elkerüli a régi stringek ütközését. */
const STORAGE = { lang: 'v26-lang', theme: 'v26-theme', admin: 'v26-admin' };

/** Jövőben: `matchMedia('(prefers-color-scheme: dark)')` olvasása; most fix light alap. */
const getSystemTheme = (): Theme => 'light';

/** Provider – a gyökér layout közvetlen gyermekeinek kell lennie. */
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('hu');
  const [theme, setTheme] = useState<Theme>('light');
  const [isAdmin, setIsAdmin] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [modal, setModal] = useState<{ title: string; content: string } | null>(null);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [loginForm, setLoginForm] = useState<LoginForm>({ username: '', password: '' });

  // --- Hydration után: mentett nyelv/téma + session ellenőrzés ---
  useEffect(() => {
    const savedLang = window.localStorage.getItem(STORAGE.lang) as Lang | null;
    const savedTheme = window.localStorage.getItem(STORAGE.theme) as Theme | null;
    if (savedLang === 'hu' || savedLang === 'en') setLang(savedLang);
    setTheme(savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : getSystemTheme());
    void fetch('/api/auth/session', { credentials: 'include' })
      .then((r) => r.json() as Promise<{ user?: { id: string } | null }>)
      .then((data) => {
        setIsAdmin(!!data?.user);
      })
      .catch(() => {
        setIsAdmin(false);
      });
  }, []);

  // Téma → <html data-theme> + perzisztencia
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(STORAGE.theme, theme);
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE.lang, lang);
  }, [lang]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE.admin, String(isAdmin));
  }, [isAdmin]);

  function toggleLang() {
    setLang((prev) => (prev === 'hu' ? 'en' : 'hu'));
  }

  function toggleTheme() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }

  /** Toast lista bővítése + automatikus eltávolítás időzítővel. */
  const toast = useCallback((text: string, type: ToastItem['type'] = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, text, type }]);
    window.setTimeout(() => setToasts((prev) => prev.filter((item) => item.id !== id)), 2500);
  }, []);

  /** Session törlése szerveren, majd lokális admin flag false. */
  const setGuestMode = useCallback(() => {
    void fetch('/api/auth/session', { method: 'DELETE', credentials: 'include' }).finally(() => {
      setIsAdmin(false);
      setShowAdminLogin(false);
      toast(lang === 'hu' ? 'Guest mód aktív.' : 'Guest mode active.', 'info');
    });
  }, [lang, toast]);

  function removeToast(id: number) {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }

  function openModal(title: string, content: string) {
    setModal({ title, content });
  }

  function closeModal() {
    setModal(null);
  }

  function openAdminLogin() {
    setShowAdminLogin(true);
  }

  function closeAdminLogin() {
    setShowAdminLogin(false);
  }

  /** Szerveroldali login hívás; siker esetén session süti, lokálisan admin true. */
  const submitAdminLogin = useCallback(() => {
    void (async () => {
      const parsed = loginFormSchema.safeParse(loginForm);
      if (!parsed.success) {
        toast(lang === 'hu' ? 'Add meg a felhasználónevet és a jelszót.' : 'Please provide username and password.', 'warning');
        return;
      }
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        toast(lang === 'hu' ? 'Belépés sikertelen.' : 'Login failed.', 'warning');
        return;
      }
      setIsAdmin(true);
      setShowAdminLogin(false);
      setLoginForm({ username: '', password: '' });
      toast(lang === 'hu' ? 'Admin mód aktiválva.' : 'Admin mode enabled.', 'success');
    })();
  }, [loginForm, lang, toast]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggleLang,
      theme,
      setTheme,
      toggleTheme,
      isAdmin,
      setIsAdmin,
      setGuestMode,
      toast,
      toasts,
      removeToast,
      modal,
      openModal,
      closeModal,
      showAdminLogin,
      openAdminLogin,
      closeAdminLogin,
      loginForm,
      setLoginForm,
      submitAdminLogin,
    }),
    [lang, theme, isAdmin, toasts, modal, showAdminLogin, loginForm, setGuestMode, toast, submitAdminLogin],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

/** Hook – provider nélkül szándékosan hibát dob (gyors hibafelismerés fejlesztés közben). */
export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp csak AppProvider alatt használható.');
  return context;
}
