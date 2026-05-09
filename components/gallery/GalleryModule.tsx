/**
 * @file Galéria modul – grid / mappa / timeline nézet
 *
 * @description
 * Adat: **GET /api/gallery** (`folders` + `items`). Admin: **POST /api/gallery**, **DELETE /api/gallery/[id]**.
 * Keresés a címeken és dátumon; kép: **`next/image`** engedett hostnál (`lib/remote-image-hosts.ts`), egyébként `<img>`; letöltés, ha van `imageUrl` (http(s)).
 *
 * @i18n
 * Statikus szövegek: `lib/i18n/messages.ts` (`t(lang).gallery`) – nézet, üres/hiba állapot, szerkesztői modál.
 */
'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { AdminModal } from '@/components/ui/AdminModal';
import { Card, SectionHeader } from '@/components/ui/Core';
import { ModuleAdminToolbar } from '@/components/ui/ModuleAdminToolbar';
import { CustomSelect } from '@/components/ui/CustomSelect';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { Skeleton } from '@/components/ui/Skeleton';
import { galleryFolders as fallbackFolders, galleryItems as fallbackItems, t } from '@/lib/content';
import { isRemoteImageHostOptimizable } from '@/lib/remote-image-hosts';
import { canUseDemoFallback } from '@/lib/services/content-fetch-policy';
import type { GalleryFolderDto, GalleryItemDto } from '@/types/gallery';

type ViewMode = 'grid' | 'folders' | 'timeline';

function fallbackPayload(): { folders: GalleryFolderDto[]; items: GalleryItemDto[] } {
  return {
    folders: fallbackFolders.map((f, i) => ({ id: f.id, name: f.name, sortOrder: i })),
    items: fallbackItems.map((it) => ({
      id: it.id,
      folderId: it.folderId,
      titleHu: it.titleHu,
      titleEn: it.titleEn,
      date: it.date,
      imageUrl: '',
      thumbnailUrl: '',
      imageWidth: null,
      imageHeight: null,
      mimeType: null,
      fileSizeBytes: null,
      status: 'published',
    })),
  };
}

async function fetchGallery(): Promise<{ folders: GalleryFolderDto[]; items: GalleryItemDto[] } | null> {
  const r = await fetch('/api/gallery', { credentials: 'include' });
  if (!r.ok) return null;
  const data = (await r.json()) as { folders?: GalleryFolderDto[]; items?: GalleryItemDto[] };
  if (!Array.isArray(data.folders) || !Array.isArray(data.items)) return null;
  return { folders: data.folders, items: data.items };
}

