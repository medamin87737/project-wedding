import { ScriptFlourish } from "./DecorativeAssets";
import ZenSection from "./ZenSection";

const DRESS_COLORS = [
  "#B8D4E8",
  "#C4B8A8",
  "#F5D0D8",
  "#D4A0A8",
  "#A8B8D4",
  "#D8C8E8",
  "#C8A8D8",
  "#E8D0C0",
  "#C5A059",
];

export default function DressCodeSection() {
  return (
    <ZenSection fullHeight className="text-center">
      <div className="zen-panel mx-auto max-w-sm py-10">
        <h2 className="font-script text-4xl text-gold-dark md:text-5xl">
          Dress Code
        </h2>

        <ScriptFlourish className="my-6" />

        <p className="mx-auto max-w-xs font-display text-base leading-relaxed text-gold-dark/85">
          Tenue formelle élégante. Nous vous encourageons les tons pastels doux
          et les nuances raffinées. Le costume traditionnel tunisien est le
          bienvenu.
        </p>

        <p
          className="mx-auto mt-4 max-w-xs font-arabic text-sm leading-relaxed text-gold-dark/65"
          dir="rtl"
        >
          لباس رسمي أنيق. نرحب بالألوان الهادئة واللباس التقليدي التونسي
        </p>

        <div className="mx-auto mt-8 flex max-w-xs flex-wrap justify-center gap-3">
          {DRESS_COLORS.map((color) => (
            <div
              key={color}
              className="h-9 w-9 rounded-full border border-white/40 shadow-sm"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <h3 className="mt-12 font-script text-3xl text-gold-dark md:text-4xl">
          Confirmez Votre Présence
        </h3>

        <ScriptFlourish className="my-4" />

        <p className="font-display text-sm italic text-gold-dark/65">
          Pour nous aider à préparer une célébration joyeuse,
          <br />
          merci de confirmer votre présence.
        </p>
      </div>
    </ZenSection>
  );
}
