"use client";

import { useEffect, useState } from "react";
import {
  WEDDING_DATE,
  WEDDING_VENUE,
  WEDDING_ADDRESS_FR,
  WEDDING_ADDRESS_AR,
  WEDDING_CITY,
  WEDDING_DATE_FR,
  WEDDING_DATE_AR,
  COUPLE_NAMES_FR,
  COUPLE_NAMES_AR,
  GROOM_FATHER_AR,
  BRIDE_FATHER_AR,
} from "@/lib/supabase";
import { ScriptFlourish, LocationPin } from "./DecorativeAssets";
import ZenSection from "./ZenSection";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const LABELS = ["Days", "Hours", "Minutes", "Seconds"];

function calculateTimeLeft(target: Date): TimeLeft | null {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const targetDate = new Date(WEDDING_DATE);
    setMounted(true);
    setTimeLeft(calculateTimeLeft(targetDate));

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <ZenSection className="flex min-h-[40vh] items-center justify-center">
        <div className="zen-panel h-48 w-full max-w-sm animate-pulse" />
      </ZenSection>
    );
  }

  if (!timeLeft) {
    return (
      <ZenSection panel className="text-center">
        <h2 className="font-script text-4xl text-gold-dark">Vive les mariés</h2>
        <p className="mt-2 font-arabic text-2xl text-text-wine" dir="rtl">
          عاشوا العروسين
        </p>
      </ZenSection>
    );
  }

  const values = [
    timeLeft.days,
    timeLeft.hours,
    timeLeft.minutes,
    timeLeft.seconds,
  ];

  return (
    <ZenSection fullHeight className="text-center">
      <div className="zen-panel mx-auto max-w-sm py-10">
        <h2 className="font-script text-4xl text-gold-dark md:text-5xl">
          La Célébration Commence
        </h2>

        <p className="mt-3 font-script text-2xl text-gold-dark md:text-3xl">
          {COUPLE_NAMES_FR}
        </p>
        <p className="mt-1 font-arabic text-xl text-gold/85" dir="rtl">
          {COUPLE_NAMES_AR}
        </p>
        <p className="mt-2 font-arabic text-sm text-gold/70" dir="rtl">
          {GROOM_FATHER_AR} · {BRIDE_FATHER_AR}
        </p>

        <ScriptFlourish className="my-5" />

        <div className="flex items-baseline justify-center gap-1 font-sans text-4xl font-light tabular-nums tracking-wider text-gold md:text-5xl">
          {values.map((value, index) => (
            <span key={LABELS[index]} className="flex items-baseline">
              {index > 0 && (
                <span className="mx-1 text-2xl text-gold/60">:</span>
              )}
              <span>{String(value).padStart(2, "0")}</span>
            </span>
          ))}
        </div>

        <div className="mt-3 flex justify-center gap-6 font-display text-xs uppercase tracking-[0.2em] text-gold/70 md:gap-10">
          {LABELS.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>

        <h3 className="mt-12 font-script text-3xl text-gold-dark md:text-4xl">
          Date & Lieu
        </h3>

        <ScriptFlourish className="my-5" />

        <p className="font-display text-lg font-semibold text-gold-dark">
          {WEDDING_DATE_FR}
        </p>
        <p className="mt-1 font-arabic text-base text-gold/80" dir="rtl">
          {WEDDING_DATE_AR}
        </p>

        <LocationPin />

        <p className="mt-4 font-display text-xl font-semibold text-gold-dark">
          {WEDDING_VENUE}
        </p>
        <p className="mt-2 font-display text-sm text-beige-warm">
          {WEDDING_ADDRESS_FR}
        </p>
        <p className="mt-1 font-arabic text-sm text-gold/75" dir="rtl">
          {WEDDING_ADDRESS_AR}
        </p>
        <p className="mt-2 font-display text-base text-gold/65">
          {WEDDING_CITY}
        </p>
      </div>
    </ZenSection>
  );
}
