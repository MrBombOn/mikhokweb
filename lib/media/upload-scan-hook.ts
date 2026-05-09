/**
 * Opcionális feltöltés-utáni hook (pl. vírusscan szolgáltatás) — nem blokkolja a választ.
 */
export type UploadScanPayload = {
  storageKey: string;
  mimeType: string;
  sizeBytes: number;
  purpose: string;
};

export function fireUploadScanHook(payload: UploadScanPayload): void {
  const url = process.env.UPLOAD_SCAN_WEBHOOK_URL?.trim();
  if (!url) return;
  void fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...payload,
      at: new Date().toISOString(),
    }),
    signal: AbortSignal.timeout(8000),
  }).catch(() => {});
}
