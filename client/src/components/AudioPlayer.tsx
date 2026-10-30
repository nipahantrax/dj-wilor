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
  Tv,
  Volume2,
  VolumeX,
  X,
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

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.9);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [isYtApiReady, setIsYtApiReady] = useState(false);
  const [showMonitor, setShowMonitor] = useState(true);
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

  // 2. Inicializar o actualizar el reproductor de YouTube en el mini-monitor
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
              // 0 = Terminado -> Siguiente canción
              if (event.data === 0) {
                onNextTrack();
              }
              // Si el reproductor arranca en silencio debido a políticas de autoplay, notificamos al usuario
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

  // Forzar activación del audio si el navegador lo puso en silencio
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
      {/* Audio nativo para archivos locales */}
      {activeTrack.audioUrl && (
        <audio
          ref={audioRef}
          src={activeTrack.audioUrl}
          onEnded={onNextTrack}
        />
      )}

      {/* Mini-Monitor de Transmisión Oficial de SELVA MUSIC (Garantiza reproducción sin mute) */}
      <div
        className={`selva-monitor-dock ${showMonitor ? "is-visible" : "is-minimized"}`}
        aria-label="Monitor de transmisión oficial de DJ WILOR"
      >
        <div className="selva-monitor-header">
          <div className="selva-monitor-title">
            <span className="live-dot" />
            <span>TRANSMISIÓN SELVA MUSIC · BOLIVIA</span>
          </div>
          <div className="selva-monitor-tools">
            <button
              type="button"
              className="monitor-tool-btn"
              onClick={() => setShowMonitor((prev) => !prev)}
              title={showMonitor ? "Minimizar pantalla" : "Mostrar pantalla"}
            >
              {showMonitor ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            </button>
          </div>
        </div>

        <div className="selva-monitor-screen">
          <div id="selva-yt-monitor" className="selva-yt-frame" />
        </div>

        {/* Notificación si el navegador silenció el audio */}
        {needsUserUnmute && (
          <div className="selva-unmute-overlay" onClick={handleForceUnmute}>
            <Volume2 size={18} />
            <span>Haz clic aquí para activar el volumen oficial</span>
          </div>
        )}
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

      {/* Barra de Audio Inferior Fija */}
      <aside className="global-audio-bar" aria-label="Reproductor de música continuo">
        <div className="audio-bar-inner">
          {/* Info del Track */}
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

            {/* Botón para alternar Monitor de Video */}
            <button
              type="button"
              className={`audio-monitor-toggle ${showMonitor ? "is-active" : ""}`}
              onClick={() => setShowMonitor((prev) => !prev)}
              title={showMonitor ? "Ocultar monitor de video" : "Ver pantalla de video"}
            >
              <Tv size={14} />
              <span>{showMonitor ? "Monitor Activo" : "Ver Video"}</span>
            </button>
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
                onClick={() => {
                  onTogglePlay();
                  if (needsUserUnmute) handleForceUnmute();
                }}
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

          {/* Controles Laterales */}
          <div className="audio-side-actions">
            {/* Control de Volumen */}
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

            {/* Botón Playlist */}
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