export function GalleryModule() {
  const { lang, toast, sessionUser, requestConfirm, openModal } = useApp();
  const canManageNewsUi = sessionUser?.role === 'OFFICE' || sessionUser?.role === 'ADMIN';
  const dict = t(lang);
  const g = dict.gallery;
  const [view, setView] = useState<ViewMode>('grid');
  const [folderId, setFolderId] = useState<number | 'all'>('all');
  const [query, setQuery] = useState('');
  const [folders, setFolders] = useState<GalleryFolderDto[]>([]);
  const [items, setItems] = useState<GalleryItemDto[]>([]);
  const [loadStatus, setLoadStatus] = useState<'loading' | 'error' | 'ready'>('loading');
  const [activePreviewId, setActivePreviewId] = useState<number | null>(null);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [folderModalOpen, setFolderModalOpen] = useState(false);
  const uploadInputRef = useRef<HTMLInputElement | null>(null);
  const bulkUploadInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [folderDrafts, setFolderDrafts] = useState<Record<number, string>>({});
  const [editForm, setEditForm] = useState({
    folderId: '',
    titleHu: '',
    titleEn: '',
    listDate: '',
    imageUrl: '',
    status: 'published' as 'published' | 'draft' | 'scheduled' | 'archived',
  });

  const refreshData = useCallback(async () => {
    const data = await fetchGallery();
    if (data) {
      setFolders(data.folders);
      setItems(data.items);
      return true;
    }
    if (canUseDemoFallback()) {
      const fb = fallbackPayload();
      setFolders(fb.folders);
      setItems(fb.items);
      return true;
    }
    setFolders([]);
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
  }, [loadInitial, canManageNewsUi]);

  const filtered = useMemo(() => {
    const byFolder = items.filter((item) => folderId === 'all' || item.folderId === folderId);
    const q = query.trim().toLowerCase();
    if (!q) return byFolder;
    return byFolder.filter(
      (item) =>
        `${item.titleHu} ${item.titleEn} ${item.date}`.toLowerCase().includes(q) ||
        folders.find((f) => f.id === item.folderId)?.name.toLowerCase().includes(q),
    );
  }, [items, folderId, query, folders]);

  async function addDemoItem() {
    const firstFolder = folders[0]?.id ?? 1;
    const listDate = new Date().toISOString().slice(0, 10);
    const res = await fetch('/api/gallery', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        folderId: firstFolder,
        titleHu: g.demoItemTitleHu,
        titleEn: g.demoItemTitleEn,
        listDate,
        imageUrl: `https://picsum.photos/seed/gallery-new-${Date.now()}/800/520`,
        status: 'published',
      }),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      toast(data.error ?? g.saveFailed, 'warning');
      return;
    }
    await refreshData();
    toast(g.itemCreated, 'success');
  }

  async function removeItem(id: number) {
    const ok = await requestConfirm({
      message: g.confirmDelete,
      destructive: true,
      confirmLabel: dict.common.delete,
      cancelLabel: dict.common.cancel,
    });
    if (!ok) return;
    const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE', credentials: 'include' });
    if (!res.ok) {
      toast(g.deleteFailed, 'warning');
      return;
    }
    await refreshData();
    toast(g.itemRemoved, 'success');
  }

  function openEditModal(item: GalleryItemDto) {
    setEditingItemId(item.id);
    setEditForm({
      folderId: String(item.folderId),
      titleHu: item.titleHu,
      titleEn: item.titleEn,
      listDate: item.date,
      imageUrl: item.imageUrl ?? '',
      status: item.status === 'deleted' ? 'draft' : item.status,
    });
  }

  async function saveEditItem() {
    if (editingItemId == null) return;
    const folderNum = Number(editForm.folderId);
    if (!Number.isInteger(folderNum) || folderNum <= 0) {
      toast(g.saveFailed, 'warning');
      return;
    }
    const res = await fetch(`/api/gallery/${editingItemId}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        folderId: folderNum,
        titleHu: editForm.titleHu.trim(),
        titleEn: editForm.titleEn.trim(),
        listDate: editForm.listDate,
        imageUrl: editForm.imageUrl.trim(),
        status: editForm.status,
      }),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      toast(data.error ?? g.saveFailed, 'warning');
      return;
    }
    await refreshData();
    setEditingItemId(null);
    toast(g.editSaved, 'success');
  }

  function statusLabel(s: GalleryItemDto['status']) {
    if (s === 'published') return g.statusPublished;
    if (s === 'draft') return g.statusDraft;
    if (s === 'scheduled') return g.statusScheduled;
    if (s === 'archived') return g.statusArchived;
    return s;
  }

  async function runLinkHealthCheck() {
    const res = await fetch('/api/admin/gallery/link-health', { credentials: 'include' });
    const data = (await res.json().catch(() => ({}))) as {
      error?: string;
      total?: number;
      broken?: number;
      items?: Array<{ titleHu: string; titleEn: string; url: string; reachable: boolean; httpStatus: number }>;
    };
    if (!res.ok) {
      toast(data.error ?? g.linkCheckFailed, 'warning');
      return;
    }
    const total = data.total ?? 0;
    const broken = data.broken ?? 0;
    const items = Array.isArray(data.items) ? data.items : [];
    toast(g.linkCheckDone.replace('{total}', String(total)).replace('{broken}', String(broken)), broken ? 'warning' : 'success');
    if (!broken) return;
    const top = items
      .filter((x) => !x.reachable)
      .slice(0, 20)
      .map((x) => `• ${lang === 'hu' ? x.titleHu : x.titleEn} [${x.httpStatus}] ${x.url}`)
      .join('\n');
    openModal(g.linkCheckModalTitle, `${g.linkCheckModalLead}\n\n${top}`);
  }

  async function uploadSingle(file: File) {
    const folderForUpload = folderId === 'all' ? folders[0]?.id : folderId;
    if (!folderForUpload) {
      toast(lang === 'hu' ? 'Előbb hozz létre egy mappát.' : 'Create a folder first.', 'warning');
      return;
    }
    setUploading(true);
    try {
      const form = new FormData();
      form.set('folderId', String(folderForUpload));
      form.set('file', file);
      form.set('titleHu', file.name.replace(/\.[^.]+$/, ''));
      form.set('titleEn', file.name.replace(/\.[^.]+$/, ''));
      form.set('listDate', new Date().toISOString().slice(0, 10));
      const res = await fetch('/api/admin/gallery/upload', {
        method: 'POST',
        credentials: 'include',
        body: form,
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        toast(data.error ?? g.saveFailed, 'warning');
        return;
      }
      await refreshData();
      toast(lang === 'hu' ? 'Kép feltöltve.' : 'Image uploaded.', 'success');
    } finally {
      setUploading(false);
    }
  }

  async function uploadBulk(files: FileList) {
    const folderForUpload = folderId === 'all' ? folders[0]?.id : folderId;
    if (!folderForUpload) {
      toast(lang === 'hu' ? 'Előbb hozz létre egy mappát.' : 'Create a folder first.', 'warning');
      return;
    }
    if (!files.length) return;
    setUploading(true);
    try {
      const form = new FormData();
      form.set('folderId', String(folderForUpload));
      form.set('listDate', new Date().toISOString().slice(0, 10));
      for (const file of Array.from(files)) form.append('files', file);

      const res = await fetch('/api/admin/gallery/upload/bulk', {
        method: 'POST',
        credentials: 'include',
        body: form,
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; createdCount?: number };
      if (!res.ok) {
        toast(data.error ?? g.saveFailed, 'warning');
        return;
      }
      await refreshData();
      toast(
        lang === 'hu'
          ? `${data.createdCount ?? files.length} kép feltöltve.`
          : `${data.createdCount ?? files.length} images uploaded.`,
        'success',
      );
    } finally {
      setUploading(false);
    }
  }

  async function createFolder() {
    const name = newFolderName.trim();
    if (!name) return;
    const res = await fetch('/api/gallery/folders', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      toast(data.error ?? (lang === 'hu' ? 'A mappa létrehozása sikertelen.' : 'Failed to create folder.'), 'warning');
      return;
    }
    setNewFolderName('');
    await refreshData();
    toast(lang === 'hu' ? 'Mappa létrehozva.' : 'Folder created.', 'success');
  }

  async function renameFolder(folderIdToPatch: number) {
    const name = (folderDrafts[folderIdToPatch] ?? '').trim();
    if (!name) return;
    const res = await fetch(`/api/gallery/folders/${folderIdToPatch}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      toast(data.error ?? (lang === 'hu' ? 'A mappa mentése sikertelen.' : 'Failed to save folder.'), 'warning');
      return;
    }
    await refreshData();
    toast(lang === 'hu' ? 'Mappa frissítve.' : 'Folder updated.', 'success');
  }

  async function deleteFolder(folderIdToDelete: number) {
    const ok = await requestConfirm({
      message: lang === 'hu' ? 'Biztosan törlöd ezt a mappát?' : 'Delete this folder?',
      destructive: true,
      confirmLabel: dict.common.delete,
      cancelLabel: dict.common.cancel,
    });
    if (!ok) return;
    const res = await fetch(`/api/gallery/folders/${folderIdToDelete}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      toast(data.error ?? (lang === 'hu' ? 'A mappa törlése sikertelen.' : 'Failed to delete folder.'), 'warning');
      return;
    }
    if (folderId === folderIdToDelete) {
      setFolderId('all');
    }
    await refreshData();
    toast(lang === 'hu' ? 'Mappa törölve.' : 'Folder deleted.', 'success');
  }

  function renderMedia(item: GalleryItemDto) {
    if (item.imageUrl && (/^https?:\/\//i.test(item.imageUrl) || item.imageUrl.startsWith('/'))) {
      const alt = lang === 'hu' ? item.titleHu : item.titleEn;
      return (
        <button type="button" className="gallery-media-trigger" onClick={() => setActivePreviewId(item.id)} aria-label={g.openImage}>
          {item.thumbnailUrl ? (
            <Image
              src={item.thumbnailUrl}
              alt={alt}
              fill
              className="gallery-card-thumb-img"
              sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 360px"
              loading="lazy"
            />
          ) : isRemoteImageHostOptimizable(item.imageUrl) ? (
            <Image
              src={item.imageUrl}
              alt={alt}
              fill
              className="gallery-card-thumb-img"
              sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 360px"
              loading="lazy"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element -- host nincs a remotePatterns listában
            <img src={item.imageUrl} alt={alt} loading="lazy" className="gallery-card-thumb-img" />
          )}
        </button>
      );
    }
    return (
      <button type="button" className="gallery-media-trigger" onClick={() => setActivePreviewId(item.id)} aria-label={g.imageDetails}>
        <div className="gallery-card-thumb-placeholder" />
      </button>
    );
  }

  const activePreviewItem = activePreviewId === null ? null : items.find((item) => item.id === activePreviewId) ?? null;
  const activePreviewFolderName =
    activePreviewItem ? folders.find((folder) => folder.id === activePreviewItem.folderId)?.name ?? g.unknownFolder : g.unknownFolder;
  const viewEmptyByFilter = folderId !== 'all' || query.trim() !== '';

  return (
    <section className="section">
      <SectionHeader eyebrow={g.eyebrow} title={g.title} text={g.lead} />

      {canManageNewsUi ? (
        <ModuleAdminToolbar title={dict.common.moduleAdminToolbarTitle} ariaLabel={dict.common.moduleAdminToolbarAria}>
          <button type="button" className="btn btn-secondary" onClick={() => void addDemoItem()}>
            {g.newDemoItem}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => setFolderModalOpen(true)}>
            {g.manageFolders}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => void runLinkHealthCheck()}>
            {g.linkCheck}
          </button>
          <button type="button" className="btn btn-secondary" disabled={uploading} onClick={() => uploadInputRef.current?.click()}>
            {g.uploadImage}
          </button>
          <button type="button" className="btn btn-secondary" disabled={uploading} onClick={() => bulkUploadInputRef.current?.click()}>
            {g.bulkUpload}
          </button>
        </ModuleAdminToolbar>
      ) : null}
      <input
        ref={uploadInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="input-file-hidden"
        aria-hidden
        tabIndex={-1}
        onChange={(e) => {
          const file = e.currentTarget.files?.[0];
          if (file) void uploadSingle(file);
          e.currentTarget.value = '';
        }}
      />
      <input
        ref={bulkUploadInputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp"
        className="input-file-hidden"
        aria-hidden
        tabIndex={-1}
        onChange={(e) => {
          const files = e.currentTarget.files;
          if (files?.length) void uploadBulk(files);
          e.currentTarget.value = '';
        }}
      />

      <div className="calendar-toolbar card gallery-toolbar">
        <div className="gallery-toolbar-mode-row" role="group" aria-label={g.viewSwitchAria}>
          <button
            type="button"
            aria-pressed={view === 'grid'}
            className={`btn ${view === 'grid' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setView('grid')}
          >
            {g.viewGrid}
          </button>
          <button
            type="button"
            aria-pressed={view === 'folders'}
            className={`btn ${view === 'folders' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setView('folders')}
          >
            {g.viewFolders}
          </button>
          <button
            type="button"
            aria-pressed={view === 'timeline'}
            className={`btn ${view === 'timeline' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setView('timeline')}
          >
            {g.viewTimeline}
          </button>
        </div>
        <div className="gallery-toolbar-controls">
          <input
            className="input gallery-toolbar-search"
            placeholder={g.searchPlaceholder}
            aria-label={g.searchAria}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <CustomSelect
            ariaLabel={g.folderFilterAria}
            value={folderId === 'all' ? 'all' : String(folderId)}
            onChange={(next) => setFolderId(next === 'all' ? 'all' : Number(next))}
            options={[{ value: 'all', label: g.folderAll }, ...folders.map((folder) => ({ value: String(folder.id), label: folder.name }))]}
          />
        </div>
      </div>

      {loadStatus === 'loading' ? (
        <div role="status" aria-live="polite">
          <Skeleton variant="galleryGrid" />
        </div>
      ) : null}
      {loadStatus === 'error' ? (
        <ErrorState title={g.loadErrorTitle} message={g.loadErrorMessage} onRetry={() => void loadInitial()} retryLabel={g.retry} />
      ) : null}

      {loadStatus === 'ready' && view === 'grid' && !filtered.length ? (
        <EmptyState title={g.emptyGridTitle} description={g.emptyGridDesc} />
      ) : null}

      {loadStatus === 'ready' && view === 'grid' && filtered.length ? (
        <div className="grid-3">
          {filtered.map((item) => (
            <Card key={item.id} strong>
              <div className="gallery-card-media-frame">{renderMedia(item)}</div>
              <h3>{lang === 'hu' ? item.titleHu : item.titleEn}</h3>
              <p className="muted-text">{item.date}</p>
              <div className="gallery-card-actions">
                {item.imageUrl && (/^https?:\/\//i.test(item.imageUrl) || item.imageUrl.startsWith('/')) ? (
                  <a className="btn btn-secondary" href={item.imageUrl} download target="_blank" rel="noopener noreferrer">
                    {g.downloadOpen}
                  </a>
                ) : null}
                {canManageNewsUi ? (
                  <>
                    <button type="button" className="btn btn-secondary" onClick={() => openEditModal(item)}>
                      {g.edit}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={() => void removeItem(item.id)}>
                      {dict.common.delete}
                    </button>
                  </>
                ) : null}
              </div>
            </Card>
          ))}
        </div>
      ) : null}

      {loadStatus === 'ready' && view === 'folders' && !folders.length ? <EmptyState title={g.emptyFoldersTitle} description={g.emptyFoldersDesc} /> : null}

      {loadStatus === 'ready' && view === 'folders' && !!folders.length ? (
        <div className="grid-3">
          {folders.map((folder) => (
            <Card key={folder.id}>
              <h3>{folder.name}</h3>
              <p className="muted-text">
                {(() => {
                  const n = items.filter((item) => item.folderId === folder.id && item.status !== 'deleted').length;
                  const suffix = lang === 'en' && n === 1 ? g.itemSuffixSingular : g.itemSuffixPlural;
                  return `${n} ${suffix}`;
                })()}
              </p>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setFolderId(folder.id);
                  setView('grid');
                }}
              >
                {g.folderOpen}
              </button>
              {canManageNewsUi ? (
                <button type="button" className="btn btn-secondary" onClick={() => setFolderModalOpen(true)}>
                  {g.folderEdit}
                </button>
              ) : null}
            </Card>
          ))}
        </div>
      ) : null}

      {loadStatus === 'ready' && view === 'timeline' && !filtered.length ? (
        <EmptyState title={viewEmptyByFilter ? g.emptyGridTitle : g.emptyTimelineTitle} description={g.emptyTimelineDesc} />
      ) : null}

      {loadStatus === 'ready' && view === 'timeline' && !!filtered.length ? (
        <div className="stack">
          {filtered.map((item) => (
            <div className="timeline-item" key={item.id}>
              <div>
                <div className="badge">{item.date}</div>
              </div>
              <div>
                <h3>{lang === 'hu' ? item.titleHu : item.titleEn}</h3>
                <p className="muted-text">{folders.find((f) => f.id === item.folderId)?.name ?? g.unknownFolder}</p>
                <div className="gallery-timeline-actions">
                  {item.imageUrl && (/^https?:\/\//i.test(item.imageUrl) || item.imageUrl.startsWith('/')) ? (
                    <a className="btn btn-secondary" href={item.imageUrl} download target="_blank" rel="noopener noreferrer">
                      {g.downloadOpen}
                    </a>
                  ) : null}
                  {canManageNewsUi ? (
                    <>
                      <button type="button" className="btn btn-secondary" onClick={() => openEditModal(item)}>
                        {g.edit}
                      </button>
                      <button type="button" className="btn btn-secondary" onClick={() => void removeItem(item.id)}>
                        {dict.common.delete}
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <AdminModal
        open={folderModalOpen}
        title={lang === 'hu' ? 'Galéria mappák kezelése' : 'Manage gallery folders'}
        closeLabel={dict.common.modalClose}
        onClose={() => setFolderModalOpen(false)}
        disableAnimation
      >
        <div className="stack">
          <div className="modal-grid">
            <label className="gallery-edit-modal-full">
              <div className="calculator-field-label">{lang === 'hu' ? 'Új mappa neve' : 'New folder name'}</div>
              <div className="feedback-row">
                <input className="input" value={newFolderName} onChange={(e) => setNewFolderName(e.target.value)} />
                <button type="button" className="btn btn-secondary" onClick={() => void createFolder()}>
                  {lang === 'hu' ? 'Létrehozás' : 'Create'}
                </button>
              </div>
            </label>
          </div>
          <div className="stack">
            {folders.map((folder) => (
              <div key={folder.id} className="feedback-row">
                <input
                  className="input"
                  value={folderDrafts[folder.id] ?? folder.name}
                  onChange={(e) => setFolderDrafts((prev) => ({ ...prev, [folder.id]: e.target.value }))}
                />
                <button type="button" className="btn btn-secondary" onClick={() => void renameFolder(folder.id)}>
                  {lang === 'hu' ? 'Mentés' : 'Save'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => void deleteFolder(folder.id)}>
                  {dict.common.delete}
                </button>
              </div>
            ))}
          </div>
        </div>
      </AdminModal>

      <AdminModal
        open={!!activePreviewItem}
        title={activePreviewItem ? (lang === 'hu' ? activePreviewItem.titleHu : activePreviewItem.titleEn) : g.previewTitle}
        closeLabel={dict.common.modalClose}
        onClose={() => setActivePreviewId(null)}
        disableAnimation
      >
        {activePreviewItem ? (
          <div className="stack">
            <div className="gallery-preview-image-wrap">
              {activePreviewItem.imageUrl &&
              (/^https?:\/\//i.test(activePreviewItem.imageUrl) || activePreviewItem.imageUrl.startsWith('/')) ? (
                isRemoteImageHostOptimizable(activePreviewItem.imageUrl) ? (
                  <Image
                    src={activePreviewItem.imageUrl}
                    alt={lang === 'hu' ? activePreviewItem.titleHu : activePreviewItem.titleEn}
                    width={800}
                    height={520}
                    className="gallery-preview-image"
                    sizes="(max-width: 900px) 92vw, min(800px, 70vw)"
                    priority={false}
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={activePreviewItem.imageUrl}
                    alt={lang === 'hu' ? activePreviewItem.titleHu : activePreviewItem.titleEn}
                    className="gallery-preview-image"
                    loading="lazy"
                  />
                )
              ) : (
                <div className="gallery-preview-fallback" />
              )}
            </div>
            <p className="muted-text">{activePreviewItem.date}</p>
            <p className="muted-text">
              {g.previewMetaFolder}: {activePreviewFolderName}
            </p>
            <p className="muted-text">
              {g.previewMetaStatus}: {statusLabel(activePreviewItem.status)}
            </p>
            {activePreviewItem.imageUrl &&
            (/^https?:\/\//i.test(activePreviewItem.imageUrl) || activePreviewItem.imageUrl.startsWith('/')) ? (
              <a className="btn btn-secondary" href={activePreviewItem.imageUrl} target="_blank" rel="noopener noreferrer">
                {g.openNewTab}
              </a>
            ) : null}
          </div>
        ) : null}
      </AdminModal>

      <AdminModal
        open={editingItemId !== null}
        title={g.editModalTitle}
        closeLabel={dict.common.modalClose}
        onClose={() => setEditingItemId(null)}
        disableAnimation
      >
        <div className="stack">
          <div className="modal-grid">
            <label>
              <div className="calculator-field-label">{g.formTitleHu}</div>
              <input className="input" value={editForm.titleHu} onChange={(e) => setEditForm((p) => ({ ...p, titleHu: e.target.value }))} />
            </label>
            <label>
              <div className="calculator-field-label">{g.formTitleEn}</div>
              <input className="input" value={editForm.titleEn} onChange={(e) => setEditForm((p) => ({ ...p, titleEn: e.target.value }))} />
            </label>
            <label>
              <div className="calculator-field-label">{g.formDate}</div>
              <input className="input" type="date" value={editForm.listDate} onChange={(e) => setEditForm((p) => ({ ...p, listDate: e.target.value }))} />
            </label>
            <label>
              <div className="calculator-field-label">{g.formFolder}</div>
              <select className="select" value={editForm.folderId} onChange={(e) => setEditForm((p) => ({ ...p, folderId: e.target.value }))}>
                {folders.map((folder) => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <div className="calculator-field-label">{g.formStatus}</div>
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
                <option value="published">{g.statusPublished}</option>
                <option value="draft">{g.statusDraft}</option>
                <option value="scheduled">{g.statusScheduled}</option>
                <option value="archived">{g.statusArchived}</option>
              </select>
            </label>
            <label className="gallery-edit-modal-full">
              <div className="calculator-field-label">{g.formImageUrl}</div>
              <input className="input" value={editForm.imageUrl} onChange={(e) => setEditForm((p) => ({ ...p, imageUrl: e.target.value }))} />
            </label>
          </div>
          <div className="news-form-actions">
            <button type="button" className="btn btn-primary" onClick={() => void saveEditItem()}>
              {g.saveChanges}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => setEditingItemId(null)}>
              {dict.common.cancel}
            </button>
          </div>
        </div>
      </AdminModal>
    </section>
  );
}
