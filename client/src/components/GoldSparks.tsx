import React, { useEffect, useRef } from "react";

export default function GoldSparks() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Partículas de polvo de oro ambiental de lujo
    const particleCount = 38;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.6,
      speedY: -(Math.random() * 0.45 + 0.15),
      speedX: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.6 + 0.2,
      maxAlpha: Math.random() * 0.65 + 0.25,
      fadeSpeed: Math.random() * 0.008 + 0.003,
      fadingIn: Math.random() > 0.5,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Actualizar posición
        p.y += p.speedY;
        p.x += p.speedX;

        // Rebote o reinicio cuando sube
        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        // Respiración de brillo (fading)
        if (p.fadingIn) {
          p.alpha += p.fadeSpeed;
          if (p.alpha >= p.maxAlpha) p.fadingIn = false;
        } else {
          p.alpha -= p.fadeSpeed;
          if (p.alpha <= 0.1) p.fadingIn = true;
        }

        // Dibujar partícula dorada con halo
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(255, 236, 168, 0.75)";
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="gold-sparks-canvas pointer-events-none absolute inset-0 w-full h-full z-2"
      aria-hidden="true"
    />
  );
}
