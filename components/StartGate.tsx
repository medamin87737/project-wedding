"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const START_IMAGE = "/images/start.png";
const FADE_DURATION_MS = 2400;

type Phase = "start" | "fading" | "done";

export default function StartGate({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>("start");

  const handleStart = useCallback(() => {
    if (phase !== "start") return;
    setPhase("fading");
    setTimeout(() => setPhase("done"), FADE_DURATION_MS);
  }, [phase]);

  useEffect(() => {
    if (phase !== "done") {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
    document.body.style.overflow = "";
  }, [phase]);

  return (
    <>
      {children}

      {phase !== "done" && (
        <div
          className={`start-overlay ${phase === "fading" ? "start-overlay--out" : ""}`}
        >
          <button
            type="button"
            className="start-overlay__btn"
            onClick={handleStart}
            disabled={phase === "fading"}
            aria-label="Cliquez ici pour commencer l'invitation"
          >
            <div className="start-overlay__image-wrap">
              <Image
                src={START_IMAGE}
                alt="Bismillah — Hamza & Yosser"
                fill
                className="start-overlay__image object-cover object-center"
                priority
                sizes="100vw"
              />
            </div>

            {phase === "start" && (
              <div className="start-overlay__hint" aria-hidden="true">
                <span className="start-overlay__hint-text">Cliquez ici</span>
                <span className="start-overlay__hint-sep" />
                <span className="start-overlay__hint-ar" dir="rtl">
                  اضغط هنا
                </span>
              </div>
            )}
          </button>
        </div>
      )}
    </>
  );
}
