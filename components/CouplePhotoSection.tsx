import Image from "next/image";
import {
  COUPLE_NAMES_FR,
  COUPLE_NAMES_AR,
  WEDDING_DATE_FR,
} from "@/lib/supabase";
import { ScriptFlourish } from "./DecorativeAssets";
import ScrollSection from "./ScrollSection";

const COUPLE_PHOTO = "/ornaments/f540142b-7954-4e65-bba5-f0a18e50739f.jpg";

export default function CouplePhotoSection() {
  return (
    <ScrollSection className="couple-photo-section zen-image-page" fullHeight>
      <div className="couple-photo-section__image">
        <Image
          src={COUPLE_PHOTO}
          alt="Hamza et Yosser — les mariés"
          fill
          className="object-cover object-[center_20%]"
          sizes="100vw"
        />
      </div>

      <div className="couple-photo-section__veil" aria-hidden="true" />

      <div className="couple-photo-section__content">
        <div className="couple-photo-section__panel">
          <ScriptFlourish className="mb-4" />

          <p className="font-script text-4xl text-gold-dark md:text-5xl">
            {COUPLE_NAMES_FR}
          </p>
          <p className="mt-1 font-arabic text-2xl text-gold-dark/80" dir="rtl">
            {COUPLE_NAMES_AR}
          </p>

          <ScriptFlourish className="my-5" />

          <p className="font-display text-sm leading-relaxed text-gold-dark/80">
            Merci de partager ce jour précieux avec nous.
            <br />
            Votre présence illuminera notre union.
          </p>
          <p
            className="mt-3 font-arabic text-sm leading-relaxed text-gold-dark/65"
            dir="rtl"
          >
            شكراً لكونكم جزءاً من فرحتنا
            <br />
            حضوركم يزين يومنا
          </p>

          <p className="mt-6 font-display text-xs tracking-[0.22em] text-gold-dark/45">
            {WEDDING_DATE_FR}
          </p>
        </div>
      </div>
    </ScrollSection>
  );
}
