/**
 * @file Jelszó hash és összehasonlítás (bcryptjs)
 *
 * @description
 * A felhasználó jelszava **soha** plain textben nem tárolódik az adatbázisban.
 * A `hashPassword` regisztráció / seed során, a `verifyPassword` login API-ban használandó.
 *
 * @rounds
 * A bcrypt „cost” paramétere (12): nagyobb érték = lassabb brute-force, de lassabb hash is.
 */
import bcrypt from 'bcryptjs';

/** Bcrypt munkafaktor – 10–12 tipikus webalkalmazáshoz. */
const ROUNDS = 12;

/** Új felhasználó vagy jelszócsere – tárolandó hash generálása. */
export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, ROUNDS);
}

/** Login: plain jelszó összevetése a DB-ben tárolt hash-sel (időállandó összehasonlítás). */
export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}
