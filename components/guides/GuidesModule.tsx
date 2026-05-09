/**
 * @file Útmutatók modul – lista, keresés, kategória, modál, dokumentum link
 *
 * @description
 * Adat: **GET /api/guides** (`items`). Admin: **POST /api/guides**, **DELETE /api/guides/[id]**.
 * Keresés: cím, kivonat, kulcsszavak, témakör; szűrés kategória szerint.
 *
 * @i18n
 * Statikus szövegek: `lib/i18n/messages.ts` (`t(lang).guides`) – lista, hibaállapot, szerkesztő modál.
 */
'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { AdminModal } from '@/components/ui/AdminModal';
import { Card, SectionHeader } from '@/components/ui/Core';
import { ModuleAdminToolbar } from '@/components/ui/ModuleAdminToolbar';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { FilterChip } from '@/components/ui/FilterChip';
import { Skeleton } from '@/components/ui/Skeleton';
import { guideItems as fallbackGuideItems, t } from '@/lib/content';
import { buildGuideSearchableText } from '@/lib/guides/searchable-text';
import { canUseDemoFallback } from '@/lib/services/content-fetch-policy';
import type { GuideDto } from '@/types/guides';

function fallbackPayload(): GuideDto[] {
  return fallbackGuideItems.map((it) => ({
    id: it.id,
    titleHu: it.titleHu,
    titleEn: it.titleEn,
    excerptHu: it.textHu,
    excerptEn: it.textEn,
    bodyHu: it.textHu,
    bodyEn: it.textEn,
    category: 'Általános',
    topic: '',
    keywords: '',
    searchableText: buildGuideSearchableText({
      titleHu: it.titleHu,
      titleEn: it.titleEn,
      excerptHu: it.textHu,
      excerptEn: it.textEn,
      bodyHu: it.textHu,
      bodyEn: it.textEn,
      category: 'Általános',
      topic: '',
      keywords: '',
    }),
    listDate: '2026-04-01',
    status: 'published',
  }));
}

async function fetchGuides(): Promise<GuideDto[] | null> {
  const r = await fetch('/api/guides', { credentials: 'include' });
  if (!r.ok) return null;
  const data = (await r.json()) as { items?: GuideDto[] };
  if (!Array.isArray(data.items)) return null;
  return data.items;
}

function pickBody(lang: 'hu' | 'en', g: GuideDto): string {
  const primary = lang === 'hu' ? g.bodyHu : g.bodyEn;
  const fallback = lang === 'hu' ? g.bodyEn : g.bodyHu;
  const ex = lang === 'hu' ? g.excerptHu : g.excerptEn;
  const merged = primary.trim() || fallback.trim();
  return merged || ex;
}

