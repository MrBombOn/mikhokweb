'use client';
import { LandingHero } from '@/components/landing/LandingHero';
import { LandingNews } from '@/components/landing/LandingNews';
import { PageShell } from '@/components/ui/Core';
export default function HomePage() {
  return <PageShell><LandingHero /><LandingNews /></PageShell>;
}