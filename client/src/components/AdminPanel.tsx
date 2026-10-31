import {
  AlertTriangle,
  Calendar,
  Check,
  Disc3,
  FileAudio,
  FolderPlus,
  Image as ImageIcon,
  Lock,
  LogOut,
  Music2,
  Play,
  Plus,
  Scale,
  Trash2,
  Upload,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import React, { useState } from "react";
import type { Artist, EventBooking, Track } from "@/lib/wilorContent";
import LegalContractsPanel from "./LegalContractsPanel";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  artists: Artist[];
  onSaveArtists: (updated: Artist[]) => void;
  bookings: EventBooking[];
  onSaveBookings: (updated: EventBooking[]) => void;
  onPlayTrack?: (track: Track) => void;
}

export default function AdminPanel({
  isOpen,
  onClose,
  artists,
  onSaveArtists,
  bookings,
  onSaveBookings,
  onPlayTrack,
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<"artists" | "music" | "calendar" | "legal">("artists");
  const [authError, setAuthError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem("selva_admin_session") === "true";
    } catch {
      return false;
    }
  });

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  // Estado del formulario de artista
  const [editingArtistId, setEditingArtistId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [category, setCategory] = useState<"dj" | "vocal" | "group">("dj");
  const [genre, setGenre] = useState("");
  const [location, setLocation] = useState("Trópico de Cochabamba, Bolivia");
  const [photo, setPhoto] = useState("");
  const [gallery, setGallery] = useState<string[]>([]);
  const [newGalleryUrl, setNewGalleryUrl] = useState("");
  const [bio, setBio] = useState("");
  const [showFormat, setShowFormat] = useState("Show en vivo de 60 minutos con interacción y repertorio bailable.");
  const [bookingStatus, setBookingStatus] = useState("Disponible para Fechas & Giras 2026");
  const [youtubeVideoId, setYoutubeVideoId] = useState("TlTuiVFTb0g");
  const [youtubeVideoTitle, setYoutubeVideoTitle] = useState("Lanzamiento Oficial");
  const [socialYoutube, setSocialYoutube] = useState("");
  const [socialTiktok, setSocialTiktok] = useState("");
  const [socialFacebook, setSocialFacebook] = useState("");
  const [socialSpotify, setSocialSpotify] = useState("");

  // Estado de subida de música
  const [targetArtistId, setTargetArtistId] = useState<string>(artists[0]?.id || "");
  const [trackTitle, setTrackTitle] = useState("");
  const [trackAudioUrl, setTrackAudioUrl] = useState("");
  const [trackDuration, setTrackDuration] = useState("3:25");
  const [trackCoverUrl, setTrackCoverUrl] = useState("");
  const [trackYear, setTrackYear] = useState("2026");

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim().toLowerCase() === "djwilormaestra@gmail.com" && passwordInput === "Djwilor@") {
      setIsAuthenticated(true);
      setAuthError("");
      try {
        localStorage.setItem("selva_admin_session", "true");
      } catch {}
    } else {
      setAuthError("Credenciales no válidas. Ingrese djwilormaestra@gmail.com y la clave maestra.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem("selva_admin_session");
    } catch {}
  };

  // Cargar datos para edición de artista
  const handleStartEditArtist = (art: Artist) => {
    setEditingArtistId(art.id);
    setName(art.name);
    setRole(art.role);
    setCategory(art.category);
    setGenre(art.genre);
    setLocation(art.location);
    setPhoto(art.photo);
    setGallery(art.gallery || [art.photo]);
    setBio(art.bio);
    setShowFormat(art.showFormat);
    setBookingStatus(art.bookingStatus);
    setYoutubeVideoId(art.featuredTrack?.youtubeId || "TlTuiVFTb0g");
    setYoutubeVideoTitle(art.featuredTrack?.title || "Lanzamiento");
    setSocialYoutube(art.socials?.find((s) => s.platform.toLowerCase() === "youtube")?.url || "");
    setSocialTiktok(art.socials?.find((s) => s.platform.toLowerCase() === "tiktok")?.url || "");
    setSocialFacebook(art.socials?.find((s) => s.platform.toLowerCase() === "facebook")?.url || "");
    setSocialSpotify(art.socials?.find((s) => s.platform.toLowerCase() === "spotify")?.url || "");
  };

  const handleResetArtistForm = () => {
    setEditingArtistId(null);
    setName("");
    setRole("");
    setCategory("dj");
    setGenre("");
    setLocation("Trópico de Cochabamba, Bolivia");
    setPhoto("");
    setGallery([]);
    setBio("");
    setShowFormat("Show en vivo de 60 minutos con interacción y repertorio bailable.");
    setBookingStatus("Disponible para Fechas & Giras 2026");
    setYoutubeVideoId("TlTuiVFTb0g");
    setYoutubeVideoTitle("Lanzamiento Oficial");
    setSocialYoutube("");
    setSocialTiktok("");
    setSocialFacebook("");
    setSocialSpotify("");
  };

  const handleAddGalleryUrl = () => {
    if (newGalleryUrl.trim()) {
      setGallery((prev) => [...prev, newGalleryUrl.trim()]);
      setNewGalleryUrl("");
    }
  };

  const handleRemoveGalleryUrl = (index: number) => {
    setGallery((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveArtist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const socials = [];
    if (socialYoutube.trim()) socials.push({ platform: "YouTube", url: socialYoutube.trim() });
    if (socialTiktok.trim()) socials.push({ platform: "TikTok", url: socialTiktok.trim() });
    if (socialFacebook.trim()) socials.push({ platform: "Facebook", url: socialFacebook.trim() });
    if (socialSpotify.trim()) socials.push({ platform: "Spotify", url: socialSpotify.trim() });

    const cleanGallery = gallery.length > 0 ? gallery : [photo || "./assets/hero-gta-tropico.jpg"];

    if (editingArtistId) {
      const updated = artists.map((art) => {
        if (art.id === editingArtistId) {
          return {
            ...art,
            name: name.trim(),
            role: role.trim() || "Artista Oficial",
            category,
            genre: genre.trim() || "Música Urbana / Tropical",
            location: location.trim() || "Bolivia",
            photo: photo.trim() || art.photo,
            gallery: cleanGallery,
            bio: bio.trim() || art.bio,
            showFormat: showFormat.trim() || art.showFormat,
            bookingStatus: bookingStatus.trim() || art.bookingStatus,
            featuredTrack: {
              title: youtubeVideoTitle.trim() || "Videoclip Oficial",
              format: "Lanzamiento SELVA MUSIC",
              youtubeId: youtubeVideoId.trim(),
              youtubeUrl: `https://www.youtube.com/watch?v=${youtubeVideoId.trim()}`,
            },
            socials,
          };
        }
        return art;
      });
      onSaveArtists(updated);
      handleResetArtistForm();
      alert("¡Artista actualizado con éxito!");
    } else {
      const newArtistId = name.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-" + Date.now().toString().slice(-4);
      const newArtist: Artist = {
        id: newArtistId,
        name: name.trim(),
        role: role.trim() || "Artista Exclusivo SELVA MUSIC",
        category,
        genre: genre.trim() || "Electro Tumbado / Tropical",
        location: location.trim() || "Trópico de Cochabamba, Bolivia",
        photo: photo.trim() || "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80",
        gallery: cleanGallery,
        bio: bio.trim() || "Artista perteneciente al sello discográfico independiente SELVA MUSIC Group.",
        featuredTrack: {
          title: youtubeVideoTitle.trim() || "Videoclip Oficial",
          format: "Lanzamiento SELVA MUSIC",
          youtubeId: youtubeVideoId.trim() || "TlTuiVFTb0g",
          youtubeUrl: `https://www.youtube.com/watch?v=${youtubeVideoId.trim() || "TlTuiVFTb0g"}`,
        },
        highlights: [
          "Producción integral y mastering con SELVA MUSIC Group",
          "Repertorio adaptado para discotecas, eventos y festivales",
          "Presencia y difusión en plataformas digitales oficiales",
        ],
        showFormat: showFormat.trim(),
        bookingStatus: bookingStatus.trim(),
        socials,
        tracks: [],
      };
      onSaveArtists([...artists, newArtist]);
      handleResetArtistForm();
      alert(`¡Artista "${name}" registrado exitosamente en el catálogo!`);
    }
  };

  const handleDeleteArtist = (id: string) => {
    if (confirm("¿Estás seguro de dar de baja a este artista del catálogo?")) {
      onSaveArtists(artists.filter((a) => a.id !== id));
    }
  };

  // Subida de audio local mediante FileReader / Blob URL
  const handleLocalAudioFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      setTrackAudioUrl(blobUrl);
      if (!trackTitle) {
        setTrackTitle(file.name.replace(/\.[^/.]+$/, ""));
      }
    }
  };

  const handleAddTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackTitle.trim() || !trackAudioUrl.trim()) {
      alert("Por favor ingresa el título de la canción y sube o pega el archivo de audio.");
      return;
    }

    const targetArtist = artists.find((a) => a.id === targetArtistId) || artists[0];
    const newTrack: Track = {
      id: "track-" + Date.now(),
      title: trackTitle.trim(),
      artist: targetArtist.name,
      duration: trackDuration.trim() || "3:30",
      audioUrl: trackAudioUrl.trim(),
      coverUrl: trackCoverUrl.trim() || targetArtist.photo,
      year: trackYear.trim() || "2026",
    };

    const updated = artists.map((a) => {
      if (a.id === targetArtist.id) {
        return {
          ...a,
          tracks: [...(a.tracks || []), newTrack],
        };
      }
      return a;
    });

    onSaveArtists(updated);
    setTrackTitle("");
    setTrackAudioUrl("");
    setTrackCoverUrl("");
    alert(`¡Pista "${newTrack.title}" añadida a la playlist de ${targetArtist.name} y al reproductor continuo global!`);
  };

  const handleDeleteTrack = (artistId: string, trackId: string) => {
    const updated = artists.map((a) => {
      if (a.id === artistId) {
        return {
          ...a,
          tracks: (a.tracks || []).filter((t) => t.id !== trackId),
        };
      }
      return a;
    });
    onSaveArtists(updated);
  };

  // Actualización de estado en el calendario
  const handleUpdateBookingStatus = (bookingId: string, status: EventBooking["status"]) => {
    const updated = bookings.map((b) => (b.id === bookingId ? { ...b, status } : b));
    onSaveBookings(updated);
  };

  const handleDeleteBooking = (bookingId: string) => {
    if (confirm("¿Deseas eliminar este registro de evento de la agenda?")) {
      onSaveBookings(bookings.filter((b) => b.id !== bookingId));
    }
  };

  return (
    <div className="admin-modal-backdrop" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="admin-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Cabecera del Panel */}
        <div className="admin-modal-header">
          <div className="admin-header-title">
            <span className="admin-badge-icon">🌴</span>
            <div>
              <h2>PANEL MAESTRO · SELVA MUSIC GROUP</h2>
              <p>Control Total de Roster, Subida de Música a Playlists y Calendario Anticolisión</p>
            </div>
          </div>
          <div className="admin-header-actions">
            {isAuthenticated && (
              <button type="button" onClick={handleLogout} className="admin-btn-logout">
                <LogOut size={14} /> Cerrar Sesión
              </button>
            )}
            <button type="button" onClick={onClose} className="admin-btn-close" aria-label="Cerrar Panel">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Contenido según autenticación */}
        {!isAuthenticated ? (
          <div className="admin-login-wrapper">
            <div className="admin-login-card">
              <div className="admin-lock-icon">
                <Lock size={32} />
              </div>
              <h3>Acceso Maestro Restringido</h3>
              <p>Exclusivo para DJ WILOR y la dirección de SELVA MUSIC Group.</p>

              {authError && <div className="admin-alert-error">{authError}</div>}

              <form onSubmit={handleLogin} className="admin-form">
                <div className="form-group">
                  <label>Correo Maestro</label>
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="djwilormaestra@gmail.com"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Contraseña</label>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>
                <button type="submit" className="button button-lime w-full">
                  Ingresar al Sistema Maestro
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="admin-content-layout">
            {/* Navegación de Tabs */}
            <div className="admin-nav-tabs">
              <button
                type="button"
                className={`admin-nav-tab ${activeTab === "artists" ? "is-active" : ""}`}
                onClick={() => setActiveTab("artists")}
              >
                <Users size={16} />
                <span className="tab-label-full">Artistas & Perfiles ({artists.length})</span>
                <span className="tab-label-short">Artistas ({artists.length})</span>
              </button>
              <button
                type="button"
                className={`admin-nav-tab ${activeTab === "music" ? "is-active" : ""}`}
                onClick={() => setActiveTab("music")}
              >
                <Music2 size={16} />
                <span className="tab-label-full">Gestor de Música & Playlists</span>
                <span className="tab-label-short">Música</span>
              </button>
              <button
                type="button"
                className={`admin-nav-tab ${activeTab === "calendar" ? "is-active" : ""}`}
                onClick={() => setActiveTab("calendar")}
              >
                <Calendar size={16} />
                <span className="tab-label-full">Calendario & Cruces ({bookings.length})</span>
                <span className="tab-label-short">Agenda ({bookings.length})</span>
              </button>
              <button
                type="button"
                className={`admin-nav-tab ${activeTab === "legal" ? "is-active" : ""}`}
                onClick={() => setActiveTab("legal")}
              >
                <Scale size={16} />
                <span className="tab-label-full">⚖️ Legal & Contratos 360°</span>
                <span className="tab-label-short">Legal (7)</span>
              </button>
            </div>

            {/* TAB 1: ARTISTAS */}
            {activeTab === "artists" && (
              <div className="admin-tab-grid">
                {/* Formulario de Artista */}
                <div className="admin-panel-card">
                  <div className="card-header-flex">
                    <h4>{editingArtistId ? "✏️ Editar Perfil de Artista" : "➕ Registrar Nuevo Artista"}</h4>
                    {editingArtistId && (
                      <button type="button" onClick={handleResetArtistForm} className="text-btn">
                        Cancelar edición
                      </button>
                    )}
                  </div>

                  <form onSubmit={handleSaveArtist} className="admin-form-compact">
                    <div className="form-row">
                      <div className="form-group flex-2">
                        <label>Nombre Artístico *</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Ej: DJ WILOR / Emily Escobar"
                          required
                        />
                      </div>
                      <div className="form-group flex-1">
                        <label>Categoría</label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value as any)}
                        >
                          <option value="dj">DJ / Productor</option>
                          <option value="vocal">Vocalista / Solista</option>
                          <option value="group">Grupo / Orquesta</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group flex-1">
                        <label>Rol en el Sello</label>
                        <input
                          type="text"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          placeholder="Ej: Artista Exclusivo · Cantante"
                        />
                      </div>
                      <div className="form-group flex-1">
                        <label>Géneros Musicales</label>
                        <input
                          type="text"
                          value={genre}
                          onChange={(e) => setGenre(e.target.value)}
                          placeholder="Ej: Cumbia Sureña / Fusión"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group flex-1">
                        <label>Origen / Localidad</label>
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="Chapare, Cochabamba, Bolivia"
                        />
                      </div>
                      <div className="form-group flex-1">
                        <label>Foto Principal (URL)</label>
                        <input
                          type="url"
                          value={photo}
                          onChange={(e) => setPhoto(e.target.value)}
                          placeholder="https://... o ./assets/..."
                          required
                        />
                      </div>
                    </div>

                    {/* Gestión de Álbum de Fotos */}
                    <div className="admin-subcard">
                      <label className="subcard-title">
                        <ImageIcon size={14} /> Álbum de Fotos del Perfil ({gallery.length})
                      </label>
                      <div className="subcard-input-row">
                        <input
                          type="url"
                          value={newGalleryUrl}
                          onChange={(e) => setNewGalleryUrl(e.target.value)}
                          placeholder="Pegar URL de foto para el álbum..."
                        />
                        <button type="button" onClick={handleAddGalleryUrl} className="button button-small">
                          + Añadir Foto
                        </button>
                      </div>
                      {gallery.length > 0 && (
                        <div className="admin-gallery-strip">
                          {gallery.map((imgUrl, i) => (
                            <div key={i} className="gallery-thumb-item">
                              <img src={imgUrl} alt={`Foto ${i}`} />
                              <button
                                type="button"
                                onClick={() => handleRemoveGalleryUrl(i)}
                                className="gallery-thumb-remove"
                                title="Eliminar foto"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Biografía & Trayectoria</label>
                      <textarea
                        rows={3}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Descripción detallada de la carrera, colaboraciones y propuesta..."
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group flex-1">
                        <label>Formato de Show</label>
                        <input
                          type="text"
                          value={showFormat}
                          onChange={(e) => setShowFormat(e.target.value)}
                          placeholder="Ej: Show en vivo 60 min"
                        />
                      </div>
                      <div className="form-group flex-1">
                        <label>Estado de Booking</label>
                        <input
                          type="text"
                          value={bookingStatus}
                          onChange={(e) => setBookingStatus(e.target.value)}
                          placeholder="Disponible para Giras"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group flex-1">
                        <label>YouTube ID (Videoclip)</label>
                        <input
                          type="text"
                          value={youtubeVideoId}
                          onChange={(e) => setYoutubeVideoId(e.target.value)}
                          placeholder="Ej: TlTuiVFTb0g"
                        />
                      </div>
                      <div className="form-group flex-1">
                        <label>Título del Video</label>
                        <input
                          type="text"
                          value={youtubeVideoTitle}
                          onChange={(e) => setYoutubeVideoTitle(e.target.value)}
                          placeholder="Ej: Vuelve Vuelve - Oficial"
                        />
                      </div>
                    </div>

                    {/* Redes Sociales */}
                    <div className="form-row">
                      <input
                        type="url"
                        value={socialYoutube}
                        onChange={(e) => setSocialYoutube(e.target.value)}
                        placeholder="Canal YouTube (URL)"
                        className="input-sub"
                      />
                      <input
                        type="url"
                        value={socialTiktok}
                        onChange={(e) => setSocialTiktok(e.target.value)}
                        placeholder="Perfil TikTok (URL)"
                        className="input-sub"
                      />
                    </div>
                    <div className="form-row">
                      <input
                        type="url"
                        value={socialFacebook}
                        onChange={(e) => setSocialFacebook(e.target.value)}
                        placeholder="Página Facebook (URL)"
                        className="input-sub"
                      />
                      <input
                        type="url"
                        value={socialSpotify}
                        onChange={(e) => setSocialSpotify(e.target.value)}
                        placeholder="Spotify Artista (URL)"
                        className="input-sub"
                      />
                    </div>

                    <button type="submit" className="button button-lime w-full mt-2">
                      {editingArtistId ? "Guardar Cambios del Artista" : "+ Registrar Artista en SELVA MUSIC"}
                    </button>
                  </form>
                </div>

                {/* Catálogo Actual de Artistas */}
                <div className="admin-panel-card">
                  <h4>Catálogo Activo de Artistas ({artists.length})</h4>
                  <p className="card-subtext">Selecciona un artista para modificar sus datos o eliminarlo.</p>

                  <div className="admin-artist-list">
                    {artists.map((art) => (
                      <div key={art.id} className="admin-artist-card">
                        <img src={art.photo} alt={art.name} className="artist-thumb" />
                        <div className="artist-info">
                          <h5>{art.name}</h5>
                          <span>{art.role}</span>
                          <div className="artist-mini-tags">
                            <small>🎵 {art.tracks?.length || 0} tracks</small>
                            <small>📸 {art.gallery?.length || 1} fotos</small>
                            <small>📍 {art.location.split(",")[0]}</small>
                          </div>
                        </div>
                        <div className="artist-actions">
                          <button
                            type="button"
                            onClick={() => handleStartEditArtist(art)}
                            className="btn-edit"
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteArtist(art.id)}
                            className="btn-delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: GESTOR DE MÚSICA & PLAYLISTS */}
            {activeTab === "music" && (
              <div className="admin-tab-grid">
                {/* Formulario de Subida de Música */}
                <div className="admin-panel-card">
                  <h4>🎧 Añadir Canción a Playlists</h4>
                  <p className="card-subtext">
                    Sube un archivo de audio directamente desde tu dispositivo o ingresa un enlace directo. Se añadirá a la playlist personal del artista y al reproductor general.
                  </p>

                  <form onSubmit={handleAddTrack} className="admin-form-compact">
                    <div className="form-group">
                      <label>Selecciona el Artista *</label>
                      <select
                        value={targetArtistId}
                        onChange={(e) => setTargetArtistId(e.target.value)}
                        required
                      >
                        {artists.map((art) => (
                          <option key={art.id} value={art.id}>
                            {art.name} ({art.role})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Título de la Canción / Mix *</label>
                      <input
                        type="text"
                        value={trackTitle}
                        onChange={(e) => setTrackTitle(e.target.value)}
                        placeholder="Ej: Mix Éxitos Chapareños 2026"
                        required
                      />
                    </div>

                    {/* Subida Directa de Archivo de Audio Local */}
                    <div className="admin-upload-dropzone">
                      <FileAudio size={24} />
                      <label htmlFor="audioFileInput" className="dropzone-label">
                        <strong>Subir Archivo de Audio (MP3, WAV, AAC, M4A)</strong>
                        <span>Haz clic para elegir un archivo de tu computadora o teléfono</span>
                      </label>
                      <input
                        id="audioFileInput"
                        type="file"
                        accept="audio/*"
                        onChange={handleLocalAudioFile}
                        className="dropzone-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>o Enlace Directo de Audio (MP3 / CDN)</label>
                      <input
                        type="text"
                        value={trackAudioUrl}
                        onChange={(e) => setTrackAudioUrl(e.target.value)}
                        placeholder="https://... o archivo cargado arriba"
                        required
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group flex-1">
                        <label>Duración (Ej: 3:25)</label>
                        <input
                          type="text"
                          value={trackDuration}
                          onChange={(e) => setTrackDuration(e.target.value)}
                          placeholder="3:25"
                        />
                      </div>
                      <div className="form-group flex-1">
                        <label>Año de Lanzamiento</label>
                        <input
                          type="text"
                          value={trackYear}
                          onChange={(e) => setTrackYear(e.target.value)}
                          placeholder="2026"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Carátula de la Canción (Opcional)</label>
                      <input
                        type="url"
                        value={trackCoverUrl}
                        onChange={(e) => setTrackCoverUrl(e.target.value)}
                        placeholder="https://... (por defecto usa la foto del artista)"
                      />
                    </div>

                    <button type="submit" className="button button-lime w-full mt-2">
                      + Publicar Canción en Playlists
                    </button>
                  </form>
                </div>

                {/* Lista de Canciones por Artista */}
                <div className="admin-panel-card">
                  <h4>Playlists por Artista & Global</h4>
                  <p className="card-subtext">Todas estas pistas se reproducen en el reproductor continuo flotante del sitio.</p>

                  <div className="admin-track-roster">
                    {artists.map((art) => (
                      <div key={art.id} className="artist-track-section">
                        <div className="artist-track-header">
                          <img src={art.photo} alt={art.name} />
                          <div>
                            <strong>{art.name}</strong>
                            <span>{art.tracks?.length || 0} canciones registradas</span>
                          </div>
                        </div>

                        {art.tracks && art.tracks.length > 0 ? (
                          <div className="track-items-list">
                            {art.tracks.map((tr) => (
                              <div key={tr.id} className="admin-track-item">
                                <div className="track-meta">
                                  {onPlayTrack && (
                                    <button
                                      type="button"
                                      onClick={() => onPlayTrack(tr)}
                                      className="btn-play-sm"
                                      title="Reproducir ahora"
                                    >
                                      <Play size={12} fill="currentColor" />
                                    </button>
                                  )}
                                  <strong>{tr.title}</strong>
                                  <small>({tr.duration})</small>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteTrack(art.id, tr.id)}
                                  className="btn-delete"
                                  title="Eliminar pista"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="empty-track-msg">Sin canciones añadidas aún.</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: CALENDARIO DE SHOWS & CRUCES DE FECHA */}
            {activeTab === "calendar" && (
              <div className="admin-panel-card full-width">
                <div className="calendar-header-flex">
                  <div>
                    <h4>📅 Calendario Inteligente de Shows & Sistema Anticolisión</h4>
                    <p className="card-subtext">
                      Las reservas de clientes llegan automáticamente aquí. El sistema detecta si un mismo artista tiene 2 shows programados el mismo día o en diferentes ciudades para evitar cancelaciones y reclamos.
                    </p>
                  </div>
                  <div className="calendar-stats-pill">
                    <strong>Total Registros:</strong> {bookings.length}
                  </div>
                </div>

                <div className="admin-bookings-list">
                  {bookings.length === 0 ? (
                    <div className="empty-bookings-box">
                      <Calendar size={36} />
                      <p>No hay solicitudes de fechas registradas todavía.</p>
                    </div>
                  ) : (
                    bookings.map((b) => {
                      // Comprobar conflicto con otras reservas en la misma fecha
                      const hasClash = bookings.some(
                        (other) =>
                          other.id !== b.id &&
                          other.artistId === b.artistId &&
                          other.date === b.date &&
                          other.status !== "conflict"
                      );

                      const conflictingOther = hasClash
                        ? bookings.find(
                            (other) =>
                              other.id !== b.id &&
                              other.artistId === b.artistId &&
                              other.date === b.date
                          )
                        : null;

                      return (
                        <div
                          key={b.id}
                          className={`booking-card-item ${hasClash ? "has-conflict-border" : ""}`}
                        >
                          <div className="booking-card-main">
                            <div className="booking-meta-head">
                              <span className="booking-artist-tag">{b.artistName}</span>
                              <span className="booking-date-badge">
                                📅 {b.date} · ⏰ {b.time}
                              </span>
                              <span className={`booking-status-badge status-${b.status}`}>
                                {b.status === "confirmed" && "Confirmado"}
                                {b.status === "pending" && "Pendiente"}
                                {b.status === "conflict" && "Alerta de Cruce"}
                              </span>
                            </div>

                            {hasClash && (
                              <div className="booking-clash-warning">
                                <AlertTriangle size={15} />
                                <span>
                                  <strong>¡ALERTA DE CRUCE DE FECHA!</strong> {b.artistName} tiene otra presentación programada el {b.date} en {conflictingOther?.city} ({conflictingOther?.clientName}).
                                </span>
                              </div>
                            )}

                            <div className="booking-details-grid">
                              <div><strong>Contratante:</strong> {b.clientName}</div>
                              <div><strong>Teléfono:</strong> <a href={`https://wa.me/${b.clientPhone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">{b.clientPhone}</a></div>
                              <div><strong>Ciudad / Lugar:</strong> {b.city}</div>
                              <div><strong>Tipo de Evento:</strong> {b.eventType}</div>
                            </div>

                            {b.notes && (
                              <div className="booking-notes-row">
                                <em>Observaciones:</em> {b.notes}
                              </div>
                            )}
                          </div>

                          <div className="booking-card-actions">
                            <select
                              value={b.status}
                              onChange={(e) =>
                                handleUpdateBookingStatus(b.id, e.target.value as any)
                              }
                              className="booking-status-select"
                            >
                              <option value="pending">Marcar Pendiente</option>
                              <option value="confirmed">Confirmar Fecha</option>
                              <option value="conflict">Marcar Conflicto</option>
                            </select>

                            <button
                              type="button"
                              onClick={() => handleDeleteBooking(b.id)}
                              className="btn-delete-booking"
                              title="Eliminar solicitud"
                            >
                              <Trash2 size={14} /> Eliminar
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {/* TAB 4: DEPARTAMENTO LEGAL & CONTRATOS 360° (LEYES DE BOLIVIA) */}
            {activeTab === "legal" && <LegalContractsPanel />}
          </div>
        )}
      </div>
    </div>
  );
}
