'use client';

import { useApp } from '@/components/layout/AppProvider';
import { NewsPageList } from '@/components/news/NewsPageList';

export function NewsPageClient() {
  const { lang } = useApp();
  return <NewsPageList lang={lang} />;
}
