import React, { useState } from 'react';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface UniverseItem {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  note: string;
  imageSrc: string;
  alt: string;
}

// Clean SVG definitions for alternative universes
const ghibliSvg = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">' +
  '<defs><linearGradient id="ghibliSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#4A90E2"/><stop offset="50%" stop-color="#87CEEB"/><stop offset="85%" stop-color="#FFF0D4"/><stop offset="100%" stop-color="#FFAAA6"/></linearGradient><linearGradient id="hillGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#5B8E3B"/><stop offset="100%" stop-color="#2D5A1E"/></linearGradient></defs>' +
  '<rect width="600" height="600" fill="url(#ghibliSky)"/>' +
  '<circle cx="140" cy="180" r="70" fill="#FFFFFF" opacity="0.95"/>' +
  '<circle cx="210" cy="150" r="90" fill="#FFFFFF" opacity="0.95"/>' +
  '<circle cx="300" cy="180" r="80" fill="#FFFFFF" opacity="0.95"/>' +
  '<circle cx="480" cy="220" r="65" fill="#FFFFFF" opacity="0.9"/>' +
  '<path d="M 0 420 Q 300 340 600 450 L 600 600 L 0 600 Z" fill="url(#hillGrad)"/>' +
  '<g transform="translate(240, 290)">' +
  '<circle cx="100" cy="90" r="16" fill="#FFE0BD"/>' +
  '<ellipse cx="100" cy="80" rx="36" ry="12" fill="#F4E0A5"/>' +
  '<path d="M 85 106 C 85 125 78 160 84 190 L 116 190 C 122 160 115 125 115 106 Z" fill="#FFFFFF"/>' +
  '<circle cx="65" cy="86" r="17" fill="#FFE0BD"/>' +
  '<path d="M 52 75 C 50 60 75 55 80 72 C 82 85 70 92 65 92 Z" fill="#3D2B1F"/>' +
  '<path d="M 50 102 L 78 102 L 74 190 L 48 190 Z" fill="#4A6984"/>' +
  '<line x1="82" y1="130" x2="90" y2="135" stroke="#FFE0BD" stroke-width="6" stroke-linecap="round"/>' +
  '</g>' +
  '<g fill="#FF80AB" opacity="0.8">' +
  '<ellipse cx="120" cy="360" rx="6" ry="3"/>' +
  '<ellipse cx="280" cy="310" rx="7" ry="4"/>' +
  '<ellipse cx="440" cy="380" rx="6" ry="3"/>' +
  '</g>' +
  '</svg>'
);

const woolSvg = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">' +
  '<defs><linearGradient id="warmRoom" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3E2723"/><stop offset="100%" stop-color="#1A0C08"/></linearGradient><radialGradient id="hearthGlow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FFA726" stop-opacity="0.8"/><stop offset="100%" stop-color="#D84315" stop-opacity="0"/></radialGradient></defs>' +
  '<rect width="600" height="600" fill="url(#warmRoom)"/>' +
  '<circle cx="300" cy="300" r="260" fill="url(#hearthGlow)"/>' +
  '<ellipse cx="300" cy="480" rx="220" ry="50" fill="#8D6E63" stroke="#A1887F" stroke-dasharray="8 6" stroke-width="4"/>' +
  '<g transform="translate(190, 240)">' +
  '<circle cx="70" cy="80" r="30" fill="#FFCCBC"/>' +
  '<ellipse cx="70" cy="150" rx="40" ry="55" fill="#D32F2F"/>' +
  '<rect x="35" y="105" width="70" height="24" rx="8" fill="#FFF9C4" stroke="#FFE082" stroke-width="2"/>' +
  '<circle cx="62" cy="78" r="4" fill="#3E2723"/><circle cx="78" cy="78" r="4" fill="#3E2723"/>' +
  '<circle cx="150" cy="85" r="28" fill="#FFCCBC"/>' +
  '<ellipse cx="150" cy="150" rx="38" ry="55" fill="#F8BBD0"/>' +
  '<path d="M 122 80 C 120 50 178 50 178 80 Z" fill="#AB47BC"/>' +
  '<circle cx="150" cy="48" r="10" fill="#E1BEE7"/>' +
  '<circle cx="142" cy="84" r="4" fill="#3E2723"/><circle cx="158" cy="84" r="4" fill="#3E2723"/>' +
  '<path d="M 110 145 C 105 135 95 140 105 152 C 115 140 105 135 110 145 Z" fill="#E91E63"/>' +
  '</g>' +
  '</svg>'
);

