import React, { useEffect, useRef, useState } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  flip: number;
  flipSpeed: number;
  opacity: number;
  color: string;
  type: 'petal' | 'sparkle' | 'miniHeart';
}

const PETAL_COLORS = [
  'rgba(247, 185, 203, 0.85)', // Blush rose
  'rgba(255, 209, 220, 0.8)',  // Soft pink
  'rgba(242, 168, 188, 0.75)', // Rose petal
  'rgba(250, 218, 221, 0.9)',  // Fairy pink
  'rgba(253, 226, 214, 0.8)',  // Warm peach petal
  'rgba(235, 150, 172, 0.7)',  // Crimson rose tip
];

export const PetalCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [density, setDensity] = useState<'gentle' | 'romantic' | 'fairytale'>('romantic');
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const mouseWindRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const count = density === 'gentle' ? 24 : density === 'romantic' ? 45 : 70;
    const petals: Petal[] = [];

    const createPetal = (startY?: number): Petal => {
      const isSparkle = Math.random() < 0.2;
      const isMiniHeart = !isSparkle && Math.random() < 0.1;
      return {
        x: Math.random() * width,
        y: startY !== undefined ? startY : Math.random() * height,
        size: isSparkle ? 2 + Math.random() * 3 : isMiniHeart ? 8 + Math.random() * 6 : 10 + Math.random() * 14,
        speedX: -1 + Math.random() * 2,
        speedY: 0.8 + Math.random() * 1.6,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        flip: Math.random() * Math.PI,
        flipSpeed: 0.02 + Math.random() * 0.04,
        opacity: 0.5 + Math.random() * 0.45,
        color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
        type: isSparkle ? 'sparkle' : isMiniHeart ? 'miniHeart' : 'petal',
      };
    };

    for (let i = 0; i < count; i++) {
      petals.push(createPetal());
    }

    let lastTime = performance.now();

    const drawHeart = (ctx: CanvasRenderingContext2D, size: number) => {
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(0, topCurveHeight);
      // top left curve
      ctx.bezierCurveTo(
        -size / 2, -topCurveHeight,
        -size, size / 3,
        0, size
      );
      // top right curve
      ctx.bezierCurveTo(
        size, size / 3,
        size / 2, -topCurveHeight,
        0, topCurveHeight
      );
      ctx.closePath();
      ctx.fill();
    };

    const drawPetal = (ctx: CanvasRenderingContext2D, p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.scale(Math.cos(p.flip), 1);
      ctx.globalAlpha = p.opacity;

      if (p.type === 'sparkle') {
        // Glowing starlight sparkle
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 2);
        grad.addColorStop(0, 'rgba(255, 235, 170, 0.95)');
        grad.addColorStop(0.5, 'rgba(245, 194, 207, 0.6)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 2, 0, Math.PI * 2);
        ctx.fill();

        // 4-point star glint
        ctx.fillStyle = 'rgba(255, 250, 230, 0.9)';
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 1.8);
        ctx.lineTo(p.size * 0.4, 0);
        ctx.lineTo(0, p.size * 1.8);
        ctx.lineTo(-p.size * 0.4, 0);
        ctx.closePath();
        ctx.fill();
      } else if (p.type === 'miniHeart') {
        ctx.fillStyle = p.color;
        drawHeart(ctx, p.size);
      } else {
        // Realistic curved rose petal geometry
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(
          p.size * 0.9, -p.size * 0.7,
          p.size * 0.9, p.size * 0.7,
          0, p.size
        );
        ctx.bezierCurveTo(
          -p.size * 0.9, p.size * 0.7,
          -p.size * 0.9, -p.size * 0.7,
          0, -p.size
        );
        ctx.fill();

        // Subtle petal vein highlight
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 0.8);
        ctx.quadraticCurveTo(p.size * 0.1, 0, 0, p.size * 0.7);
        ctx.stroke();
      }

      ctx.restore();
    };

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Dampen mouse wind
      mouseWindRef.current.x *= 0.95;
      mouseWindRef.current.y *= 0.95;

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];

        // Interaction with mouse/touch cursor
        const dx = p.x - mousePos.x;
        const dy = p.y - mousePos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const force = (1 - dist / 140) * 2.5;
          p.x += (dx / dist) * force * 3;
          p.y += (dy / dist) * force * 2;
          p.rotationSpeed += (Math.random() - 0.5) * 0.05;
        }

        // Apply natural wind oscillations
        const windSway = Math.sin(time * 0.001 + p.y * 0.01) * 0.8;
        p.x += (p.speedX + windSway + mouseWindRef.current.x) * (dt * 60);
        p.y += (p.speedY + mouseWindRef.current.y) * (dt * 60);
        p.rotation += p.rotationSpeed;
        p.flip += p.flipSpeed;

        // Reset if offscreen
        if (p.y > height + 25) {
          petals[i] = createPetal(-20);
        } else if (p.x < -30) {
          p.x = width + 20;
        } else if (p.x > width + 30) {
          p.x = -20;
        }

        drawPetal(ctx, p);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = (e.clientX - mousePos.x) * 0.04;
      mouseWindRef.current.x = Math.max(-3, Math.min(3, deltaX));
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        setMousePos({ x: touch.clientX, y: touch.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-30 h-full w-full"
        style={{ mixBlendMode: 'normal' }}
      />
      
      {/* Floating Petal Density & Aesthetic Controls in subtle bottom-right */}
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-1.5 rounded-full border border-[#E9D5DA] bg-[#FFF9F7]/90 px-3 py-1.5 shadow-sm backdrop-blur-md">
        <span className="text-[11px] font-medium tracking-wide text-[#7C485A]">Petals:</span>
        <button
          onClick={() => setDensity('gentle')}
          className={`rounded-full px-2 py-0.5 text-[11px] font-medium transition-all ${
            density === 'gentle' ? 'bg-[#F2BAC9] text-[#4A1828] shadow-xs' : 'text-[#875567] hover:text-[#4A1828]'
          }`}
          title="Gentle falling petals"
        >
          Gentle
        </button>
        <button
          onClick={() => setDensity('romantic')}
          className={`rounded-full px-2 py-0.5 text-[11px] font-medium transition-all ${
            density === 'romantic' ? 'bg-[#F2BAC9] text-[#4A1828] shadow-xs' : 'text-[#875567] hover:text-[#4A1828]'
          }`}
          title="Romantic shower of petals"
        >
          Romantic
        </button>
        <button
          onClick={() => setDensity('fairytale')}
          className={`rounded-full px-2 py-0.5 text-[11px] font-medium transition-all ${
            density === 'fairytale' ? 'bg-[#F2BAC9] text-[#4A1828] shadow-xs' : 'text-[#875567] hover:text-[#4A1828]'
          }`}
          title="Dreamy fairytale flurry"
        >
          Fairy Tale
        </button>
      </div>
    </>
  );
};
