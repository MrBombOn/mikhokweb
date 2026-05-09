import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db';

export async function createGuideRevision(guideId: number, payload: unknown): Promise<void> {
  const latest = await prisma.guideRevision.findFirst({
    where: { guideId },
    orderBy: [{ version: 'desc' }],
    select: { version: true },
  });
  const version = (latest?.version ?? 0) + 1;
  await prisma.guideRevision.create({
    data: {
      guideId,
      version,
      payloadJson: payload as Prisma.InputJsonValue,
    },
  });
}