const cosmicSvg = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">' +
  '<defs><radialGradient id="deepSpace" cx="50%" cy="50%" r="70%"><stop offset="0%" stop-color="#311B92"/><stop offset="60%" stop-color="#0D0722"/><stop offset="100%" stop-color="#020008"/></radialGradient><linearGradient id="nebula" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#E91E63" stop-opacity="0.5"/><stop offset="100%" stop-color="#00E5FF" stop-opacity="0.4"/></linearGradient></defs>' +
  '<rect width="600" height="600" fill="url(#deepSpace)"/>' +
  '<ellipse cx="320" cy="280" rx="260" ry="180" fill="url(#nebula)"/>' +
  '<g fill="#FFFFFF" opacity="0.8"><circle cx="80" cy="120" r="1.5"/><circle cx="160" cy="90" r="2.5"/><circle cx="240" cy="220" r="1.5"/><circle cx="480" cy="140" r="2"/><circle cx="520" cy="380" r="1.5"/><circle cx="120" cy="460" r="2.5"/></g>' +
  '<g transform="translate(180, 200)">' +
  '<path d="M 60 90 C 80 30 160 30 180 90" stroke="#FF4081" stroke-width="3" stroke-dasharray="6 4" fill="none"/>' +
  '<circle cx="50" cy="95" r="26" fill="#ECEFF1"/>' +
  '<ellipse cx="52" cy="95" rx="18" ry="14" fill="#00E5FF" opacity="0.85"/>' +
  '<rect x="35" y="120" width="30" height="42" rx="10" fill="#CFD8DC"/>' +
  '<circle cx="190" cy="95" r="26" fill="#ECEFF1"/>' +
  '<ellipse cx="188" cy="95" rx="18" ry="14" fill="#FF80AB" opacity="0.85"/>' +
  '<rect x="175" y="120" width="30" height="42" rx="10" fill="#CFD8DC"/>' +
  '<circle cx="120" cy="120" r="8" fill="#FFF59D"/>' +
  '</g>' +
  '</svg>'
);

// Romantic alternate universes
const UNIVERSES: UniverseItem[] = [
  {
    id: 'lego',
    tag: '🧱 Lego Dimension',
    title: 'Us, if we were Lego',
    subtitle: 'I asked the robot. It somehow got your smile right.',
    note: 'Even as 4cm plastic figures with yellow painted smiles, you would still be my favourite person in every toy box.',
    imageSrc: '/assets/aistudio/lego_couple_clean.png',
    alt: 'Lego couple portrait in a warm cafe',
  },
  {
    id: 'ghibli',
    tag: '🎨 Ghibli Dream',
    title: 'Us in a Ghibli Dream',
    subtitle: 'Windy grassy hills, calm blue waters, and sharing warm steamed buns.',
    note: 'I would ride that floating sky-train across the ocean just to bring you fresh warm bread before dusk.',
    imageSrc: ghibliSvg,
    alt: 'Anime Ghibli style couple on a windy green hill',
  },
  {
    id: 'wool',
    tag: '🧶 Knitted Wool',
    title: 'Us in Knitted Wool',
    subtitle: 'Cozy knitted sweaters, oversized mugs, and tiny handmade boots.',
    note: 'Stitched together stitch by stitch. Every little yarn thread inevitably leads straight back to you.',
    imageSrc: woolSvg,
    alt: 'Knitted felt couple holding a tiny heart',
  },
  {
    id: 'cosmic',
    tag: '✨ Cosmic Stardust',
    title: 'Us, Adrift in the Stars',
    subtitle: 'Floating through nebulas in retro space suits, tethered by one pink cord.',
    note: 'In an infinite cosmos with billions of galaxies, gravity will always pull me straight back to your orbit.',
    imageSrc: cosmicSvg,
    alt: 'Two astronauts connected by a glowing heart tether in space',
  },
];

