import { unstable_cache } from 'next/cache';
import type { SiteDesignConfig } from '@prisma/client';
import { prisma } from '@/lib/db';

/** `revalidateTag` a Builder design PATCH után — gyökérlayout inline CSS cache invalidálás. */
export const SITE_DESIGN_CACHE_TAG = 'site-design-css';

function buildInlineCss(design: SiteDesignConfig): string {
  return `
        :root {
          --builder-primary: ${design.primaryColor};
          --builder-accent: ${design.accentColor};
          --builder-surface-radius: ${design.surfaceRadius}px;
          --builder-content-max-width: ${design.contentMaxWidth}px;
          --builder-font-family: ${design.fontFamily};
        }
        body { font-family: var(--builder-font-family), sans-serif; }
        .btn-primary { background: var(--builder-primary); border-color: var(--builder-primary); }
        .btn-secondary { border-color: var(--builder-accent); }
        .card { border-radius: var(--builder-surface-radius); }
        .app-shell { max-width: var(--builder-content-max-width); }
        ${design.customCss}
      `;
}

/**
 * Builder globális design → gyökérlayout `<style>` — DB nélkül gyakori újraolvasás helyett cache (alap 300 s).
 */
export async function getSiteDesignInlineCssCached(): Promise<string> {
  return unstable_cache(
    async () => {
      try {
        const design = await prisma.siteDesignConfig.findUnique({ where: { id: 1 } });
        if (!design) return '';
        return buildInlineCss(design);
      } catch {
        return '';
      }
    },
    ['site-design-inline-css-v1'],
    { revalidate: 300, tags: [SITE_DESIGN_CACHE_TAG] },
  )();
}
