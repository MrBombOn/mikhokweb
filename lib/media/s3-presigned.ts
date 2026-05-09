import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getS3Client } from '@/lib/media/s3-client';
import { requireS3ConfigForUpload } from '@/lib/media/storage-config';

const ALLOWED_KEY_PREFIXES = ['uploads/gallery/', 'uploads/guides/'] as const;

export function assertSafeStorageKey(key: string): string {
  const k = key.replace(/^\/+/, '').trim();
  if (!k || k.includes('..') || k.includes('\\')) {
    throw new Error('Érvénytelen tárolási kulcs.');
  }
  if (!ALLOWED_KEY_PREFIXES.some((p) => k.startsWith(p))) {
    throw new Error('A kulcs csak galéria vagy útmutató feltöltési prefixszel kezdődhet.');
  }
  return k;
}

export async function presignPutUpload(key: string, contentType: string, contentLength: number): Promise<string> {
  const safeKey = assertSafeStorageKey(key);
  const cfg = requireS3ConfigForUpload();
  const client = getS3Client(cfg);
  const cmd = new PutObjectCommand({
    Bucket: cfg.bucket,
    Key: safeKey,
    ContentType: contentType,
    ContentLength: contentLength,
    CacheControl: 'public, max-age=31536000, immutable',
  });
  return getSignedUrl(client, cmd, { expiresIn: 900 });
}

export async function presignGetObject(key: string): Promise<string> {
  const safeKey = assertSafeStorageKey(key);
  const cfg = requireS3ConfigForUpload();
  const client = getS3Client(cfg);
  const cmd = new GetObjectCommand({ Bucket: cfg.bucket, Key: safeKey });
  return getSignedUrl(client, cmd, { expiresIn: 300 });
}
