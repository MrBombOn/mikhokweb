/**
 * @file Verziózott partner read API — `GET /api/v1/public/feed` (Fázis 19).
 * Kötelező: `PUBLIC_READ_API_KEY` env + fejléc `X-Hok-Public-Api-Key` vagy `Authorization: Bearer`.
 */
import { NextResponse } from 'next/server';
import { buildPublicReadFeedV1 } from '@/lib/integrations/public-read-feed';
import {
  isPublicFeedBlocked,
  registerPublicFeedHit,
} from '@/lib/integrations/public-read-rate-limit';
import { getConfiguredPublicReadApiKey, verifyPublicReadApiKey } from '@/lib/integrations/public-read-api-key';
import { getRequestId, withRequestId } from '@/lib/observability/request-context';
import { serverLogger } from '@/lib/observability/server-logger';

export async function GET(request: Request) {
  const requestId = getRequestId(request);

  if (!getConfiguredPublicReadApiKey()) {
    serverLogger.warn('public_feed_disabled', { scope: 'api.v1.public.feed', requestId });
    return withRequestId(NextResponse.json({ error: 'public_feed_disabled' }, { status: 404 }), requestId);
  }

  if (!verifyPublicReadApiKey(request)) {
    return withRequestId(NextResponse.json({ error: 'unauthorized' }, { status: 401 }), requestId);
  }

  if (isPublicFeedBlocked(request)) {
    return withRequestId(NextResponse.json({ error: 'rate_limited' }, { status: 429 }), requestId);
  }

  registerPublicFeedHit(request);

  const body = await buildPublicReadFeedV1();
  return withRequestId(
    NextResponse.json(body, {
      headers: {
        'Cache-Control': 'private, max-age=60',
        'X-Api-Version': '1.0',
      },
    }),
    requestId,
  );
}
