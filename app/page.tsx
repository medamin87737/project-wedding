"use client";

import dynamic from "next/dynamic";
import InvitationShell from "@/components/InvitationShell";
import InvitationLoader from "@/components/InvitationLoader";
import StartGate from "@/components/StartGate";
import HeroSection from "@/components/HeroSection";
import ArabicArchSection from "@/components/ArabicArchSection";
import CountdownTimer from "@/components/CountdownTimer";
import CouplePhotoSection from "@/components/CouplePhotoSection";

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
            <MapSection />
            <CouplePhotoSection />
        </main>
        </StartGate>
      </InvitationLoader>
    </InvitationShell>
  );
}
