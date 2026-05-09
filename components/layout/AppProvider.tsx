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
 * `isAdmin` név történelmi: valójában „van bejelentkezett staff” (OFFICE vagy ADMIN) — kijelentkezés, session jelző.
 * `isAdminRole` csak `User.role === ADMIN` — egyes publikus szerkesztői UI-k továbbra is csak ADMIN-nak (pl. belső `/admin/users`, `/admin/audit`). A **hírek** főoldali modulja OFFICE + ADMIN jogot használ (`LandingNews`: `sessionUser.role`). Belső `/admin` + middleware OFFICE-nak is (kategóriák, tartalom), kivéve users/audit.
 */
'use client';

import { createContext, useContext, useEffect, useMemo, useState, useCallback, useRef } from 'react';
import type { Lang, Theme, ToastItem } from '@/types';
import type { AppRole } from '@/lib/auth/session';
import { t } from '@/lib/content';
import { APP_LANG_STORAGE_KEY } from '@/lib/i18n/lang-storage';
import { loginFormSchema } from '@/lib/validation/auth';

/** Belépési űrlap mezői – lokális state, nem ugyanaz mint a Zod infer (egyszerűsített). */
type LoginForm = { username: string; password: string };

/** `GET /api/auth/session` user mezője – RBAC a kliensen (UI); a döntés mindig API + middleware. */
export type SessionUser = { id: string; username: string; role: AppRole };

/** Designos megerősítő modál (`ModalHost`) – helyettesíti a `window.confirm`-ot. */
export type ConfirmDialogOptions = {
  message: string;
  title?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Piros elsődleges gomb (törlés / veszélyes művelet). */
  destructive?: boolean;
};

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
  /** Van bejelentkezett staff session (OFFICE vagy ADMIN). */
  isStaff: boolean;
  /** `ADMIN` szerepkör – publikus oldalakon szerkesztői / „admin” UI; felhasználók / audit; `/admin/users`, `/admin/audit`. */
  isAdminRole: boolean;
  sessionUser: SessionUser | null;
  setIsAdmin: (value: boolean) => void;
  setGuestMode: () => void;
  toast: (text: string, type?: ToastItem['type']) => void;
  toasts: ToastItem[];
  removeToast: (id: number) => void;
  modal: { title: string; content: string } | null;
  openModal: (title: string, content: string) => void;
  closeModal: () => void;
  /** Nyitott megerősítő párbeszéd (csak megjelenítéshez; `requestConfirm` használata javasolt). */
  confirmDialog: ConfirmDialogOptions | null;
  requestConfirm: (opts: ConfirmDialogOptions) => Promise<boolean>;
  resolveConfirm: (ok: boolean) => void;
  showAdminLogin: boolean;
  openAdminLogin: () => void;
  closeAdminLogin: () => void;
  loginForm: LoginForm;
  setLoginForm: (value: LoginForm) => void;
  submitAdminLogin: () => void;
  adminLoginPending: boolean;
  adminLoginError: string | null;
  clearAdminLoginError: () => void;
};

const AppContext = createContext<AppContextValue | null>(null);

/** localStorage kulcsok – verzió prefix elkerüli a régi stringek ütközését. */
const STORAGE = { lang: APP_LANG_STORAGE_KEY, theme: 'v26-theme', admin: 'v26-admin' };

/** Jövőben: `matchMedia('(prefers-color-scheme: …)')` olvasása; alapértelmezés: sötét téma. */
const getSystemTheme = (): Theme => 'dark';

