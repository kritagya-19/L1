import React, { useId } from 'react';

export const ContourBackground: React.FC = () => {
  const patternId = useId();

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      style={{ backgroundColor: '#FFFDFB' }}
      aria-hidden="true"
    >
      {/* 1. Delicate Ambient Rose Mist Vignette Layers */}
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background: `
            radial-gradient(ellipse 65% 55% at 15% 10%, rgba(254, 226, 235, 0.55) 0%, transparent 70%),
            radial-gradient(ellipse 55% 50% at 88% 22%, rgba(253, 232, 240, 0.45) 0%, transparent 65%),
            radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255, 243, 246, 0.6) 0%, transparent 75%),
            radial-gradient(ellipse 60% 55% at 10% 85%, rgba(253, 228, 236, 0.4) 0%, transparent 70%),
            radial-gradient(ellipse 55% 50% at 90% 90%, rgba(254, 236, 242, 0.5) 0%, transparent 65%)
          `,
        }}
      />

      {/* 2. Soft Vignette Edge Shimmer */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(circle at 50% 30%, transparent 55%, rgba(244, 114, 182, 0.08) 100%)',
        }}
      />

      {/* 3. Subtle Tactile Romantic Paper Grain Texture */}
      <svg
        className="absolute inset-0 w-full h-full opacity-60 mix-blend-multiply pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={`${patternId}-paper-grain`} x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves="3"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              type="matrix"
              values="0.4 0   0   0 0.55
                      0   0.2 0   0 0.45
                      0   0   0.2 0 0.48
                      0   0   0   0.04 0"
              result="coloredNoise"
            />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter={`url(#${patternId}-paper-grain)`} />
      </svg>
    </div>
  );
};
