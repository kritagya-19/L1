import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Heart, RotateCcw, X, CheckCircle2 } from 'lucide-react';
import { romanticAudio } from '../utils/audio';
import { HeartConfetti } from './HeartConfetti';

export interface GiftSlice {
  id: number;
  label: string;
  lines?: string[];
  color: string;
  description: string;
  icon: string;
  category: string;
}

export const WHEEL_GIFTS: GiftSlice[] = [
  {
    id: 0,
    label: 'Breakfast in bed',
    color: '#9C1A48',
    description: 'Fresh warm croissants, fruit, and your favourite latte served right to you under the duvet.',
    icon: '🥐',
    category: 'Morning Romance',
  },
  {
    id: 1,
    label: 'Movie night, you pick',
    lines: ['Movie night,', 'you pick'],
    color: '#B8285A',
    description: 'You get 100% control of the remote, popcorn with extra butter, and zero complaints from me.',
    icon: '🎬',
    category: 'Cozy Evening',
  },
  {
    id: 2,
    label: 'Massage coupon',
    color: '#8D2B52',
    description: 'A 45-minute relaxing back and shoulder massage with scented lavender lotion.',
    icon: '💆‍♀️',
    category: 'Pampering Touch',
  },
  {
    id: 3,
    label: 'Picnic date',
    color: '#CC4E74',
    description: 'Wicker basket packed with cheese, grapes, sparkling wine, and a soft blanket under the afternoon trees.',
    icon: '🧺',
    category: 'Outdoor Escape',
  },
  {
    id: 4,
    label: 'I cook dinner',
    color: '#63112E',
    description: 'Your choice of homemade creamy pasta or three-course dinner, complete with candlelight and cleanup handled.',
    icon: '🍝',
    category: 'Chef’s Special',
  },
  {
    id: 5,
    label: 'Weekend away',
    color: '#DE6D8A',
    description: 'A spontaneous cozy road trip or seaside cabin getaway for just the two of us.',
    icon: '🚗',
    category: 'Spontaneous Adventure',
  },
  {
    id: 6,
    label: 'A new book',
    color: '#B75373',
    description: 'A trip to the bookstore where you pick any book you want, and I buy it plus a sweet pastry.',
    icon: '📖',
    category: 'Sweet Date',
  },
];

export const ANNIVERSARY_GIFTS = WHEEL_GIFTS;

interface SpinningWheelSectionProps {
  partnerName?: string;
  senderName?: string;
  onWinPrize?: (prize: string) => void;
}

