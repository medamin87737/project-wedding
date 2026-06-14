"use client";

import dynamic from "next/dynamic";
import {
  COUPLE_NAMES_FR,
  COUPLE_NAMES_AR,
  WEDDING_DATE_FR,
} from "@/lib/supabase";
import InvitationShell from "@/components/InvitationShell";
import InvitationLoader from "@/components/InvitationLoader";
import StartGate from "@/components/StartGate";
import HeroSection from "@/components/HeroSection";
import ArabicArchSection from "@/components/ArabicArchSection";
import CountdownTimer from "@/components/CountdownTimer";
import RSVPForm from "@/components/RSVPForm";
import CouplePhotoSection from "@/components/CouplePhotoSection";
import ScrollSection from "@/components/ScrollSection";

const MapSection = dynamic(() => import("@/components/MapSection"), {
  ssr: false,
  loading: () => (
    <div className="zen-section flex min-h-[50vh] items-center justify-center">
      <div className="h-64 w-full max-w-xs animate-pulse rounded-sm bg-zen-glass" />
    </div>
  ),
});

export default function Home() {
  return (
    <InvitationShell>
      <InvitationLoader>
        <StartGate>
        <main className="invitation-scroll">
            <HeroSection />
            <ArabicArchSection />
            <CountdownTimer />
            <RSVPForm />
            <MapSection />
            <CouplePhotoSection />

            <ScrollSection className="zen-footer" fullHeight={false}>
              <footer className="zen-section__inner pb-12 pt-8 text-center">
                <div className="zen-panel mx-auto max-w-xs py-8">
                  <p className="font-script text-3xl text-gold-dark">{COUPLE_NAMES_FR}</p>
                  <p className="mt-1 font-arabic text-lg text-gold/75" dir="rtl">
                    {COUPLE_NAMES_AR}
                  </p>
                  <p className="mt-4 font-display text-xs tracking-widest text-gold/60">
                    {WEDDING_DATE_FR} — Avec amour
                  </p>
                </div>
              </footer>
            </ScrollSection>
        </main>
        </StartGate>
      </InvitationLoader>
    </InvitationShell>
  );
}
