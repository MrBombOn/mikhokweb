/**
 * Központi keresőindex újraépítése (Fázis 14) – futtasd migráció/seed után vagy tartalom import után.
 */
import { rebuildSearchIndex } from '../../lib/search/rebuild-index';

async function main() {
  const counts = await rebuildSearchIndex();
  // eslint-disable-next-line no-console -- CLI script
  console.log('[rebuild-search-index] done', counts);
}

main().catch((e) => {
  // eslint-disable-next-line no-console -- CLI script
  console.error(e);
  process.exit(1);
});
