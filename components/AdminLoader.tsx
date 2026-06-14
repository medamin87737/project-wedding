"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { COUPLE_NAMES_FR, COUPLE_NAMES_AR } from "@/lib/supabase";
import "@/lib/fontawesome";

const MUSIC_SRC = "/video/musiquee.mp3";
const LOADER_BG = "/ornaments/f540142b-7954-4e65-bba5-f0a18e50739f.jpg";
const MIN_LOADER_MS = 1600;
const FADE_MS = 1100;

type Phase = "loading" | "fading" | "done";

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

function preloadAudio(el: HTMLAudioElement): Promise<void> {
  return new Promise((resolve) => {
    const done = () => resolve();
    el.addEventListener("canplaythrough", done, { once: true });
    el.addEventListener("loadeddata", done, { once: true });
    el.addEventListener("error", done, { once: true });
    el.load();
  });
}

export default function AdminLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [phase, setPhase] = useState<Phase>("loading");
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const startMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !audio.paused) return;
    audio.play().catch(() => {});
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadAssets() {
      const audio = audioRef.current;
      const tasks = [
        preloadImage(LOADER_BG),
        audio ? preloadAudio(audio) : Promise.resolve(),
        new Promise<void>((r) => setTimeout(r, MIN_LOADER_MS)),
      ];

      let completed = 0;
      const total = tasks.length;

      await Promise.all(
        tasks.map((task) =>
          task.then(() => {
            if (!cancelled) {
              completed += 1;
              setProgress(Math.round((completed / total) * 100));
            }
          })
        )
      );

      if (cancelled) return;

      setProgress(100);
      setPhase("fading");

      setTimeout(() => {
        if (cancelled) return;
        setPhase("done");
        startMusic();
      }, FADE_MS);
    }

    loadAssets();

    return () => {
      cancelled = true;
    };
  }, [startMusic]);

  useEffect(() => {
    if (phase !== "done") return;

    const resumeOnInteraction = () => startMusic();
    document.addEventListener("click", resumeOnInteraction, { once: true });
    document.addEventListener("touchstart", resumeOnInteraction, { once: true });

    return () => {
      document.removeEventListener("click", resumeOnInteraction);
      document.removeEventListener("touchstart", resumeOnInteraction);
    };
  }, [phase, startMusic]);

  return (
    <>
      <audio
        ref={audioRef}
        src={MUSIC_SRC}
        loop
        preload="auto"
        aria-label="Musique de fond"
      />

      {children}

      {phase !== "done" && (
        <div
          className={`invitation-loader ${phase === "fading" ? "invitation-loader--out" : ""}`}
          aria-live="polite"
          aria-busy={phase === "loading"}
        >
          <div className="invitation-loader__bg" aria-hidden="true" />
          <div className="invitation-loader__overlay" aria-hidden="true" />

          <div className="invitation-loader__inner">
            <p className="invitation-loader__title font-display text-2xl tracking-wide">
              Dashboard Admin
            </p>
            <p className="invitation-loader__ar font-script text-xl">
              {COUPLE_NAMES_FR}
            </p>
            <p className="mt-1 font-arabic text-base text-gold-light/90" dir="rtl">
              {COUPLE_NAMES_AR}
            </p>

            <div className="invitation-loader__ring" aria-hidden="true">
              <span />
            </div>

            <div className="invitation-loader__bar">
              <div
                className="invitation-loader__bar-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="invitation-loader__label">Chargement...</p>
          </div>
        </div>
      )}
    </>
  );
}
