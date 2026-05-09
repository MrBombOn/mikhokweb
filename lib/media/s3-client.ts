import { S3Client } from '@aws-sdk/client-s3';
import type { ResolvedS3Config } from '@/lib/media/storage-config';

let cached: S3Client | null = null;
let cachedSig: string | null = null;

export function getS3Client(cfg: ResolvedS3Config): S3Client {
  const sig = `${cfg.region}|${cfg.endpoint ?? ''}|${cfg.forcePathStyle}|${cfg.accessKeyId}`;
  if (cached && cachedSig === sig) return cached;
  cached = new S3Client({
    region: cfg.region,
    endpoint: cfg.endpoint,
    forcePathStyle: cfg.forcePathStyle,
    credentials: {
      accessKeyId: cfg.accessKeyId,
      secretAccessKey: cfg.secretAccessKey,
    },
  });
  cachedSig = sig;
  return cached;
}
