/**
 * S3 / MinIO: feltöltött objektumok számlálása (DR / kapcsolat ellenőrzés, Fázis 15).
 */
import { ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3';
import { resolveS3Config } from '../../lib/media/storage-config';

async function main() {
  const cfg = resolveS3Config();
  if (!cfg) {
    // eslint-disable-next-line no-console -- CLI
    console.log('[s3-upload-inventory] STORAGE_DRIVER=s3 és teljes S3 env szükséges — kihagyva.');
    process.exit(0);
  }
  const client = new S3Client({
    region: cfg.region,
    endpoint: cfg.endpoint,
    forcePathStyle: cfg.forcePathStyle,
    credentials: { accessKeyId: cfg.accessKeyId, secretAccessKey: cfg.secretAccessKey },
  });
  let total = 0;
  let continuationToken: string | undefined;
  do {
    const out = await client.send(
      new ListObjectsV2Command({
        Bucket: cfg.bucket,
        Prefix: 'uploads/',
        ContinuationToken: continuationToken,
        MaxKeys: 1000,
      }),
    );
    total += out.Contents?.length ?? 0;
    continuationToken = out.IsTruncated ? out.NextContinuationToken : undefined;
  } while (continuationToken);

  // eslint-disable-next-line no-console -- CLI
  console.log('[s3-upload-inventory] bucket=', cfg.bucket, 'objects_prefix_uploads=', total);
}

main().catch((e) => {
  // eslint-disable-next-line no-console -- CLI
  console.error(e);
  process.exit(1);
});
