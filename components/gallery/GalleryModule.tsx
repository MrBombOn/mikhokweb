/**
 * @file Galéria modul – grid / mappa / timeline nézet
 *
 * @description
 * Adat: **GET /api/gallery** (`folders` + `items`). Admin: **POST /api/gallery**, **DELETE /api/gallery/[id]**.
 * Keresés a címeken és dátumon; letöltés, ha van `imageUrl` (http(s)).
 */
'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { Card, SectionHeader } from '@/components/ui/Core';
import { EmptyState } from '@/components/ui/EmptyState';
import { Skeleton } from '@/components/ui/Skeleton';
import { galleryFolders as fallbackFolders, galleryItems as fallbackItems } from '@/lib/content';
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
  const { lang, toast, isAdmin } = useApp();
  const [view, setView] = useState<ViewMode>('grid');
  const [folderId, setFolderId] = useState<number | 'all'>('all');
  const [query, setQuery] = useState('');
  const [folders, setFolders] = useState<GalleryFolderDto[]>([]);
  const [items, setItems] = useState<GalleryItemDto[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchGallery();
      if (data) {
        setFolders(data.folders);
        setItems(data.items);
      } else {
        if (canUseDemoFallback()) {
          const fb = fallbackPayload();
          setFolders(fb.folders);
          setItems(fb.items);
        } else {
          setFolders([]);
          setItems([]);
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload, isAdmin]);

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
        titleHu: 'Új kép',
        titleEn: 'New image',
        listDate,
        imageUrl: `https://picsum.photos/seed/gallery-new-${Date.now()}/800/520`,
        status: 'published',
      }),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      toast(data.error ?? (lang === 'hu' ? 'Mentés sikertelen.' : 'Save failed.'), 'warning');
      return;
    }
    await reload();
    toast(lang === 'hu' ? 'Új galériaelem létrehozva.' : 'New gallery item created.', 'success');
  }

  async function removeItem(id: number) {
    if (!window.confirm(lang === 'hu' ? 'Biztosan töröljük ezt az elemet?' : 'Delete this gallery item?')) return;
    const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE', credentials: 'include' });
    if (!res.ok) {
      toast(lang === 'hu' ? 'Törlés sikertelen.' : 'Delete failed.', 'warning');
      return;
    }
    await reload();
    toast(lang === 'hu' ? 'Elem törölve.' : 'Item removed.', 'success');
  }

  function renderMedia(item: GalleryItemDto) {
    if (item.imageUrl && /^https?:\/\//i.test(item.imageUrl)) {
      return (
        // eslint-disable-next-line @next/next/no-img-element -- külső picsum URL, remotePatterns nélkül egyszerűbb
        <img
          src={item.imageUrl}
          alt={lang === 'hu' ? item.titleHu : item.titleEn}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 18 }}
        />
      );
    }
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 18,
          background: 'linear-gradient(135deg, rgba(33,92,255,0.18), rgba(255,255,255,0.56))',
        }}
      />
    );
  }

  return (
    <section className="section">
      <SectionHeader
        eyebrow={lang === 'hu' ? 'Galéria' : 'Gallery'}
        title={lang === 'hu' ? 'Kifinomultabb galéria és célzott admin szerkesztés' : 'Refined gallery with targeted admin editing'}
        text={
          lang === 'hu'
            ? 'Három nézet, mappa szűrés, keresés; adat a REST API-ról. A feltöltés éles környezetben fájltárolóval bővíthető (§13.3).'
            : 'Three views, folder filter, search; data from the REST API. Production uploads need storage (§13.3).'
        }
      />

      <div className="calendar-toolbar card" style={{ padding: 16, marginBottom: 18 }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
          <button type="button" className={`btn ${view === 'grid' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setView('grid')}>
            Grid
          </button>
          <button type="button" className={`btn ${view === 'folders' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setView('folders')}>
            Folders
          </button>
          <button type="button" className={`btn ${view === 'timeline' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setView('timeline')}>
            Timeline
          </button>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            className="input"
            style={{ minWidth: 200, maxWidth: 320 }}
            placeholder={lang === 'hu' ? 'Keresés…' : 'Search…'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select className="select" value={folderId === 'all' ? 'all' : String(folderId)} onChange={(e) => setFolderId(e.target.value === 'all' ? 'all' : Number(e.target.value))}>
            <option value="all">{lang === 'hu' ? 'Minden mappa' : 'All folders'}</option>
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
          {isAdmin ? (
            <button type="button" className="btn btn-primary" onClick={() => void addDemoItem()}>
              {lang === 'hu' ? 'Új elem (demó URL)' : 'New item (demo URL)'}
            </button>
          ) : null}
        </div>
      </div>

      {loading ? <Skeleton variant="galleryGrid" /> : null}

      {!loading && view === 'grid' && !filtered.length ? (
        <EmptyState
          title={lang === 'hu' ? 'Nincs megjeleníthető elem' : 'Nothing to show'}
          description={
            lang === 'hu'
              ? 'Próbálj más mappát vagy keresőszót, vagy térj vissza később.'
              : 'Try another folder or search term, or check back later.'
          }
        />
      ) : null}

      {!loading && view === 'grid' && filtered.length ? (
        <div className="grid-3">
          {filtered.map((item) => (
            <Card key={item.id} strong>
              <div style={{ aspectRatio: '16 / 10', marginBottom: 14, overflow: 'hidden', borderRadius: 18 }}>{renderMedia(item)}</div>
              <h3>{lang === 'hu' ? item.titleHu : item.titleEn}</h3>
              <p style={{ color: 'var(--muted)' }}>{item.date}</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                {item.imageUrl && /^https?:\/\//i.test(item.imageUrl) ? (
                  <a className="btn btn-secondary" href={item.imageUrl} download target="_blank" rel="noopener noreferrer">
                    {lang === 'hu' ? 'Letöltés / megnyitás' : 'Download / open'}
                  </a>
                ) : null}
                {isAdmin ? (
                  <>
                    <button type="button" className="btn btn-ghost" onClick={() => toast(lang === 'hu' ? 'Szerkesztő: PATCH API később.' : 'Editor: PATCH API later.', 'info')}>
                      {lang === 'hu' ? 'Szerkesztés' : 'Edit'}
                    </button>
                    <button type="button" className="btn btn-ghost" onClick={() => void removeItem(item.id)}>
                      {lang === 'hu' ? 'Törlés' : 'Delete'}
                    </button>
                  </>
                ) : null}
              </div>
            </Card>
          ))}
        </div>
      ) : null}

      {!loading && view === 'folders' && !folders.length ? (
        <EmptyState
          title={lang === 'hu' ? 'Nincs mappa' : 'No folders'}
          description={lang === 'hu' ? 'A galéria még üres.' : 'The gallery is empty.'}
        />
      ) : null}

      {!loading && view === 'folders' && !!folders.length ? (
        <div className="grid-3">
          {folders.map((folder) => (
            <Card key={folder.id}>
              <h3>{folder.name}</h3>
              <p style={{ color: 'var(--muted)' }}>
                {items.filter((item) => item.folderId === folder.id && item.status !== 'deleted').length} {lang === 'hu' ? 'elem' : 'items'}
              </p>
              {isAdmin ? (
                <button type="button" className="btn btn-ghost" onClick={() => toast(lang === 'hu' ? 'Mappa szerkesztés: API később.' : 'Folder edit: API later.', 'info')}>
                  {lang === 'hu' ? 'Mappa szerkesztése' : 'Edit folder'}
                </button>
              ) : null}
            </Card>
          ))}
        </div>
      ) : null}

      {!loading && view === 'timeline' && !filtered.length ? (
        <EmptyState
          title={lang === 'hu' ? 'Nincs idővonal elem' : 'No timeline items'}
          description={
            lang === 'hu' ? 'Szűkíts a mappára vagy a keresésre.' : 'Narrow down by folder or search.'
          }
        />
      ) : null}

      {!loading && view === 'timeline' && !!filtered.length ? (
        <div className="stack">
          {filtered.map((item) => (
            <div className="timeline-item" key={item.id}>
              <div>
                <div className="badge">{item.date}</div>
              </div>
              <div>
                <h3>{lang === 'hu' ? item.titleHu : item.titleEn}</h3>
                <p style={{ color: 'var(--muted)' }}>{folders.find((f) => f.id === item.folderId)?.name ?? '—'}</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                  {item.imageUrl && /^https?:\/\//i.test(item.imageUrl) ? (
                    <a className="btn btn-secondary" href={item.imageUrl} download target="_blank" rel="noopener noreferrer">
                      {lang === 'hu' ? 'Letöltés / megnyitás' : 'Download / open'}
                    </a>
                  ) : null}
                  {isAdmin ? (
                    <>
                      <button type="button" className="btn btn-ghost" onClick={() => toast(lang === 'hu' ? 'Szerkesztő: PATCH API később.' : 'Editor: PATCH API later.', 'info')}>
                        {lang === 'hu' ? 'Szerkesztés' : 'Edit'}
                      </button>
                      <button type="button" className="btn btn-ghost" onClick={() => void removeItem(item.id)}>
                        {lang === 'hu' ? 'Törlés' : 'Delete'}
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
