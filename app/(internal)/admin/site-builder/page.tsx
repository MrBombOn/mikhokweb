'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { Card, SectionHeader } from '@/components/ui/Core';
import { ErrorState } from '@/components/ui/ErrorState';
import { t } from '@/lib/content';
import type { DbOverviewTable } from '@/lib/admin/db-overview';
import { defaultBlock, normalizeBodyJson, type SiteBuilderBlock, type SiteBuilderBody } from '@/lib/site-builder/studio';

type BuilderPage = {
  id: number;
  slug: string;
  titleHu: string;
  titleEn: string;
  bodyJson: unknown;
  status: 'draft' | 'scheduled' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
};

type BuilderRevision = {
  id: number;
  action: string;
  titleHu: string;
  titleEn: string;
  status: BuilderPage['status'];
  actorId: string | null;
  createdAt: string;
};

type PublishQueueItem = {
  id: number;
  pageId: number;
  pageSlug: string;
  pageTitleHu: string;
  pageTitleEn: string;
  status: string;
  targetStatus: string;
  scheduledFor: string | null;
  processedAt: string | null;
  createdAt: string;
};

type BuilderTemplate = {
  key: string;
  titleHu: string;
  titleEn: string;
  descriptionHu: string;
  descriptionEn: string;
  body: SiteBuilderBody;
};

type DesignConfig = {
  id: number;
  primaryColor: string;
  accentColor: string;
  surfaceRadius: number;
  contentMaxWidth: number;
  fontFamily: string;
  customCss: string;
  updatedAt: string;
};

const EMPTY_PAGE_DRAFT = {
  slug: '',
  titleHu: '',
  titleEn: '',
  status: 'draft' as BuilderPage['status'],
  blocks: [] as SiteBuilderBlock[],
};