export const AlternateUniverseSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [heartsBurst, setHeartsBurst] = useState<{ id: number; x: number; y: number }[]>([]);

  const current = UNIVERSES[activeIdx];

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? UNIVERSES.length - 1 : prev - 1));
    romanticAudio.playScratchShimmer();
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === UNIVERSES.length - 1 ? 0 : prev + 1));
    romanticAudio.playScratchShimmer();
  };

  const handleSelect = (idx: number) => {
    if (idx === activeIdx) return;
    setActiveIdx(idx);
    romanticAudio.playScratchShimmer();
  };

  const handlePhotoClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now() + Math.random();
    setHeartsBurst((prev) => [...prev.slice(-4), { id, x, y }]);
    romanticAudio.playScratchShimmer();
    setTimeout(() => {
      setHeartsBurst((prev) => prev.filter((h) => h.id !== id));
    }, 1000);
  };

  return (
    <section id="multiverse-section" className="relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6 my-20 sm:my-28">
      <div className="bg-white rounded-3xl sm:rounded-[36px] shadow-[0_16px_50px_-10px_rgba(219,39,119,0.12)] border border-rose-100/80 p-4 sm:p-8 md:p-10 text-center">
        {/* Title matching the reference design */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#82133a] tracking-tight mb-2">
          {current.title}
        </h2>

        {/* Delicate divider with heart: — ♡ — */}
        <div className="flex items-center justify-center gap-4 my-5 text-[#FDA4AF]" aria-hidden="true">
          <div className="w-16 h-px bg-pink-200" />
          <Heart className="w-3.5 h-3.5 text-[#F43F5E] fill-none stroke-[1.8]" />
          <div className="w-16 h-px bg-pink-200" />
        </div>

        {/* Structured, Elegant Image Frame (no text inside, no click for love badge, no clutter) */}
        <div className="relative mx-auto w-full max-w-[480px] aspect-[4/4.2] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg shadow-rose-950/10 border-4 border-white ring-1 ring-pink-100/90 bg-rose-50/50 select-none">
          <img
            key={current.id}
            src={current.imageSrc}
            alt={current.alt}
            onClick={handlePhotoClick}
            className="w-full h-full object-cover transition-opacity duration-300 cursor-pointer"
          />

          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous universe"
            className="absolute left-2 sm:left-3.5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/85 hover:bg-white text-rose-900 shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-xs border border-pink-100"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-rose-800" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            aria-label="Next universe"
            className="absolute right-2 sm:right-3.5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/85 hover:bg-white text-rose-900 shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-xs border border-pink-100"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-rose-800" />
          </button>

          {/* Sweet Floating Heart burst on click */}
          {heartsBurst.map((h) => (
            <div
              key={h.id}
              className="absolute pointer-events-none z-30 animate-ping text-3xl"
              style={{
                left: h.x,
                top: h.y,
                transform: 'translate(-50%, -50%)',
              }}
            >
              💖
            </div>
          ))}
        </div>

        {/* Romantic Note Under The Frame */}
        <div className="mt-6 max-w-[460px] mx-auto text-center px-3">
          <p className="font-script text-xl sm:text-2xl text-[#8B0F3E] leading-relaxed">
            "{current.note}"
          </p>
        </div>

        {/* Subtle Minimal Carousel Dot Indicators */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {UNIVERSES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeIdx ? 'w-6 bg-[#8B0F3E]' : 'w-2 bg-pink-200 hover:bg-pink-300'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
