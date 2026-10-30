import { ChevronDown, ChevronUp, ListMusic, Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);

  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;
    audioRef.current.src = currentTrack.audioUrl;
    if (isPlaying) {
      audioRef.current.play().catch(() => {
        // Autoplay may be restricted by browser until first interaction
      });
    }
  }, [currentTrack]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (!currentTrack && tracks.length === 0) return null;
  const activeTrack = currentTrack || tracks[0];

  return (
    <>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={onNextTrack}
      />

      {/* Playlist desplegable */}
      {isPlaylistOpen && (
        <div className="player-playlist-panel">
          <div className="player-playlist-header">
            <div>
              <h3>Playlist Oficial · SELVA MUSIC</h3>
              <p>{tracks.length} temas en rotación continua</p>
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
              const isCurrent = currentTrack?.id === track.id;
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
              <span className="audio-time">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Opciones Derecha: Volumen & Playlist Toggle */}
          <div className="audio-side-actions">
            <div className="audio-volume-wrap">
              <button
                type="button"
                className="audio-volume-btn"
                onClick={() => setIsMuted(!isMuted)}
                aria-label={isMuted ? "Activar sonido" : "Silenciar"}
              >
                {isMuted || volume === 0 ? <VolumeX size={17} /> : <Volume2 size={17} />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(Number(e.target.value));
                  setIsMuted(false);
                }}
                className="audio-volume-slider"
                aria-label="Control de volumen"
              />
            </div>

            <button
              type="button"
              className={`audio-playlist-toggle ${isPlaylistOpen ? "is-active" : ""}`}
              onClick={() => setIsPlaylistOpen(!isPlaylistOpen)}
              aria-label="Abrir playlist de canciones"
            >
              <ListMusic size={18} />
              <span className="playlist-badge">{tracks.length}</span>
              {isPlaylistOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
