import React from "react";

interface SelvaLogoProps {
  variant?: "full" | "mark" | "stacked" | "compact";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  glow?: boolean;
}

export default function SelvaLogo({
  variant = "full",
  size = "md",
  className = "",
  glow = true,
}: SelvaLogoProps) {
  const sizeMap = {
    sm: { mark: 28, textSelva: "text-base", textSub: "text-[8px]" },
    md: { mark: 38, textSelva: "text-xl", textSub: "text-[9px]" },
    lg: { mark: 52, textSelva: "text-3xl", textSub: "text-[11px]" },
    xl: { mark: 72, textSelva: "text-4xl", textSub: "text-[13px]" },
  };

  const currentSize = sizeMap[size];

  // Emblema SVG de Élite: Corona de Oro + Vinilo + Monograma SMG
  const Emblem = ({ width = currentSize.mark, height = currentSize.mark }: { width?: number; height?: number }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`selva-logo-svg flex-shrink-0 ${glow ? "drop-shadow-[0_0_12px_rgba(212,175,55,0.45)]" : ""}`}
    >
      <defs>
        {/* Degradado Oro Metálico Pulido 24K */}
        <linearGradient id="goldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF3B8" />
          <stop offset="22%" stopColor="#F5D77F" />
          <stop offset="48%" stopColor="#D4AF37" />
          <stop offset="78%" stopColor="#AA771C" />
          <stop offset="100%" stopColor="#E5C158" />
        </linearGradient>

        <linearGradient id="goldLinearSoft" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#C59B27" />
          <stop offset="50%" stopColor="#FFECA8" />
          <stop offset="100%" stopColor="#AA771C" />
        </linearGradient>

        <linearGradient id="goldGlowRadial" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FFF7D6" />
          <stop offset="100%" stopColor="#996515" />
        </linearGradient>

        <radialGradient id="discBackground" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1a1813" />
          <stop offset="60%" stopColor="#0c0c0d" />
          <stop offset="100%" stopColor="#050506" />
        </radialGradient>
      </defs>

      {/* Fondo Disco Obsidiana */}
      <circle cx="50" cy="50" r="46" fill="url(#discBackground)" stroke="url(#goldMetallic)" strokeWidth="1.8" />
      
      {/* Anillo de Precisión Exterior estilo Joyería / Reloj de Lujo */}
      <circle cx="50" cy="50" r="41" stroke="url(#goldLinearSoft)" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.75" />
      <circle cx="50" cy="50" r="37" stroke="url(#goldMetallic)" strokeWidth="0.6" opacity="0.4" />

      {/* Corona Élite Superior */}
      <path
        d="M32 35L36 44L50 31L64 44L68 35L66 49H34L32 35Z"
        fill="url(#goldMetallic)"
        stroke="#FFECA8"
        strokeWidth="0.75"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="33" r="1.5" fill="#FFF7D6" />
      <circle cx="50" cy="28.5" r="2.2" fill="#FFF7D6" />
      <circle cx="68" cy="33" r="1.5" fill="#FFF7D6" />

      {/* Monograma Central S estilizada con líneas dinámicas de audio */}
      <path
        d="M58 48C56 46.5 53 45.8 49 45.8C43.5 45.8 40.5 48.2 40.5 51.5C40.5 55.2 44.2 56.8 50.8 58.2C58.2 59.8 62.5 62.5 62.5 67.5C62.5 73.8 56.8 77.2 48.2 77.2C42.2 77.2 37.5 75.2 34.5 72.8L37.2 68.5C39.8 70.8 43.8 72.4 48.2 72.4C53.8 72.4 57 70.2 57 67.2C57 63.8 53.5 62.2 46.8 60.8C39.5 59.2 35.2 56.2 35.2 51.5C35.2 45.5 41 41.5 49.5 41.5C54.8 41.5 59.2 43.2 61.5 45L58 48Z"
        fill="url(#goldGlowRadial)"
      />

      {/* Hojas / Rayos Geométricos de la Selva (Acentos Dorados Laterales) */}
      <path d="M16 50C16 42 21 34 26 29C24 35 24 45 27 50C24 55 24 65 26 71C21 66 16 58 16 50Z" fill="url(#goldMetallic)" opacity="0.65" />
      <path d="M84 50C84 42 79 34 74 29C76 35 76 45 73 50C76 55 76 65 74 71C79 66 84 58 84 50Z" fill="url(#goldMetallic)" opacity="0.65" />

      {/* Diamante inferior de autenticidad */}
      <polygon points="50,81 52.5,84.5 50,88 47.5,84.5" fill="url(#goldMetallic)" />
    </svg>
  );

  if (variant === "mark") {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <Emblem />
      </div>
    );
  }

  if (variant === "stacked") {
    return (
      <div className={`inline-flex flex-col items-center text-center gap-2 ${className}`}>
        <Emblem width={sizeMap[size].mark * 1.3} height={sizeMap[size].mark * 1.3} />
        <div className="flex flex-col items-center">
          <span className={`font-serif tracking-[0.22em] font-extrabold uppercase text-gold-gradient ${currentSize.textSelva}`}>
            SELVA
          </span>
          <span className={`tracking-[0.38em] font-medium uppercase text-gold-sub ${currentSize.textSub} mt-0.5`}>
            MUSIC GROUP
          </span>
        </div>
      </div>
    );
  }

  // Variant "full" (Horizontal por defecto para el Header / Barra de Navegación)
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <Emblem />
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-center gap-1.5">
          <span className={`selva-brand-title font-bold tracking-[0.18em] uppercase ${currentSize.textSelva}`}>
            SELVA
          </span>
          <span className="selva-gold-dot w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
        </div>
        <span className={`selva-brand-sub font-semibold tracking-[0.32em] uppercase text-[#C5A047] ${currentSize.textSub} mt-1`}>
          MUSIC GROUP
        </span>
      </div>
    </div>
  );
}
