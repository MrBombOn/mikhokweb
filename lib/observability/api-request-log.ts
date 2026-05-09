import type { NextResponse } from 'next/server';
import { getRequestId, withRequestId } from '@/lib/observability/request-context';
import { serverLogger } from '@/lib/observability/server-logger';

/**
 * Egységes `x-request-id` + JSON structured log meta kritikus API handlerhez
 * (admin írások, foglalás, naptár, hír/útmutató módosítás).
 */
export function apiRequestLog(request: Request, scope: string, pathOverride?: string) {
  const requestId = getRequestId(request);
  const path = pathOverride ?? new URL(request.url).pathname;
  const base = () => ({ requestId, scope, path });

  return {
    requestId,
    path,
    wrap: <T extends NextResponse>(res: T) => withRequestId(res, requestId),
    info: (event: string, meta?: Record<string, unknown>) => serverLogger.info(event, { ...base(), ...meta }),
    warn: (event: string, meta?: Record<string, unknown>) => serverLogger.warn(event, { ...base(), ...meta }),
    error: (event: string, meta?: Record<string, unknown>) => serverLogger.error(event, { ...base(), ...meta }),
  };
}
