import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ListMusic,
  Maximize2,
  Minimize2,
  Music2,
  Pause,
  Play,
  Radio,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Youtube,
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
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
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
  const ytContainerRef = useRef<HTMLDivElement | null>(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [isYtApiReady, setIsYtApiReady] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

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
    if (!isYtApiReady) return;

    if (!ytPlayerRef.current) {
      try {
        ytPlayerRef.current = new window.YT.Player("yt-audio-engine", {
          height: "180",
          width: "320",
          videoId: activeTrack?.youtubeId || "TlTuiVFTb0g",
          playerVars: {
            autoplay: isPlaying ? 1 : 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
          },
          events: {
            onReady: (event: any) => {
              event.target.setVolume(isMuted ? 0 : Math.round(volume * 100));
              if (isPlaying && activeTrack?.youtubeId) {
                event.target.playVideo();
              }
            },
            onStateChange: (event: any) => {
              // 0 = ENDED, 1 = PLAYING, 2 = PAUSED
              if (event.data === 0) {
                onNextTrack();
              }
            },
          },
        });
      } catch (e) {
        console.error("YT Player init error:", e);
      }
    }
  }, [isYtApiReady]);

  // 3. Manejar cambio de pista
  useEffect(() => {
    if (!activeTrack) return;

    if (activeTrack.youtubeId) {
      // Pausar audio local si estaba sonando
      if (audioRef.current) {
        audioRef.current.pause();
      }

      if (ytPlayerRef.current && typeof ytPlayerRef.current.loadVideoById === "function") {
        try {
          ytPlayerRef.current.loadVideoById(activeTrack.youtubeId);
          if (isPlaying) {
            ytPlayerRef.current.playVideo();
          } else {
            ytPlayerRef.current.pauseVideo();
          }
        } catch (e) {}
      }
    } else if (activeTrack.audioUrl) {
      // Canción con archivo de audio directo / subido
      if (ytPlayerRef.current && typeof ytPlayerRef.current.pauseVideo === "function") {
        try {
          ytPlayerRef.current.pauseVideo();
        } catch (e) {}
      }

      if (audioRef.current) {
        audioRef.current.src = activeTrack.audioUrl;
        if (isPlaying) {
          audioRef.current.play().catch(() => {});
        }
      }
    }
  }, [activeTrack?.id]);

  // 4. Manejar Play / Pause toggle
  useEffect(() => {
    if (activeTrack?.youtubeId && ytPlayerRef.current && typeof ytPlayerRef.current.getPlayerState === "function") {
      try {
        if (isPlaying) {
          ytPlayerRef.current.playVideo();
        } else {
          ytPlayerRef.current.pauseVideo();
        }
      } catch (e) {}
    } else if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // 5. Manejar Volumen
  useEffect(() => {
    const currentVol = isMuted ? 0 : volume;
    if (audioRef.current) {
      audioRef.current.volume = currentVol;
    }
    if (ytPlayerRef.current && typeof ytPlayerRef.current.setVolume === "function") {
      try {
        ytPlayerRef.current.setVolume(Math.round(currentVol * 100));
      } catch (e) {}
    }
  }, [volume, isMuted]);

  // 6. Loop de Progreso en Vivo (Intervalo regular para YouTube y Eventos para HTML5)
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeTrack?.youtubeId && ytPlayerRef.current && typeof ytPlayerRef.current.getCurrentTime === "function") {
        try {
          const cur = ytPlayerRef.current.getCurrentTime() || 0;
          const dur = ytPlayerRef.current.getDuration() || 0;
          setCurrentTime(cur);
          if (dur > 0) setDuration(dur);
        } catch (e) {}
      }
    }, 500);

    return () => clearInterval(interval);
  }, [activeTrack]);

  // Handlers para HTML5 audio
  const handleHtmlAudioTimeUpdate = () => {
    if (!activeTrack?.youtubeId && audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleHtmlAudioLoadedMetadata = () => {
    if (!activeTrack?.youtubeId && audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    setCurrentTime(time);

    if (activeTrack?.youtubeId && ytPlayerRef.current && typeof ytPlayerRef.current.seekTo === "function") {
      try {
        ytPlayerRef.current.seekTo(time, true);
      } catch (e) {}
    } else if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
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
      {/* Elemento de Audio HTML5 para archivos subidos localmente */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleHtmlAudioTimeUpdate}
        onLoadedMetadata={handleHtmlAudioLoadedMetadata}
        onEnded={onNextTrack}
        onError={() => {
          // Si falla un audio directo, pasa a la siguiente
          console.warn("Audio file error, skipping or falling back");
        }}
      />

      {/* Contenedor YouTube IFrame Engine (Oculto en fondo o Visible si se activa visor) */}
      <div
        ref={ytContainerRef}
        style={{
          position: "fixed",
          bottom: showVideoModal ? "90px" : "-9999px",
          right: showVideoModal ? "24px" : "-9999px",
          width: showVideoModal ? "320px" : "1px",
          height: showVideoModal ? "180px" : "1px",
          zIndex: 99999,
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
          border: "1px solid rgba(201, 255, 61, 0.4)",
          background: "#000",
          opacity: showVideoModal ? 1 : 0.01,
          pointerEvents: showVideoModal ? "auto" : "none",
          transition: "all 200ms ease",
        }}
      >
        <div id="yt-audio-engine" />
      </div>

      {/* Playlist desplegable completa */}
      {isPlaylistOpen && (
        <div className="player-playlist-panel">
          <div className="player-playlist-header">
            <div>
              <h3>Playlist Oficial · SELVA MUSIC</h3>
              <p>{tracks.length} canciones oficiales en rotación</p>
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

      {/* Barra de Audio Inferior Fija */}
      <aside className="global-audio-bar" aria-label="Reproductor de música continuo">
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
            {activeTrack.youtubeId && (
              <button
                type="button"
                className={`audio-yt-badge ${showVideoModal ? "is-active" : ""}`}
                onClick={() => setShowVideoModal((prev) => !prev)}
                title={showVideoModal ? "Ocultar videoclip oficial" : "Ver videoclip oficial"}
              >
                <Youtube size={13} />
                <span>{showVideoModal ? "Ocultar Video" : "Video"}</span>
              </button>
            )}
          </div>

          {/* Controles Centrales & Progreso */}
          <div className="audio-center-controls">
            <div className="audio-buttons">
              <button
                type="button"
                className="audio-btn"
                onClick={onPrevTrack}
                aria-label="Pista anterior"
              >
                <SkipBack size={18} />
              </button>
              <button
                type="button"
                className="audio-btn-play"
                onClick={onTogglePlay}
                aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
              >
                {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
              </button>
              <button
                type="button"
                className="audio-btn"
                onClick={onNextTrack}
                aria-label="Siguiente pista"
              >
                <SkipForward size={18} />
              </button>
            </div>

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
                onClick={() => setIsMuted((prev) => !prev)}
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
                  setVolume(Number(e.target.value));
                  if (isMuted) setIsMuted(false);
                }}
                className="audio-vol-slider"
                aria-label="Control de volumen"
              />
            </div>

            {/* Toggle Playlist */}
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
          </div>
        </div>
      </aside>
    </>
  );
}
