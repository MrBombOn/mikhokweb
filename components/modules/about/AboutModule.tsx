/**
 * @file About Us – narratív blokkok + tagok csoportosítva (§15)
 *
 * @description
 * Adat: **GET /api/about** (`narratives`, `members`). OFFICE/ADMIN: **POST /api/about/members**,
 * **PATCH / DELETE /api/about/members/[id]**, **PATCH /api/about/narratives/[id]** – helyben modálban.
 * Fázis 10: tag avatár **`next/image`**, ha a host engedélyezett (`lib/remote-image-hosts.ts`).
 *
 * @i18n
 * `lib/i18n/messages.ts` (`t(lang).about`, `common`, `calendar` státusz feliratok).
 */
'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { AdminModal } from '@/components/ui/AdminModal';
import { Card, SectionHeader } from '@/components/ui/Core';
import { ErrorState } from '@/components/ui/ErrorState';
import { EmptyState } from '@/components/ui/EmptyState';
import { ModuleAdminToolbar } from '@/components/ui/ModuleAdminToolbar';
import { Skeleton } from '@/components/ui/Skeleton';
import { aboutPeople, t } from '@/lib/content';
import { isRemoteImageHostOptimizable } from '@/lib/remote-image-hosts';
import { canUseDemoFallback } from '@/lib/services/content-fetch-policy';
import type { AboutContentStatus, AboutMemberDto, AboutNarrativeDto } from '@/types/about';

const WRITABLE: Array<'draft' | 'scheduled' | 'published' | 'archived'> = [
  'draft',
  'scheduled',
  'published',
  'archived',
];

function normalizeWritableStatus(s: AboutContentStatus): (typeof WRITABLE)[number] {
  if (s === 'deleted') return 'draft';
  if (s === 'draft' || s === 'scheduled' || s === 'published' || s === 'archived') return s;
  return 'published';
}

function sortMembersInGroup(list: AboutMemberDto[]) {
  return [...list].sort((a, b) => {
    const o = a.sortOrder - b.sortOrder;
    if (o !== 0) return o;
    const pa = a.publishedAt ?? '';
    const pb = b.publishedAt ?? '';
    if (pa !== pb) return pb.localeCompare(pa);
    return a.id - b.id;
  });
}

function fallbackBundle(): { narratives: AboutNarrativeDto[]; members: AboutMemberDto[] } {
  return {
    narratives: [
      {
        id: 0,
        blockKey: 'intro',
        titleHu: t('hu').about.fallbackIntroTitle,
        titleEn: t('en').about.fallbackIntroTitle,
        bodyHu: t('hu').about.fallbackIntroBody,
        bodyEn: t('en').about.fallbackIntroBody,
        sortOrder: 0,
        status: 'published',
      },
    ],
    members: aboutPeople.map((p, i) => ({
      id: p.id,
      name: p.name,
      roleHu: p.roleHu,
      roleEn: p.roleEn,
      bioHu: '',
      bioEn: '',
      groupHu: 'Általános',
      groupEn: 'General',
      imageUrl: '',
      publishedAt: null,
      isAlumni: false,
      sortOrder: i,
      status: 'published' as const,
    })),
  };
}

async function fetchAbout(): Promise<{ narratives: AboutNarrativeDto[]; members: AboutMemberDto[] } | null> {
  const r = await fetch('/api/about', { credentials: 'include' });
  if (!r.ok) return null;
  const data = (await r.json()) as { narratives?: AboutNarrativeDto[]; members?: AboutMemberDto[] };
  if (!Array.isArray(data.narratives) || !Array.isArray(data.members)) return null;
  return { narratives: data.narratives, members: data.members };
}