export default function AdminSiteBuilderPage() {
  const { lang, isAdminRole, toast, requestConfirm } = useApp();
  const m = t(lang).internal;
  const locale = lang === 'hu' ? 'hu-HU' : 'en-US';
  const [canaryAllowed, setCanaryAllowed] = useState<boolean | null>(null);
  const [canaryError, setCanaryError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState<BuilderPage[]>([]);
  const [dbTables, setDbTables] = useState<DbOverviewTable[]>([]);
  const [design, setDesign] = useState<DesignConfig | null>(null);
  const [templates, setTemplates] = useState<BuilderTemplate[]>([]);
  const [queue, setQueue] = useState<PublishQueueItem[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [draft, setDraft] = useState(EMPTY_PAGE_DRAFT);
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [savingPage, setSavingPage] = useState(false);
  const [savingDesign, setSavingDesign] = useState(false);
  const [deletingPageId, setDeletingPageId] = useState<number | null>(null);
  const [selectedPageId, setSelectedPageId] = useState<number | null>(null);
  const [revisions, setRevisions] = useState<BuilderRevision[]>([]);

  const loadAll = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const [pagesRes, designRes, dbRes, templateRes, queueRes] = await Promise.all([
        fetch('/api/admin/site-builder/pages', { credentials: 'include' }),
        fetch('/api/admin/site-builder/design', { credentials: 'include' }),
        fetch('/api/admin/db-overview', { credentials: 'include' }),
        fetch('/api/admin/site-builder/templates', { credentials: 'include' }),
        fetch('/api/admin/site-builder/publish-queue', { credentials: 'include' }),
      ]);
      const pagesData = (await pagesRes.json().catch(() => ({}))) as { items?: BuilderPage[]; error?: string };
      const designData = (await designRes.json().catch(() => ({}))) as { item?: DesignConfig; error?: string };
      const dbData = (await dbRes.json().catch(() => ({}))) as { tables?: DbOverviewTable[]; error?: string };
      const templateData = (await templateRes.json().catch(() => ({}))) as { items?: BuilderTemplate[]; error?: string };
      const queueData = (await queueRes.json().catch(() => ({}))) as { items?: PublishQueueItem[]; error?: string };
      if (!pagesRes.ok || !designRes.ok || !dbRes.ok || !templateRes.ok || !queueRes.ok) {
        throw new Error(
          pagesData.error ?? designData.error ?? dbData.error ?? templateData.error ?? queueData.error ?? m.dbLoadFailed,
        );
      }
      setPages(Array.isArray(pagesData.items) ? pagesData.items : []);
      setDesign(designData.item ?? null);
      setDbTables(Array.isArray(dbData.tables) ? dbData.tables : []);
      setTemplates(Array.isArray(templateData.items) ? templateData.items : []);
      setQueue(Array.isArray(queueData.items) ? queueData.items : []);
    } catch (err) {
      const text = err instanceof Error ? err.message : m.dbNetworkError;
      setLoadError(text);
      toast(text, 'warning');
    } finally {
      setLoading(false);
    }
  }, [m.dbLoadFailed, m.dbNetworkError, toast]);

  useEffect(() => {
    if (!isAdminRole) return;
    let mounted = true;
    setCanaryError(null);
    void fetch('/api/admin/site-builder/canary', { credentials: 'include' })
      .then(async (r) => {
        const data = (await r.json().catch(() => ({}))) as { allowed?: boolean; error?: string };
        if (!mounted) return;
        if (!r.ok) {
          setCanaryError(data.error ?? m.dbLoadFailed);
          setCanaryAllowed(false);
          return;
        }
        setCanaryAllowed(Boolean(data.allowed));
      })
      .catch(() => {
        if (!mounted) return;
        setCanaryError(m.dbNetworkError);
        setCanaryAllowed(false);
      });
    return () => {
      mounted = false;
    };
  }, [isAdminRole, m.dbLoadFailed, m.dbNetworkError]);

  useEffect(() => {
    if (!isAdminRole || canaryAllowed !== true) return;
    void loadAll();
  }, [isAdminRole, canaryAllowed, loadAll]);

  const groupedTableCount = useMemo(() => {
    const byGroup = new Map<string, number>();
    for (const table of dbTables) byGroup.set(table.group, (byGroup.get(table.group) ?? 0) + table.count);
    return [...byGroup.entries()].sort((a, b) => b[1] - a[1]);
  }, [dbTables]);

  const activeBlock = useMemo(
    () => draft.blocks.find((b) => b.id === activeBlockId) ?? null,
    [activeBlockId, draft.blocks],
  );

  const currentPage = useMemo(
    () => pages.find((p) => p.id === selectedPageId) ?? null,
    [pages, selectedPageId],
  );

  const draftDiff = useMemo(() => {
    if (!currentPage) return null;
    const currentBody = normalizeBodyJson(currentPage.bodyJson);
    const changedBlocks =
      JSON.stringify(currentBody.blocks.map((b) => ({ ...b, id: undefined }))) !==
      JSON.stringify(draft.blocks.map((b) => ({ ...b, id: undefined })));
    return {
      titleHuChanged: draft.titleHu.trim() !== currentPage.titleHu,
      titleEnChanged: draft.titleEn.trim() !== currentPage.titleEn,
      statusChanged: draft.status !== currentPage.status,
      blocksChanged: changedBlocks,
    };
  }, [currentPage, draft]);

  const loadRevisions = useCallback(
    async (pageId: number) => {
      const res = await fetch(`/api/admin/site-builder/pages/${pageId}/revisions`, { credentials: 'include' });
      const data = (await res.json().catch(() => ({}))) as { items?: BuilderRevision[]; error?: string };
      if (!res.ok) {
        toast(data.error ?? (lang === 'hu' ? 'Revíziók betöltése sikertelen.' : 'Failed to load revisions.'), 'warning');
        setRevisions([]);
        return;
      }
      setRevisions(Array.isArray(data.items) ? data.items : []);
    },
    [lang, toast],
  );

  function hydrateDraftFromPage(page: BuilderPage) {
    const body = normalizeBodyJson(page.bodyJson);
    setDraft({
      slug: page.slug,
      titleHu: page.titleHu,
      titleEn: page.titleEn,
      status: page.status,
      blocks: body.blocks,
    });
    setActiveBlockId(body.blocks[0]?.id ?? null);
    setSelectedPageId(page.id);
    void loadRevisions(page.id);
  }

  async function savePage(isNew: boolean) {
    const bodyJson = { blocks: draft.blocks };
    if (!draft.slug.trim() || !draft.titleHu.trim() || !draft.titleEn.trim()) {
      toast(lang === 'hu' ? 'Slug, HU és EN cím kötelező.' : 'Slug and HU/EN titles are required.', 'warning');
      return;
    }
    setSavingPage(true);
    try {
      const url = isNew ? '/api/admin/site-builder/pages' : `/api/admin/site-builder/pages/${selectedPageId}`;
      const method = isNew ? 'POST' : 'PATCH';
      const res = await fetch(url, {
        method,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: draft.slug.trim(),
          titleHu: draft.titleHu.trim(),
          titleEn: draft.titleEn.trim(),
          status: draft.status,
          bodyJson,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { item?: BuilderPage; error?: string };
      if (!res.ok) {
        toast(data.error ?? (lang === 'hu' ? 'Mentési hiba.' : 'Save failed.'), 'warning');
        return;
      }
      toast(isNew ? (lang === 'hu' ? 'Oldal létrehozva.' : 'Page created.') : lang === 'hu' ? 'Mentve.' : 'Saved.', 'success');
      await loadAll();
      if (!isNew && selectedPageId) void loadRevisions(selectedPageId);
      if (isNew) {
        setDraft(EMPTY_PAGE_DRAFT);
        setSelectedPageId(null);
      }
    } finally {
      setSavingPage(false);
    }
  }

  async function queuePublish(pageId: number) {
    const okToQueue = await requestConfirm({
      title: lang === 'hu' ? 'Publikálási queue' : 'Publish queue',
      message: lang === 'hu' ? 'Queue-ba teszed a publikálást?' : 'Add this publish action to queue?',
      confirmLabel: lang === 'hu' ? 'Queue' : 'Queue',
      cancelLabel: t(lang).common.cancel,
    });
    if (!okToQueue) return;
    const res = await fetch('/api/admin/site-builder/publish-queue', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pageId }),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      toast(data.error ?? (lang === 'hu' ? 'Queue mentés sikertelen.' : 'Queue save failed.'), 'warning');
      return;
    }
    toast(lang === 'hu' ? 'Publikálási queue frissítve.' : 'Publish queue updated.', 'success');
    await loadAll();
    if (selectedPageId === pageId) void loadRevisions(pageId);
  }

  async function rollbackToRevision(pageId: number, revisionId: number) {
    const res = await fetch(`/api/admin/site-builder/pages/${pageId}/revisions`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ revisionId }),
    });
    const data = (await res.json().catch(() => ({}))) as { item?: BuilderPage; error?: string };
    if (!res.ok) {
      toast(data.error ?? (lang === 'hu' ? 'Rollback hiba.' : 'Rollback failed.'), 'warning');
      return;
    }
    toast(lang === 'hu' ? 'Rollback kész, oldal vázlatra állítva.' : 'Rollback complete, page set to draft.', 'success');
    await loadAll();
    const refreshed = pages.find((p) => p.id === pageId);
    if (refreshed) hydrateDraftFromPage(refreshed);
    await loadRevisions(pageId);
  }

  function addBlock(type: SiteBuilderBlock['type']) {
    const next = [...draft.blocks, defaultBlock(type)];
    setDraft((prev) => ({ ...prev, blocks: next }));
    setActiveBlockId(next[next.length - 1]?.id ?? null);
  }

  function updateActiveBlock(patch: Partial<SiteBuilderBlock>) {
    if (!activeBlockId) return;
    setDraft((prev) => ({
      ...prev,
      blocks: prev.blocks.map((b) => (b.id === activeBlockId ? { ...b, ...patch } : b)),
    }));
  }

  function removeBlock(id: string) {
    const next = draft.blocks.filter((b) => b.id !== id);
    setDraft((prev) => ({ ...prev, blocks: next }));
    if (activeBlockId === id) setActiveBlockId(next[0]?.id ?? null);
  }

  function applyTemplate(templateKey: string) {
    const tpl = templates.find((x) => x.key === templateKey);
    if (!tpl) return;
    setDraft((prev) => ({ ...prev, blocks: tpl.body.blocks }));
    setActiveBlockId(tpl.body.blocks[0]?.id ?? null);
  }

  function onDropBlock(targetId: string) {
    if (!draggingId || draggingId === targetId) return;
    const next = [...draft.blocks];
    const from = next.findIndex((b) => b.id === draggingId);
    const to = next.findIndex((b) => b.id === targetId);
    if (from < 0 || to < 0) return;
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved!);
    setDraft((prev) => ({ ...prev, blocks: next }));
    setDraggingId(null);
  }

  async function deletePage(id: number) {
    setDeletingPageId(id);
    try {
      const res = await fetch(`/api/admin/site-builder/pages/${id}`, { method: 'DELETE', credentials: 'include' });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        toast(data.error ?? (lang === 'hu' ? 'Mentési hiba.' : 'Save failed.'), 'warning');
        return;
      }
      toast(lang === 'hu' ? 'Oldal törölve.' : 'Page deleted.', 'success');
      await loadAll();
      if (selectedPageId === id) {
        setSelectedPageId(null);
        setRevisions([]);
      }
    } finally {
      setDeletingPageId(null);
    }
  }

  async function saveDesign() {
    if (!design) return;
    setSavingDesign(true);
    try {
      const res = await fetch('/api/admin/site-builder/design', {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          primaryColor: design.primaryColor,
          accentColor: design.accentColor,
          surfaceRadius: Number(design.surfaceRadius),
          contentMaxWidth: Number(design.contentMaxWidth),
          fontFamily: design.fontFamily,
          customCss: design.customCss,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        toast(data.error ?? (lang === 'hu' ? 'Mentési hiba.' : 'Save failed.'), 'warning');
        return;
      }
      toast(lang === 'hu' ? 'Design guardrails mentve.' : 'Design guardrails saved.', 'success');
      await loadAll();
    } finally {
      setSavingDesign(false);
    }
  }

  if (!isAdminRole) {
    return (
      <div className="app-shell section">
        <SectionHeader eyebrow="Builder Studio" title="Builder Studio V2" text={lang === 'hu' ? 'Csak ADMIN.' : 'ADMIN only.'} />
        <ErrorState title={m.featureFlagsAdminOnlyTitle} message={m.featureFlagsAdminOnlyMessage} />
      </div>
    );
  }

  if (canaryAllowed === null) {
    return (
      <div className="app-shell section">
        <SectionHeader
          eyebrow="Builder Studio V2"
          title={lang === 'hu' ? 'No-code oldalépítő' : 'No-code page builder'}
          text={lang === 'hu' ? 'Canary ellenőrzés…' : 'Checking canary access…'}
        />
        <p className="muted-text">{m.loading}</p>
      </div>
    );
  }

  if (!canaryAllowed) {
    return (
      <div className="app-shell section">
        <SectionHeader eyebrow="Builder Studio V2" title={m.siteBuilderCanaryTitle} text={m.siteBuilderCanaryMessage} />
        <ErrorState
          title={canaryError ? m.dbLoadFailed : m.siteBuilderCanaryTitle}
          message={canaryError ?? m.siteBuilderCanaryMessage}
        />
      </div>
    );
  }

  return (
    <div className="app-shell section">
      <SectionHeader
        eyebrow="Builder Studio V2"
        title={lang === 'hu' ? 'No-code oldalépítő' : 'No-code page builder'}
        text={
          lang === 'hu'
            ? 'Drag-drop komponensek, HU/EN side-by-side editor, draft diff, publish queue és rollback.'
            : 'Drag-drop components, HU/EN side-by-side editor, draft diff, publish queue, and rollback.'
        }
      />
      {loadError ? <ErrorState title={loadError} message={m.dbNetworkError} onRetry={() => void loadAll()} retryLabel={m.contentRetry} /> : null}
      {loading ? <p className="muted-text">{m.loading}</p> : null}

      {!loading ? (
        <div className="stack">
          <Card strong>
            <h3>{lang === 'hu' ? 'Template piactér (alap)' : 'Template marketplace (base)'}</h3>
            <div className="admin-chip-row">
              {templates.map((tpl) => (
                <button key={tpl.key} type="button" className="btn btn-secondary" onClick={() => applyTemplate(tpl.key)}>
                  {(lang === 'hu' ? tpl.titleHu : tpl.titleEn) + ' - ' + tpl.key}
                </button>
              ))}
            </div>
            <div className="stack admin-mt-10">
              {templates.map((tpl) => (
                <p className="muted-text" key={`${tpl.key}-desc`}>
                  <strong>{lang === 'hu' ? tpl.titleHu : tpl.titleEn}:</strong> {lang === 'hu' ? tpl.descriptionHu : tpl.descriptionEn}
                </p>
              ))}
            </div>
          </Card>

          <Card strong>
            <h3>{lang === 'hu' ? 'Oldal meta (inline HU/EN)' : 'Page meta (inline HU/EN)'}</h3>
            <div className="grid-2">
              <label className="field">
                <span>Slug</span>
                <input value={draft.slug} onChange={(e) => setDraft((x) => ({ ...x, slug: e.target.value }))} placeholder="felveteli-tudnivalok" />
              </label>
              <label className="field">
                <span>{lang === 'hu' ? 'Státusz' : 'Status'}</span>
                <select value={draft.status} onChange={(e) => setDraft((x) => ({ ...x, status: e.target.value as BuilderPage['status'] }))}>
                  <option value="draft">draft</option>
                  <option value="scheduled">scheduled</option>
                  <option value="published">published</option>
                  <option value="archived">archived</option>
                </select>
              </label>
              <label className="field">
                <span>Cím (HU)</span>
                <input value={draft.titleHu} onChange={(e) => setDraft((x) => ({ ...x, titleHu: e.target.value }))} />
              </label>
              <label className="field">
                <span>Title (EN)</span>
                <input value={draft.titleEn} onChange={(e) => setDraft((x) => ({ ...x, titleEn: e.target.value }))} />
              </label>
            </div>
            <div className="admin-chip-row">
              <button type="button" className="btn btn-secondary" onClick={() => addBlock('hero')}>+ Hero</button>
              <button type="button" className="btn btn-secondary" onClick={() => addBlock('richText')}>+ Rich text</button>
              <button type="button" className="btn btn-secondary" onClick={() => addBlock('cta')}>+ CTA</button>
              <button type="button" className="btn btn-secondary" onClick={() => addBlock('faq')}>+ FAQ</button>
            </div>
            <div className="grid-2 admin-mt-12">
              <div className="card">
                <h4 className="admin-card-title">{lang === 'hu' ? 'Drag-drop komponens könyvtár' : 'Drag-drop component library'}</h4>
                <div className="stack">
                  {draft.blocks.map((block, idx) => (
                    <button
                      key={block.id}
                      type="button"
                      className={`admin-notification-item ${activeBlockId === block.id ? 'admin-notification-item--unread' : ''}`}
                      draggable
                      onDragStart={() => setDraggingId(block.id)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => onDropBlock(block.id)}
                      onClick={() => setActiveBlockId(block.id)}
                    >
                      <div className="admin-notification-item-title">
                        {idx + 1}. {block.type} - {block.titleHu || block.titleEn || block.id}
                      </div>
                      <div className="admin-notification-item-meta muted-text">id: {block.id}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="card">
                <h4 className="admin-card-title">{lang === 'hu' ? 'HU/EN side-by-side inline editor' : 'HU/EN side-by-side inline editor'}</h4>
                {activeBlock ? (
                  <div className="stack">
                    <p className="muted-text">
                      type: <strong>{activeBlock.type}</strong> - id: <code>{activeBlock.id}</code>
                    </p>
                    <div className="grid-2">
                      <label className="field">
                        <span>Title HU</span>
                        <input value={activeBlock.titleHu} onChange={(e) => updateActiveBlock({ titleHu: e.target.value })} />
                      </label>
                      <label className="field">
                        <span>Title EN</span>
                        <input value={activeBlock.titleEn} onChange={(e) => updateActiveBlock({ titleEn: e.target.value })} />
                      </label>
                    </div>
                    <div className="grid-2">
                      <label className="field">
                        <span>Body HU</span>
                        <textarea rows={4} value={activeBlock.bodyHu} onChange={(e) => updateActiveBlock({ bodyHu: e.target.value })} />
                      </label>
                      <label className="field">
                        <span>Body EN</span>
                        <textarea rows={4} value={activeBlock.bodyEn} onChange={(e) => updateActiveBlock({ bodyEn: e.target.value })} />
                      </label>
                    </div>
                    <div className="grid-2">
                      <label className="field">
                        <span>CTA label HU</span>
                        <input value={activeBlock.ctaLabelHu} onChange={(e) => updateActiveBlock({ ctaLabelHu: e.target.value })} />
                      </label>
                      <label className="field">
                        <span>CTA label EN</span>
                        <input value={activeBlock.ctaLabelEn} onChange={(e) => updateActiveBlock({ ctaLabelEn: e.target.value })} />
                      </label>
                    </div>
                    <label className="field">
                      <span>CTA href</span>
                      <input value={activeBlock.ctaHref} onChange={(e) => updateActiveBlock({ ctaHref: e.target.value })} />
                    </label>
                    <button type="button" className="btn btn-danger" onClick={() => removeBlock(activeBlock.id)}>
                      {lang === 'hu' ? 'Blokk törlése' : 'Delete block'}
                    </button>
                  </div>
                ) : (
                  <p className="muted-text">{lang === 'hu' ? 'Válassz blokkot bal oldalt.' : 'Pick a block from the left list.'}</p>
                )}
              </div>
            </div>
            <div className="admin-chip-row">
              <button type="button" className="btn btn-primary" disabled={savingPage} onClick={() => void savePage(selectedPageId == null)}>
                {selectedPageId == null
                  ? lang === 'hu'
                    ? 'Új oldal létrehozása'
                    : 'Create new page'
                  : lang === 'hu'
                    ? 'Draft mentése'
                    : 'Save draft'}
              </button>
              {selectedPageId != null ? (
                <button type="button" className="btn btn-secondary" onClick={() => void queuePublish(selectedPageId)}>
                  {lang === 'hu' ? 'Publish queue' : 'Publish queue'}
                </button>
              ) : null}
            </div>
          </Card>

          {selectedPageId != null && draftDiff ? (
            <Card>
              <h3>{lang === 'hu' ? 'Draft diff' : 'Draft diff'}</h3>
              <div className="admin-chip-row">
                <span className={`badge ${draftDiff.titleHuChanged ? 'badge--warn' : ''}`}>titleHu: {String(draftDiff.titleHuChanged)}</span>
                <span className={`badge ${draftDiff.titleEnChanged ? 'badge--warn' : ''}`}>titleEn: {String(draftDiff.titleEnChanged)}</span>
                <span className={`badge ${draftDiff.statusChanged ? 'badge--warn' : ''}`}>status: {String(draftDiff.statusChanged)}</span>
                <span className={`badge ${draftDiff.blocksChanged ? 'badge--warn' : ''}`}>blocks: {String(draftDiff.blocksChanged)}</span>
              </div>
            </Card>
          ) : null}

          <Card>
            <h3>{lang === 'hu' ? 'Oldalak + rollback' : 'Pages + rollback'}</h3>
            <div className="stack">
              {pages.map((page) => (
                <article key={page.id} className="card">
                  <h4 className="admin-card-title">
                    /{page.slug} - {lang === 'hu' ? page.titleHu : page.titleEn}
                  </h4>
                  <p className="muted-text">
                    {lang === 'hu' ? 'Frissítve' : 'Updated'}: {new Date(page.updatedAt).toLocaleString(locale)} - status: {page.status}
                  </p>
                  <div className="admin-chip-row">
                    <button type="button" className="btn btn-secondary" onClick={() => hydrateDraftFromPage(page)}>
                      {lang === 'hu' ? 'Szerkesztés betöltése' : 'Load for editing'}
                    </button>
                    <button type="button" className="btn btn-danger" disabled={deletingPageId === page.id} onClick={() => void deletePage(page.id)}>
                      {lang === 'hu' ? 'Törlés' : 'Delete'}
                    </button>
                  </div>
                  {selectedPageId === page.id && revisions.length ? (
                    <div className="admin-table-wrap">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>id</th>
                            <th>action</th>
                            <th>status</th>
                            <th>{lang === 'hu' ? 'Létrehozva' : 'Created'}</th>
                            <th>{lang === 'hu' ? 'Művelet' : 'Action'}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {revisions.map((rev) => (
                            <tr key={rev.id}>
                              <td>#{rev.id}</td>
                              <td>{rev.action}</td>
                              <td>{rev.status}</td>
                              <td>{new Date(rev.createdAt).toLocaleString(locale)}</td>
                              <td>
                                <button type="button" className="btn btn-ghost" onClick={() => void rollbackToRevision(page.id, rev.id)}>
                                  {lang === 'hu' ? 'Rollback ide' : 'Rollback here'}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </Card>

          <Card>
            <h3>{lang === 'hu' ? 'Publish queue' : 'Publish queue'}</h3>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>id</th>
                    <th>slug</th>
                    <th>status</th>
                    <th>target</th>
                    <th>scheduled</th>
                    <th>processed</th>
                  </tr>
                </thead>
                <tbody>
                  {queue.map((q) => (
                    <tr key={q.id}>
                      <td>#{q.id}</td>
                      <td>/{q.pageSlug}</td>
                      <td>{q.status}</td>
                      <td>{q.targetStatus}</td>
                      <td>{q.scheduledFor ? new Date(q.scheduledFor).toLocaleString(locale) : 'now'}</td>
                      <td>{q.processedAt ? new Date(q.processedAt).toLocaleString(locale) : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {design ? (
            <Card>
              <h3>{lang === 'hu' ? 'Design guardrails' : 'Design guardrails'}</h3>
              <p className="muted-text">
                {lang === 'hu'
                  ? 'Tiltott CSS minták: @import, position: fixed, javascript: URI.'
                  : 'Forbidden CSS patterns: @import, position: fixed, javascript: URI.'}
              </p>
              <div className="grid-2">
                <label className="field">
                  <span>{lang === 'hu' ? 'Elsődleges szín' : 'Primary color'}</span>
                  <input value={design.primaryColor} onChange={(e) => setDesign((x) => (x ? { ...x, primaryColor: e.target.value } : x))} />
                </label>
                <label className="field">
                  <span>{lang === 'hu' ? 'Kiemelő szín' : 'Accent color'}</span>
                  <input value={design.accentColor} onChange={(e) => setDesign((x) => (x ? { ...x, accentColor: e.target.value } : x))} />
                </label>
              </div>
              <label className="field">
                <span>Custom CSS</span>
                <textarea rows={7} value={design.customCss} onChange={(e) => setDesign((x) => (x ? { ...x, customCss: e.target.value } : x))} />
              </label>
              <button type="button" className="btn btn-primary" disabled={savingDesign} onClick={() => void saveDesign()}>
                {lang === 'hu' ? 'Guardrails mentése' : 'Save guardrails'}
              </button>
            </Card>
          ) : null}

          <Card>
            <h3>{lang === 'hu' ? 'Fejlesztői adatbázis-áttekintő' : 'Developer database overview'}</h3>
            <div className="admin-chip-row">
              {groupedTableCount.map(([group, count]) => (
                <span key={group} className="badge">
                  {group}: {count.toLocaleString(locale)}
                </span>
              ))}
            </div>
          </Card>
        </div>
      ) : null}
    </div>
  );
}