export function GuidesModule() {
  const { lang, toast, sessionUser, openModal, requestConfirm } = useApp();
  const canManageGuidesUi = sessionUser?.role === 'OFFICE' || sessionUser?.role === 'ADMIN';
  const dict = t(lang);
  const gu = dict.guides;
  const [items, setItems] = useState<GuideDto[]>([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [loadStatus, setLoadStatus] = useState<'loading' | 'error' | 'ready'>('loading');
  const [editingId, setEditingId] = useState<number | null>(null);
  const uploadRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [editForm, setEditForm] = useState({
    titleHu: '',
    titleEn: '',
    excerptHu: '',
    excerptEn: '',
    bodyHu: '',
    bodyEn: '',
    category: '',
    topic: '',
    keywords: '',
    listDate: '',
    documentUrl: '',
    documentType: '',
    status: 'published' as 'published' | 'draft' | 'scheduled' | 'archived',
  });

  const refreshData = useCallback(async () => {
    const data = await fetchGuides();
    if (data) {
      setItems(data);
      return true;
    }
    if (canUseDemoFallback()) {
      setItems(fallbackPayload());
      return true;
    }
    setItems([]);
    return false;
  }, []);

  const loadInitial = useCallback(async () => {
    setLoadStatus('loading');
    const ok = await refreshData();
    setLoadStatus(ok ? 'ready' : 'error');
  }, [refreshData]);

  useEffect(() => {
    void loadInitial();
  }, [loadInitial, canManageGuidesUi]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const g of items) set.add(g.category);
    return ['all', ...Array.from(set).sort((a, b) => a.localeCompare(b, 'hu'))];
  }, [items]);

  const filtered = useMemo(() => {
    const byCat = category === 'all' ? items : items.filter((g) => g.category === category);
    const q = query.trim().toLowerCase();
    if (!q) return byCat;
    return byCat.filter((g) => {
      const blob = [
        g.titleHu,
        g.titleEn,
        g.excerptHu,
        g.excerptEn,
        g.bodyHu,
        g.bodyEn,
        g.topic,
        g.keywords,
        g.category,
        g.searchableText,
      ]
        .join(' ')
        .toLowerCase();
      return blob.includes(q);
    });
  }, [items, category, query]);

  function openGuide(g: GuideDto) {
    const title = lang === 'hu' ? g.titleHu : g.titleEn;
    const body = pickBody(lang, g);
    openModal(title, body);
  }

  function supportsInlinePdf(url?: string): boolean {
    if (!url) return false;
    return /\.pdf($|\?)/i.test(url);
  }

  async function addDemoGuide() {
    const listDate = new Date().toISOString().slice(0, 10);
    const res = await fetch('/api/guides', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titleHu: gu.demoTitleHu,
        titleEn: gu.demoTitleEn,
        excerptHu: gu.demoExcerptHu,
        excerptEn: gu.demoExcerptEn,
        bodyHu: gu.demoBodyHu,
        bodyEn: gu.demoBodyEn,
        category: gu.demoCategory,
        topic: gu.demoTopic,
        keywords: gu.demoKeywords,
        listDate,
        status: 'published',
      }),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      toast(data.error ?? gu.saveFailed, 'warning');
      return;
    }
    await refreshData();
    toast(gu.created, 'success');
  }

  async function removeGuide(id: number) {
    const ok = await requestConfirm({
      message: gu.confirmDelete,
      destructive: true,
      confirmLabel: dict.common.delete,
      cancelLabel: dict.common.cancel,
    });
    if (!ok) return;
    const res = await fetch(`/api/guides/${id}`, { method: 'DELETE', credentials: 'include' });
    if (!res.ok) {
      toast(gu.deleteFailed, 'warning');
      return;
    }
    await refreshData();
    toast(gu.removed, 'success');
  }

  function openEditGuide(g: GuideDto) {
    setEditingId(g.id);
    setEditForm({
      titleHu: g.titleHu,
      titleEn: g.titleEn,
      excerptHu: g.excerptHu,
      excerptEn: g.excerptEn,
      bodyHu: g.bodyHu,
      bodyEn: g.bodyEn,
      category: g.category,
      topic: g.topic,
      keywords: g.keywords,
      listDate: g.listDate,
      documentUrl: g.documentUrl ?? '',
      documentType: g.documentType ?? '',
      status: g.status === 'deleted' ? 'draft' : g.status,
    });
  }

  async function saveGuideEdit() {
    if (editingId == null) return;
    const body = {
      titleHu: editForm.titleHu.trim(),
      titleEn: editForm.titleEn.trim(),
      excerptHu: editForm.excerptHu.trim(),
      excerptEn: editForm.excerptEn.trim(),
      bodyHu: editForm.bodyHu.trim(),
      bodyEn: editForm.bodyEn.trim(),
      category: editForm.category.trim(),
      topic: editForm.topic.trim(),
      keywords: editForm.keywords.trim(),
      listDate: editForm.listDate,
      documentUrl: editForm.documentUrl.trim(),
      documentType: editForm.documentType.trim(),
      status: editForm.status,
    };
    const res = await fetch(`/api/guides/${editingId}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      toast(data.error ?? gu.saveFailed, 'warning');
      return;
    }
    await refreshData();
    setEditingId(null);
    toast(gu.editSaved, 'success');
  }

  async function runLinkHealthCheck() {
    const res = await fetch('/api/admin/guides/link-health', { credentials: 'include' });
    const data = (await res.json().catch(() => ({}))) as {
      error?: string;
      total?: number;
      broken?: number;
      items?: Array<{ titleHu: string; titleEn: string; url: string; reachable: boolean; httpStatus: number }>;
    };
    if (!res.ok) {
      toast(data.error ?? gu.linkCheckFailed, 'warning');
      return;
    }
    const total = data.total ?? 0;
    const broken = data.broken ?? 0;
    const items = Array.isArray(data.items) ? data.items : [];
    toast(gu.linkCheckDone.replace('{total}', String(total)).replace('{broken}', String(broken)), broken ? 'warning' : 'success');
    if (!broken) return;
    const top = items
      .filter((x) => !x.reachable)
      .slice(0, 20)
      .map((x) => `• ${lang === 'hu' ? x.titleHu : x.titleEn} [${x.httpStatus}] ${x.url}`)
      .join('\n');
    openModal(gu.linkCheckModalTitle, `${gu.linkCheckModalLead}\n\n${top}`);
  }

  async function runQualityCheck() {
    const res = await fetch('/api/admin/guides/quality-check', { credentials: 'include' });
    const data = (await res.json().catch(() => ({}))) as {
      error?: string;
      total?: number;
      withIssues?: number;
      items?: Array<{ titleHu: string; titleEn: string; issues: string[]; score: number }>;
    };
    if (!res.ok) {
      toast(data.error ?? gu.linkCheckFailed, 'warning');
      return;
    }
    const total = data.total ?? 0;
    const withIssues = data.withIssues ?? 0;
    toast(
      lang === 'hu'
        ? `Quality check kész: ${total} elem, hibás: ${withIssues}.`
        : `Quality check done: ${total} items, with issues: ${withIssues}.`,
      withIssues ? 'warning' : 'success',
    );
    if (!withIssues) return;
    const top = (data.items ?? [])
      .filter((x) => x.issues.length > 0)
      .slice(0, 20)
      .map((x) => `• ${lang === 'hu' ? x.titleHu : x.titleEn}: ${x.issues.join(', ')} [score=${x.score}]`)
      .join('\n');
    openModal(lang === 'hu' ? 'Guide quality checklist' : 'Guide quality checklist', top);
  }

  async function uploadAttachment(file: File) {
    if (editingId == null) {
      toast(lang === 'hu' ? 'Előbb nyisd meg egy útmutató szerkesztését.' : 'Open a guide edit modal first.', 'warning');
      return;
    }
    setUploading(true);
    try {
      const form = new FormData();
      form.set('guideId', String(editingId));
      form.set('file', file);
      const res = await fetch('/api/admin/guides/upload', {
        method: 'POST',
        credentials: 'include',
        body: form,
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        item?: { documentUrl?: string | null; documentType?: string | null; attachmentName?: string | null };
      };
      if (!res.ok) {
        toast(data.error ?? gu.saveFailed, 'warning');
        return;
      }
      if (data.item) {
        setEditForm((p) => ({
          ...p,
          documentUrl: data.item?.documentUrl ?? p.documentUrl,
          documentType: (data.item?.documentType ?? p.documentType) as string,
        }));
      }
      await refreshData();
      toast(lang === 'hu' ? 'Dokumentum feltöltve.' : 'Document uploaded.', 'success');
    } finally {
      setUploading(false);
    }
  }

  async function openRevisions(guideId: number, title: string) {
    const res = await fetch(`/api/admin/guides/${guideId}/revisions`, { credentials: 'include' });
    const data = (await res.json().catch(() => ({}))) as { error?: string; items?: Array<{ version: number; createdAt: string; payloadJson: unknown }> };
    if (!res.ok) {
      toast(data.error ?? gu.saveFailed, 'warning');
      return;
    }
    const text = (data.items ?? [])
      .map((x) => `v${x.version} · ${new Date(x.createdAt).toLocaleString(lang === 'hu' ? 'hu-HU' : 'en-US')}\n${JSON.stringify(x.payloadJson).slice(0, 500)}\n`)
      .join('\n');
    openModal(`${title} – revisions`, text || (lang === 'hu' ? 'Nincs verzió.' : 'No revisions.'));
  }

  return (
    <section className="section">
      <SectionHeader eyebrow={gu.eyebrow} title={gu.title} text={gu.lead} />
      {canManageGuidesUi ? (
        <ModuleAdminToolbar title={dict.common.moduleAdminToolbarTitle} ariaLabel={dict.common.moduleAdminToolbarAria}>
          <button type="button" className="btn btn-secondary" onClick={() => void addDemoGuide()}>
            {gu.addDemo}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => void runLinkHealthCheck()}>
            {gu.linkCheck}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => void runQualityCheck()}>
            {lang === 'hu' ? 'Quality checklist' : 'Quality checklist'}
          </button>
        </ModuleAdminToolbar>
      ) : null}
      <div className="guides-toolbar">
        <input
          type="search"
          className="input guides-search"
          placeholder={gu.searchPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label={gu.searchAria}
        />
        <div className="guides-category-col">
          <span className="guides-category-label">{gu.categoryLabel}</span>
          <div role="group" aria-label={gu.categoryGroupAria} className="guides-chip-row">
            {categories.map((c) => (
              <FilterChip key={c} selected={category === c} onClick={() => setCategory(c)}>
                {c === 'all' ? gu.chipAll : c}
              </FilterChip>
            ))}
          </div>
        </div>
        {canManageGuidesUi ? (
          <button type="button" className="btn btn-secondary" onClick={() => void addDemoGuide()}>
            {gu.addFromToolbar}
          </button>
        ) : null}
      </div>
      {loadStatus === 'loading' ? (
        <div role="status" aria-live="polite">
          <Skeleton variant="searchResults" />
        </div>
      ) : null}
      {loadStatus === 'error' ? (
        <ErrorState title={gu.loadErrorTitle} message={gu.loadErrorMessage} onRetry={() => void loadInitial()} retryLabel={gu.retry} />
      ) : null}
      {loadStatus === 'ready' ? (
        <>
          <div className="grid-2">
            {filtered.map((g) => (
              <Card key={g.id} strong>
                <div className="guides-card-meta">
                  {g.category}
                  {g.topic ? ` · ${g.topic}` : ''} · {g.listDate}
                </div>
                <h3 className="guides-card-title">{lang === 'hu' ? g.titleHu : g.titleEn}</h3>
                <p className="guides-card-excerpt">{lang === 'hu' ? g.excerptHu : g.excerptEn}</p>
                {g.documentUrl && (/^https?:\/\//i.test(g.documentUrl) || g.documentUrl.startsWith('/')) ? (
                  <p className="guides-doc-row">
                    <a href={g.documentUrl} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
                      {gu.document}
                      {g.documentType ? ` (${g.documentType})` : ''}
                    </a>
                  </p>
                ) : null}
                {g.documentUrl && supportsInlinePdf(g.documentUrl) ? (
                  <div className="guides-doc-row">
                    <a className="btn btn-ghost" href={g.documentUrl} target="_blank" rel="noopener noreferrer">
                      {lang === 'hu' ? 'PDF előnézet' : 'PDF preview'}
                    </a>
                  </div>
                ) : null}
                <div className="guides-card-actions">
                  <button type="button" className="btn btn-primary" onClick={() => openGuide(g)}>
                    {gu.open}
                  </button>
                  {canManageGuidesUi ? (
                    <>
                      <button type="button" className="btn btn-secondary" onClick={() => openEditGuide(g)}>
                        {gu.edit}
                      </button>
                      <button type="button" className="btn btn-secondary" onClick={() => void openRevisions(g.id, lang === 'hu' ? g.titleHu : g.titleEn)}>
                        {lang === 'hu' ? 'Verziók' : 'Revisions'}
                      </button>
                      <button type="button" className="btn btn-secondary" onClick={() => void removeGuide(g.id)}>
                        {dict.common.delete}
                      </button>
                    </>
                  ) : null}
                </div>
              </Card>
            ))}
          </div>
          {filtered.length === 0 ? <EmptyState title={gu.noResultsTitle} description={gu.noResultsDesc} /> : null}
        </>
      ) : null}
      <AdminModal
        open={editingId !== null}
        title={gu.editModalTitle}
        closeLabel={dict.common.modalClose}
        onClose={() => setEditingId(null)}
      >
        <div className="stack">
          <div className="modal-grid">
            <label>
              <div className="calculator-field-label">{gu.formTitleHu}</div>
              <input className="input" value={editForm.titleHu} onChange={(e) => setEditForm((p) => ({ ...p, titleHu: e.target.value }))} />
            </label>
            <label>
              <div className="calculator-field-label">{gu.formTitleEn}</div>
              <input className="input" value={editForm.titleEn} onChange={(e) => setEditForm((p) => ({ ...p, titleEn: e.target.value }))} />
            </label>
            <label className="guides-modal-field-full">
              <div className="calculator-field-label">{gu.formExcerptHu}</div>
              <textarea className="input" rows={3} value={editForm.excerptHu} onChange={(e) => setEditForm((p) => ({ ...p, excerptHu: e.target.value }))} />
            </label>
            <label className="guides-modal-field-full">
              <div className="calculator-field-label">{gu.formExcerptEn}</div>
              <textarea className="input" rows={3} value={editForm.excerptEn} onChange={(e) => setEditForm((p) => ({ ...p, excerptEn: e.target.value }))} />
            </label>
            <label className="guides-modal-field-full">
              <div className="calculator-field-label">{gu.formBodyHu}</div>
              <textarea className="input" rows={5} value={editForm.bodyHu} onChange={(e) => setEditForm((p) => ({ ...p, bodyHu: e.target.value }))} />
            </label>
            <label className="guides-modal-field-full">
              <div className="calculator-field-label">{gu.formBodyEn}</div>
              <textarea className="input" rows={5} value={editForm.bodyEn} onChange={(e) => setEditForm((p) => ({ ...p, bodyEn: e.target.value }))} />
            </label>
            <label>
              <div className="calculator-field-label">{gu.formCategory}</div>
              <input className="input" value={editForm.category} onChange={(e) => setEditForm((p) => ({ ...p, category: e.target.value }))} />
            </label>
            <label>
              <div className="calculator-field-label">{gu.formTopic}</div>
              <input className="input" value={editForm.topic} onChange={(e) => setEditForm((p) => ({ ...p, topic: e.target.value }))} />
            </label>
            <label className="guides-modal-field-full">
              <div className="calculator-field-label">{gu.formKeywords}</div>
              <input className="input" value={editForm.keywords} onChange={(e) => setEditForm((p) => ({ ...p, keywords: e.target.value }))} />
            </label>
            <label>
              <div className="calculator-field-label">{gu.formDate}</div>
              <input className="input" type="date" value={editForm.listDate} onChange={(e) => setEditForm((p) => ({ ...p, listDate: e.target.value }))} />
            </label>
            <label>
              <div className="calculator-field-label">{gu.formDocType}</div>
              <input className="input" value={editForm.documentType} onChange={(e) => setEditForm((p) => ({ ...p, documentType: e.target.value }))} />
            </label>
            <label className="guides-modal-field-full">
              <div className="calculator-field-label">{gu.formDocUrl}</div>
              <input className="input" value={editForm.documentUrl} onChange={(e) => setEditForm((p) => ({ ...p, documentUrl: e.target.value }))} />
            </label>
            <label className="guides-modal-field-full">
              <div className="calculator-field-label">{lang === 'hu' ? 'Dokumentum feltöltés' : 'Upload document'}</div>
              <div className="feedback-row">
                <button type="button" className="btn btn-secondary" disabled={uploading || editingId === null} onClick={() => uploadRef.current?.click()}>
                  {lang === 'hu' ? 'Csatolmány feltöltése' : 'Upload attachment'}
                </button>
              </div>
            </label>
            <label>
              <div className="calculator-field-label">{gu.formStatus}</div>
              <select
                className="select"
                value={editForm.status}
                onChange={(e) =>
                  setEditForm((p) => ({
                    ...p,
                    status: e.target.value as 'published' | 'draft' | 'scheduled' | 'archived',
                  }))
                }
              >
                <option value="published">{gu.statusPublished}</option>
                <option value="draft">{gu.statusDraft}</option>
                <option value="scheduled">{gu.statusScheduled}</option>
                <option value="archived">{gu.statusArchived}</option>
              </select>
            </label>
          </div>
          <div className="news-form-actions">
            <button type="button" className="btn btn-primary" onClick={() => void saveGuideEdit()}>
              {gu.saveChanges}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => setEditingId(null)}>
              {dict.common.cancel}
            </button>
          </div>
        </div>
      </AdminModal>
      <input
        ref={uploadRef}
        type="file"
        accept="application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="input-file-hidden"
        aria-hidden
        tabIndex={-1}
        onChange={(e) => {
          const file = e.currentTarget.files?.[0];
          if (file) void uploadAttachment(file);
          e.currentTarget.value = '';
        }}
      />
    </section>
  );
}
