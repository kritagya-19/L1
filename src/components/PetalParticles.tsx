import React, { useEffect, useRef, useCallback } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  length: number;
  width: number;
  opacity: number;
  speedY: number;
  swayAmplitude: number;
  swaySpeed: number;
  swayPhase: number;
  rotation: number;
  rotationSpeed: number;
  flip: number;
  flipSpeed: number;
  petalType: 'sakura' | 'rose' | 'delicate';
  colorBase: string;
  colorTip: string;
  layer: 'bg' | 'mid' | 'fg';
}

const PALETTES = [
  { base: 'rgba(244, 63, 94, 0.75)', tip: 'rgba(255, 228, 230, 0.75)' }, // Rose to blush
  { base: 'rgba(251, 113, 133, 0.7)', tip: 'rgba(254, 205, 211, 0.8)' }, // Soft sakura
  { base: 'rgba(225, 29, 72, 0.65)', tip: 'rgba(255, 241, 242, 0.85)' }, // Tender crimson-pink
  { base: 'rgba(244, 114, 182, 0.65)', tip: 'rgba(253, 232, 240, 0.8)' }, // Petal pink
  { base: 'rgba(253, 164, 175, 0.75)', tip: 'rgba(255, 255, 255, 0.85)' }, // Gentle blush-white
];

