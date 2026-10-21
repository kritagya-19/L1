import React, { useState } from 'react';
import { X, Heart, Mail } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface LoveLetterEnvelopeProps {
  partnerName: string;
  senderName: string;
  letterParagraphs: string[];
  letterQuote: string;
  letterDateNotice: string;
  letterSignoff: string;
  onOpenLetter?: () => void;
}

export const LoveLetterEnvelope: React.FC<LoveLetterEnvelopeProps> = ({
  partnerName,
  senderName,
  letterParagraphs,
  letterQuote,
  letterDateNotice,
  letterSignoff,
  onOpenLetter,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [floatingSparkles, setFloatingSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  const senderInitial = (senderName || 'D').trim().charAt(0).toUpperCase();

  const handleOpenEnvelope = () => {
    if (isOpen || isAnimating) return;
    setIsAnimating(true);
    romanticAudio.playEnvelopeOpenSound();

    // Spawn tiny heart particles
    const sparks = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      x: 35 + Math.random() * 30,
      y: 20 + Math.random() * 40,
    }));
    setFloatingSparkles(sparks);

    setTimeout(() => {
      setIsOpen(true);
      setIsAnimating(false);
      setFloatingSparkles([]);
      if (onOpenLetter) onOpenLetter();
    }, 750);
  };

  const handleCloseEnvelope = () => {
    setIsOpen(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 my-12">
      {/* Outer White Card Container matching the website design */}
      <div className="bg-white rounded-[32px] sm:rounded-[38px] shadow-[0_24px_70px_-15px_rgba(244,114,182,0.22)] border border-pink-100/60 p-6 sm:p-14 text-center relative overflow-hidden transition-all">
        {/* Subtle Ambient Hearts on the card container matching screenshot 3 */}
        <div className="absolute top-8 left-8 text-rose-300 opacity-60 text-xl pointer-events-none select-none">
          ♥
        </div>
        <div className="absolute top-16 left-20 text-rose-400 opacity-70 text-sm pointer-events-none select-none animate-pulse-subtle">
          ♥
        </div>
        <div className="absolute top-20 right-14 text-rose-400 opacity-60 text-xs pointer-events-none select-none">
          ♥
        </div>
        <div className="absolute bottom-12 right-24 text-rose-300 opacity-50 text-sm pointer-events-none select-none">
          ♥
        </div>

        {/* Envelope Stage */}
        <div className="relative mx-auto max-w-[480px] w-full pt-4 pb-2">
          {/* THE ENVELOPE (MATCHING SCREENSHOT 3) */}
          <div
            onClick={handleOpenEnvelope}
            className={`group relative mx-auto w-full aspect-[16/10.5] max-w-[460px] cursor-pointer select-none rounded-2xl transition-transform duration-500 hover:scale-[1.02] active:scale-[0.99] filter drop-shadow-[0_16px_30px_rgba(156,27,72,0.18)] ${
              isAnimating ? 'animate-pulse' : ''
            }`}
            style={{ perspective: '1000px' }}
          >
            {/* Envelope Base / Body */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#FAF2F5] border border-pink-200/80">
              {/* Inside Back Liner (Deep Rich Berry) */}
              <div className="absolute inset-0 bg-[#9C1B48]" />

              {/* Peeking Letter inside envelope */}
              <div
                className={`absolute inset-x-8 top-6 h-36 bg-[#FDFBF7] rounded-t-xl shadow-md border-t-2 border-pink-200 transition-all duration-700 ease-out flex flex-col items-center pt-2 ${
                  isAnimating ? '-translate-y-16 scale-105' : 'translate-y-2'
                }`}
              >
                <div className="w-12 h-1 bg-pink-200 rounded-full mb-1.5" />
                <div className="w-24 h-1 bg-pink-100 rounded-full" />
                <p className="font-script text-[#9C1B48] text-xs mt-2 opacity-60">
                  {partnerName}...
                </p>
              </div>

              {/* Side Flaps (Soft blush mauve) */}
              {/* Left Flap */}
              <div
                className="absolute inset-y-0 left-0 w-1/2 bg-[#E9B8C7] z-10"
                style={{
                  clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)',
                }}
              />

              {/* Right Flap */}
              <div
                className="absolute inset-y-0 right-0 w-1/2 bg-[#E2B1C1] z-10"
                style={{
                  clipPath: 'polygon(100% 0%, 0% 50%, 100% 100%)',
                }}
              />

              {/* Bottom Flap (Clean soft off-white with delicate shadow) */}
              <div
                className="absolute inset-x-0 bottom-0 h-3/5 bg-[#FDF7F9] z-20 shadow-[0_-4px_16px_rgba(156,27,72,0.06)]"
                style={{
                  clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)',
                }}
              />

              {/* POSTAGE STAMP in top-right corner matching screenshot 3 */}
              <div className="absolute top-3.5 right-4 z-20 pointer-events-none transform rotate-3">
                <div className="relative w-10 h-12 bg-white rounded-xs shadow-xs p-1 flex items-center justify-center border border-dashed border-rose-300">
                  {/* Stamp perforated notches */}
                  <div className="w-full h-full border border-pink-100 flex items-center justify-center bg-rose-50/50">
                    <span className="text-rose-600 text-xs">♥</span>
                  </div>
                </div>
              </div>

              {/* TOP FLAP (TRIANGLE) WITH 3D FLIP ANIMATION */}
              <div
                className="absolute inset-x-0 top-0 h-3/5 z-25 transition-transform duration-700 ease-in-out origin-top"
                style={{
                  transform: isAnimating ? 'rotateX(180deg)' : 'rotateX(0deg)',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Front of top flap (Closed: points down, deep burgundy) */}
                <div
                  className="w-full h-full bg-[#9E1644] shadow-md"
                  style={{
                    clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                    backfaceVisibility: 'hidden',
                  }}
                />
              </div>

              {/* CENTER WAX SEAL with Initial "D" matching screenshot 3 */}
              <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-transform duration-500 ${
                  isAnimating ? 'scale-125 opacity-0' : 'group-hover:scale-110'
                }`}
              >
                <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#B31D4A] via-[#910C3A] to-[#6E0729] shadow-[0_8px_22px_rgba(110,7,41,0.5)] flex items-center justify-center border-2 border-[#D84976]/60 ring-2 ring-black/10">
                  {/* Wax rim highlight */}
                  <div className="absolute inset-0.5 rounded-full border border-white/25 pointer-events-none" />
                  {/* Center Wax Crest */}
                  <span className="text-white text-lg select-none drop-shadow-sm flex items-center justify-center">
                    ♥
                  </span>
                </div>
              </div>

              {/* Floating heart on envelope front matching screenshot 3 */}
              <div className="absolute bottom-5 left-[42%] text-rose-300 opacity-60 text-lg pointer-events-none select-none z-25">
                ♥
              </div>
            </div>
          </div>

          {/* Floating sparkles when opening */}
          {floatingSparkles.map((s) => (
            <span
              key={s.id}
              className="absolute text-rose-500 pointer-events-none animate-ping text-sm z-40"
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
            >
              ✨
            </span>
          ))}

          {/* Pill Button below envelope: "✉️ Tap to open" matching screenshot 3 */}
          <div className="mt-7 flex items-center justify-center">
            <button
              onClick={handleOpenEnvelope}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#FDEEF3] hover:bg-[#FCE2EC] border border-[#F8CAD9] text-[#9E1644] text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 shadow-2xs hover:shadow-xs cursor-pointer active:scale-95 group"
            >
              <Mail className="w-3.5 h-3.5 text-[#9E1644] transition-transform group-hover:scale-110" />
              <span>Tap to open</span>
            </button>
          </div>
        </div>
      </div>

      {/* THE LOVE LETTER MODAL / EXPANDED SHEET (MATCHING SCREENSHOT 4 & 5) */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in"
          onClick={handleCloseEnvelope}
        >
          {/* Letter Container matching screenshot 4 & 5 */}
          <div
            className="relative w-full max-w-xl bg-[#FDF9F7] rounded-[28px] sm:rounded-[34px] shadow-[0_25px_80px_rgba(0,0,0,0.35)] overflow-hidden my-4 border border-rose-100 flex flex-col max-h-[90vh] animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top burgundy accent header strip matching screenshot */}
            <div className="w-full h-3.5 bg-[#8C103B] shrink-0" />

            {/* Circular Close Button (x) in top right matching screenshot */}
            <button
              onClick={handleCloseEnvelope}
              className="absolute top-6 right-6 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-500 hover:text-slate-800 shadow-sm border border-slate-200/80 flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
              aria-label="Close letter"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Letter Content with Lined Stationery Background matching screenshot 4 & 5 */}
            <div className="p-4 sm:p-8 md:p-10 overflow-y-auto romantic-scrollbar lined-paper relative">
              {/* Partner Name Salutation matching screenshot 5 */}
              <h2 className="font-script text-3xl sm:text-4xl md:text-5xl text-[#6B0F2B] font-bold tracking-wide mb-4 sm:mb-6">
                {partnerName} ,
              </h2>

              {/* Letter Paragraphs in handwritten font matching screenshots */}
              <div className="space-y-5 sm:space-y-6 text-[#2D121B] font-script text-[19px] sm:text-[22px] md:text-[25px] leading-[36px] sm:leading-[38px] md:leading-[40px]">
                {letterParagraphs.map((para, index) => (
                  <p key={index} className="tracking-wide">
                    {para}
                  </p>
                ))}

                {/* Highlighted Lifetime Dedication */}
                {letterQuote && (
                  <p className="my-5 sm:my-6 text-[#7B1133] font-script text-xl sm:text-2xl md:text-[28px] font-bold tracking-wide leading-relaxed pl-3 border-l-2 border-rose-300">
                    "{letterQuote}"
                  </p>
                )}

                {/* Date / Time Notice */}
                {letterDateNotice && (
                  <p className="tracking-wide font-script text-[19px] sm:text-[22px] md:text-[25px] text-[#3D1420] pt-2">
                    {letterDateNotice}
                  </p>
                )}
              </div>

              {/* Sign-off section matching screenshot 4 */}
              <div className="mt-8 pt-2 text-right">
                <span className="font-script text-2xl sm:text-3xl md:text-4xl text-[#9C1B48] font-bold inline-block border-b-2 border-rose-300/80 pb-0.5">
                  {letterSignoff}
                </span>

                {/* Centered heart divider matching screenshot: — ♥ — */}
                <div className="flex items-center justify-center gap-4 mt-8 mb-2 text-rose-300" aria-hidden="true">
                  <div className="w-14 h-px bg-rose-200" />
                  <Heart className="w-3.5 h-3.5 fill-[#9C1B48] text-[#9C1B48]" />
                  <div className="w-14 h-px bg-rose-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
