"use client";

import { useState, FormEvent } from "react";
import {
  supabase,
  MAX_PLACES,
  WEDDING_CAPACITY,
  isSupabaseConfigured,
} from "@/lib/supabase";

import ZenSection from "./ZenSection";

const RSVP_SESSION_KEY = "rsvp_submitted";

function Confetti() {
  const colors = ["#C5A059", "#F5E6E8", "#E8C4B8", "#D4AF37", "#F9DED3"];
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}%`,
            backgroundColor: colors[i % colors.length],
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
            borderRadius: i % 2 === 0 ? "50%" : "0",
          }}
        />
      ))}
    </div>
  );
}

export default function RSVPForm() {
  const [nom, setNom] = useState("");
  const [nombrePlaces, setNombrePlaces] = useState(1);
  const [present, setPresent] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!nom.trim()) {
      setError("Le nom est requis");
      return;
    }

    if (present === null) {
      setError("Veuillez indiquer si vous serez présent(e)");
      return;
    }

    if (typeof window !== "undefined" && localStorage.getItem(RSVP_SESSION_KEY)) {
      setError("Vous avez déjà confirmé votre présence");
      return;
    }

    if (!isSupabaseConfigured) {
      setError("Supabase non configuré — ajoutez vos clés dans .env.local");
      return;
    }

    setLoading(true);

    try {
      if (present) {
        const { data: stats } = await supabase
          .from("rsvp_stats")
          .select("places_confirmees")
          .single();

        const currentPlaces = stats?.places_confirmees ?? 0;
        if (currentPlaces + nombrePlaces > WEDDING_CAPACITY) {
          throw new Error("Désolé, la capacité maximale est atteinte.");
        }
      }

      const nameParts = nom.trim().split(" ");
      const prenom = nameParts[0] ?? nom.trim();
      const familyName = nameParts.slice(1).join(" ") || prenom;

      const { error: insertError } = await supabase.from("rsvp").insert({
        prenom,
        nom: familyName,
        telephone: null,
        nombre_places: present ? nombrePlaces : 1,
        confirme: present,
        message: null,
      });

      if (insertError) throw insertError;

      localStorage.setItem(RSVP_SESSION_KEY, "true");
      setSuccess(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Une erreur est survenue";
      if (
        message.includes("Failed to fetch") ||
        message.includes("NetworkError") ||
        message.includes("ERR_NAME_NOT_RESOLVED")
      ) {
        setError(
          "Connexion Supabase impossible. Vérifiez NEXT_PUBLIC_SUPABASE_URL dans .env.local (Project URL du dashboard)."
        );
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <ZenSection className="text-center">
        {showConfetti && <Confetti />}
        <div className="zen-panel mx-auto max-w-sm py-10">
          <div className="text-4xl">💍</div>
          <p
            className="mt-6 font-arabic text-2xl leading-relaxed text-gold-dark"
            dir="rtl"
          >
            شكراً على تأكيد حضوركم، في انتظاركم بفرحة كبيرة
          </p>
          <p className="mt-4 font-display text-lg italic text-gold-dark/70">
            Merci pour votre confirmation !
          </p>
        </div>
      </ZenSection>
    );
  }

  return (
    <ZenSection fullHeight className="pb-14">
      <form
        onSubmit={handleSubmit}
        className="zen-panel mx-auto max-w-xs space-y-5 p-6"
      >
        <div>
          <label
            htmlFor="nom"
            className="mb-2 block font-display text-sm text-gold-dark"
          >
            Nom
          </label>
          <input
            id="nom"
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="form-input-light"
            placeholder="Votre nom complet"
            required
            maxLength={200}
          />
        </div>

        <div>
          <label
            htmlFor="nombre_places"
            className="mb-2 block font-display text-sm text-gold-dark"
          >
            Nombre de personnes
          </label>
          <input
            id="nombre_places"
            type="number"
            min={1}
            max={MAX_PLACES}
            value={nombrePlaces}
            onChange={(e) => setNombrePlaces(Number(e.target.value))}
            className="form-input-light"
            disabled={present === false}
          />
        </div>

        <div>
          <p className="mb-3 font-script text-2xl text-gold-dark">
            Serez-vous présent ?
          </p>
          <div className="space-y-3">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="radio"
                name="present"
                checked={present === true}
                onChange={() => setPresent(true)}
                className="h-4 w-4 accent-olive"
              />
              <span className="font-display text-sm text-gold-dark">
                Oui, je serai présent(e)
              </span>
            </label>
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="radio"
                name="present"
                checked={present === false}
                onChange={() => setPresent(false)}
                className="h-4 w-4 accent-olive"
              />
              <span className="font-display text-sm text-gold-dark">
                Désolé(e), je ne serai pas présent(e)
              </span>
            </label>
          </div>
        </div>

        {error && (
          <p className="rounded-md border border-text-wine/30 bg-peach/50 px-4 py-3 text-sm text-text-wine">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="zen-btn w-full"
        >
          {loading ? "..." : "Soumettre"}
        </button>
      </form>
    </ZenSection>
  );
}
