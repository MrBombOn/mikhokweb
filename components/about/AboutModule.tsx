/**
 * @file About Us – narratív blokkok + tagok csoportosítva (§15)
 *
 * @description
 * Adat: **GET /api/about** (`narratives`, `members`). Admin: **POST /api/about/members**, **DELETE /api/about/members/[id]**;
 * szöveges blokkok: **PATCH /api/about/narratives/[id]** (később Office UI).
 */
'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { Card, SectionHeader } from '@/components/ui/Core';
import { aboutPeople } from '@/lib/content';
import { canUseDemoFallback } from '@/lib/services/content-fetch-policy';
import type { AboutMemberDto, AboutNarrativeDto } from '@/types/about';

function fallbackBundle(): { narratives: AboutNarrativeDto[]; members: AboutMemberDto[] } {
  return {
    narratives: [
      {
        id: 0,
        blockKey: 'intro',
        titleHu: 'Részletesebb HÖK bemutatkozó oldal',
        titleEn: 'A richer HÖK introduction page',
        bodyHu: 'Statikus fallback – az API nem elérhető.',
        bodyEn: 'Static fallback – API unavailable.',
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
  const { lang, toast, isAdmin } = useApp();
  const [narratives, setNarratives] = useState<AboutNarrativeDto[]>([]);
  const [members, setMembers] = useState<AboutMemberDto[]>([]);

  const reload = useCallback(async () => {
    const data = await fetchAbout();
    if (data) {
      setNarratives(data.narratives);
      setMembers(data.members);
    } else {
      if (canUseDemoFallback()) {
        const fb = fallbackBundle();
        setNarratives(fb.narratives);
        setMembers(fb.members);
      } else {
        setNarratives([]);
        setMembers([]);
      }
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload, isAdmin]);

  const intro = useMemo(() => narratives.find((n) => n.blockKey === 'intro'), [narratives]);
  const narrativeCards = useMemo(
    () => narratives.filter((n) => n.blockKey !== 'intro').sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id),
    [narratives],
  );

  const memberGroups = useMemo(() => {
    const map = new Map<string, AboutMemberDto[]>();
    for (const m of members) {
      const label = (lang === 'hu' ? m.groupHu : m.groupEn).trim() || (lang === 'hu' ? 'Tagok' : 'Members');
      if (!map.has(label)) map.set(label, []);
      map.get(label)!.push(m);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b, lang === 'hu' ? 'hu' : 'en'));
  }, [members, lang]);

  async function addDemoMember() {
    const res = await fetch('/api/about/members', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: lang === 'hu' ? 'Új tag (demó)' : 'New member (demo)',
        roleHu: 'Demó szerepkör – szerkeszthető PATCH-csel.',
        roleEn: 'Demo role – editable via PATCH.',
        bioHu: 'Rövid bemutatkozás.',
        bioEn: 'Short bio.',
        groupHu: 'Demó csoport',
        groupEn: 'Demo group',
        sortOrder: members.length,
        status: 'published',
      }),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      toast(data.error ?? (lang === 'hu' ? 'Mentés sikertelen.' : 'Save failed.'), 'warning');
      return;
    }
    await reload();
    toast(lang === 'hu' ? 'Új tag létrehozva.' : 'New member created.', 'success');
  }

  async function removeMember(id: number) {
    if (!window.confirm(lang === 'hu' ? 'Biztosan töröljük ezt a tagot?' : 'Delete this member?')) return;
    const res = await fetch(`/api/about/members/${id}`, { method: 'DELETE', credentials: 'include' });
    if (!res.ok) {
      toast(lang === 'hu' ? 'Törlés sikertelen.' : 'Delete failed.', 'warning');
      return;
    }
    await reload();
    toast(lang === 'hu' ? 'Tag törölve.' : 'Member removed.', 'success');
  }

  function renderAvatar(m: AboutMemberDto) {
    if (m.imageUrl && /^https?:\/\//i.test(m.imageUrl)) {
      return (
        // eslint-disable-next-line @next/next/no-img-element -- külső URL
        <img
          src={m.imageUrl}
          alt={m.name}
          width={62}
          height={62}
          style={{ borderRadius: 999, objectFit: 'cover', marginBottom: 14, display: 'block' }}
        />
      );
    }
    return (
      <div
        style={{ width: 62, height: 62, borderRadius: 999, background: 'var(--accent)', marginBottom: 14 }}
        aria-hidden
      />
    );
  }

  return (
    <section className="section">
      <SectionHeader
        eyebrow="About Us"
        title={
          intro
            ? lang === 'hu'
              ? intro.titleHu
              : intro.titleEn
            : lang === 'hu'
              ? 'A HÖK bemutatkozása'
              : 'About the union'
        }
        text={
          intro
            ? lang === 'hu'
              ? intro.bodyHu
              : intro.bodyEn
            : lang === 'hu'
              ? 'Szervezeti információk és tagok.'
              : 'Organizational information and members.'
        }
      />

      {narrativeCards.length > 0 ? (
        <div className="grid-2" style={{ marginBottom: 28 }}>
          {narrativeCards.map((n) => (
            <Card key={n.id} strong>
              <h3 style={{ marginTop: 0 }}>{lang === 'hu' ? n.titleHu : n.titleEn}</h3>
              <p style={{ color: 'var(--muted)', margin: 0, whiteSpace: 'pre-wrap' }}>
                {lang === 'hu' ? n.bodyHu : n.bodyEn}
              </p>
            </Card>
          ))}
        </div>
      ) : null}

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <h2 style={{ margin: 0, fontSize: '1.15rem' }}>{lang === 'hu' ? 'Szerepkörök és tagok' : 'Roles and members'}</h2>
        {isAdmin ? (
          <button type="button" className="btn btn-secondary" onClick={() => void addDemoMember()}>
            {lang === 'hu' ? '+ Demó tag' : '+ Demo member'}
          </button>
        ) : null}
      </div>

      {memberGroups.map(([groupLabel, list]) => (
        <div key={groupLabel} style={{ marginBottom: 28 }}>
          <h3 style={{ fontSize: '1rem', color: 'var(--muted)', margin: '0 0 12px 0' }}>{groupLabel}</h3>
          <div className="grid-3">
            {list.map((m) => (
              <Card key={m.id} strong>
                {renderAvatar(m)}
                <h3 style={{ margin: '0 0 6px 0' }}>{m.name}</h3>
                <p style={{ color: 'var(--muted)', margin: '0 0 8px 0' }}>{lang === 'hu' ? m.roleHu : m.roleEn}</p>
                {(lang === 'hu' ? m.bioHu : m.bioEn).trim() ? (
                  <p style={{ fontSize: 14, color: 'var(--muted)', margin: 0, whiteSpace: 'pre-wrap' }}>
                    {lang === 'hu' ? m.bioHu : m.bioEn}
                  </p>
                ) : null}
                {isAdmin ? (
                  <div style={{ marginTop: 12 }}>
                    <button type="button" className="btn btn-ghost" onClick={() => void removeMember(m.id)}>
                      {lang === 'hu' ? 'Törlés' : 'Delete'}
                    </button>
                  </div>
                ) : null}
              </Card>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
