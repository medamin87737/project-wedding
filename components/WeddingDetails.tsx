import { ScriptFlourish } from "./DecorativeAssets";
import ZenSection from "./ZenSection";

const EVENTS = [
  { time: "16:00", label: "Accueil des invités", labelAr: "استقبال الضيوف" },
  { time: "17:00", label: "Cérémonie de mariage", labelAr: "مراسم الزواج" },
  { time: "18:00", label: "Cocktail & Photos", labelAr: "كوكتيل و صور" },
  { time: "20:00", label: "Dîner", labelAr: "مأدبة العشاء" },
  { time: "22:00", label: "Soirée dansante", labelAr: "السهرة" },
];

export default function WeddingDetails() {
  return (
    <ZenSection fullHeight className="text-center">
      <h2 className="mb-6 font-script text-4xl text-gold-dark md:text-5xl">
        Schedule of Events
      </h2>

      <ScriptFlourish className="mb-8" />

      <div className="zen-panel zen-arch relative mx-auto max-w-sm px-4 py-10">
        <div className="timeline-line" />

        <div className="space-y-8">
          {EVENTS.map((event) => (
            <div key={event.time} className="relative flex items-center">
              <div className="w-[42%] pr-3 text-right">
                <span className="font-display text-base font-medium text-gold-dark">
                  {event.time}
                </span>
              </div>

              <div className="relative z-10 flex w-[16%] justify-center">
                <div className="timeline-diamond" />
              </div>

              <div className="w-[42%] pl-3 text-left">
                <p className="font-display text-sm text-gold-dark">
                  {event.label}
                </p>
                <p className="font-arabic text-xs text-gold-dark/60" dir="rtl">
                  {event.labelAr}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ZenSection>
  );
}