/** Provider – a gyökér layout közvetlen gyermekeinek kell lennie. */
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('hu');
  const [theme, setTheme] = useState<Theme>('dark');
  const [isAdmin, setIsAdmin] = useState(false);
  const [sessionUser, setSessionUser] = useState<SessionUser | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [modal, setModal] = useState<{ title: string; content: string } | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogOptions | null>(null);
  const confirmResolverRef = useRef<((ok: boolean) => void) | null>(null);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [loginForm, setLoginForm] = useState<LoginForm>({ username: '', password: '' });
  const [adminLoginPending, setAdminLoginPending] = useState(false);
  const [adminLoginError, setAdminLoginError] = useState<string | null>(null);

  // --- Hydration után: mentett nyelv/téma + session ellenőrzés ---
  useEffect(() => {
    const savedLang = window.localStorage.getItem(STORAGE.lang) as Lang | null;
    const savedTheme = window.localStorage.getItem(STORAGE.theme) as Theme | null;
    if (savedLang === 'hu' || savedLang === 'en') setLang(savedLang);
    setTheme(savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : getSystemTheme());
    void fetch('/api/auth/session', { credentials: 'include' })
      .then((r) => r.json() as Promise<{ user?: SessionUser | null }>)
      .then((data) => {
        const u = data?.user ?? null;
        setSessionUser(u);
        setIsAdmin(!!u);
      })
      .catch(() => {
        setSessionUser(null);
        setIsAdmin(false);
      });
  }, []);

  // Téma → <html data-theme> + perzisztencia
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(STORAGE.theme, theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

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
      setSessionUser(null);
      setIsAdmin(false);
      setShowAdminLogin(false);
      toast(t(lang).common.guestModeActive, 'info');
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

  const requestConfirm = useCallback((opts: ConfirmDialogOptions) => {
    return new Promise<boolean>((resolve) => {
      confirmResolverRef.current = resolve;
      setConfirmDialog(opts);
    });
  }, []);

  const resolveConfirm = useCallback((ok: boolean) => {
    const r = confirmResolverRef.current;
    confirmResolverRef.current = null;
    setConfirmDialog(null);
    r?.(ok);
  }, []);

  function openAdminLogin() {
    setAdminLoginError(null);
    setShowAdminLogin(true);
  }

  function closeAdminLogin() {
    setAdminLoginError(null);
    setShowAdminLogin(false);
  }

  /** Szerveroldali login hívás; siker esetén session süti, lokálisan admin true. */
  const submitAdminLogin = useCallback(() => {
    void (async () => {
      if (adminLoginPending) return;
      setAdminLoginError(null);
      const parsed = loginFormSchema.safeParse(loginForm);
      if (!parsed.success) {
        const fillMsg = t(lang).common.loginEnterCredentials;
        setAdminLoginError(fillMsg);
        toast(fillMsg, 'warning');
        return;
      }
      setAdminLoginPending(true);
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(parsed.data),
        });
        const payload = (await res.json().catch(() => ({}))) as { error?: string };
        if (!res.ok) {
          const c = t(lang).common;
          let message: string = c.loginFailed;
          if (payload.error === 'invalid_credentials') {
            message = c.loginInvalidCredentials;
          } else if (payload.error === 'invalid_body') {
            message = c.loginInvalidBody;
          } else if (payload.error?.includes('Túl sok')) {
            message = payload.error;
          }
          setAdminLoginError(message);
          toast(message, 'warning');
          return;
        }
        const sessionRes = await fetch('/api/auth/session', { credentials: 'include' });
        const sessionData = (await sessionRes.json().catch(() => ({}))) as { user?: SessionUser | null };
        const u = sessionData.user ?? null;
        setSessionUser(u);
        setIsAdmin(!!u);
        setShowAdminLogin(false);
        setLoginForm({ username: '', password: '' });
        setAdminLoginError(null);
        toast(t(lang).common.staffSignInSuccess, 'success');
      } catch {
        const message = t(lang).common.networkErrorRetry;
        setAdminLoginError(message);
        toast(message, 'warning');
      } finally {
        setAdminLoginPending(false);
      }
    })();
  }, [adminLoginPending, loginForm, lang, toast]);

  const isStaff = !!sessionUser;
  const isAdminRole = sessionUser?.role === 'ADMIN';

  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggleLang,
      theme,
      setTheme,
      toggleTheme,
      isAdmin,
      isStaff,
      isAdminRole,
      sessionUser,
      setIsAdmin,
      setGuestMode,
      toast,
      toasts,
      removeToast,
      modal,
      openModal,
      closeModal,
      confirmDialog,
      requestConfirm,
      resolveConfirm,
      showAdminLogin,
      openAdminLogin,
      closeAdminLogin,
      loginForm,
      setLoginForm,
      submitAdminLogin,
      adminLoginPending,
      adminLoginError,
      clearAdminLoginError: () => setAdminLoginError(null),
    }),
    [
      lang,
      theme,
      isAdmin,
      isStaff,
      isAdminRole,
      sessionUser,
      toasts,
      modal,
      confirmDialog,
      requestConfirm,
      resolveConfirm,
      showAdminLogin,
      loginForm,
      submitAdminLogin,
      adminLoginPending,
      adminLoginError,
      setGuestMode,
      toast,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

/** Hook – provider nélkül szándékosan hibát dob (gyors hibafelismerés fejlesztés közben). */
export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp csak AppProvider alatt használható.');
  return context;
}
