export function ScriptFlourish({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 16"
      className={`mx-auto h-4 w-40 text-gold/60 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.6"
      aria-hidden="true"
    >
      <line x1="0" y1="8" x2="75" y2="8" />
      <line x1="125" y1="8" x2="200" y2="8" />
      <path d="M88 8 Q100 2 112 8 Q100 14 88 8" fill="currentColor" stroke="none" />
      <circle cx="100" cy="8" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function WaxSeal({ size = 140 }: { size?: number }) {
  return (
    <div
      className="wax-seal relative flex items-center justify-center rounded-full"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" className="h-[70%] w-[70%]" aria-hidden="true">
        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        <text
          x="50"
          y="42"
          textAnchor="middle"
          fill="rgba(255,255,255,0.5)"
          fontSize="6"
          fontFamily="serif"
        >
          ✦
        </text>
        <text
          x="50"
          y="56"
          textAnchor="middle"
          fill="rgba(60,40,20,0.7)"
          fontSize="11"
          fontFamily="var(--font-amiri), serif"
          direction="rtl"
        >
          بسم الله
        </text>
        <text
          x="50"
          y="68"
          textAnchor="middle"
          fill="rgba(60,40,20,0.6)"
          fontSize="8"
          fontFamily="var(--font-amiri), serif"
          direction="rtl"
        >
          الرحمن الرحيم
        </text>
      </svg>
    </div>
  );
}

export function Chandelier() {
  return (
    <svg
      viewBox="0 0 200 120"
      className="chandelier-glow mx-auto h-28 w-48 text-gold md:h-36 md:w-56"
      fill="currentColor"
      aria-hidden="true"
    >
      <ellipse cx="100" cy="8" rx="30" ry="6" opacity="0.3" />
      <path d="M100 8 L100 20" stroke="currentColor" strokeWidth="2" fill="none" />
      <ellipse cx="100" cy="22" rx="50" ry="8" />
      <path d="M55 22 Q55 50 45 70 M145 22 Q145 50 155 70" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.7" />
      {[60, 75, 90, 100, 110, 125, 140].map((x, i) => (
        <ellipse key={i} cx={x} cy={30 + (i % 3) * 8} rx="4" ry="6" opacity="0.8" />
      ))}
      <ellipse cx="100" cy="45" rx="60" ry="10" opacity="0.5" />
      {[50, 65, 80, 100, 120, 135, 150].map((x, i) => (
        <circle key={i} cx={x} cy={55 + (i % 2) * 12} r="3" opacity="0.9" />
      ))}
      <ellipse cx="100" cy="75" rx="45" ry="8" opacity="0.4" />
    </svg>
  );
}

export function Curtains() {
  return (
    <>
      <div className="pointer-events-none absolute left-0 top-0 h-48 w-24 overflow-hidden md:h-56 md:w-32">
        <svg viewBox="0 0 80 160" className="h-full w-full text-gold/70" fill="currentColor">
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={i} x={i * 6} y="0" width="4" height="160" opacity={0.5 + (i % 3) * 0.1} />
          ))}
          <path d="M0 0 Q40 80 0 160" fill="currentColor" opacity="0.15" />
        </svg>
      </div>
      <div className="pointer-events-none absolute right-0 top-0 h-48 w-24 overflow-hidden md:h-56 md:w-32">
        <svg viewBox="0 0 80 160" className="h-full w-full text-gold/70" fill="currentColor">
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={i} x={i * 6} y="0" width="4" height="160" opacity={0.5 + (i % 3) * 0.1} />
          ))}
          <path d="M80 0 Q40 80 80 160" fill="currentColor" opacity="0.15" />
        </svg>
      </div>
    </>
  );
}

export function PalaceSilhouette() {
  return (
    <svg
      viewBox="0 0 400 80"
      className="mx-auto h-20 w-full max-w-sm text-text-dark/30"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M0 80 L0 50 Q30 45 50 55 L70 40 Q90 30 110 45 L130 35 Q150 25 170 40 L190 30 Q210 20 200 50 L200 80 Z" opacity="0.5" />
      <ellipse cx="200" cy="35" rx="25" ry="15" />
      <rect x="185" y="35" width="30" height="25" />
      <path d="M160 55 L160 35 Q200 15 240 35 L240 55" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M60 60 Q60 40 55 55" stroke="currentColor" strokeWidth="2" fill="none" />
      <ellipse cx="55" cy="40" rx="8" ry="20" transform="rotate(-15 55 40)" />
      <path d="M340 60 Q340 40 345 55" stroke="currentColor" strokeWidth="2" fill="none" />
      <ellipse cx="345" cy="40" rx="8" ry="20" transform="rotate(15 345 40)" />
    </svg>
  );
}

export function PalaceHeader() {
  return (
    <div className="palace-fade relative h-48 w-full overflow-hidden">
      <svg viewBox="0 0 400 200" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E8C4B8" />
            <stop offset="100%" stopColor="#F5E6E8" />
          </linearGradient>
        </defs>
        <rect width="400" height="200" fill="url(#sky)" />
        <ellipse cx="200" cy="120" rx="120" ry="60" fill="#DCAE96" opacity="0.3" />
        <path d="M80 180 L80 100 Q120 70 160 100 L160 80 Q200 50 240 80 L240 100 Q280 70 320 100 L320 180" fill="#C5A059" opacity="0.25" />
        <path d="M140 180 L140 110 Q200 60 260 110 L260 180" fill="none" stroke="#8B6914" strokeWidth="2" opacity="0.4" />
        <ellipse cx="60" cy="130" rx="15" ry="40" fill="#A08040" opacity="0.2" transform="rotate(-10 60 130)" />
        <ellipse cx="340" cy="130" rx="15" ry="40" fill="#A08040" opacity="0.2" transform="rotate(10 340 130)" />
      </svg>
    </div>
  );
}

export function LocationPin() {
  return (
    <svg viewBox="0 0 24 32" className="mx-auto h-10 w-8 text-gold" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0zm0 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" />
      <circle cx="12" cy="12" r="2" fill="white" />
    </svg>
  );
}

export function MosqueSilhouette() {
  return (
    <svg viewBox="0 0 60 40" className="mx-auto h-8 w-12 text-gold/60" fill="currentColor" aria-hidden="true">
      <ellipse cx="30" cy="20" rx="12" ry="8" />
      <rect x="22" y="20" width="16" height="12" />
      <rect x="26" y="10" width="8" height="12" rx="1" />
      <circle cx="30" cy="8" r="3" />
    </svg>
  );
}

export function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center gap-1 pt-6">
      <p className="font-script text-lg text-text-dark/60">Scroll down</p>
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 animate-bounce-slow text-text-dark/40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  );
}
