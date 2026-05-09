import { forbidden, ok } from '@/lib/api/response';
import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';

type MatrixRow = {
  capability: string;
  office: boolean;
  admin: boolean;
  area: 'content' | 'system' | 'security';
};

const MATRIX: MatrixRow[] = [
  { capability: 'News create/edit/publish', office: true, admin: true, area: 'content' },
  { capability: 'Feedback workflow (status, notes)', office: true, admin: true, area: 'content' },
  { capability: 'Feedback assignee change', office: false, admin: true, area: 'content' },
  { capability: 'Category create', office: true, admin: true, area: 'content' },
  { capability: 'User management', office: false, admin: true, area: 'system' },
  { capability: 'Audit log read', office: false, admin: true, area: 'system' },
  { capability: 'Feature flags', office: false, admin: true, area: 'system' },
  { capability: 'Office internal editor', office: true, admin: true, area: 'content' },
  { capability: 'Security headers and auth policy changes', office: false, admin: true, area: 'security' },
];

export async function GET() {
  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) return forbidden();
  return ok({ items: MATRIX });
}

