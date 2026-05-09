/**
 * @file Előnézet: tokennel bármely státuszú hír JSON (titkos URL).
 */
import { NextResponse } from 'next/server';
import { newsRowToItem } from '@/features/news/mapper';
import { getNewsRowByPreviewToken } from '@/features/news/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get('token')?.trim() ?? '';
  if (!token) {
    return NextResponse.json({ error: 'Hiányzó token.' }, { status: 400 });
  }

  const row = await getNewsRowByPreviewToken(token);
  if (!row || row.status === 'deleted') {
    return NextResponse.json({ error: 'Érvénytelen előnézeti link.' }, { status: 404 });
  }

  return NextResponse.json({ item: newsRowToItem(row) });
}
