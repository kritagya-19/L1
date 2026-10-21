import React, { useState } from 'react';
import { Heart, Sparkles, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { ReasonToLove } from '../types';
import { romanticAudio } from '../utils/audio';

interface ReasonsToLoveSectionProps {
  partnerName: string;
  reasons: ReasonToLove[];
}

export const ReasonsToLoveSection: React.FC<ReasonsToLoveSectionProps> = ({
  partnerName,
  reasons,
}) => {
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [isWhisperRevealed, setIsWhisperRevealed] = useState(false);

  const current = reasons[activePageIndex] || reasons[0];

  const handleNext = () => {
    setActivePageIndex((prev) => (prev + 1) % reasons.length);
    setIsWhisperRevealed(false);
    romanticAudio.playEnvelopeOpenSound();
  };

  const handlePrev = () => {
    setActivePageIndex((prev) => (prev - 1 + reasons.length) % reasons.length);
    setIsWhisperRevealed(false);
    romanticAudio.playEnvelopeOpenSound();
  };

  const handleSelectBookmark = (index: number) => {
    if (index === activePageIndex) return;
    setActivePageIndex(index);
    setIsWhisperRevealed(false);
    romanticAudio.playEnvelopeOpenSound();
  };

  // Bespoke illustrative emblems for each of the 6 reasons
  const renderTokenArtwork = (type: string, id: number) => {
    switch (type) {
      case 'book':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="bookCover" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#BE185D" />
                <stop offset="100%" stopColor="#881337" />
              </linearGradient>
            </defs>
            <rect width="200" height="200" rx="32" fill="#FFF1F4" />
            {/* Book Spine & Pages */}
            <path d="M 40 140 Q 100 120 160 140 L 160 65 Q 100 45 40 65 Z" fill="#FFFBF7" stroke="#F43F5E" strokeWidth="2" />
            <path d="M 40 65 Q 100 85 100 155 Q 100 85 160 65" fill="none" stroke="#E2E8F0" strokeWidth="1.5" />
            {/* Red bookmark ribbon with heart */}
            <path d="M 100 45 L 100 120 L 93 110 L 86 120 L 86 45 Z" fill="#E11D48" />
            <path d="M 100 125 C 95 118 85 122 93 132 C 101 122 95 118 100 125 Z" fill="#E11D48" transform="scale(0.8) translate(25, 20)" />
            {/* Faint text lines */}
            <line x1="50" y1="85" x2="88" y2="85" stroke="#FBCFE8" strokeWidth="2" strokeLinecap="round" />
            <line x1="50" y1="98" x2="85" y2="98" stroke="#FBCFE8" strokeWidth="2" strokeLinecap="round" />
            <line x1="112" y1="85" x2="150" y2="85" stroke="#FBCFE8" strokeWidth="2" strokeLinecap="round" />
            <line x1="112" y1="98" x2="145" y2="98" stroke="#FBCFE8" strokeWidth="2" strokeLinecap="round" />
            {/* Dog-eared folded corner */}
            <polygon points="160,65 145,65 160,80" fill="#F472B6" />
          </svg>
        );

      case 'coffee':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
            <rect width="200" height="200" rx="32" fill="#FFF1F4" />
            {/* Wooden coaster */}
            <ellipse cx="100" cy="155" rx="55" ry="12" fill="#D4A373" opacity="0.6" />
            {/* Mug body */}
            <rect x="70" y="85" width="60" height="60" rx="14" fill="#F43F5E" />
            <ellipse cx="100" cy="85" rx="30" ry="8" fill="#FFE4E6" />
            <ellipse cx="100" cy="87" rx="26" ry="6" fill="#881337" />
            {/* Mug Handle */}
            <path d="M 130 95 C 146 95 146 130 130 130" fill="none" stroke="#F43F5E" strokeWidth="8" strokeLinecap="round" />
            {/* Rising Steam Heart */}
            <path d="M 94 65 Q 86 45 96 35 Q 106 25 100 15" fill="none" stroke="#FB7185" strokeWidth="3" strokeLinecap="round" />
            <path d="M 106 65 Q 114 45 104 35 Q 94 25 100 15" fill="none" stroke="#FB7185" strokeWidth="3" strokeLinecap="round" />
            {/* Little heart on mug */}
            <path d="M 100 112 C 96 106 88 110 94 118 C 100 110 96 106 100 112 Z" fill="#FFFFFF" transform="scale(1.2) translate(-17, -20)" />
          </svg>
        );

      case 'sparkle':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
            <rect width="200" height="200" rx="32" fill="#FFF1F4" />
            {/* Sunbeam burst */}
            <circle cx="100" cy="100" r="45" fill="#FFE4E6" opacity="0.8" />
            <circle cx="100" cy="100" r="32" fill="#F43F5E" opacity="0.15" />
            {/* Sleeping mask / smiling face */}
            <rect x="65" y="85" width="70" height="34" rx="17" fill="#F43F5E" />
            {/* Eyelashes smiling */}
            <path d="M 78 100 Q 85 108 92 100" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
            <path d="M 108 100 Q 115 108 122 100" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
            {/* Little smile below */}
            <path d="M 90 130 Q 100 140 110 130" fill="none" stroke="#BE185D" strokeWidth="3" strokeLinecap="round" />
            {/* Sparkles around */}
            <text x="50" y="65" fontSize="20" fill="#F59E0B">✨</text>
            <text x="135" y="60" fontSize="18" fill="#F43F5E">🌸</text>
            <text x="140" y="145" fontSize="16" fill="#F59E0B">✨</text>
          </svg>
        );

      case 'heart':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
            <rect width="200" height="200" rx="32" fill="#FFF1F4" />
            {/* Winter coat pocket */}
            <rect x="60" y="70" width="80" height="90" rx="16" fill="#881337" />
            <path d="M 60 70 Q 100 80 140 70" stroke="#BE185D" strokeWidth="4" fill="none" />
            {/* Hands nestled inside pocket */}
            <ellipse cx="88" cy="105" rx="14" ry="20" fill="#FFE4E6" transform="rotate(-15 88 105)" />
            <ellipse cx="112" cy="105" rx="14" ry="20" fill="#FCD34D" opacity="0.9" transform="rotate(15 112 105)" />
            {/* Interlocking heart fingers */}
            <circle cx="100" cy="110" r="10" fill="#F43F5E" />
            {/* Snowflakes */}
            <text x="45" y="55" fontSize="16" fill="#93C5FD">❄️</text>
            <text x="145" y="140" fontSize="16" fill="#93C5FD">❄️</text>
          </svg>
        );

      case 'crown':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FCD34D" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
            </defs>
            <rect width="200" height="200" rx="32" fill="#FFF1F4" />
            {/* Glow */}
            <circle cx="100" cy="105" r="45" fill="#FEF3C7" />
            {/* Tilted Paper Crown */}
            <g transform="translate(45, 60) rotate(-10)">
              <polygon points="10,65 25,25 45,52 65,18 85,52 105,25 120,65" fill="url(#goldGrad)" stroke="#B45309" strokeWidth="2" />
              <rect x="10" y="62" width="110" height="18" fill="#F59E0B" rx="4" />
              {/* Jewels on crown */}
              <circle cx="30" cy="71" r="4" fill="#BE185D" />
              <circle cx="65" cy="71" r="5" fill="#3B82F6" />
              <circle cx="100" cy="71" r="4" fill="#BE185D" />
            </g>
            <text x="145" y="60" fontSize="18" fill="#F59E0B">✨</text>
          </svg>
        );

      case 'infinity':
      default:
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
            <rect width="200" height="200" rx="32" fill="#FFF1F4" />
            {/* Glowing heart halo */}
            <circle cx="100" cy="100" r="50" fill="#FFE4E6" opacity="0.6" />
            {/* Pinky promise entwined hands */}
            <path
              d="M 65 100 C 65 80 85 80 100 100 C 115 120 135 120 135 100 C 135 80 115 80 100 100 C 85 120 65 120 65 100 Z"
              fill="none"
              stroke="#BE185D"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Red Thread of Fate Heart */}
            <path d="M 100 92 C 95 84 83 89 91 101 C 99 89 95 84 100 92 Z" fill="#E11D48" transform="scale(1.4) translate(-28, -32)" />
            <text x="145" y="75" fontSize="16" fill="#F43F5E">❤️</text>
          </svg>
        );
    }
  };

  return (
    <section id="reasons-section" className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 my-20 sm:my-28">
      {/* SECTION HEADER */}
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-love font-normal text-[#8B0F3E] tracking-tight mb-3">
          Things I Love Most About You
        </h2>

        {/* Delicate divider with heart: — ♡ — */}
        <div className="flex items-center justify-center gap-4 my-4 text-[#FDA4AF]" aria-hidden="true">
          <div className="w-16 h-px bg-pink-200" />
          <Heart className="w-3.5 h-3.5 text-[#F43F5E] fill-none stroke-[1.8]" />
          <div className="w-16 h-px bg-pink-200" />
        </div>
      </div>

      {/* THE ROMANTIC LOVE CARD (CLEAN, NO SCROLLER, NO TOP TABS BAR) */}
      <div className="relative mx-auto max-w-3xl">
        <div className="relative bg-[#FDF9F7] rounded-[36px] sm:rounded-[44px] shadow-[0_25px_80px_-15px_rgba(219,39,119,0.22)] border border-pink-200/80 overflow-hidden p-6 sm:p-12 transition-all">
          {/* Lined stationery paper texture inside */}
          <div className="absolute inset-0 lined-paper opacity-40 pointer-events-none" />

          {/* Red ribbon corner bookmark detail */}
          <div className="absolute top-0 right-10 sm:right-14 w-6 h-14 bg-[#BE185D] shadow-md z-30 rounded-b-xs">
            <div
              className="w-full h-full"
              style={{
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 80%, 0% 100%)',
                backgroundColor: '#BE185D',
              }}
            />
          </div>

          {/* Main Content Layout: 2-Sided Keepsake Spread */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Column: Handcrafted Illustrated Token & Badge (5 Cols) */}
            <div className="md:col-span-5 flex flex-col items-center text-center">
              <div className="relative w-44 sm:w-52 aspect-square p-2 bg-white rounded-3xl shadow-[0_12px_36px_rgba(156,27,72,0.12)] border border-pink-100 ring-2 ring-pink-50">
                {renderTokenArtwork(current.iconType, current.id)}

                {/* Little washi tape on top of the token */}
                <div
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-rose-200/90 shadow-2xs rounded-xs rotate-[-2deg]"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(255,255,255,0.4) 6px, rgba(255,255,255,0.4) 12px)',
                  }}
                />
              </div>

              {/* Number & Category Pill */}
              <div className="mt-4 flex items-center gap-2">
                <span className="font-serif-love text-3xl font-bold text-[#881337]">
                  {current.numberStr}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-rose-700 bg-rose-100/70 px-3 py-1 rounded-full border border-rose-200/60">
                  {current.tag}
                </span>
              </div>
            </div>

            {/* Right Column: Handwritten Story & Secret Whisper (7 Cols) */}
            <div className="md:col-span-7 flex flex-col text-left">
              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-bold text-[#7E1136] tracking-tight mb-3">
                {current.title}
              </h3>

              {/* Touching Prose */}
              <p className="text-sm sm:text-base text-[#461423] leading-relaxed mb-6 font-normal">
                {current.description}
              </p>

              {/* Secret Whisper Unfold Drawer */}
              <div className="relative rounded-2xl bg-[#FFF5F7] border border-pink-200/80 p-4 sm:p-5 shadow-2xs">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#9C1B48] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                    A Whisper Just For You
                  </span>
                  <button
                    onClick={() => setIsWhisperRevealed(!isWhisperRevealed)}
                    className="text-xs font-semibold text-rose-700 hover:text-rose-950 flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-rose-200/60 shadow-2xs"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{isWhisperRevealed ? 'Hide Whisper' : 'Unfold Whisper'}</span>
                  </button>
                </div>

                {isWhisperRevealed ? (
                  <div className="pt-1 animate-fade-in">
                    <p className="font-script text-xl sm:text-2xl text-[#881337] leading-snug">
                      "{current.whisper}"
                    </p>
                    <div className="mt-2 text-right text-[10px] text-rose-400 font-mono">
                      — Written in secret with all my heart
                    </div>
                  </div>
                ) : (
                  <p className="font-script text-lg text-rose-400 italic">
                    Tap 'Unfold Whisper' to reveal the private memory behind this...
                  </p>
                )}
              </div>

            </div>
          </div>

          {/* Bottom Book Navigation Controls */}
          <div className="mt-8 pt-6 border-t border-pink-100/80 flex items-center justify-between">
            <button
              onClick={handlePrev}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-rose-50 border border-pink-200 text-rose-800 text-xs font-semibold transition-all cursor-pointer shadow-2xs hover:shadow-xs active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {/* Heart dots indicator & page counter */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {reasons.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => handleSelectBookmark(dotIdx)}
                    className={`rounded-full transition-all cursor-pointer ${
                      dotIdx === activePageIndex
                        ? 'w-6 h-2.5 bg-[#BE185D]'
                        : 'w-2.5 h-2.5 bg-rose-200 hover:bg-rose-300'
                    }`}
                    aria-label={`Go to reason ${dotIdx + 1}`}
                  />
                ))}
              </div>
              <span className="text-xs text-rose-600/70 font-mono hidden sm:inline">
                {activePageIndex + 1} of {reasons.length}
              </span>
            </div>

            <button
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#BE185D] hover:bg-[#9D174D] text-white text-xs font-semibold transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
