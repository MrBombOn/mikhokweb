import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { getCurrentUser, isAdmin } from '@/lib/auth/current-user';
import { normalizeBodyJson } from '@/lib/site-builder/studio';
import { SITE_NAME, buildPageMetadata } from '@/lib/seo';
import { SeoJsonLd, buildWebPageJsonLd } from '@/lib/seo/jsonld';

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
};

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { preview } = await searchParams;
  const row = await prisma.siteBuilderPage.findUnique({ where: { slug } });
  if (!row) {
    return { title: `Oldal | ${SITE_NAME}` };
  }
  const user = await getCurrentUser();
  const canPreviewDraft = !!user && isAdmin(user.role);
  const isPreview = preview === '1';
  const visible = row.status === 'published' || (isPreview && canPreviewDraft);
  if (!visible) {
    return { title: `${row.titleHu} | ${SITE_NAME}`, robots: { index: false, follow: false } };
  }
  const description = (row.titleEn?.trim() || row.titleHu).slice(0, 200);
  return buildPageMetadata({
    title: row.titleHu,
    description,
    path: `/custom/${slug}`,
  });
}
function renderBody(bodyJson: unknown) {
  const body = normalizeBodyJson(bodyJson);
  return (
    <div className="stack">
      {body.blocks.map((block) => (
        <section key={block.id} className="card">
          <h2>{block.titleHu || block.titleEn || block.type}</h2>
          {block.bodyHu || block.bodyEn ? (
            <div className="grid-2">
              <div>
                <p className="muted-text">HU</p>
                <p>{block.bodyHu}</p>
              </div>
              <div>
                <p className="muted-text">EN</p>
                <p>{block.bodyEn}</p>
              </div>
            </div>
          ) : null}
          {block.ctaHref ? (
            <p>
              <a href={block.ctaHref}>{block.ctaLabelHu || block.ctaLabelEn || block.ctaHref}</a>
            </p>
          ) : null}
        </section>
      ))}
    </div>
  );
}

export default async function CustomBuilderPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { preview } = await searchParams;
  const row = await prisma.siteBuilderPage.findUnique({ where: { slug } });
  if (!row) return notFound();

  const user = await getCurrentUser();
  const canPreviewDraft = !!user && isAdmin(user.role);
  const isPreview = preview === '1';
  if (row.status !== 'published' && !(isPreview && canPreviewDraft)) return notFound();

  const jsonLd = buildWebPageJsonLd({
    name: row.titleHu,
    description: row.titleEn?.trim() || row.titleHu,
    path: `/custom/${slug}`,
  });

  return (
    <div className="app-shell section">
      <SeoJsonLd data={jsonLd} />
      <header className="card">
        <h1>{row.titleHu}</h1>
        <p className="muted-text">{row.titleEn}</p>
        <p className="muted-text">
          slug: /custom/{row.slug} · status: {row.status}
        </p>
      </header>
      {renderBody(row.bodyJson)}
    </div>
  );
}
