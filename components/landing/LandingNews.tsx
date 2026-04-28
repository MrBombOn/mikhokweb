/**
 * @file Landing hír blokk – lista, szűrés, admin modálok
 *
 * @description
 * Hírek **GET /api/news**-ről; OFFICE/ADMIN: **POST/PATCH/DELETE**. Kategóriák + mentett keresések: `localStorage` (`STORAGE_KEY`).
 */
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { SectionHeader } from '@/components/ui/Core';
import { AdminModal } from '@/components/ui/AdminModal';
import { getLandingCopy } from '@/lib/landingDictionary';
import type { CoverTone, NewsFormStatus, NewsItem, NewsSource } from '@/types/news';

type AdminModalKey = 'editor' | 'adapters' | 'archive' | 'category' | null;
type DraftForm = { source: NewsSource; category: string; status: NewsFormStatus; titleHu: string; titleEn: string; textHu: string; textEn: string; author: string; scheduledFor: string; externalUrl: string; cover: CoverTone; hasCover: boolean };
const STORAGE_KEY = 'v25_17-landing-news-prefs';
const fallbackNews: NewsItem[] = [
  { id: 1, source: 'internal', category: 'Közélet', status: 'published', pinned: true, date: '2026-04-12', titleHu: 'Tavaszi kari fórum', titleEn: 'Spring faculty forum', textHu: 'A HÖK fórumot szervez a hallgatói visszajelzések összegyűjtésére.', textEn: 'The student union organizes a forum to gather student feedback.', author: 'MIK HÖK', cover: 'blue', hasCover: true },
  { id: 2, source: 'facebook', category: 'Közösség', status: 'published', pinned: false, date: '2026-04-10', titleHu: 'Facebook bejegyzés: közösségi program', titleEn: 'Facebook post: community event', textHu: 'Közösségi program ajánló a hivatalos Facebook kommunikációból.', textEn: 'Community event highlight coming from the official Facebook communication.', author: 'Facebook feed', cover: 'pink', hasCover: true, externalUrl: 'https://facebook.com' },
  { id: 3, source: 'instagram', category: 'Képek', status: 'published', pinned: false, date: '2026-04-09', titleHu: 'Instagram feed: eseményfotók', titleEn: 'Instagram feed: event photos', textHu: 'Instagram poszt alapú képes összefoglaló a legutóbbi eseményről.', textEn: 'Instagram-based visual recap of the most recent event.', author: 'Instagram feed', cover: 'pink', hasCover: true, externalUrl: 'https://instagram.com' },
];
async function fetchNewsList(): Promise<NewsItem[] | null> {
  const r = await fetch('/api/news', { credentials: 'include' });
  if (!r.ok) return null;
  const data = (await r.json()) as { items?: NewsItem[] };
  return Array.isArray(data.items) ? data.items : null;
}
const emptyForm: DraftForm = { source:'internal', category:'', status:'draft', titleHu:'', titleEn:'', textHu:'', textEn:'', author:'', scheduledFor:'', externalUrl:'', cover:'blue', hasCover:true };
const icon = {plus:<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><path d='M12 5v14M5 12h14'/></svg>,archive:<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><path d='M3 7h18'/><path d='M5 7h14v12H5z'/><path d='M10 12h4'/></svg>,edit:<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><path d='M12 20h9'/><path d='M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z'/></svg>,details:<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><circle cx='12' cy='12' r='9'/><path d='M12 16v-4'/><circle cx='12' cy='8' r='1' fill='currentColor' stroke='none'/></svg>,external:<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><path d='M14 5h5v5'/><path d='M10 14 19 5'/><path d='M19 14v5h-14V5h5'/></svg>,delete:<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><path d='M3 6h18'/><path d='M19 6l-1 14H6L5 6'/><path d='M10 11v6M14 11v6'/></svg>};
const sourceLabel=(src:NewsSource,lang:'hu'|'en')=>src==='internal'?(lang==='hu'?'HÖK hír':'HÖK news'):src==='facebook'?'Facebook':'Instagram';
function formStatusFromItem(s: NewsItem['status']): NewsFormStatus {
  return s === 'deleted' ? 'draft' : s;
}
function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="btn btn-secondary"
      aria-label={label}
      title={label}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      style={{ width: 44, height: 44, padding: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 14 }}
    >
      <span aria-hidden="true" style={{ display: 'inline-flex', width: 18, height: 18 }}>
        {children}
      </span>
    </button>
  );
}
export function LandingNews(){
const { lang, openModal, isAdmin, toast } = useApp();
const copy=getLandingCopy(lang);
const [query,setQuery]=useState(''); const [category,setCategory]=useState('all'); const [source,setSource]=useState('all'); const [status,setStatus]=useState<'all'|NewsFormStatus>('all'); const [order,setOrder]=useState<'latest'|'oldest'>('latest');
const [customCategories,setCustomCategories]=useState(['Közélet','Közösség','Képek']); const [savedSearches,setSavedSearches]=useState<string[]>([]); const [newsItems,setNewsItems]=useState<NewsItem[]>([]);
const [draftForm,setDraftForm]=useState<DraftForm>(emptyForm); const [editingId,setEditingId]=useState<number|null>(null); const [adapterFacebook,setAdapterFacebook]=useState({pageId:'',token:'',endpoint:''}); const [adapterInstagram,setAdapterInstagram]=useState({accountId:'',apiKey:'',endpoint:''}); const [pendingCategory,setPendingCategory]=useState(''); const [activeAdminModal,setActiveAdminModal]=useState<AdminModalKey>(null);
useEffect(() => {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const data = JSON.parse(raw) as { customCategories?: string[]; savedSearches?: string[] };
    if (data.customCategories) setCustomCategories(data.customCategories);
    if (data.savedSearches) setSavedSearches(data.savedSearches);
  } catch {
    /* ignore */
  }
}, []);
useEffect(() => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ customCategories, savedSearches }));
}, [customCategories, savedSearches]);
useEffect(() => {
  let cancelled = false;
  void (async () => {
    const fromApi = await fetchNewsList();
    if (cancelled) return;
    if (fromApi !== null) setNewsItems(fromApi);
    else setNewsItems(fallbackNews);
  })();
  return () => {
    cancelled = true;
  };
}, [isAdmin]);
const visibleNews = useMemo(() => {
  const base = newsItems.filter((item) => (isAdmin && item.status !== 'deleted') || item.status === 'published');
  const list = base.filter(
    (item) =>
      (category === 'all' || item.category === category) &&
      (source === 'all' || item.source === source) &&
      (status === 'all' || item.status === status) &&
      `${item.titleHu} ${item.titleEn} ${item.textHu} ${item.textEn} ${item.author}`.toLowerCase().includes(query.toLowerCase()),
  );
  return [...list].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return order === 'latest' ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date);
  });
}, [newsItems, query, category, source, status, order, isAdmin]);
const resetForm = () => {
  setDraftForm(emptyForm);
  setEditingId(null);
};
const persistNotice = (msg: string) => toast(msg, 'success');
const reloadFromApi = async () => {
  const items = await fetchNewsList();
  if (items) setNewsItems(items);
};
const applyCreate = async (publishDirectly: boolean) => {
  const body = {
    source: draftForm.source,
    category: draftForm.category.trim() || 'Általános',
    status: (publishDirectly ? 'published' : draftForm.status) as 'published' | 'draft' | 'scheduled' | 'archived',
    listDate: new Date().toISOString().slice(0, 10),
    titleHu: draftForm.titleHu.trim() || 'Új hír',
    titleEn: draftForm.titleEn.trim() || 'New news',
    textHu: draftForm.textHu.trim() || 'Új tartalom',
    textEn: draftForm.textEn.trim() || 'New content',
    author: draftForm.author.trim() || 'Admin',
    cover: draftForm.cover,
    hasCover: draftForm.hasCover,
    scheduledFor: draftForm.scheduledFor.trim() || undefined,
    externalUrl: draftForm.externalUrl.trim() || undefined,
  };
  const res = await fetch('/api/news', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = (await res.json().catch(() => ({}))) as { error?: string };
  if (!res.ok) {
    toast(data.error ?? (lang === 'hu' ? 'Mentés sikertelen.' : 'Save failed.'), 'warning');
    return;
  }
  await reloadFromApi();
  if (body.category && !customCategories.includes(body.category)) setCustomCategories((prev) => [...prev, body.category]);
  resetForm();
  setActiveAdminModal(null);
  persistNotice(copy.newsCreated);
};
const applyEdit = async () => {
  if (editingId === null) return;
  const body = {
    source: draftForm.source,
    category: draftForm.category.trim() || 'Általános',
    status: draftForm.status,
    titleHu: draftForm.titleHu.trim() || 'Új hír',
    titleEn: draftForm.titleEn.trim() || 'New news',
    textHu: draftForm.textHu.trim() || 'Új tartalom',
    textEn: draftForm.textEn.trim() || 'New content',
    author: draftForm.author.trim() || 'Admin',
    cover: draftForm.cover,
    hasCover: draftForm.hasCover,
    scheduledFor: draftForm.scheduledFor.trim() || undefined,
    externalUrl: draftForm.externalUrl.trim() || undefined,
  };
  const res = await fetch(`/api/news/${editingId}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = (await res.json().catch(() => ({}))) as { error?: string };
  if (!res.ok) {
    toast(data.error ?? (lang === 'hu' ? 'Mentés sikertelen.' : 'Save failed.'), 'warning');
    return;
  }
  await reloadFromApi();
  resetForm();
  setActiveAdminModal(null);
  persistNotice(copy.newsUpdated);
};
const archiveItem = async (id: number) => {
  const res = await fetch(`/api/news/${id}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'archived' }),
  });
  if (!res.ok) {
    toast(lang === 'hu' ? 'Archiválás sikertelen.' : 'Archive failed.', 'warning');
    return;
  }
  await reloadFromApi();
};
const deleteItem = async (id: number) => {
  const res = await fetch(`/api/news/${id}`, { method: 'DELETE', credentials: 'include' });
  if (!res.ok) {
    toast(lang === 'hu' ? 'Törlés sikertelen.' : 'Delete failed.', 'warning');
    return;
  }
  await reloadFromApi();
};
const publishItem = async (id: number) => {
  const res = await fetch(`/api/news/${id}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'published' }),
  });
  if (!res.ok) {
    toast(lang === 'hu' ? 'Közzététel sikertelen.' : 'Publish failed.', 'warning');
    return;
  }
  await reloadFromApi();
};
const addCategory=()=>{ const value=pendingCategory.trim(); if(value&&!customCategories.includes(value)){ setCustomCategories((prev)=>[...prev,value]); setPendingCategory(''); persistNotice(lang==='hu'?'Kategória mentve.':'Category saved.'); } };
const addSavedSearch=()=>{ const value=query.trim(); if(value&&!savedSearches.includes(value)){ setSavedSearches((prev)=>[...prev,value]); persistNotice(lang==='hu'?'Keresés mentve.':'Search saved.'); } };
const openDetails=(item:NewsItem)=>openModal(lang==='hu'?item.titleHu:item.titleEn,`${lang==='hu'?item.textHu:item.textEn}<div style='margin-top:16px;color:var(--muted)'>${copy.authorLabel}: ${item.author}</div><div style='margin-top:10px;color:var(--muted)'>${copy.dateLabel}: ${item.date}</div>`);
const openEditMode=(item:NewsItem)=>{ setEditingId(item.id); setDraftForm({source:item.source,category:item.category,status:formStatusFromItem(item.status),titleHu:item.titleHu,titleEn:item.titleEn,textHu:item.textHu,textEn:item.textEn,author:item.author,scheduledFor:item.scheduledFor??'',externalUrl:item.externalUrl??'',cover:item.cover,hasCover:item.hasCover}); setActiveAdminModal('editor'); };
const featured=visibleNews[0]; const rest=visibleNews.slice(1);
return <section id='landing-news' className='section' style={{paddingTop:42}}><div className='card card-strong animate-fade' style={{padding:28,borderRadius:30,background:'linear-gradient(180deg, var(--surface-strong), var(--surface))'}}><SectionHeader eyebrow={copy.newsEyebrow} title={copy.newsTitle} text={copy.newsText} /><div id='landing-news-list' className='news-toolbar card' style={{padding:16,margin:'18px 0'}}><input className='input' placeholder={copy.search} value={query} onChange={(e)=>setQuery(e.target.value)} /><select className='select' value={category} onChange={(e)=>setCategory(e.target.value)}><option value='all'>{copy.allCategories}</option>{customCategories.map((cat)=><option key={cat} value={cat}>{cat}</option>)}</select><select className='select' value={source} onChange={(e)=>setSource(e.target.value)}><option value='all'>{copy.allSources}</option><option value='internal'>{copy.internalNews}</option><option value='facebook'>Facebook</option><option value='instagram'>Instagram</option></select><select className='select' value={status} onChange={(e)=>setStatus(e.target.value as 'all'|NewsFormStatus)}><option value='all'>{copy.allStatuses}</option><option value='published'>{copy.published}</option><option value='draft'>{copy.draft}</option><option value='scheduled'>{copy.scheduled}</option><option value='archived'>{copy.archived}</option></select>{isAdmin ? <><IconButton label={copy.saveSearch} onClick={addSavedSearch}>{icon.details}</IconButton><button className='btn btn-secondary' onClick={() => setOrder(order === 'latest' ? 'oldest' : 'latest')}>{order === 'latest' ? copy.latest : copy.oldest}</button></> : null}</div><div className={isAdmin ? 'news-module-grid with-admin' : 'news-module-grid full-news'}><div className='stack'>{featured ? <div className='news-list-card clickable' role='button' tabIndex={0} onClick={() => openDetails(featured)}><div style={{display:'grid',gridTemplateColumns:'1.15fr 1.1fr auto',gap:18,alignItems:'stretch'}}><div className={`news-cover ${featured.cover}`} /><div><div style={{display:'flex',gap:10,flexWrap:'wrap',marginBottom:10}}><div className='badge'>{copy.featured}</div><div className='badge'>{sourceLabel(featured.source,lang)}</div><div className='badge'>{featured.category}</div></div><h3 style={{marginTop:0,fontSize:30}}>{lang==='hu'?featured.titleHu:featured.titleEn}</h3><p style={{color:'var(--muted)',lineHeight:1.75}}>{lang==='hu'?featured.textHu:featured.textEn}</p><div style={{color:'var(--muted)',fontSize:14}}>{copy.sourceAuthor} {featured.author}</div></div><div style={{display:'flex',gap:10,flexWrap:'wrap',alignContent:'flex-start'}}><IconButton label={copy.details} onClick={() => openDetails(featured)}>{icon.details}</IconButton>{featured.externalUrl ? <a href={featured.externalUrl} target='_blank' rel='noopener noreferrer' aria-label={copy.openExternal} title={copy.openExternal} className='btn btn-secondary' style={{width:44,height:44,padding:0,display:'inline-flex',alignItems:'center',justifyContent:'center',borderRadius:14}} onClick={(e)=>e.stopPropagation()}><span aria-hidden='true' style={{display:'inline-flex',width:18,height:18}}>{icon.external}</span></a> : null}{isAdmin ? <><IconButton label={copy.editNews} onClick={() => openEditMode(featured)}>{icon.edit}</IconButton><IconButton label={copy.archive} onClick={() => archiveItem(featured.id)}>{icon.archive}</IconButton><IconButton label={copy.delete} onClick={() => deleteItem(featured.id)}>{icon.delete}</IconButton></> : null}</div></div></div> : null}<div className='stack'>{rest.map((item)=><div key={item.id} className='news-list-card clickable' role='button' tabIndex={0} onClick={() => openDetails(item)}><div style={{display:'grid',gridTemplateColumns:'160px 1fr auto',gap:18,alignItems:'stretch'}}><div className={`news-cover ${item.cover}`} style={{minHeight:120}} /><div><div style={{display:'flex',gap:10,flexWrap:'wrap',marginBottom:8}}><div className='badge'>{sourceLabel(item.source,lang)}</div><div className='badge'>{item.category}</div><div className='badge'>{item.status}</div></div><h3 style={{marginTop:0}}>{lang==='hu'?item.titleHu:item.titleEn}</h3><p style={{color:'var(--muted)'}}>{lang==='hu'?item.textHu:item.textEn}</p></div><div style={{display:'flex',gap:10,flexWrap:'wrap',alignContent:'flex-start'}}><IconButton label={copy.details} onClick={() => openDetails(item)}>{icon.details}</IconButton>{item.externalUrl ? <a href={item.externalUrl} target='_blank' rel='noopener noreferrer' aria-label={copy.openExternal} title={copy.openExternal} className='btn btn-secondary' style={{width:44,height:44,padding:0,display:'inline-flex',alignItems:'center',justifyContent:'center',borderRadius:14}} onClick={(e)=>e.stopPropagation()}><span aria-hidden='true' style={{display:'inline-flex',width:18,height:18}}>{icon.external}</span></a> : null}{isAdmin ? <><IconButton label={copy.editNews} onClick={() => openEditMode(item)}>{icon.edit}</IconButton><IconButton label={copy.publish} onClick={() => publishItem(item.id)}>{icon.plus}</IconButton><IconButton label={copy.archive} onClick={() => archiveItem(item.id)}>{icon.archive}</IconButton><IconButton label={copy.delete} onClick={() => deleteItem(item.id)}>{icon.delete}</IconButton></> : null}</div></div></div>)}</div></div>{isAdmin ? <aside className='stack'><div className='news-side-panel admin-actions-panel'><h3 style={{marginTop:0}}>{copy.adminActions}</h3><div className='admin-module-actions vertical'><button className='btn btn-secondary' onClick={() => { resetForm(); setActiveAdminModal('editor'); }}>{copy.newsEditor}</button><button className='btn btn-secondary' onClick={() => setActiveAdminModal('adapters')}>{copy.adapters}</button><button className='btn btn-secondary' onClick={() => setActiveAdminModal('archive')}>{copy.archiveScheduling}</button><button className='btn btn-secondary' onClick={() => setActiveAdminModal('category')}>{copy.categoryManagement}</button></div>{savedSearches.length ? <div className='admin-chip-row' style={{marginTop:16}}>{savedSearches.map((item)=><span key={item} className='badge'>{item}</span>)}</div> : null}</div></aside> : null}</div><AdminModal open={activeAdminModal==='editor'} title={copy.newsEditor} onClose={() => setActiveAdminModal(null)}><div className='stack'><div className='modal-grid'><label><div style={{marginBottom:8}}>Cím (HU)</div><input className='input' value={draftForm.titleHu} onChange={(e)=>setDraftForm((p)=>({...p,titleHu:e.target.value}))} /></label><label><div style={{marginBottom:8}}>Title (EN)</div><input className='input' value={draftForm.titleEn} onChange={(e)=>setDraftForm((p)=>({...p,titleEn:e.target.value}))} /></label><label style={{gridColumn:'1/-1'}}><div style={{marginBottom:8}}>Leírás (HU)</div><textarea className='input' style={{minHeight:120}} value={draftForm.textHu} onChange={(e)=>setDraftForm((p)=>({...p,textHu:e.target.value}))} /></label><label style={{gridColumn:'1/-1'}}><div style={{marginBottom:8}}>Leírás (EN)</div><textarea className='input' style={{minHeight:120}} value={draftForm.textEn} onChange={(e)=>setDraftForm((p)=>({...p,textEn:e.target.value}))} /></label><label><div style={{marginBottom:8}}>Forrás</div><select className='select' value={draftForm.source} onChange={(e)=>setDraftForm((p)=>({...p,source:e.target.value as NewsSource}))}><option value='internal'>internal</option><option value='facebook'>facebook</option><option value='instagram'>instagram</option></select></label><label><div style={{marginBottom:8}}>Státusz</div><select className='select' value={draftForm.status} onChange={(e)=>setDraftForm((p)=>({...p,status:e.target.value as NewsFormStatus}))}><option value='draft'>draft</option><option value='published'>published</option><option value='scheduled'>scheduled</option><option value='archived'>archived</option></select></label><label><div style={{marginBottom:8}}>Kategória</div><input className='input' value={draftForm.category} onChange={(e)=>setDraftForm((p)=>({...p,category:e.target.value}))} /></label><label><div style={{marginBottom:8}}>Szerző</div><input className='input' value={draftForm.author} onChange={(e)=>setDraftForm((p)=>({...p,author:e.target.value}))} /></label><label><div style={{marginBottom:8}}>Ütemezés ideje</div><input className='input' value={draftForm.scheduledFor} onChange={(e)=>setDraftForm((p)=>({...p,scheduledFor:e.target.value}))} /></label><label><div style={{marginBottom:8}}>Külső link</div><input className='input' value={draftForm.externalUrl} onChange={(e)=>setDraftForm((p)=>({...p,externalUrl:e.target.value}))} /></label></div><div className='news-form-actions'><button className='btn btn-primary' onClick={()=>{ void (editingId===null?applyCreate(true):applyEdit()); }}>{editingId===null?copy.create:copy.saveChanges}</button><button className='btn btn-secondary' onClick={()=>{ void applyCreate(false); }} disabled={editingId!==null}>{copy.saveDraft}</button><button className='btn btn-secondary' onClick={resetForm}>{copy.resetForm}</button></div></div></AdminModal><AdminModal open={activeAdminModal==='adapters'} title={copy.adapters} onClose={() => setActiveAdminModal(null)}><div className='stack'><div className='modal-grid'><input className='input' placeholder='Facebook Page ID' value={adapterFacebook.pageId} onChange={(e)=>setAdapterFacebook((p)=>({...p,pageId:e.target.value}))} /><input className='input' placeholder='Facebook token' value={adapterFacebook.token} onChange={(e)=>setAdapterFacebook((p)=>({...p,token:e.target.value}))} /><input className='input' style={{gridColumn:'1/-1'}} placeholder='Facebook endpoint' value={adapterFacebook.endpoint} onChange={(e)=>setAdapterFacebook((p)=>({...p,endpoint:e.target.value}))} /><input className='input' placeholder='Instagram Account ID' value={adapterInstagram.accountId} onChange={(e)=>setAdapterInstagram((p)=>({...p,accountId:e.target.value}))} /><input className='input' placeholder='Instagram API key' value={adapterInstagram.apiKey} onChange={(e)=>setAdapterInstagram((p)=>({...p,apiKey:e.target.value}))} /><input className='input' style={{gridColumn:'1/-1'}} placeholder='Instagram endpoint' value={adapterInstagram.endpoint} onChange={(e)=>setAdapterInstagram((p)=>({...p,endpoint:e.target.value}))} /></div></div></AdminModal><AdminModal open={activeAdminModal==='archive'} title={copy.archiveScheduling} onClose={() => setActiveAdminModal(null)}><div className='admin-chip-row'><div className='badge'>published: {newsItems.filter(i=>i.status==='published').length}</div><div className='badge'>scheduled: {newsItems.filter(i=>i.status==='scheduled').length}</div><div className='badge'>archived: {newsItems.filter(i=>i.status==='archived').length}</div><div className='badge'>draft: {newsItems.filter(i=>i.status==='draft').length}</div></div></AdminModal><AdminModal open={activeAdminModal==='category'} title={copy.categoryManagement} onClose={() => setActiveAdminModal(null)}><div className='stack'><div className='admin-chip-row'>{customCategories.map((cat)=><span key={cat} className='badge'>{cat}</span>)}</div><div className='admin-module-actions'><input className='input' style={{minWidth:220}} placeholder={copy.newCategory} value={pendingCategory} onChange={(e)=>setPendingCategory(e.target.value)} /><button className='btn btn-secondary' onClick={addCategory}>{copy.add}</button></div></div></AdminModal></div></section>;
}
