import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface LoadingScreenProps {
  partnerName: string;
  onFinish: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ partnerName, onFinish }) => {
  const [animationStage, setAnimationStage] = useState<'drawing' | 'pulse' | 'ready'>('drawing');
  const [isUnlocking, setIsUnlocking] = useState(false);

  useEffect(() => {
    // Stage 1: Inscription stroke (0s - 1.4s)
    // Stage 2: Heartbeat pulse begins (1.4s)
    const pulseTimer = setTimeout(() => {
      setAnimationStage('pulse');
    }, 1400);

    // Stage 3: Wax seal and tap prompt fully ready (2.2s)
    const readyTimer = setTimeout(() => {
      setAnimationStage('ready');
    }, 2200);

    return () => {
      clearTimeout(pulseTimer);
      clearTimeout(readyTimer);
    };
  }, []);

  const handleTapToOpen = () => {
    if (isUnlocking) return;
    setIsUnlocking(true);

    // Play tactile envelope/seal opening audio
    romanticAudio.playEnvelopeOpenSound();

    // Smooth curtain reveal
    setTimeout(() => {
      onFinish();
    }, 650);
  };

  const displayName = partnerName?.trim() || 'Maya';

  return (
    <div
      onClick={handleTapToOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleTapToOpen();
        }
      }}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between py-12 px-6 bg-[#FFFDFB] select-none cursor-pointer overflow-hidden transition-all duration-700 ease-out ${
        isUnlocking ? 'opacity-0 scale-[1.03] pointer-events-none' : 'opacity-100 scale-100'
      }`}
      aria-label="Tap anywhere to open your love note"
    >
      {/* 1. Atmospheric Ambient Rose Mist Vignette */}
      <div
        className="absolute inset-0 pointer-events-none opacity-90"
        style={{
          background: `
            radial-gradient(circle at 50% 38%, rgba(254, 226, 235, 0.65) 0%, rgba(255, 245, 248, 0.4) 45%, transparent 75%),
            radial-gradient(circle at 15% 15%, rgba(253, 230, 238, 0.4) 0%, transparent 60%),
            radial-gradient(circle at 85% 85%, rgba(254, 235, 242, 0.45) 0%, transparent 60%)
          `,
        }}
      />

      {/* 2. Delicate Archival Paper Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, rgba(139, 15, 62, 0.04) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Top Quiet Spacing */}
      <div className="w-full h-8" />

      {/* Center Stage: Handwritten Inscription of Maya */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-xl px-4 my-auto">
        {/* Animated Cursive Name */}
        <div className="relative select-none py-2">
          <h1
            className={`font-script text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#8B0F3E] tracking-tight leading-tight break-words px-2 transition-all duration-700 ${
              animationStage === 'drawing'
                ? 'animate-cursive-draw'
                : 'animate-heartbeat-pulse text-[#8B0F3E]'
            }`}
            style={{
              textShadow: '0 4px 24px rgba(225, 29, 72, 0.18)',
            }}
          >
            {displayName}
          </h1>

          {/* Elegant Calligraphic Ink Flourish Underline */}
          <div className="w-40 sm:w-56 md:w-64 mx-auto -mt-3 sm:-mt-4 opacity-75">
            <svg
              viewBox="0 0 280 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto text-[#BE185D]"
            >
              <path
                d="M 12 18 C 70 8, 140 24, 210 12 C 235 7, 260 16, 268 20"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="animate-stroke-flourish"
              />
            </svg>
          </div>
        </div>

        {/* Poetic Whisper Dedication */}
        <p
          className={`font-serif-love italic text-base sm:text-lg text-[#6E2E41] mt-5 max-w-md transition-all duration-1000 ${
            animationStage !== 'drawing'
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-3'
          }`}
        >
          for the one who makes time stand still...
        </p>
      </div>

      {/* Bottom Stage: Tactile Wax Seal & Screen Tap Prompt */}
      <div
        className={`relative z-10 flex flex-col items-center gap-3.5 transition-all duration-1000 ${
          animationStage === 'ready'
            ? 'opacity-100 translate-y-0'
            : 'opacity-85 translate-y-1'
        }`}
      >
        {/* Tactile Crimson Wax Seal Stamp */}
        <div
          className={`relative group cursor-pointer transition-transform duration-300 ${
            isUnlocking ? 'scale-125 animate-ping opacity-90' : 'hover:scale-105 active:scale-95'
          }`}
        >
          {/* Ambient Glow Aura */}
          <div className="absolute -inset-2.5 rounded-full bg-rose-400/20 blur-md pointer-events-none group-hover:bg-rose-400/35 transition-colors" />

          {/* Organic Scalloped Wax Body */}
          <div
            className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full flex items-center justify-center shadow-[0_12px_28px_rgba(110,13,44,0.38)] border border-[#C2315E]/60 animate-wax-breathe"
            style={{
              background:
                'radial-gradient(circle at 35% 30%, #C22557 0%, #9E1442 45%, #660826 100%)',
            }}
          >
            {/* Debossed Inner Ring */}
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#E85B87]/30 flex items-center justify-center shadow-inner bg-[#8A0E35]/40">
              {/* Center Heart Impress Crest */}
              <Heart className="w-5 h-5 text-[#FFE4EC] fill-[#FFE4EC] filter drop-shadow-[0_1px_2px_rgba(60,4,20,0.7)]" />
            </div>
          </div>
        </div>

        {/* Ethereal Tap Prompt */}
        <div className="text-center">
          <p className="font-sans text-xs tracking-widest uppercase font-semibold text-[#8B0F3E] flex items-center justify-center gap-2">
            <span>Tap anywhere to open</span>
          </p>
          <div className="w-12 h-px bg-pink-300/80 mx-auto mt-1.5 animate-pulse" />
        </div>
      </div>

      {/* Custom Keyframe Animations */}
      <style>{`
        @keyframes cursiveDraw {
          0% {
            clip-path: inset(0 100% 0 0);
            opacity: 0.15;
            filter: blur(4px);
            transform: translateX(-8px) scale(0.97);
          }
          40% {
            opacity: 0.9;
            filter: blur(1px);
          }
          100% {
            clip-path: inset(0 0 0 0);
            opacity: 1;
            filter: blur(0px);
            transform: translateX(0px) scale(1);
          }
        }

        @keyframes strokeFlourish {
          0% {
            stroke-dasharray: 280;
            stroke-dashoffset: 280;
            opacity: 0;
          }
          30% {
            opacity: 0.5;
          }
          100% {
            stroke-dasharray: 280;
            stroke-dashoffset: 0;
            opacity: 0.85;
          }
        }

        @keyframes heartbeatPulse {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 4px 20px rgba(225, 29, 72, 0.16));
          }
          14% {
            transform: scale(1.042);
            filter: drop-shadow(0 6px 28px rgba(225, 29, 72, 0.42));
          }
          28% {
            transform: scale(1);
            filter: drop-shadow(0 4px 20px rgba(225, 29, 72, 0.16));
          }
          42% {
            transform: scale(1.024);
            filter: drop-shadow(0 5px 22px rgba(225, 29, 72, 0.3));
          }
          58% {
            transform: scale(1);
            filter: drop-shadow(0 4px 20px rgba(225, 29, 72, 0.16));
          }
        }

        @keyframes waxBreathe {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 10px 24px rgba(110, 13, 44, 0.32);
          }
          50% {
            transform: scale(1.045);
            box-shadow: 0 14px 34px rgba(110, 13, 44, 0.46), 0 0 0 6px rgba(244, 63, 94, 0.15);
          }
        }

        .animate-cursive-draw {
          animation: cursiveDraw 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-stroke-flourish {
          animation: strokeFlourish 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s forwards;
        }

        .animate-heartbeat-pulse {
          animation: heartbeatPulse 2.8s ease-in-out infinite;
        }

        .animate-wax-breathe {
          animation: waxBreathe 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
