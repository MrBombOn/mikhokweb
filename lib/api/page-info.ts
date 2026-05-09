/**
 * @file Egységes lapozás meta az admin táblák JSON válaszában.
 */
export type PageInfo = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  sort?: string;
};

export function buildPageInfo(opts: {
  page: number;
  limit: number;
  total: number;
  sort?: string;
}): PageInfo {
  const { page, limit, total, sort } = opts;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  return {
    page,
    limit,
    total,
    totalPages,
    hasNext: page * limit < total,
    hasPrev: page > 1,
    ...(sort !== undefined ? { sort } : {}),
  };
}