export function AboutModule() {
  const { lang, toast, isStaff, requestConfirm } = useApp();
  const dict = t(lang);
  const about = dict.about;
  const [narratives, setNarratives] = useState<AboutNarrativeDto[]>([]);
  const [members, setMembers] = useState<AboutMemberDto[]>([]);
  const [loadStatus, setLoadStatus] = useState<'loading' | 'error' | 'ready'>('loading');
  const [narrativeDraft, setNarrativeDraft] = useState<AboutNarrativeDto | null>(null);
  const [memberDraft, setMemberDraft] = useState<AboutMemberDto | null>(null);
  const [narrativeSaving, setNarrativeSaving] = useState(false);
  const [memberSaving, setMemberSaving] = useState(false);

  const refreshData = useCallback(async () => {
    const data = await fetchAbout();
    if (data) {
      setNarratives(data.narratives);
      setMembers(data.members);
      return true;
    }
    if (canUseDemoFallback()) {
      const fb = fallbackBundle();
      setNarratives(fb.narratives);
      setMembers(fb.members);
      return true;
    }
    setNarratives([]);
    setMembers([]);
    return false;
  }, []);

  const loadInitial = useCallback(async () => {
    setLoadStatus('loading');
    const ok = await refreshData();
    setLoadStatus(ok ? 'ready' : 'error');
  }, [refreshData]);

  useEffect(() => {
    void loadInitial();
  }, [loadInitial, isStaff]);

  const intro = useMemo(() => narratives.find((n) => n.blockKey === 'intro'), [narratives]);
  const narrativeCards = useMemo(
    () => narratives.filter((n) => n.blockKey !== 'intro').sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id),
    [narratives],
  );

  const { activeMemberGroups, alumniMemberGroups } = useMemo(() => {
    const activeMap = new Map<string, AboutMemberDto[]>();
    const alumniMap = new Map<string, AboutMemberDto[]>();
    const defaultGroup = about.memberGroupDefault;
    for (const m of members) {
      const label = (lang === 'hu' ? m.groupHu : m.groupEn).trim() || defaultGroup;
      const bucket = m.isAlumni || label.toLowerCase().includes('alumni') ? alumniMap : activeMap;
      if (!bucket.has(label)) bucket.set(label, []);
      bucket.get(label)!.push(m);
    }
    const toSortedEntries = (map: Map<string, AboutMemberDto[]>) =>
      Array.from(map.entries())
        .map(([label, list]) => [label, sortMembersInGroup(list)] as const)
        .sort(([a], [b]) => a.localeCompare(b, lang === 'hu' ? 'hu' : 'en'));
    return {
      activeMemberGroups: toSortedEntries(activeMap),
      alumniMemberGroups: toSortedEntries(alumniMap),
    };
  }, [members, lang, about.memberGroupDefault]);

  const timelineNarratives = useMemo(
    () => narrativeCards.filter((n) => n.blockKey.toLowerCase().includes('timeline') || n.blockKey.toLowerCase().includes('history')),
    [narrativeCards],
  );

  async function addDemoMember() {
    const res = await fetch('/api/about/members', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: about.demoMemberName,
        roleHu: about.demoMemberRoleHu,
        roleEn: about.demoMemberRoleEn,
        bioHu: about.demoMemberBioHu,
        bioEn: about.demoMemberBioEn,
        groupHu: about.demoMemberGroupHu,
        groupEn: about.demoMemberGroupEn,
        sortOrder: members.length,
        publishedAt: null,
        isAlumni: false,
        status: 'published',
      }),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      toast(data.error ?? about.saveFailed, 'warning');
      return;
    }
    await refreshData();
    toast(about.newMemberCreated, 'success');
  }

  async function removeMember(id: number) {
    const ok = await requestConfirm({
      message: about.confirmDeleteMember,
      destructive: true,
      confirmLabel: dict.common.delete,
      cancelLabel: dict.common.cancel,
    });
    if (!ok) return;
    const res = await fetch(`/api/about/members/${id}`, { method: 'DELETE', credentials: 'include' });
    if (!res.ok) {
      toast(about.deleteFailed, 'warning');
      return;
    }
    await refreshData();
    toast(about.memberRemoved, 'success');
  }

  async function saveNarrative() {
    if (!narrativeDraft || narrativeDraft.id === 0) return;
    const titleHu = narrativeDraft.titleHu.trim();
    const titleEn = narrativeDraft.titleEn.trim();
    if (!titleHu || !titleEn) {
      toast(about.saveFailed, 'warning');
      return;
    }
    setNarrativeSaving(true);
    try {
      const res = await fetch(`/api/about/narratives/${narrativeDraft.id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titleHu,
          titleEn,
          bodyHu: narrativeDraft.bodyHu,
          bodyEn: narrativeDraft.bodyEn,
          sortOrder: narrativeDraft.sortOrder,
          status: normalizeWritableStatus(narrativeDraft.status),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        toast(data.error ?? about.saveFailed, 'warning');
        return;
      }
      await refreshData();
      toast(about.narrativeSaved, 'success');
      setNarrativeDraft(null);
    } finally {
      setNarrativeSaving(false);
    }
  }

  async function saveMember() {
    if (!memberDraft || memberDraft.id === 0) return;
    const name = memberDraft.name.trim();
    const roleHu = memberDraft.roleHu.trim();
    const roleEn = memberDraft.roleEn.trim();
    if (!name || !roleHu || !roleEn) {
      toast(about.saveFailed, 'warning');
      return;
    }
    setMemberSaving(true);
    try {
      const res = await fetch(`/api/about/members/${memberDraft.id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          roleHu,
          roleEn,
          bioHu: memberDraft.bioHu,
          bioEn: memberDraft.bioEn,
          groupHu: memberDraft.groupHu,
          groupEn: memberDraft.groupEn,
          imageUrl: memberDraft.imageUrl.trim(),
          publishedAt: memberDraft.publishedAt?.trim() ? memberDraft.publishedAt.trim() : null,
          isAlumni: memberDraft.isAlumni,
          sortOrder: memberDraft.sortOrder,
          status: normalizeWritableStatus(memberDraft.status),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        toast(data.error ?? about.saveFailed, 'warning');
        return;
      }
      await refreshData();
      toast(about.memberSaved, 'success');
      setMemberDraft(null);
    } finally {
      setMemberSaving(false);
    }
  }

  function statusLabel(s: (typeof WRITABLE)[number]) {
    if (s === 'draft') return about.statusDraft;
    if (s === 'scheduled') return about.statusScheduled;
    if (s === 'published') return about.statusPublished;
    return about.statusArchived;
  }

  function renderAvatar(m: AboutMemberDto) {
    if (m.imageUrl && /^https?:\/\//i.test(m.imageUrl)) {
      if (isRemoteImageHostOptimizable(m.imageUrl)) {
        return (
          <Image
            src={m.imageUrl}
            alt={m.name}
            width={62}
            height={62}
            className="about-avatar-img"
            sizes="62px"
            loading="lazy"
          />
        );
      }
      return (
        // eslint-disable-next-line @next/next/no-img-element -- host nincs a next.config remotePatterns listában
        <img src={m.imageUrl} alt={m.name} width={62} height={62} className="about-avatar-img" loading="lazy" />
      );
    }
    return <div className="about-avatar-placeholder" aria-hidden />;
  }

  const canEditRemote = (id: number) => isStaff && id > 0;

  return (
    <section className="section">
      <SectionHeader
        eyebrow={dict.nav.about}
        title={
          intro
            ? lang === 'hu'
              ? intro.titleHu
              : intro.titleEn
            : about.introTitleFallback
        }
        text={intro ? (lang === 'hu' ? intro.bodyHu : intro.bodyEn) : about.introTextFallback}
      />

      {isStaff ? (
        <ModuleAdminToolbar title={dict.common.moduleAdminToolbarTitle} ariaLabel={dict.common.moduleAdminToolbarAria}>
          <button type="button" className="btn btn-secondary" onClick={() => void addDemoMember()}>
            {about.demoMemberButton}
          </button>
          {intro && canEditRemote(intro.id) ? (
            <button type="button" className="btn btn-secondary" onClick={() => setNarrativeDraft({ ...intro })}>
              {about.editIntro}
            </button>
          ) : null}
        </ModuleAdminToolbar>
      ) : null}

      {loadStatus === 'loading' ? (
        <div role="status" aria-live="polite">
          <Skeleton variant="searchResults" />
        </div>
      ) : null}
      {loadStatus === 'error' ? (
        <ErrorState title={about.loadErrorTitle} message={about.loadErrorMessage} onRetry={() => void loadInitial()} retryLabel={about.retry} />
      ) : null}

      {loadStatus === 'ready' ? (
      <>
      <AdminModal
        open={!!narrativeDraft}
        title={about.narrativeModalTitle}
        closeLabel={dict.common.modalClose}
        onClose={() => setNarrativeDraft(null)}
      >
        {narrativeDraft ? (
          <div className="stack gap-3">
            <p className="text-sm opacity-85">
              <code className="text-xs">{narrativeDraft.blockKey}</code>
            </p>
            <label className="stack gap-1">
              <span className="text-sm">{about.labelTitleHu}</span>
              <input
                className="input"
                value={narrativeDraft.titleHu}
                onChange={(e) => setNarrativeDraft((p) => (p ? { ...p, titleHu: e.target.value } : p))}
              />
            </label>
            <label className="stack gap-1">
              <span className="text-sm">{about.labelTitleEn}</span>
              <input
                className="input"
                value={narrativeDraft.titleEn}
                onChange={(e) => setNarrativeDraft((p) => (p ? { ...p, titleEn: e.target.value } : p))}
              />
            </label>
            <label className="stack gap-1">
              <span className="text-sm">{about.labelBodyHu}</span>
              <textarea
                className="input"
                rows={5}
                value={narrativeDraft.bodyHu}
                onChange={(e) => setNarrativeDraft((p) => (p ? { ...p, bodyHu: e.target.value } : p))}
              />
            </label>
            <label className="stack gap-1">
              <span className="text-sm">{about.labelBodyEn}</span>
              <textarea
                className="input"
                rows={5}
                value={narrativeDraft.bodyEn}
                onChange={(e) => setNarrativeDraft((p) => (p ? { ...p, bodyEn: e.target.value } : p))}
              />
            </label>
            <label className="stack gap-1">
              <span className="text-sm">{about.labelSortOrder}</span>
              <input
                className="input"
                type="number"
                value={narrativeDraft.sortOrder}
                onChange={(e) =>
                  setNarrativeDraft((p) =>
                    p ? { ...p, sortOrder: Number.parseInt(e.target.value, 10) || 0 } : p,
                  )
                }
              />
            </label>
            <label className="stack gap-1">
              <span className="text-sm">{about.labelStatus}</span>
              <select
                className="input"
                value={normalizeWritableStatus(narrativeDraft.status)}
                onChange={(e) =>
                  setNarrativeDraft((p) =>
                    p ? { ...p, status: e.target.value as AboutContentStatus } : p,
                  )
                }
              >
                {WRITABLE.map((s) => (
                  <option key={s} value={s}>
                    {statusLabel(s)}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex gap-2 flex-wrap">
              <button
                type="button"
                className="btn btn-primary"
                disabled={narrativeSaving}
                onClick={() => void saveNarrative()}
              >
                {dict.common.save}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                disabled={narrativeSaving}
                onClick={() => setNarrativeDraft(null)}
              >
                {dict.common.cancel}
              </button>
            </div>
          </div>
        ) : null}
      </AdminModal>

      <AdminModal
        open={!!memberDraft}
        title={about.memberModalTitle}
        closeLabel={dict.common.modalClose}
        onClose={() => setMemberDraft(null)}
      >
        {memberDraft ? (
          <div className="stack gap-3">
            <label className="stack gap-1">
              <span className="text-sm">{about.labelName}</span>
              <input
                className="input"
                value={memberDraft.name}
                onChange={(e) => setMemberDraft((p) => (p ? { ...p, name: e.target.value } : p))}
              />
            </label>
            <label className="stack gap-1">
              <span className="text-sm">{about.labelRoleHu}</span>
              <input
                className="input"
                value={memberDraft.roleHu}
                onChange={(e) => setMemberDraft((p) => (p ? { ...p, roleHu: e.target.value } : p))}
              />
            </label>
            <label className="stack gap-1">
              <span className="text-sm">{about.labelRoleEn}</span>
              <input
                className="input"
                value={memberDraft.roleEn}
                onChange={(e) => setMemberDraft((p) => (p ? { ...p, roleEn: e.target.value } : p))}
              />
            </label>
            <label className="stack gap-1">
              <span className="text-sm">{about.labelBioHu}</span>
              <textarea
                className="input"
                rows={3}
                value={memberDraft.bioHu}
                onChange={(e) => setMemberDraft((p) => (p ? { ...p, bioHu: e.target.value } : p))}
              />
            </label>
            <label className="stack gap-1">
              <span className="text-sm">{about.labelBioEn}</span>
              <textarea
                className="input"
                rows={3}
                value={memberDraft.bioEn}
                onChange={(e) => setMemberDraft((p) => (p ? { ...p, bioEn: e.target.value } : p))}
              />
            </label>
            <label className="stack gap-1">
              <span className="text-sm">{about.labelGroupHu}</span>
              <input
                className="input"
                value={memberDraft.groupHu}
                onChange={(e) => setMemberDraft((p) => (p ? { ...p, groupHu: e.target.value } : p))}
              />
            </label>
            <label className="stack gap-1">
              <span className="text-sm">{about.labelGroupEn}</span>
              <input
                className="input"
                value={memberDraft.groupEn}
                onChange={(e) => setMemberDraft((p) => (p ? { ...p, groupEn: e.target.value } : p))}
              />
            </label>
            <label className="stack gap-1">
              <span className="text-sm">{about.labelImageUrl}</span>
              <input
                className="input"
                value={memberDraft.imageUrl}
                onChange={(e) => setMemberDraft((p) => (p ? { ...p, imageUrl: e.target.value } : p))}
              />
            </label>
            <label className="stack gap-1">
              <span className="text-sm">{about.labelPublishedAt}</span>
              <input
                className="input"
                type="date"
                value={memberDraft.publishedAt ?? ''}
                onChange={(e) =>
                  setMemberDraft((p) => (p ? { ...p, publishedAt: e.target.value ? e.target.value : null } : p))
                }
              />
            </label>
            <label className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={memberDraft.isAlumni}
                onChange={(e) => setMemberDraft((p) => (p ? { ...p, isAlumni: e.target.checked } : p))}
              />
              <span className="text-sm">{about.labelAlumni}</span>
            </label>
            <label className="stack gap-1">
              <span className="text-sm">{about.labelSortOrder}</span>
              <input
                className="input"
                type="number"
                value={memberDraft.sortOrder}
                onChange={(e) =>
                  setMemberDraft((p) => (p ? { ...p, sortOrder: Number.parseInt(e.target.value, 10) || 0 } : p))
                }
              />
            </label>
            <label className="stack gap-1">
              <span className="text-sm">{about.labelStatus}</span>
              <select
                className="input"
                value={normalizeWritableStatus(memberDraft.status)}
                onChange={(e) =>
                  setMemberDraft((p) => (p ? { ...p, status: e.target.value as AboutContentStatus } : p))
                }
              >
                {WRITABLE.map((s) => (
                  <option key={s} value={s}>
                    {statusLabel(s)}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex gap-2 flex-wrap">
              <button
                type="button"
                className="btn btn-primary"
                disabled={memberSaving}
                onClick={() => void saveMember()}
              >
                {dict.common.save}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                disabled={memberSaving}
                onClick={() => setMemberDraft(null)}
              >
                {dict.common.cancel}
              </button>
            </div>
          </div>
        ) : null}
      </AdminModal>

      {narrativeCards.length > 0 ? (
        <div className="grid-2 about-narratives-grid">
          {narrativeCards.map((n) => (
            <Card key={n.id} strong>
              <div className="flex gap-2 items-start justify-between">
                <h3 className="about-narrative-title">{lang === 'hu' ? n.titleHu : n.titleEn}</h3>
                {canEditRemote(n.id) ? (
                  <button type="button" className="btn btn-secondary shrink-0" onClick={() => setNarrativeDraft({ ...n })}>
                    {about.editNarrative}
                  </button>
                ) : null}
              </div>
              <p className="about-narrative-body">{lang === 'hu' ? n.bodyHu : n.bodyEn}</p>
            </Card>
          ))}
        </div>
      ) : null}

      {timelineNarratives.length > 0 ? (
        <div className="about-group-block">
          <h3 className="about-group-title">{about.timelineHeading}</h3>
          <div className="stack">
            {timelineNarratives.map((n) => (
              <Card key={`timeline-${n.id}`}>
                <h4 className="about-narrative-title">{lang === 'hu' ? n.titleHu : n.titleEn}</h4>
                <p className="about-narrative-body">{lang === 'hu' ? n.bodyHu : n.bodyEn}</p>
              </Card>
            ))}
          </div>
        </div>
      ) : null}

      <div className="about-members-toolbar">
        <h2 className="about-members-heading">{about.rolesHeading}</h2>
      </div>

      {activeMemberGroups.map(([groupLabel, list]) => (
        <div key={groupLabel} className="about-group-block">
          <h3 className="about-group-title">{groupLabel}</h3>
          <div className="grid-3">
            {list.map((m) => (
              <Card key={m.id} strong>
                {renderAvatar(m)}
                <h3 className="about-member-name">{m.name}</h3>
                <p className="about-member-role">{lang === 'hu' ? m.roleHu : m.roleEn}</p>
                {m.publishedAt ? (
                  <p className="about-member-published text-sm opacity-80">
                    <time dateTime={m.publishedAt}>{m.publishedAt}</time>
                  </p>
                ) : null}
                {(lang === 'hu' ? m.bioHu : m.bioEn).trim() ? (
                  <p className="about-member-bio">{lang === 'hu' ? m.bioHu : m.bioEn}</p>
                ) : null}
                {isStaff ? (
                  <div className="about-member-admin flex gap-2 flex-wrap">
                    {canEditRemote(m.id) ? (
                      <button type="button" className="btn btn-secondary" onClick={() => setMemberDraft({ ...m })}>
                        {about.editMember}
                      </button>
                    ) : null}
                    {canEditRemote(m.id) ? (
                      <button type="button" className="btn btn-secondary" onClick={() => void removeMember(m.id)}>
                        {dict.common.delete}
                      </button>
                    ) : null}
                  </div>
                ) : null}
              </Card>
            ))}
          </div>
        </div>
      ))}

      {alumniMemberGroups.length > 0 ? (
        <div className="about-group-block">
          <h3 className="about-group-title">{about.alumniHeading}</h3>
          {alumniMemberGroups.map(([groupLabel, list]) => (
            <div key={`alumni-${groupLabel}`} className="about-group-block">
              <h4 className="about-group-title">{groupLabel}</h4>
              <div className="grid-3">
                {list.map((m) => (
                  <Card key={`alumni-member-${m.id}`} strong>
                    {renderAvatar(m)}
                    <h3 className="about-member-name">{m.name}</h3>
                    <p className="about-member-role">{lang === 'hu' ? m.roleHu : m.roleEn}</p>
                    {m.publishedAt ? (
                      <p className="about-member-published text-sm opacity-80">
                        <time dateTime={m.publishedAt}>{m.publishedAt}</time>
                      </p>
                    ) : null}
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}
      {members.length === 0 ? <EmptyState title={about.noMembersTitle} description={about.noMembersDesc} /> : null}
      </>
      ) : null}
    </section>
  );
}
