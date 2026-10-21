import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Heart } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface ScratchCardProps {
  title: string;
  subtitle: string;
  photoUrl: string;
  dateBadge: string;
  secretNote: string;
  onReveal?: () => void;
  isRevealed: boolean;
  setIsRevealed: (revealed: boolean) => void;
}

export const ScratchCard: React.FC<ScratchCardProps> = ({
  title,
  subtitle,
  photoUrl,
  dateBadge: _dateBadge,
  secretNote: _secretNote,
  onReveal,
  isRevealed,
  setIsRevealed,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; char: string }[]>([]);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  // Initialize and paint scratch cover
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(dpr, dpr);
    ctx.globalCompositeOperation = 'source-over';

    const width = rect.width;
    const height = rect.height;

    // 1. Warm romantic pink-rose gradient cover
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#DA657F');
    grad.addColorStop(0.5, '#CF5772');
    grad.addColorStop(1, '#C24A64');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // 2. Cute polka heart pattern
    ctx.fillStyle = '#E37A93';
    const spacingX = 36;
    const spacingY = 36;

    for (let y = 18; y < height; y += spacingY) {
      for (let x = 18; x < width; x += spacingX) {
        ctx.save();
        ctx.translate(x, y);
        ctx.font = '10px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('♥', 0, 0);
        ctx.restore();
      }
    }

    // 3. Dashed inner border matching screenshot
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
    ctx.lineWidth = 1.8;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(14, 14, width - 28, height - 28);
    ctx.setLineDash([]); // reset

    // 4. Center badge: "Scratch here / WITH YOUR FINGER"
    const badgeW = Math.min(180, width * 0.58);
    const badgeH = 70;
    const badgeX = (width - badgeW) / 2;
    const badgeY = (height - badgeH) / 2;

    // Badge shadow
    ctx.shadowColor = 'rgba(130, 24, 52, 0.25)';
    ctx.shadowBlur = 14;
    ctx.shadowOffsetY = 4;

    // Badge rounded rect
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 16);
    ctx.fill();

    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    // Badge text: cursive "Scratch here"
    ctx.fillStyle = '#9C1B48';
    ctx.font = 'italic 26px "Caveat", cursive';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Scratch here', width / 2, badgeY + 26);

    // Badge subtext: "WITH YOUR FINGER"
    ctx.fillStyle = '#9C1B48';
    ctx.font = '700 9px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '1.8px';
    ctx.fillText('WITH YOUR FINGER', width / 2, badgeY + 50);

    setScratchPercent(0);
  }, []);

  useEffect(() => {
    initCanvas();
    const handleResize = () => {
      if (!isRevealed) initCanvas();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initCanvas, isRevealed]);

  // Calculate scratched area
  const checkScratchPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width;
    const h = canvas.height;

    // Downsample checking for performance
    const step = Math.floor(18 * dpr);
    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;

    let transparentPixels = 0;
    let totalSamples = 0;

    for (let y = 0; y < h; y += step) {
      for (let x = 0; x < w; x += step) {
        const index = (y * w + x) * 4;
        const alpha = data[index + 3];
        if (alpha < 128) {
          transparentPixels++;
        }
        totalSamples++;
      }
    }

    const pct = Math.round((transparentPixels / totalSamples) * 100);
    setScratchPercent(pct);

    if (pct >= 42 && !isRevealed) {
      handleCompleteReveal();
    }
  }, [isRevealed]);

  const handleCompleteReveal = () => {
    setIsRevealed(true);
    setScratchPercent(100);
    romanticAudio.playRevealFanfare();
    if (onReveal) onReveal();
  };

  // Scratch action
  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    const x = (clientX - rect.left) * dpr;
    const y = (clientY - rect.top) * dpr;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 42 * dpr;

    if (lastPointRef.current) {
      ctx.beginPath();
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, 22 * dpr, 0, Math.PI * 2);
      ctx.fill();
    }

    lastPointRef.current = { x, y };

    // Emit heart/sparkle particle
    if (Math.random() < 0.4) {
      const chars = ['✨', '♥', '🌸', '💖'];
      const char = chars[Math.floor(Math.random() * chars.length)];
      const id = Date.now() + Math.random();
      setParticles((prev) => [...prev.slice(-15), { id, x: clientX - rect.left, y: clientY - rect.top, char }]);
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== id));
      }, 700);
    }

    // Play subtle chime sound effect
    if (Math.random() < 0.35) {
      romanticAudio.playScratchShimmer();
    }
  };

  // Pointer event handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setIsDrawing(true);
    lastPointRef.current = null;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    scratch(e.clientX, e.clientY);
    checkScratchPercentage();
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
    lastPointRef.current = null;
    checkScratchPercentage();
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6">
      {/* White rounded card container matching screenshot */}
      <div className="bg-white rounded-[32px] sm:rounded-[38px] shadow-[0_24px_70px_-15px_rgba(244,114,182,0.22)] border border-pink-100/60 p-5 sm:px-12 sm:py-9 text-center relative transition-all">
        {/* Heading matching screenshot */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#A21448] tracking-tight mb-2">
          {title}
        </h2>

        {/* Subtitle matching screenshot */}
        <p className="text-[#6D4250] text-sm sm:text-base font-normal max-w-lg mx-auto mb-3.5 leading-relaxed">
          {subtitle}
        </p>

        {/* Delicate divider with heart matching screenshot: — ♡ — */}
        <div className="flex items-center justify-center gap-3 my-4 text-[#FDA4AF]" aria-hidden="true">
          <div className="w-12 h-px bg-pink-200" />
          <Heart className="w-3.5 h-3.5 text-[#F43F5E] fill-none stroke-[1.8]" />
          <div className="w-12 h-px bg-pink-200" />
        </div>

        {/* Scratch Card Frame - increased width, slightly reduced height */}
        <div className="relative mx-auto my-2 w-full max-w-[380px] sm:max-w-[420px] aspect-[4/4.5] rounded-3xl overflow-hidden p-2 sm:p-2.5 bg-gradient-to-b from-pink-50 to-rose-100 shadow-[0_12px_36px_rgba(219,39,119,0.14)] ring-1 ring-pink-200/70">
          <div
            ref={containerRef}
            className="relative w-full h-full rounded-2xl overflow-hidden select-none bg-rose-950"
          >
            {/* UNDERNEATH LAYER: The Revealed Memory Photo (Full-bleed image, no text) */}
            <div className="absolute inset-0 w-full h-full overflow-hidden bg-rose-950">
              <img
                src={photoUrl}
                alt="Our favourite memory"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>

            {/* TOP SCRATCH CANVAS LAYER */}
            <canvas
              ref={canvasRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className={`absolute inset-0 w-full h-full cursor-coin touch-none transition-opacity duration-700 ${
                isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            />

            {/* Floating scratch particles */}
            {particles.map((p) => (
              <span
                key={p.id}
                className="absolute pointer-events-none animate-float-slow text-base"
                style={{
                  left: p.x,
                  top: p.y,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {p.char}
              </span>
            ))}
          </div>

          {/* Scratched progress indicator pill */}
          {!isRevealed && scratchPercent > 5 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-rose-700 shadow-md border border-rose-200/50 flex items-center gap-1.5 pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              {scratchPercent}% revealed
            </div>
          )}
        </div>

        {/* Action button below scratch card matching screenshot: "♡ Reveal our memory" */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          {!isRevealed && (
            <button
              onClick={handleCompleteReveal}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#FDF2F5] hover:bg-[#FCE7EF] active:scale-[0.98] border border-[#F9A8D4]/60 text-[#BE185D] text-sm font-semibold tracking-wide transition-all shadow-xs hover:shadow-md cursor-pointer group"
            >
              <Heart className="w-4 h-4 text-[#E11D48] transition-transform group-hover:scale-125" />
              <span>Reveal our memory</span>
            </button>
          )}
        </div>

        {/* Footer sign-off matching screenshot: "Made with all my love ❤️" */}
        <p className="mt-8 font-script text-xl sm:text-2xl text-[#BE185D] tracking-wide select-none">
          Made with all my love ❤️
        </p>
      </div>
    </div>
  );
};
