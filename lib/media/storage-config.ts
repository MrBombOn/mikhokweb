/**
 * Objektumtár (S3-kompatibilis) vs helyi `public/uploads` (§12 Fázis 15).
 */

export type StorageDriver = 'local' | 's3';

export type ResolvedS3Config = {
  bucket: string;
  region: string;
  publicBaseUrl: string;
  endpoint?: string;
  forcePathStyle: boolean;
  accessKeyId: string;
  secretAccessKey: string;
};

export function getStorageDriver(): StorageDriver {
  const raw = process.env.STORAGE_DRIVER?.trim().toLowerCase();
  return raw === 's3' ? 's3' : 'local';
}

export function resolveS3Config(): ResolvedS3Config | null {
  if (getStorageDriver() !== 's3') return null;
  const bucket = process.env.S3_BUCKET?.trim();
  const region = process.env.S3_REGION?.trim() || process.env.AWS_REGION?.trim();
  const publicBaseUrl = process.env.S3_PUBLIC_BASE_URL?.trim();
  const accessKeyId = process.env.S3_ACCESS_KEY_ID?.trim() || process.env.AWS_ACCESS_KEY_ID?.trim();
  const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY?.trim() || process.env.AWS_SECRET_ACCESS_KEY?.trim();
  if (!bucket || !region || !publicBaseUrl || !accessKeyId || !secretAccessKey) {
    return null;
  }
  const endpoint = process.env.S3_ENDPOINT?.trim() || undefined;
  const forcePathStyle = process.env.S3_FORCE_PATH_STYLE === '1' || process.env.S3_FORCE_PATH_STYLE === 'true';
  return {
    bucket,
    region,
    publicBaseUrl: publicBaseUrl.replace(/\/$/, ''),
    endpoint,
    forcePathStyle,
    accessKeyId,
    secretAccessKey,
  };
}

export function requireS3ConfigForUpload(): ResolvedS3Config {
  const c = resolveS3Config();
  if (!c) {
    throw new Error(
      'STORAGE_DRIVER=s3, de hiányzik S3_BUCKET, S3_REGION, S3_PUBLIC_BASE_URL vagy hozzáférési kulcs (S3_ACCESS_KEY_ID / S3_SECRET_ACCESS_KEY vagy AWS_*).',
    );
  }
  return c;
}
