'use client';

import { useCallback, useEffect, useState } from 'react';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { Skeleton } from '@/components/ui/Skeleton';
import { fetchNewsList } from '@/features/news/client';
import type { NewsItem } from '@/features/news/types';

function sourceChip(lang: 'hu' | 'en', source: NewsItem['source']) {
  const hu = { internal: 'Belső', facebook: 'Facebook', instagram: 'Instagram' } as const;
  const en = { internal: 'Internal', facebook: 'Facebook', instagram: 'Instagram' } as const;
  return lang === 'hu' ? hu[source] : en[source];
}

export function NewsPageList({ lang }: { lang: 'hu' | 'en' }) {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(false);
    const list = await fetchNewsList();
    if (list === null) {
      setLoadError(true);
      setItems([]);
    } else {
      setLoadError(false);
      setItems(list);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  if (loading) {
    return <Skeleton variant="newsList" />;
  }

  if (loadError) {
    return (
      <ErrorState
        title={lang === 'hu' ? 'Betöltési hiba' : 'Load error'}
        message={
          lang === 'hu'
            ? 'A hírek nem tölthetők be. Ellenőrizd a hálózatot, majd próbáld újra.'
            : 'News could not be loaded. Check your connection and try again.'
        }
        onRetry={() => void load()}
        retryLabel={lang === 'hu' ? 'Újra' : 'Retry'}
      />
    );
  }

  if (!items.length) {
    return (
      <EmptyState
        title={lang === 'hu' ? 'Nincs közzétett hír' : 'No published news yet'}
        description={
          lang === 'hu'
            ? 'Amint megjelenik tartalom, itt fogod látni a listát.'
            : 'When content is published, it will appear here.'
        }
      />
    );
  }

  return (
    <ul className="stack news-page-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {items.map((item) => (
        <li key={item.id} className="card news-page-card">
          <div className="news-page-card-meta">
            <time className="news-pub-date" dateTime={item.date}>
              {item.date}
            </time>
            <div className="news-meta-chips">
              {item.pinned ? (
                <span className="badge news-pinned-badge">{lang === 'hu' ? 'Kiemelt' : 'Pinned'}</span>
              ) : null}
              <span className="badge">{item.category}</span>
              <span className={`badge news-source-badge news-source-badge--${item.source}`}>{sourceChip(lang, item.source)}</span>
            </div>
          </div>
          <h3 className="news-page-card-title">{lang === 'hu' ? item.titleHu : item.titleEn}</h3>
          <p className="news-page-card-body">{lang === 'hu' ? item.textHu : item.textEn}</p>
          <div className="news-page-card-author">{item.author}</div>
        </li>
      ))}
    </ul>
  );
}
