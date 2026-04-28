/**
 * @file REST: About Us összesítő – narratívák + tagok (GET).
 */
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/current-user';
import { listAboutPayloadForRole } from '@/features/about/server';

export async function GET() {
  const user = await getCurrentUser();
  const payload = await listAboutPayloadForRole(user?.role);
  return NextResponse.json(payload);
}
