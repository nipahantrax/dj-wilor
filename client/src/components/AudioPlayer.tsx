import {
  ChevronDown,
  ChevronUp,
  FastForward,
  ListMusic,
  Maximize2,
  Minimize2,
  Music2,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  SkipBack,
  SkipForward,
  Tv,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import type { Track } from "@/lib/wilorContent";

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
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
    selvaAudioPlayer?: any;
  }
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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ytPlayerRef = useRef<any>(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.9);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [isYtApiReady, setIsYtApiReady] = useState(false);
  const [isBubbleMode, setIsBubbleMode] = useState(true); // Inicia como burbuja flotante moderna
  const [needsUserUnmute, setNeedsUserUnmute] = useState(false);

  const activeTrack = currentTrack || tracks[0];

  // 1. Cargar YouTube IFrame API de forma asíncrona
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      setIsYtApiReady(true);
      return;
    }

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      setIsYtApiReady(true);
    };
  }, []);

  // 2. Inicializar o actualizar el reproductor de YouTube
  useEffect(() => {
    if (!isYtApiReady || !activeTrack?.youtubeId) return;

    if (!ytPlayerRef.current) {
      try {
        ytPlayerRef.current = new window.YT.Player("selva-yt-monitor", {
          height: "100%",
          width: "100%",
          videoId: activeTrack.youtubeId,
          playerVars: {
            autoplay: isPlaying ? 1 : 0,
            controls: 1,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
            enablejsapi: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: (event: any) => {
              try {
                event.target.unMute();
                event.target.setVolume(Math.round(volume * 100));
                if (isPlaying) {
                  event.target.playVideo();
                }
              } catch (e) {}
            },
            onStateChange: (event: any) => {
              if (event.data === 0) {
                onNextTrack();
              }
              if (event.data === 1 && event.target.isMuted && event.target.isMuted()) {
                setNeedsUserUnmute(true);
              } else if (event.data === 1) {
                setNeedsUserUnmute(false);
              }
            },
          },
        });
      } catch (e) {
        console.error("YT Player init error:", e);
      }
    } else if (typeof ytPlayerRef.current.loadVideoById === "function") {
      try {
        ytPlayerRef.current.loadVideoById(activeTrack.youtubeId);
        ytPlayerRef.current.unMute();
        ytPlayerRef.current.setVolume(Math.round(volume * 100));
        if (isPlaying) {
          ytPlayerRef.current.playVideo();
        }
      } catch (e) {}
    }
  }, [isYtApiReady, activeTrack?.id]);

  // 3. Manejo de Play / Pause
  useEffect(() => {
    if (activeTrack?.youtubeId && ytPlayerRef.current && typeof ytPlayerRef.current.getPlayerState === "function") {
      try {
        if (isPlaying) {
          ytPlayerRef.current.unMute();
          ytPlayerRef.current.setVolume(Math.round(volume * 100));
          ytPlayerRef.current.playVideo();
        } else {
          ytPlayerRef.current.pauseVideo();
        }
      } catch (e) {}
    } else if (activeTrack?.audioUrl && audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // 4. Manejo de volumen y mute
  useEffect(() => {
    const currentVol = isMuted ? 0 : volume;

    if (audioRef.current) {
      audioRef.current.volume = currentVol;
    }

    if (ytPlayerRef.current && typeof ytPlayerRef.current.setVolume === "function") {
      try {
        if (isMuted) {
          ytPlayerRef.current.mute();
        } else {
          ytPlayerRef.current.unMute();
          ytPlayerRef.current.setVolume(Math.round(currentVol * 100));
        }
      } catch (e) {}
    }
  }, [volume, isMuted]);

  // 5. Loop de sincronización de tiempo
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeTrack?.youtubeId && ytPlayerRef.current && typeof ytPlayerRef.current.getCurrentTime === "function") {
        try {
          const cur = ytPlayerRef.current.getCurrentTime() || 0;
          const dur = ytPlayerRef.current.getDuration() || 0;
          setCurrentTime(cur);
          if (dur > 0) setDuration(dur);
        } catch (e) {}
      } else if (audioRef.current && !activeTrack?.youtubeId) {
        setCurrentTime(audioRef.current.currentTime || 0);
        setDuration(audioRef.current.duration || 0);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [activeTrack]);

  // Exponer API global para el reproductor de cada artista
  useEffect(() => {
    window.selvaAudioPlayer = {
      seekBy: (offset: number) => handleSeekBy(offset),
      seekTo: (seconds: number) => handleDirectSeek(seconds),
      currentTime,
      duration,
      isPlaying,
    };
  }, [currentTime, duration, isPlaying]);

  const handleForceUnmute = () => {
    if (ytPlayerRef.current && typeof ytPlayerRef.current.unMute === "function") {
      try {
        ytPlayerRef.current.unMute();
        ytPlayerRef.current.setVolume(100);
        ytPlayerRef.current.playVideo();
        setIsMuted(false);
        setNeedsUserUnmute(false);
      } catch (e) {}
    }
  };

  const handleDirectSeek = (seconds: number) => {
    const target = Math.max(0, Math.min(seconds, duration || 9999));
    setCurrentTime(target);

    if (activeTrack?.youtubeId && ytPlayerRef.current && typeof ytPlayerRef.current.seekTo === "function") {
      try {
        ytPlayerRef.current.seekTo(target, true);
      } catch (e) {}
    } else if (audioRef.current) {
      audioRef.current.currentTime = target;
    }
  };

  const handleSeekBy = (offsetSeconds: number) => {
    handleDirectSeek(currentTime + offsetSeconds);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDirectSeek(Number(e.target.value));
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (!activeTrack) return null;

  return (
    <>
      {/* Audio nativo para archivos locales */}
      {activeTrack.audioUrl && (
        <audio
          ref={audioRef}
          src={activeTrack.audioUrl}
          onEnded={onNextTrack}
        />
      )}

      {/* Motor de Audio en Segundo Plano */}
      <div
        style={{
          position: "fixed",
          bottom: "-500px",
          left: "-500px",
          width: "200px",
          height: "200px",
          opacity: 0.001,
          pointerEvents: "none",
          zIndex: -1,
        }}
        aria-hidden="true"
      >
        <div id="selva-yt-monitor" />
      </div>

      {/* Playlist desplegable */}
      {isPlaylistOpen && (
        <div className="player-playlist-panel">
          <div className="player-playlist-header">
            <div>
              <h3>Playlist Oficial · SELVA MUSIC GROUP</h3>
              <p>{tracks.length} temas oficiales en rotación</p>
            </div>
            <button
              type="button"
              className="player-playlist-close"
              onClick={() => setIsPlaylistOpen(false)}
              aria-label="Cerrar playlist"
            >
              <ChevronDown size={20} />
            </button>
          </div>
          <div className="player-playlist-list">
            {tracks.map((track, idx) => {
              const isCurrent = activeTrack?.id === track.id;
              return (
                <div
                  key={track.id + idx}
                  className={`playlist-item ${isCurrent ? "is-playing" : ""}`}
                  onClick={() => onPlayTrack(track)}
                >
                  <span className="playlist-item-idx">
                    {isCurrent && isPlaying ? (
                      <span className="audio-equalizer">
                        <i />
                        <i />
                        <i />
                      </span>
                    ) : (
                      idx + 1
                    )}
                  </span>
                  <img src={track.coverUrl} alt="" className="playlist-item-cover" />
                  <div className="playlist-item-info">
                    <strong>{track.title}</strong>
                    <span>{track.artist}</span>
                  </div>
                  <span className="playlist-item-dur">{track.duration}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          REPRODUCTOR DUAL: BURBUJA FLOTANTE COMPACTA vs CONSOLA EXPANDIDA
          ========================================================================= */}

      {isBubbleMode ? (
        /* 🟢 MODO BURBUJA FLOTANTE MODERNA (NO OCUPA ESPACIO EN PANTALLA) */
        <aside className="selva-bubble-player" aria-label="Reproductor flotante compacto">
          <div className="bubble-player-inner" onClick={() => setIsBubbleMode(false)}>
            {/* Vinilo / Carátula circular giratoria */}
            <div className={`bubble-disc ${isPlaying ? "is-spinning" : ""}`}>
              <img src={activeTrack.coverUrl} alt={activeTrack.title} />
              <div className="disc-center-hole" />
            </div>

            {/* Ecualizador animado */}
            {isPlaying && (
              <div className="bubble-eq">
                <i />
                <i />
                <i />
              </div>
            )}

            {/* Metadatos compactos */}
            <div className="bubble-info">
              <strong className="bubble-title">{activeTrack.title}</strong>
              <span className="bubble-artist">{activeTrack.artist}</span>
            </div>

            {/* Botón rápido Play/Pause */}
            <button
              type="button"
              className="bubble-btn-play"
              onClick={(e) => {
                e.stopPropagation();
                onTogglePlay();
                if (needsUserUnmute) handleForceUnmute();
              }}
              aria-label={isPlaying ? "Pausar" : "Reproducir"}
            >
              {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
            </button>

            {/* Botón rápido Siguiente */}
            <button
              type="button"
              className="bubble-btn-skip"
              onClick={(e) => {
                e.stopPropagation();
                onNextTrack();
              }}
              aria-label="Siguiente tema"
              title="Siguiente pista"
            >
              <SkipForward size={14} />
            </button>

            {/* Botón para expandir a consola completa */}
            <button
              type="button"
              className="bubble-btn-expand"
              onClick={(e) => {
                e.stopPropagation();
                setIsBubbleMode(false);
              }}
              title="Expandir reproductor completo"
              aria-label="Expandir reproductor"
            >
              <Maximize2 size={13} />
            </button>
          </div>
        </aside>
      ) : (
        /* 🔵 MODO EXPANDIDO (CONSOLA COMPLETA DE ESTUDIO CON TODOS LOS CONTROLES) */
        <aside className="global-audio-bar is-expanded-mode" aria-label="Reproductor de música de estudio">
          <div className="audio-bar-inner">
            {/* Track Actual */}
            <div className="audio-track-media">
              <img
                src={activeTrack.coverUrl}
                alt={activeTrack.title}
                className="audio-thumb"
              />
              <div className="audio-meta">
                <strong className="audio-title">{activeTrack.title}</strong>
                <span className="audio-artist">{activeTrack.artist}</span>
              </div>
            </div>

            {/* Controles Centrales & Progreso */}
            <div className="audio-center-controls">
              <div className="audio-buttons">
                {/* Retroceder 10 segundos */}
                <button
                  type="button"
                  className="audio-btn btn-secondary-ctrl"
                  onClick={() => handleSeekBy(-10)}
                  aria-label="Retroceder 10 segundos"
                  title="Retroceder 10s"
                >
                  <RotateCcw size={15} />
                  <span className="step-tag">10s</span>
                </button>

                {/* Pista anterior */}
                <button
                  type="button"
                  className="audio-btn"
                  onClick={onPrevTrack}
                  aria-label="Pista anterior"
                  title="Pista anterior"
                >
                  <SkipBack size={18} />
                </button>

                {/* Play / Pause Principal */}
                <button
                  type="button"
                  className="audio-btn-play"
                  onClick={() => {
                    onTogglePlay();
                    if (needsUserUnmute) handleForceUnmute();
                  }}
                  aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
                >
                  {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                </button>

                {/* Siguiente pista */}
                <button
                  type="button"
                  className="audio-btn"
                  onClick={onNextTrack}
                  aria-label="Siguiente pista"
                  title="Siguiente pista"
                >
                  <SkipForward size={18} />
                </button>

                {/* Adelantar 10 segundos */}
                <button
                  type="button"
                  className="audio-btn btn-secondary-ctrl"
                  onClick={() => handleSeekBy(10)}
                  aria-label="Adelantar 10 segundos"
                  title="Adelantar 10s"
                >
                  <RotateCw size={15} />
                  <span className="step-tag">10s</span>
                </button>
              </div>

              {/* Scrubber / Barra de Progreso */}
              <div className="audio-progress-row">
                <span className="audio-time">{formatTime(currentTime)}</span>
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="audio-progress-bar"
                  aria-label="Progreso de la canción"
                />
                <span className="audio-time">
                  {duration > 0 ? formatTime(duration) : activeTrack.duration}
                </span>
              </div>
            </div>

            {/* Acciones Laterales */}
            <div className="audio-side-actions">
              {/* Volumen */}
              <div className="audio-vol-control">
                <button
                  type="button"
                  className="audio-icon-btn"
                  onClick={() => {
                    setIsMuted((prev) => !prev);
                    if (needsUserUnmute) handleForceUnmute();
                  }}
                  aria-label={isMuted ? "Desactivar silencio" : "Silenciar"}
                >
                  {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setVolume(val);
                    if (isMuted) setIsMuted(false);
                    if (needsUserUnmute) handleForceUnmute();
                  }}
                  className="audio-vol-slider"
                  aria-label="Control de volumen"
                />
              </div>

              {/* Playlist Oficial */}
              <button
                type="button"
                className={`audio-icon-btn audio-playlist-btn ${isPlaylistOpen ? "is-open" : ""}`}
                onClick={() => setIsPlaylistOpen((prev) => !prev)}
                aria-label="Abrir playlist oficial"
                title="Abrir playlist"
              >
                <ListMusic size={19} />
                <span className="playlist-count-pill">{tracks.length}</span>
              </button>

              {/* Botón para MINIMIZAR A BURBUJA */}
              <button
                type="button"
                className="audio-icon-btn audio-collapse-btn"
                onClick={() => setIsBubbleMode(true)}
                title="Minimizar a burbuja flotante"
                aria-label="Minimizar a burbuja"
              >
                <Minimize2 size={16} />
              </button>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
