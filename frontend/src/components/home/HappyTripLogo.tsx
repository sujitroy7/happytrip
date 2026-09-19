export function HappyTripLogo({ size = 56 }: { size?: number }) {
  return (
    <div
      className="relative mx-auto flex items-center justify-center"
      style={{ width: size, height: size }}
      aria-label="HappyTrip Luxury Crest"
    >
      {/* Ambient Pulsing Aura */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-primary/25 blur-lg animate-pulse"
      />

      {/* SVG Luxury Emblem */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative w-full h-full drop-shadow-[0_4px_12px_rgba(242,202,80,0.35)]"
      >
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffe088" />
            <stop offset="50%" stopColor="#f2ca50" />
            <stop offset="100%" stopColor="#b8860b" />
          </linearGradient>
          <linearGradient id="goldRing" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f2ca50" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#d4af37" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ffe088" stopOpacity="0.9" />
          </linearGradient>
          <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f2ca50" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#081611" stopOpacity="0.85" />
          </radialGradient>
        </defs>

        {/* Outer Circular Medallion */}
        <circle
          cx="50"
          cy="50"
          r="47"
          stroke="url(#goldRing)"
          strokeWidth="1.5"
          fill="url(#innerGlow)"
        />

        {/* Inner Filigree Ring */}
        <circle
          cx="50"
          cy="50"
          r="41"
          stroke="url(#goldGrad)"
          strokeWidth="0.75"
          strokeDasharray="2 3"
        />

        {/* Four North-South-East-West Compass Diamonds */}
        <polygon points="50,13 52,17 50,21 48,17" fill="url(#goldGrad)" />
        <polygon points="50,87 52,83 50,79 48,83" fill="url(#goldGrad)" />
        <polygon points="13,50 17,48 21,50 17,52" fill="url(#goldGrad)" />
        <polygon points="87,50 83,48 79,50 83,52" fill="url(#goldGrad)" />

        {/* Monogram Moniker 'H' & 'T' */}
        {/* Letter H */}
        <path
          d="M 33 34 L 39 34 L 39 46 L 49 46 L 49 34 L 55 34 L 55 66 L 49 66 L 49 52 L 39 52 L 39 66 L 33 66 Z"
          fill="url(#goldGrad)"
          opacity="0.85"
        />
        {/* Letter T Intertwined */}
        <path
          d="M 45 35 L 67 35 L 67 41 L 59 41 L 59 66 L 53 66 L 53 41 L 45 41 Z"
          fill="url(#goldGrad)"
        />

        {/* Subtle Luxury Crown / Star on Top */}
        <polygon
          points="50,26 51.5,30 55,30 52,32.5 53.5,36 50,33.5 46.5,36 48,32.5 45,30 48.5,30"
          fill="url(#goldGrad)"
        />
      </svg>
    </div>
  )
}
