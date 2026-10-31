import {
  ChevronDown,
  ListMusic,
  Minimize2,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import type { Track } from "@/lib/wilorContent";
import SelvaLogo from "./SelvaLogo";

interface AudioPlayerProps {
  tracks: Track[];
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlayTrack: (track: Track) => void;
  onTogglePlay: () => void;
  onNextTrack: () => void;
  onPrevTrack: () => void;
  onSeekBy?: (seconds: number) => void;
}

declare global {
  interface Window {
    selvaAudioPlayer?: any;
  }
}

// Convertidor de duración "mm:ss" a segundos
function parseDurationSecs(durStr?: string): number {
  if (!durStr) return 180;
  const parts = durStr.split(":").map(Number);
  if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
    return parts[0] * 60 + parts[1];
  }
  if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  return 180;
}

export default function AudioPlayer({
  tracks,
  currentTrack,
  isPlaying,
  onPlayTrack,
  onTogglePlay,
  onNextTrack,
  onPrevTrack,
}: AudioPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.9);
  const [isMuted, setIsMuted] = useState(false);
  const [isBubbleMode, setIsBubbleMode] = useState(true); // Inicia en modo disco compacto

  const activeTrack = currentTrack || tracks[0];
  const expectedDuration = parseDurationSecs(activeTrack?.duration);
  const totalDuration = duration > 0 ? duration : expectedDuration;

  // Posición movible libremente en pantalla (Draggable)
  const [fabPos, setFabPos] = useState<{ x: number; y: number } | null>(() => {
    try {
      const saved = localStorage.getItem("selva_fab_pos");
      if (saved) return JSON.parse(saved);
    } catch {}
    return null;
  });

  const dragRef = useRef<{
    isDragging: boolean;
    startX: number;
    startY: number;
    initialX: number;
    initialY: number;
    hasDragged: boolean;
  }>({
    isDragging: false,
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
    hasDragged: false,
  });

  // Manejo de arrastre sin bloquear los clics de ratón en PC
  const handlePointerDownFab = (e: React.PointerEvent<HTMLElement>) => {
    if (e.button !== 0) return; // Solo clic primario

    const rect = e.currentTarget.getBoundingClientRect();
    dragRef.current = {
      isDragging: false,
      startX: e.clientX,
      startY: e.clientY,
      initialX: rect.left,
      initialY: rect.top,
      hasDragged: false,
    };

    const handlePointerMove = (ev: PointerEvent) => {
      const dx = ev.clientX - dragRef.current.startX;
      const dy = ev.clientY - dragRef.current.startY;

      // Solo activar arrastre si el movimiento supera el umbral de 6px
      if (!dragRef.current.isDragging && Math.hypot(dx, dy) > 6) {
        dragRef.current.isDragging = true;
        dragRef.current.hasDragged = true;
      }

      if (dragRef.current.isDragging) {
        const fabSize = 58;
        const pad = 12;
        const maxX = Math.max(pad, window.innerWidth - fabSize - pad);
        const maxY = Math.max(pad, window.innerHeight - fabSize - pad);

        const targetX = Math.min(Math.max(pad, dragRef.current.initialX + dx), maxX);
        const targetY = Math.min(Math.max(pad, dragRef.current.initialY + dy), maxY);

        setFabPos({ x: targetX, y: targetY });
      }
    };

    const handlePointerUp = () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);

      if (dragRef.current.hasDragged) {
        setFabPos((curr) => {
          if (curr) {
            try {
              localStorage.setItem("selva_fab_pos", JSON.stringify(curr));
            } catch {}
          }
          return curr;
        });
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);
  };

  // Ocultar dock móvil cuando el reproductor ocupa media pantalla
  useEffect(() => {
    if (!isBubbleMode) {
      document.body.classList.add("has-expanded-audio-player");
    } else {
      document.body.classList.remove("has-expanded-audio-player");
    }
    return () => {
      document.body.classList.remove("has-expanded-audio-player");
    };
  }, [isBubbleMode]);

  // Enviar comandos al iframe de YouTube de forma universal
  const sendIframeCommand = (func: string, args: any[] = []) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: "command", func, args }),
          "*"
        );
      } catch (e) {}
    }
  };

  // Escuchar mensajes de estado de YouTube
  useEffect(() => {
    const handleWindowMessage = (e: MessageEvent) => {
      try {
        const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        if (!data) return;

        if (data.event === "onStateChange") {
          // 0 = terminó la canción
          if (data.info === 0) {
            onNextTrack();
          }
        }
        if (data.info) {
          if (typeof data.info.duration === "number" && data.info.duration > 0) {
            setDuration(data.info.duration);
          }
          if (typeof data.info.currentTime === "number") {
            setCurrentTime(data.info.currentTime);
          }
        }
      } catch (err) {}
    };

    window.addEventListener("message", handleWindowMessage);
    return () => window.removeEventListener("message", handleWindowMessage);
  }, [onNextTrack]);

  // Manejo de Play / Pause sincronizado con el iframe
  useEffect(() => {
    if (isPlaying) {
      sendIframeCommand("playVideo");
      sendIframeCommand("unMute");
      sendIframeCommand("setVolume", [Math.round((isMuted ? 0 : volume) * 100)]);
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
    } else {
      sendIframeCommand("pauseVideo");
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Reiniciar tiempo al cambiar de pista
  useEffect(() => {
    setCurrentTime(0);
    setDuration(expectedDuration);
  }, [activeTrack?.id]);

  // Timer para mover suavemente la barra de tiempo mientras se reproduce
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentTime((prev) => {
        if (totalDuration > 0 && prev >= totalDuration) {
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying, totalDuration]);

  // Control directo de Play / Pause garantizado al clic
  const handleTogglePlayDirect = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    if (!isPlaying) {
      sendIframeCommand("unMute");
      sendIframeCommand("setVolume", [Math.round((isMuted ? 0 : volume) * 100)]);
      sendIframeCommand("playVideo");
    } else {
      sendIframeCommand("pauseVideo");
    }
    onTogglePlay();
  };

  // Abrir consola de media pantalla al dar clic al disco
  const handleOpenHalfScreen = (e: React.MouseEvent) => {
    if (dragRef.current.hasDragged) return;
    setIsBubbleMode(false);
    if (!isPlaying) {
      handleTogglePlayDirect(e);
    }
  };

  const handleDirectSeek = (seconds: number) => {
    const target = Math.max(0, Math.min(seconds, totalDuration));
    setCurrentTime(target);
    sendIframeCommand("seekTo", [target, true]);
    if (audioRef.current) {
      audioRef.current.currentTime = target;
    }
  };

  const handleSeekBy = (offsetSeconds: number) => {
    handleDirectSeek(currentTime + offsetSeconds);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDirectSeek(Number(e.target.value));
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (isMuted) setIsMuted(false);
    sendIframeCommand("setVolume", [Math.round(newVol * 100)]);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sendIframeCommand(nextMuted ? "mute" : "unMute");
    if (!nextMuted) {
      sendIframeCommand("setVolume", [Math.round(volume * 100)]);
    }
    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
  };

  // Exponer API global
  useEffect(() => {
    window.selvaAudioPlayer = {
      seekBy: (offset: number) => handleSeekBy(offset),
      seekTo: (seconds: number) => handleDirectSeek(seconds),
      currentTime,
      duration: totalDuration,
      isPlaying,
      openHalfScreen: () => setIsBubbleMode(false),
      closeHalfScreen: () => setIsBubbleMode(true),
    };
  }, [currentTime, totalDuration, isPlaying]);

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (!activeTrack) return null;

  return (
    <>
      {/* Audio nativo para archivos de sonido directos */}
      {activeTrack.audioUrl && (
        <audio
          ref={audioRef}
          src={activeTrack.audioUrl}
          onEnded={onNextTrack}
        />
      )}

      {/* =========================================================================
          1. MODO BURBUJA FLOTANTE (DRAGGABLE Y RESPONSIVO A CLICS EN PC Y CELULAR)
          ========================================================================= */}
      {isBubbleMode ? (
        <>
          {/* Iframe continuo en segundo plano para que el sonido no se corte al minimizar */}
          <div className="selva-bg-monitor-minimized" aria-hidden="true">
            <iframe
              ref={iframeRef}
              key={activeTrack.youtubeId}
              src={`https://www.youtube-nocookie.com/embed/${activeTrack.youtubeId}?autoplay=${isPlaying ? 1 : 0}&enablejsapi=1&playsinline=1&rel=0`}
              title={activeTrack.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="halfscreen-iframe"
            />
          </div>

          <aside
            className="selva-circle-player is-movable"
            aria-label="Reproductor circular flotante SELVA"
            style={
              fabPos
                ? {
                    left: `${fabPos.x}px`,
                    top: `${fabPos.y}px`,
                    right: "auto",
                    bottom: "auto",
                    position: "fixed",
                  }
                : undefined
            }
            onPointerDown={handlePointerDownFab}
          >
            <div
              className={`circle-fab-btn ${isPlaying ? "is-playing" : ""}`}
              onClick={handleOpenHalfScreen}
              title={`🎵 ${activeTrack.title} — Clic para abrir Consola Media Pantalla (50%)`}
            >
              {/* Vinilo giratorio con la carátula oficial */}
              <div className={`circle-vinyl-disc ${isPlaying ? "is-spinning" : ""}`}>
                <img
                  src={activeTrack.coverUrl}
                  alt={activeTrack.title}
                  draggable={false}
                />
                <div className="vinyl-grooves" />
                <div className="vinyl-center-dot" />
              </div>

              {/* Ecualizador dinámico si está sonando */}
              {isPlaying && (
                <div className="circle-eq-badge">
                  <i />
                  <i />
                  <i />
                </div>
              )}

              {/* Botón Play/Pause directo en la burbuja */}
              <button
                type="button"
                className="circle-play-badge"
                onClick={handleTogglePlayDirect}
                title={isPlaying ? "Pausar música" : "Reproducir música"}
                aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
              >
                {isPlaying ? <Pause size={13} fill="currentColor" /> : <Play size={13} fill="currentColor" />}
              </button>
            </div>
          </aside>
        </>
      ) : (
        /* =========================================================================
           2. MODO AGRANDADO: CONSOLA DE ESTUDIO OCUPANDO MEDIA PANTALLA (50vh)
           ========================================================================= */
        <aside
          className="selva-halfscreen-console"
          aria-label="Consola de Estudio Media Pantalla SELVA MUSIC GROUP"
        >
          {/* Barra Superior de Control y Minimizado */}
          <div className="halfscreen-header">
            <div className="halfscreen-brand">
              <SelvaLogo variant="mark" size="sm" />
              <div className="halfscreen-titles">
                <div className="halfscreen-badge-live">
                  <span className="live-pulse" />
                  <span>ESTUDIO EN VIVO · MEDIA PANTALLA (50%)</span>
                </div>
                <h3 className="halfscreen-company">SELVA MUSIC GROUP</h3>
              </div>
            </div>

            <div className="halfscreen-header-actions">
              <button
                type="button"
                className="halfscreen-btn-minimize"
                onClick={() => setIsBubbleMode(true)}
                title="Minimizar a círculo flotante"
              >
                <ChevronDown size={18} />
                <span>Minimizar a Círculo</span>
              </button>
            </div>
          </div>

          {/* Cuerpo de la Consola: Video Monitor 16:9 + Controles de Audio y Playlist */}
          <div className="halfscreen-body">
            {/* Columna 1: Monitor de Video Oficial en Vivo */}
            <div className="halfscreen-video-column">
              <div className="halfscreen-video-card">
                <iframe
                  ref={iframeRef}
                  key={activeTrack.youtubeId}
                  src={`https://www.youtube-nocookie.com/embed/${activeTrack.youtubeId}?autoplay=${isPlaying ? 1 : 0}&enablejsapi=1&playsinline=1&rel=0`}
                  title={activeTrack.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="halfscreen-iframe"
                />
              </div>
            </div>

            {/* Columna 2: Controles Maestros de Audio y Playlist */}
            <div className="halfscreen-controls-column">
              {/* Información del Tema Actual */}
              <div className="halfscreen-track-meta">
                <div className="meta-info">
                  <span className="meta-tag">EN ROTACIÓN OFICIAL</span>
                  <h4 className="meta-title">{activeTrack.title}</h4>
                  <p className="meta-artist">{activeTrack.artist}</p>
                </div>
                <div className="meta-format-badge">
                  <span>{activeTrack.year || "2026"}</span>
                </div>
              </div>

              {/* Scrubber / Barra de Progreso Interactiva */}
              <div className="halfscreen-progress-wrap">
                <span className="time-display">{formatTime(currentTime)}</span>
                <input
                  type="range"
                  min={0}
                  max={totalDuration}
                  value={currentTime}
                  onChange={handleSeek}
                  className="halfscreen-progress-slider"
                  aria-label="Progreso del tema"
                />
                <span className="time-display">{formatTime(totalDuration)}</span>
              </div>

              {/* Botonera de Control Central */}
              <div className="halfscreen-button-row">
                {/* Retroceder 10s */}
                <button
                  type="button"
                  className="btn-step"
                  onClick={() => handleSeekBy(-10)}
                  title="Retroceder 10 segundos"
                >
                  <RotateCcw size={15} />
                  <span>10s</span>
                </button>

                {/* Anterior */}
                <button
                  type="button"
                  className="btn-nav"
                  onClick={onPrevTrack}
                  title="Pista anterior"
                  aria-label="Pista anterior"
                >
                  <SkipBack size={19} />
                </button>

                {/* GRAN BOTÓN PLAY / PAUSE CENTRAL EN ORO 24K */}
                <button
                  type="button"
                  className={`btn-master-play ${isPlaying ? "is-active" : ""}`}
                  onClick={handleTogglePlayDirect}
                  title={isPlaying ? "Pausar música" : "Reproducir música"}
                  aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
                >
                  {isPlaying ? (
                    <Pause size={24} fill="currentColor" />
                  ) : (
                    <Play size={24} fill="currentColor" style={{ marginLeft: "3px" }} />
                  )}
                </button>

                {/* Siguiente */}
                <button
                  type="button"
                  className="btn-nav"
                  onClick={onNextTrack}
                  title="Siguiente pista"
                  aria-label="Siguiente pista"
                >
                  <SkipForward size={19} />
                </button>

                {/* Adelantar 10s */}
                <button
                  type="button"
                  className="btn-step"
                  onClick={() => handleSeekBy(10)}
                  title="Adelantar 10 segundos"
                >
                  <RotateCw size={15} />
                  <span>10s</span>
                </button>

                {/* Control de Volumen y Silencio */}
                <div className="halfscreen-volume-inline">
                  <button
                    type="button"
                    className="btn-vol-mute"
                    onClick={toggleMute}
                    title={isMuted ? "Activar sonido" : "Silenciar"}
                  >
                    {isMuted || volume === 0 ? <VolumeX size={17} /> : <Volume2 size={17} />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={(e) => handleVolumeChange(Number(e.target.value))}
                    className="halfscreen-vol-slider"
                    aria-label="Volumen"
                  />
                </div>
              </div>

              {/* Selector Rápido de Pistas Oficiales */}
              <div className="halfscreen-playlist-strip">
                <span className="playlist-label">REPERTORIO:</span>
                <div className="playlist-scroll-list">
                  {tracks.map((t, idx) => {
                    const isCurr = t.id === activeTrack.id;
                    return (
                      <button
                        key={t.id + idx}
                        type="button"
                        className={`playlist-chip ${isCurr ? "is-selected" : ""}`}
                        onClick={() => {
                          onPlayTrack(t);
                          if (!isPlaying) {
                            onTogglePlay();
                          }
                        }}
                      >
                        {isCurr && isPlaying && (
                          <span className="chip-eq">
                            <i />
                            <i />
                            <i />
                          </span>
                        )}
                        <span className="chip-num">{idx + 1}.</span>
                        <span className="chip-title">{t.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