export const SpinningWheelSection: React.FC<SpinningWheelSectionProps> = ({
  partnerName = 'Maya',
  senderName = '',
  onWinPrize,
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState<GiftSlice | null>(null);
  const [showVoucher, setShowVoucher] = useState(false);
  const [triggerConfetti, setTriggerConfetti] = useState(false);
  const [pointerBounce, setPointerBounce] = useState(false);
  const [claimedNotice, setClaimedNotice] = useState<string | null>(null);
  const audioIntervalRef = useRef<number | null>(null);

  const numSlices = WHEEL_GIFTS.length;
  const sliceAngle = 360 / numSlices; // 51.42857°

  // Spin the wheel with calculated landing position
  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setWonPrize(null);
    setShowVoucher(false);
    setTriggerConfetti(false);
    setClaimedNotice(null);

    // Pick random winning index
    const winningIndex = Math.floor(Math.random() * numSlices);
    const winningSlice = WHEEL_GIFTS[winningIndex];

    // Pointer is at top (12 o'clock = -90° / 270°).
    // Slice i center angle when rotation is 0 = -90 + (i + 0.5) * sliceAngle
    // When rotated clockwise by R:
    // (-90 + (i + 0.5) * sliceAngle + R) % 360 = 270 (-90)
    // => targetBase = (360 - ((i + 0.5) * sliceAngle) % 360) % 360
    const extraSpins = 6 + Math.floor(Math.random() * 3); // 6 to 8 full rotations
    const sliceCenterFromTop = (winningIndex + 0.5) * sliceAngle;
    const targetBase = (360 - (sliceCenterFromTop % 360)) % 360;

    // Smooth continuous rotation without resetting
    const currentBase = currentRotation % 360;
    const delta = (targetBase - currentBase + 360) % 360;
    const finalRotation = currentRotation + delta + extraSpins * 360;

    setCurrentRotation(finalRotation);

    // Audio ratchet clicks
    let clickDelay = 42;
    let ticks = 0;
    const maxTicks = 42;

    const playTicks = () => {
      romanticAudio.playWheelTick();
      setPointerBounce((prev) => !prev);
      ticks++;

      if (ticks < maxTicks) {
        clickDelay = Math.min(360, clickDelay * 1.075);
        audioIntervalRef.current = window.setTimeout(playTicks, clickDelay);
      }
    };
    playTicks();

    // Settle spin after 4s CSS transition
    setTimeout(() => {
      setIsSpinning(false);
      setWonPrize(winningSlice);
      setShowVoucher(true);
      setTriggerConfetti(true);
      romanticAudio.playRevealFanfare();
      if (onWinPrize) onWinPrize(winningSlice.label);

      if (audioIntervalRef.current) {
        clearTimeout(audioIntervalRef.current);
      }
    }, 4150);
  };

  useEffect(() => {
    return () => {
      if (audioIntervalRef.current) {
        clearTimeout(audioIntervalRef.current);
      }
    };
  }, []);

  const handleClaim = () => {
    setShowVoucher(false);
    setClaimedNotice(
      `"${wonPrize?.label}" has been officially claimed! A promise is a promise 💌`
    );
    setTimeout(() => {
      setClaimedNotice(null);
    }, 6000);
  };

  return (
    <section id="wheel-section" className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 my-20 sm:my-28 select-none">
      {/* Confetti Explosion on prize reveal */}
      <HeartConfetti trigger={triggerConfetti} onComplete={() => setTriggerConfetti(false)} />

      {/* Outer Card Container matching reference screenshot */}
      <div className="text-center">
        {/* Heading matching reference screenshot without anniversary word */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#8B0F3E] tracking-tight mb-8 font-sans">
          Spin for your gift
        </h2>

        {/* Claimed notification toast banner */}
        {claimedNotice && (
          <div className="mb-6 max-w-md mx-auto px-4 py-2.5 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-medium flex items-center justify-center gap-2 shadow-xs animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{claimedNotice}</span>
          </div>
        )}

        {/* THE WHEEL STAGE */}
        <div className="relative mx-auto w-full max-w-[430px] aspect-square flex items-center justify-center">

          {/* TOP TEARDROP POINTER (MATCHING SCREENSHOT) */}
          <div
            className={`absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none transition-transform duration-75 origin-top ${
              pointerBounce && isSpinning ? '-rotate-12 scale-105' : 'rotate-0'
            }`}
          >
            <div className="relative w-9 h-12 flex items-center justify-center filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.35)]">
              {/* Teardrop marker pointing DOWN */}
              <svg viewBox="0 0 40 52" className="w-9 h-12">
                <path
                  d="M 20 50 L 7 21 C 3 14 10 2 20 2 C 30 2 37 14 33 21 Z"
                  fill="#780C34"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                {/* Center marker pin dot matching screenshot */}
                <circle cx="20" cy="18" r="4.5" fill="#FFFFFF" />
              </svg>
            </div>
          </div>

          {/* ROTATING SVG WHEEL */}
          <div
            className="w-full h-full rounded-full overflow-hidden shadow-[0_22px_65px_-10px_rgba(142,17,57,0.38)] relative cursor-pointer group"
            onClick={spinWheel}
            title="Click to spin the wheel!"
            style={{
              transform: `rotate(${currentRotation}deg)`,
              transition: isSpinning
                ? 'transform 4.1s cubic-bezier(0.12, 0.96, 0.18, 1)'
                : 'none',
            }}
          >
            <svg viewBox="0 0 500 500" className="w-full h-full">
              <defs>
                {/* Drop shadow for slice typography */}
                <filter id="sliceTextShadow" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="1.4" stdDeviation="1.2" floodColor="#000000" floodOpacity="0.45" />
                </filter>
                {/* Outer rim gradient for tactile depth */}
                <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8A0F39" />
                  <stop offset="100%" stopColor="#660A28" />
                </linearGradient>
              </defs>

              {/* 1. OUTERMOST CRIMSON RIM (R=250 to 238) */}
              <circle cx="250" cy="250" r="250" fill="url(#rimGrad)" />

              {/* 2. MIDDLE BLUSH / CREAM TRACK (R=238 to 218) */}
              <circle cx="250" cy="250" r="238" fill="#FCEFF3" />

              {/* 3. 14 CIRCULAR WHITE PEGS IN THE TRACK (MATCHING SCREENSHOT) */}
              {Array.from({ length: 14 }).map((_, dotIdx) => {
                const dotAngle = (dotIdx * 360) / 14;
                const rad = (dotAngle * Math.PI) / 180;
                const cx = 250 + 228 * Math.cos(rad);
                const cy = 250 + 228 * Math.sin(rad);
                return (
                  <circle
                    key={`dot-${dotIdx}`}
                    cx={cx}
                    cy={cy}
                    r="3.5"
                    fill="#FFFFFF"
                    stroke="#D9A8B6"
                    strokeWidth="0.8"
                  />
                );
              })}

              {/* 4. THE 7 SLICES (R=218) */}
              {WHEEL_GIFTS.map((gift, i) => {
                const startAngle = -90 + i * sliceAngle;
                const endAngle = -90 + (i + 1) * sliceAngle;
                const bisectorAngle = -90 + (i + 0.5) * sliceAngle;

                // SVG Arc coordinates
                const startRad = (startAngle * Math.PI) / 180;
                const endRad = (endAngle * Math.PI) / 180;
                const sliceRadius = 218;

                const x1 = 250 + sliceRadius * Math.cos(startRad);
                const y1 = 250 + sliceRadius * Math.sin(startRad);
                const x2 = 250 + sliceRadius * Math.cos(endRad);
                const y2 = 250 + sliceRadius * Math.sin(endRad);

                const pathData = `M 250 250 L ${x1} ${y1} A ${sliceRadius} ${sliceRadius} 0 0 1 ${x2} ${y2} Z`;

                // Calculate upright, readable text rotation and center position
                // Slices are oriented matching the screenshot:
                // Slice 0 ("Breakfast in bed"): bisector ~ -64.3°, text angle = 115.7°
                // Slice 1 ("Movie night, you pick"): bisector ~ -12.9°, text angle = -12.9° (two stacked lines)
                // Slice 2 ("Massage coupon"): bisector ~ 38.6°, text angle = 38.6°
                // Slice 3 ("Picnic date"): bisector = 90°, text angle = 90° (vertical)
                // Slice 4 ("I cook dinner"): bisector ~ 141.4°, text angle = -38.6°
                // Slice 5 ("Weekend away"): bisector ~ 192.9°, text angle = 12.9°
                // Slice 6 ("A new book"): bisector ~ 244.3°, text angle = 64.3°
                let textRot = bisectorAngle;
                let textR = 138;

                if (i === 0) {
                  textRot = bisectorAngle + 180; // 115.7°
                } else if (i === 1) {
                  textRot = bisectorAngle; // -12.9°
                  textR = 142;
                } else if (i === 2) {
                  textRot = bisectorAngle; // 38.6°
                } else if (i === 3) {
                  textRot = 90; // 90°
                } else if (i === 4) {
                  textRot = bisectorAngle - 180; // -38.6°
                } else if (i === 5) {
                  textRot = bisectorAngle - 180; // 12.9°
                  textR = 142;
                } else if (i === 6) {
                  textRot = bisectorAngle - 180; // 64.3°
                }

                const bisectorRad = (bisectorAngle * Math.PI) / 180;
                const textX = 250 + textR * Math.cos(bisectorRad);
                const textY = 250 + textR * Math.sin(bisectorRad);

                return (
                  <g key={gift.id}>
                    {/* Slice wedge */}
                    <path
                      d={pathData}
                      fill={gift.color}
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                    />

                    {/* Slice Text Label */}
                    <g transform={`translate(${textX}, ${textY}) rotate(${textRot})`}>
                      {gift.lines ? (
                        <text
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="#FFFFFF"
                          fontSize="14.5"
                          fontWeight="800"
                          fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
                          letterSpacing="0.02em"
                          filter="url(#sliceTextShadow)"
                          className="select-none pointer-events-none"
                        >
                          <tspan x="0" dy="-9">{gift.lines[0]}</tspan>
                          <tspan x="0" dy="19">{gift.lines[1]}</tspan>
                        </text>
                      ) : (
                        <text
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="#FFFFFF"
                          fontSize="15"
                          fontWeight="800"
                          fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
                          letterSpacing="0.02em"
                          filter="url(#sliceTextShadow)"
                          className="select-none pointer-events-none"
                        >
                          {gift.label}
                        </text>
                      )}
                    </g>
                  </g>
                );
              })}

              {/* 5. CENTER HUB WITH WHITE HEART (MATCHING SCREENSHOT) */}
              <circle
                cx="250"
                cy="250"
                r="34"
                fill="#780C34"
                stroke="#FFFFFF"
                strokeWidth="3.5"
              />
              {/* Glossy reflection highlight on hub */}
              <path
                d="M 226 234 A 28 28 0 0 1 274 234 A 26 24 0 0 0 226 234 Z"
                fill="rgba(255,255,255,0.25)"
              />
              {/* Crisp Centered Heart Icon */}
              <g transform="translate(250, 250)">
                <path
                  d="M 0 -2 C -5 -11 -15 -9 -13 2 C -11 9 0 15 0 15 C 0 15 11 9 13 2 C 15 -9 5 -11 0 -2 Z"
                  fill="#FFFFFF"
                  transform="scale(0.9) translate(0, -6)"
                />
              </g>
            </svg>
          </div>
        </div>

        {/* SPIN BUTTON (MATCHING REFERENCE SCREENSHOT) */}
        <div className="mt-8 flex flex-col items-center justify-center">
          <button
            onClick={spinWheel}
            disabled={isSpinning}
            className={`px-12 py-3.5 rounded-full text-white text-base sm:text-lg font-bold tracking-wide shadow-[0_12px_28px_rgba(142,17,57,0.38)] transition-all cursor-pointer ${
              isSpinning
                ? 'bg-[#780C34]/80 opacity-80 cursor-not-allowed scale-98'
                : 'bg-[#9E1644] hover:bg-[#830E35] active:scale-95 hover:shadow-[0_16px_36px_rgba(142,17,57,0.5)]'
            }`}
          >
            {isSpinning ? 'Spinning with love...' : 'Spin the wheel'}
          </button>
        </div>
      </div>

      {/* WINNING GIFT VOUCHER MODAL */}
      {showVoucher && wonPrize && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowVoucher(false)}
        >
          <div
            className="bg-[#FFFDF9] rounded-[32px] p-6 sm:p-8 max-w-md w-full shadow-2xl border-2 border-rose-300 relative text-center animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowVoucher(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close voucher"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Sparkle badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-[#9C1B48] text-xs font-bold tracking-widest uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-spin" />
              <span>OFFICIAL GIFT VOUCHER</span>
            </div>

            {/* Prize Icon */}
            <div className="text-5xl my-2 filter drop-shadow-sm animate-bounce-gentle">
              {wonPrize.icon}
            </div>

            {/* Prize Category */}
            <p className="text-xs font-bold tracking-wider text-rose-500 uppercase mt-1">
              {wonPrize.category}
            </p>

            {/* Prize Label */}
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#780C34] tracking-tight mb-2 font-sans">
              {wonPrize.label}
            </h3>

            {/* Prize Description */}
            <p className="text-sm text-slate-700 leading-relaxed mb-6 px-2">
              {wonPrize.description}
            </p>

            {/* Perforated voucher separator */}
            <div className="relative my-4 flex items-center justify-center" aria-hidden="true">
              <div className="w-full border-b-2 border-dashed border-rose-200" />
              <div className="absolute bg-[#FFFDF9] px-3 text-rose-500 text-xs font-mono font-medium">
                COUPON NO. LOVE-2026 • VALID FOREVER
              </div>
            </div>

            {/* Handwritten sign-off pledge */}
            <div className="py-2 text-center">
              <p className="font-script text-xl text-[#9C1B48]">
                "Redeemable whenever your heart desires. With all my love"
              </p>
            </div>

            {/* Voucher Action Buttons */}
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                onClick={spinWheel}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold shadow-2xs transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Spin Again</span>
              </button>

              <button
                onClick={handleClaim}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#BE185D] hover:bg-[#9D174D] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 fill-white" />
                <span>Claim My Gift 💌</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
