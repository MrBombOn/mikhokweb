/**
 * @file Belső admin DB overview – i18n feliratok (SSOT: `messages.ts` `internal.dbTables` / `dbGroups`)
 */
import type { DbOverviewGroup } from '@/lib/admin/db-overview';
import type { Lang } from '@/types';
import { messages } from '@/lib/i18n/messages';

type TableRowCopy = { title: string; description: string };

export function getInternalDbGroupLabel(lang: Lang, group: DbOverviewGroup): string {
  return messages[lang].internal.dbGroups[group];
}

/** Prisma tábla-kulcs → lokalizált cím + leírás; hiány esetén API-ból jövő HU fallback. */
export function getInternalDbTableCopy(lang: Lang, key: string, fallback: TableRowCopy): TableRowCopy {
  const row = messages[lang].internal.dbTables as Record<string, TableRowCopy | undefined>;
  return row[key] ?? fallback;
}