export const PetalParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const petalsRef = useRef<Petal[]>([]);
  const mouseRef = useRef<{ x: number; y: number; vx: number; vy: number; active: boolean }>({
    x: -9999,
    y: -9999,
    vx: 0,
    vy: 0,
    active: false,
  });

  // Spawn a single petal
  const createPetal = useCallback(
    (width: number, height: number, spawnAtTop: boolean = false): Petal => {
      const layerRoll = Math.random();
      const layer: 'bg' | 'mid' | 'fg' =
        layerRoll < 0.35 ? 'bg' : layerRoll < 0.75 ? 'mid' : 'fg';

      let sizeMultiplier = 1;
      let opacity = 0.65;
      let speedY = 1.0;

      if (layer === 'bg') {
        sizeMultiplier = 0.65 + Math.random() * 0.2;
        opacity = 0.35 + Math.random() * 0.25;
        speedY = 0.6 + Math.random() * 0.4;
      } else if (layer === 'mid') {
        sizeMultiplier = 0.9 + Math.random() * 0.3;
        opacity = 0.55 + Math.random() * 0.25;
        speedY = 0.9 + Math.random() * 0.5;
      } else {
        sizeMultiplier = 1.25 + Math.random() * 0.45;
        opacity = 0.7 + Math.random() * 0.25;
        speedY = 1.2 + Math.random() * 0.6;
      }

      const palette = PALETTES[Math.floor(Math.random() * PALETTES.length)];
      const types: ('sakura' | 'rose' | 'delicate')[] = ['sakura', 'rose', 'delicate'];
      const petalType = types[Math.floor(Math.random() * types.length)];

      const baseLength = 16 * sizeMultiplier;
      const baseWidth = 10 * sizeMultiplier;

      return {
        x: Math.random() * width,
        y: spawnAtTop ? -30 - Math.random() * 120 : Math.random() * height,
        size: sizeMultiplier,
        length: baseLength,
        width: baseWidth,
        opacity,
        speedY,
        swayAmplitude: (1.2 + Math.random() * 2.2) * (layer === 'fg' ? 1.4 : 1),
        swaySpeed: 0.015 + Math.random() * 0.02,
        swayPhase: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.025,
        flip: Math.random() * Math.PI * 2,
        flipSpeed: 0.02 + Math.random() * 0.035,
        petalType,
        colorBase: palette.base,
        colorTip: palette.tip,
        layer,
      };
    },
    []
  );

  // Initialize petals
  const initPetals = useCallback(
    (canvas: HTMLCanvasElement) => {
      const isMobile = window.innerWidth < 768;
      const count = isMobile ? 24 : 38;
      const newPetals: Petal[] = [];
      for (let i = 0; i < count; i++) {
        newPetals.push(createPetal(canvas.width, canvas.height, false));
      }
      petalsRef.current = newPetals;
    },
    [createPetal]
  );

  // Draw romantic organic petal shape
  const drawPetal = (
    ctx: CanvasRenderingContext2D,
    p: Petal,
    globalWind: number
  ) => {
    ctx.save();

    // Horizontal sway calculation
    const currentX = p.x + Math.sin(p.swayPhase) * (p.swayAmplitude * 20);
    ctx.translate(currentX, p.y);

    // Apply 3D tumbling through 2D rotation + 3D perspective flip (scale)
    ctx.rotate(p.rotation + globalWind * 0.2);
    const flipScale = Math.cos(p.flip);
    ctx.scale(flipScale, 1);

    ctx.globalAlpha = Math.max(0.05, Math.min(1, p.opacity));

    // Petal gradient fill
    const grad = ctx.createLinearGradient(0, -p.length / 2, 0, p.length / 2);
    grad.addColorStop(0, p.colorTip);
    grad.addColorStop(0.65, p.colorBase);
    grad.addColorStop(1, p.colorBase);
    ctx.fillStyle = grad;

    // Organic petal path
    ctx.beginPath();
    const halfW = p.width / 2;
    const halfL = p.length / 2;

    if (p.petalType === 'sakura') {
      ctx.moveTo(0, halfL);
      ctx.bezierCurveTo(-halfW * 1.25, halfL * 0.35, -halfW * 1.1, -halfL * 0.55, -halfW * 0.35, -halfL);
      ctx.quadraticCurveTo(0, -halfL * 0.82, halfW * 0.35, -halfL);
      ctx.bezierCurveTo(halfW * 1.1, -halfL * 0.55, halfW * 1.25, halfL * 0.35, 0, halfL);
    } else if (p.petalType === 'rose') {
      ctx.moveTo(0, halfL);
      ctx.bezierCurveTo(-halfW * 1.4, halfL * 0.3, -halfW * 1.3, -halfL * 0.6, 0, -halfL);
      ctx.bezierCurveTo(halfW * 1.3, -halfL * 0.6, halfW * 1.4, halfL * 0.3, 0, halfL);
    } else {
      ctx.moveTo(0, halfL * 1.1);
      ctx.bezierCurveTo(-halfW, halfL * 0.2, -halfW * 0.8, -halfL * 0.8, 0, -halfL);
      ctx.bezierCurveTo(halfW * 0.8, -halfL * 0.8, halfW, halfL * 0.2, 0, halfL * 1.1);
    }

    ctx.closePath();
    ctx.fill();

    // Soft central vein line highlight
    ctx.beginPath();
    ctx.moveTo(0, halfL * 0.85);
    ctx.lineTo(0, -halfL * 0.45);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 0.75 * p.size;
    ctx.stroke();

    // Delicate translucent border
    ctx.strokeStyle = 'rgba(255, 220, 230, 0.3)';
    ctx.lineWidth = 0.5 * p.size;
    ctx.stroke();

    ctx.restore();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (petalsRef.current.length === 0) {
        initPetals(canvas);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Track gentle mouse movement to create soft air displacement
    let lastMouseX = -1;
    let lastMouseY = -1;
    let mouseTimeout: number | undefined;

    const handleMouseMove = (e: MouseEvent) => {
      if (lastMouseX !== -1) {
        mouseRef.current.vx = (e.clientX - lastMouseX) * 0.15;
        mouseRef.current.vy = (e.clientY - lastMouseY) * 0.15;
      }
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;

      window.clearTimeout(mouseTimeout);
      mouseTimeout = window.setTimeout(() => {
        mouseRef.current.active = false;
        mouseRef.current.vx *= 0.5;
        mouseRef.current.vy *= 0.5;
      }, 150);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let time = 0;
    let isTabVisible = true;

    const handleVisibility = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const animate = () => {
      if (!isTabVisible) {
        animFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      time += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Global breeze oscillation
      const globalWind = Math.sin(time * 0.35) * 0.8 + 0.3;

      const petals = petalsRef.current;
      const mouse = mouseRef.current;

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];

        // Motion physics
        p.y += p.speedY;
        p.x += globalWind * (p.layer === 'fg' ? 1.2 : 0.8);
        p.swayPhase += p.swaySpeed;
        p.rotation += p.rotationSpeed;
        p.flip += p.flipSpeed;

        // Subtle interactive mouse air push
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          const maxDist = 140;
          if (distSq < maxDist * maxDist && distSq > 1) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / maxDist) * 2.2;
            p.x += (dx / dist) * force * 1.5;
            p.y += (dy / dist) * force * 0.8;
            p.rotation += force * 0.05;
          }
        }

        // Respawn when past bottom or edges
        if (p.y > canvas.height + 40) {
          p.y = -30 - Math.random() * 40;
          p.x = Math.random() * canvas.width;
        }
        if (p.x > canvas.width + 60) {
          p.x = -40;
        } else if (p.x < -60) {
          p.x = canvas.width + 40;
        }

        drawPetal(ctx, p, globalWind);
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.clearTimeout(mouseTimeout);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [initPetals, createPetal]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20 w-full h-full select-none"
      style={{ willChange: 'transform' }}
      aria-hidden="true"
    />
  );
};
