/**
 * @file Rövid élettartamú presigned GET – privát bucket / belső ellenőrzéshez (Fázis 15).
 */
import { NextResponse } from 'next/server';
import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { apiRequestLog } from '@/lib/observability/api-request-log';
import { enforceSameOrigin } from '@/lib/security/csrf';
import { getStorageDriver } from '@/lib/media/storage-config';
import { presignGetObject } from '@/lib/media/s3-presigned';

export async function GET(request: Request) {
  const log = apiRequestLog(request, 'api.admin.storage.presign_get.get');
  const csrf = enforceSameOrigin(request);
  if (csrf) return log.wrap(csrf);

  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) {
    return log.wrap(NextResponse.json({ error: 'Nincs jogosultság.' }, { status: 403 }));
  }

  if (getStorageDriver() !== 's3') {
    return log.wrap(NextResponse.json({ error: 'Presigned GET csak STORAGE_DRIVER=s3 mellett érhető el.' }, { status: 400 }));
  }

  const key = new URL(request.url).searchParams.get('key')?.trim() ?? '';
  if (!key) {
    return log.wrap(NextResponse.json({ error: 'Hiányzó key.' }, { status: 400 }));
  }

  try {
    const url = await presignGetObject(key);
    log.info('storage_presign_get', { actorId: user.id, keyPrefix: key.slice(0, 32) });
    return log.wrap(NextResponse.json({ url }));
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Presign hiba';
    return log.wrap(NextResponse.json({ error: msg }, { status: 400 }));
  }
}
