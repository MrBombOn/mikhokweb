import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getS3Client } from '@/lib/media/s3-client';
import { getStorageDriver, requireS3ConfigForUpload } from '@/lib/media/storage-config';
import { fireUploadScanHook } from '@/lib/media/upload-scan-hook';

/** Relatív útvonal `public/` alól, posix: `uploads/gallery/...` */
export type PersistResult = { publicUrl: string; storageKey: string };

/**
 * Bináris asset mentése: helyi `public/` vagy S3 PutObject.
 * Visszaadott `publicUrl`: böngészőben használható (helyi `/uploads/...` vagy `S3_PUBLIC_BASE_URL/...`).
 */
export async function persistPublicUpload(
  relativeUnderPublic: string,
  body: Buffer,
  contentType: string,
  purpose: 'gallery' | 'guides',
): Promise<PersistResult> {
  const key = relativeUnderPublic.replace(/^\/+/, '');

  if (getStorageDriver() === 'local') {
    const abs = path.join(process.cwd(), 'public', key);
    await mkdir(path.dirname(abs), { recursive: true });
    await writeFile(abs, body);
    const publicUrl = `/${key}`;
    fireUploadScanHook({ storageKey: key, mimeType: contentType, sizeBytes: body.length, purpose });
    return { publicUrl, storageKey: key };
  }

  const cfg = requireS3ConfigForUpload();
  const client = getS3Client(cfg);
  await client.send(
    new PutObjectCommand({
      Bucket: cfg.bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
      CacheControl: 'public, max-age=31536000, immutable',
    }),
  );
  const publicUrl = `${cfg.publicBaseUrl}/${key}`;
  fireUploadScanHook({ storageKey: key, mimeType: contentType, sizeBytes: body.length, purpose });
  return { publicUrl, storageKey: key };
}
