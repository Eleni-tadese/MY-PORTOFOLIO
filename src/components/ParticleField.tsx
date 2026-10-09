"use client";

import { useEffect, useRef } from "react";

const LINK_DIST = 120;

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let raf = 0;
    let visible = true;
    let particles: { x: number; y: number; r: number; vx: number; vy: number }[] =
      [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(70, Math.floor((width * height) / 15000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.5,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
      }));
      draw();
    };

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      const animate = !reduced.matches;
      for (const p of particles) {
        if (animate) {
          p.x = (p.x + p.vx + width) % width;
          p.y = (p.y + p.vy + height) % height;
        }
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(227,255,89,0.5)";
        ctx!.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK_DIST) {
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.strokeStyle = `rgba(227,255,89,${0.14 * (1 - d / LINK_DIST)})`;
            ctx!.stroke();
          }
        }
      }
    }

    const loop = () => {
      if (visible && !reduced.matches) draw();
      raf = requestAnimationFrame(loop);
    };

    resize();
    raf = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-60 [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_80%)]"
    />
  );
}
