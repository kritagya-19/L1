import React, { useEffect, useRef } from 'react';

interface HeartConfettiProps {
  trigger: boolean;
  onComplete?: () => void;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  scale: number;
}

const HEART_COLORS = [
  '#FF2E63',
  '#FF7597',
  '#FF007F',
  '#F43F5E',
  '#FB7185',
  '#FDA4AF',
  '#FFE4E6',
  '#F59E0B',
];

export const HeartConfetti: React.FC<HeartConfettiProps> = ({ trigger, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Spawn 75 heart particles from center
    const particles: Particle[] = [];
    const originX = canvas.width / 2;
    const originY = canvas.height * 0.45;

    for (let i = 0; i < 75; i++) {
      const angle = (Math.PI * 2 * i) / 75 + (Math.random() - 0.5);
      const velocity = 4 + Math.random() * 9;
      particles.push({
        x: originX + (Math.random() - 0.5) * 60,
        y: originY + (Math.random() - 0.5) * 40,
        size: 14 + Math.random() * 18,
        color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
        speedX: Math.cos(angle) * velocity,
        speedY: Math.sin(angle) * velocity - 3,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.12,
        opacity: 1,
        scale: 0.2 + Math.random() * 0.8,
      });
    }

    const drawHeart = (c: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, rotation: number, opacity: number) => {
      c.save();
      c.translate(x, y);
      c.rotate(rotation);
      c.globalAlpha = Math.max(0, opacity);
      c.fillStyle = color;

      // Draw heart path
      const s = size / 20;
      c.beginPath();
      c.moveTo(0, 0);
      c.bezierCurveTo(-10 * s, -10 * s, -20 * s, 5 * s, 0, 20 * s);
      c.bezierCurveTo(20 * s, 5 * s, 10 * s, -10 * s, 0, 0);
      c.fill();
      c.restore();
    };

    let startTime = performance.now();

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const elapsed = time - startTime;

      let anyAlive = false;

      particles.forEach((p) => {
        // Physics update
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += 0.15; // Gravity
        p.speedX *= 0.985; // Drag
        p.rotation += p.rotationSpeed;

        if (elapsed > 1200) {
          p.opacity -= 0.018;
        }

        if (p.opacity > 0 && p.y < canvas.height + 50) {
          anyAlive = true;
          drawHeart(ctx, p.x, p.y, p.size, p.color, p.rotation, p.opacity);
        }
      });

      if (anyAlive && elapsed < 3500) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (onComplete) onComplete();
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [trigger, onComplete]);

  if (!trigger) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
    />
  );
};
