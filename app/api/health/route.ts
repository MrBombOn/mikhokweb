import { prisma } from '@/lib/db';
import { ok } from '@/lib/api/response';
import { serverLogger } from '@/lib/observability/server-logger';

export async function GET() {
  const started = Date.now();
  try {
    await prisma.$queryRaw`SELECT 1`;
    const latencyMs = Date.now() - started;
    return ok({
      status: 'ok',
      service: 'hok-web-v11',
      db: 'ok',
      latencyMs,
      now: new Date().toISOString(),
    });
  } catch (error) {
    serverLogger.error('health_check_failed', {
      scope: 'api.health',
      message: error instanceof Error ? error.message : String(error),
    });
    return new Response(
      JSON.stringify({
        status: 'degraded',
        service: 'hok-web-v11',
        db: 'error',
        now: new Date().toISOString(),
      }),
      { status: 503, headers: { 'Content-Type': 'application/json' } },
    );
  }
}

