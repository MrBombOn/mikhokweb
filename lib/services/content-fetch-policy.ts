/**
 * @file Tartalom-API hiba esetén használt demó / statikus fallback szabály
 *
 * @description
 * Ha a publikus modulok `GET` hívása kudarcot vagy üres adatot ad, a kliens opcionálisan
 * `lib/content` mock adatra válthat — **élesben ez alapból ki van kapcsolva**, hogy ne jelenjen meg
 * „véletlen” demó tartalom (Fázis 6).
 *
 * @env
 * - **Production:** fallback csak akkor, ha `ALLOW_DEMO_FALLBACK=1` (staging kivétel; ritka).
 * - **Nem production:** alapból engedélyezett; teljes kikapcsolás: `ALLOW_DEMO_FALLBACK=0` (E2E, API-only teszt).
 */
export type DemoFallbackEnv = {
  NODE_ENV?: string | undefined;
  ALLOW_DEMO_FALLBACK?: string | undefined;
};

/** Tiszta függvény — tesztek és dokumentált viselkedés (env rekord). */
export function readDemoFallbackPolicy(env: DemoFallbackEnv): boolean {
  if (env.NODE_ENV === 'production') {
    return env.ALLOW_DEMO_FALLBACK === '1';
  }
  if (env.ALLOW_DEMO_FALLBACK === '0') {
    return false;
  }
  return true;
}

export function canUseDemoFallback(): boolean {
  return readDemoFallbackPolicy({
    NODE_ENV: process.env.NODE_ENV,
    ALLOW_DEMO_FALLBACK: process.env.ALLOW_DEMO_FALLBACK,
  });
}
