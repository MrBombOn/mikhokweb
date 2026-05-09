/**
 * @file Egy közzétett hír kanonikus oldala (`/news/{slug}`).
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PublicPageShell } from '@/components/layout/PublicPageShell';
import { getPublishedNewsBySlug } from '@/features/news/server';
import { SITE_NAME, buildPageMetadata, getBaseUrl, plainTextExcerpt } from '@/lib/seo';
import { SeoJsonLd, buildNewsArticleJsonLd } from '@/lib/seo/jsonld';

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const row = await getPublishedNewsBySlug(slug);
  if (!row) {
    return { title: `Hír | ${SITE_NAME}` };
  }
  return buildPageMetadata({
    title: row.titleHu,
    description: plainTextExcerpt(row.textHu, 160),
    path: `/news/${slug}`,
  });
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const row = await getPublishedNewsBySlug(slug);
  if (!row) notFound();

  const base = getBaseUrl().replace(/\/$/, '');
  const articleUrl = `${base}/news/${slug}`;

  return (
    <PublicPageShell>
      <SeoJsonLd
        data={buildNewsArticleJsonLd({
          headline: row.titleHu,
          description: plainTextExcerpt(row.textHu, 200),
          url: articleUrl,
          datePublished: row.updatedAt.toISOString(),
          authorName: row.author,
        })}
      />
      <article className="section module-page-frame stack">
        <p className="text-muted">
          <Link href="/news">← Hírek</Link>
        </p>
        <p className="news-pub-date">{row.listDate}</p>
        <h1 className="news-page-card-title">{row.titleHu}</h1>
        <p className="news-page-card-author">
          {row.author}
        </p>
        <div
          className="news-article-body landing-news-card-body"
          dangerouslySetInnerHTML={{ __html: row.textHu }}
        />
      </article>
    </PublicPageShell>
  );
}
