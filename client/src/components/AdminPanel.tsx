import { Check, Edit3, Key, Lock, LogOut, Music, Plus, Trash2, Upload, UserPlus, X } from "lucide-react";
import { useState } from "react";
import type { Artist, Track } from "@/lib/wilorContent";
import { defaultDemoAudio } from "@/lib/wilorContent";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  artists: Artist[];
  onSaveArtists: (updated: Artist[]) => void;
}

export default function AdminPanel({ isOpen, onClose, artists, onSaveArtists }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("selva_admin_session") === "true";
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Estado para crear o editar artista
  const [editingArtist, setEditingArtist] = useState<Artist | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Campos de formulario
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [category, setCategory] = useState<"dj" | "vocal" | "group">("vocal");
  const [genre, setGenre] = useState("");
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState("");
  const [bio, setBio] = useState("");
  const [showFormat, setShowFormat] = useState("");
  const [bookingStatus, setBookingStatus] = useState("Disponible para Contrataciones");
  const [featuredTitle, setFeaturedTitle] = useState("");
  const [featuredYoutubeId, setFeaturedYoutubeId] = useState("");

  // Lista de canciones del artista en edición
  const [artistTracks, setArtistTracks] = useState<Track[]>([]);
  const [newTrackTitle, setNewTrackTitle] = useState("");
  const [newTrackAudioUrl, setNewTrackAudioUrl] = useState("");
  const [newTrackDuration, setNewTrackDuration] = useState("3:00");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().toLowerCase() === "djwilormaestra@gmail.com" && password === "Djwilor@") {
      setIsAuthenticated(true);
      localStorage.setItem("selva_admin_session", "true");
      setLoginError("");
    } else {
      setLoginError("Credenciales incorrectas. Verifique el correo y la contraseña.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("selva_admin_session");
  };

  const handleOpenCreate = () => {
    setEditingArtist(null);
    setName("");
    setRole("Vocalista · Artista del Sello");
    setCategory("vocal");
    setGenre("Electro Tumbado / Urbano");
    setLocation("Bolivia");
    setPhoto("https://i.ytimg.com/vi/TlTuiVFTb0g/hqdefault.jpg");
    setBio("");
    setShowFormat("Show en vivo para discotecas y festivales (45 a 60 min).");
    setBookingStatus("Disponible para Contrataciones");
    setFeaturedTitle("");
    setFeaturedYoutubeId("TlTuiVFTb0g");
    setArtistTracks([]);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (artist: Artist) => {
    setEditingArtist(artist);
    setName(artist.name);
    setRole(artist.role);
    setCategory(artist.category);
    setGenre(artist.genre);
    setLocation(artist.location);
    setPhoto(artist.photo);
    setBio(artist.bio);
    setShowFormat(artist.showFormat);
    setBookingStatus(artist.bookingStatus);
    setFeaturedTitle(artist.featuredTrack.title);
    setFeaturedYoutubeId(artist.featuredTrack.youtubeId);
    setArtistTracks(artist.tracks || []);
    setIsFormOpen(true);
  };

  const handleDeleteArtist = (artistId: string) => {
    if (window.confirm("¿Seguro que deseas eliminar este artista del catálogo?")) {
      const updated = artists.filter((a) => a.id !== artistId);
      onSaveArtists(updated);
    }
  };

  const handleAddTrack = () => {
    if (!newTrackTitle.trim()) return;
    const newTrack: Track = {
      id: "track-" + Date.now(),
      title: newTrackTitle.trim(),
      artist: name || "SELVA MUSIC",
      duration: newTrackDuration.trim() || "3:00",
      audioUrl: newTrackAudioUrl.trim() || defaultDemoAudio,
      coverUrl: photo || "https://i.ytimg.com/vi/TlTuiVFTb0g/hqdefault.jpg",
      year: "2026",
    };
    setArtistTracks([...artistTracks, newTrack]);
    setNewTrackTitle("");
    setNewTrackAudioUrl("");
  };

  const handleRemoveTrack = (trackId: string) => {
    setArtistTracks(artistTracks.filter((t) => t.id !== trackId));
  };

  const handleSaveArtist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const artistData: Artist = {
      id: editingArtist ? editingArtist.id : "artist-" + Date.now(),
      name: name.trim(),
      role: role.trim() || "Artista Oficial",
      category,
      genre: genre.trim() || "Urbano / Tropical",
      location: location.trim() || "Bolivia",
      photo: photo.trim() || "https://i.ytimg.com/vi/TlTuiVFTb0g/hqdefault.jpg",
      bio: bio.trim() || `Artista del sello SELVA MUSIC Group, representante del sonido urbano boliviano.`,
      showFormat: showFormat.trim() || "Show en vivo (45 a 60 min).",
      bookingStatus: bookingStatus.trim() || "Disponible para Contrataciones",
      featuredTrack: {
        title: featuredTitle.trim() || "Lanzamiento Oficial",
        format: "Single Oficial · SELVA MUSIC",
        youtubeId: featuredYoutubeId.trim() || "TlTuiVFTb0g",
        youtubeUrl: `https://www.youtube.com/watch?v=${featuredYoutubeId.trim() || "TlTuiVFTb0g"}`,
      },
      highlights: [
        `Artista integrante de SELVA MUSIC Group`,
        `Producciones y lanzamientos disponibles en plataformas`,
        `Show en vivo de alta energía`,
      ],
      socials: [
        { platform: "YouTube", url: "https://www.youtube.com/@Wilordj" },
        { platform: "TikTok", url: "https://www.tiktok.com/@djwilor" },
      ],
      tracks: artistTracks.length > 0 ? artistTracks : [
        {
          id: "def-tr-" + Date.now(),
          title: featuredTitle.trim() || name.trim() + " - Estreno",
          artist: name.trim(),
          duration: "3:00",
          audioUrl: defaultDemoAudio,
          coverUrl: photo.trim() || "https://i.ytimg.com/vi/TlTuiVFTb0g/hqdefault.jpg",
          year: "2026",
        },
      ],
    };

    let updatedList: Artist[];
    if (editingArtist) {
      updatedList = artists.map((a) => (a.id === editingArtist.id ? artistData : a));
    } else {
      updatedList = [...artists, artistData];
    }

    onSaveArtists(updatedList);
    setIsFormOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="admin-close-btn" onClick={onClose} aria-label="Cerrar panel">
          <X size={20} />
        </button>

        {!isAuthenticated ? (
          /* =================================================================
             PANTALLA DE LOGIN MAESTRO
             ================================================================= */
          <div className="admin-login-box">
            <div className="admin-icon-ring">
              <Lock size={32} />
            </div>
            <h2>Acceso Maestro · Sello</h2>
            <p>Ingresa con la cuenta autorizada de SELVA MUSIC Group para administrar artistas y canciones.</p>

            <form onSubmit={handleLogin} className="admin-login-form">
              <div className="admin-input-group">
                <label>Correo Electrónico</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="djwilormaestra@gmail.com"
                  required
                />
              </div>

              <div className="admin-input-group">
                <label>Contraseña</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              {loginError && <p className="admin-error-text">{loginError}</p>}

              <button type="submit" className="button button-lime admin-submit-btn">
                <Key size={16} /> Iniciar Sesión de Administrador
              </button>
            </form>
          </div>
        ) : (
          /* =================================================================
             PANEL DE ADMINISTRACIÓN MAESTRO
             ================================================================= */
          <div className="admin-dashboard">
            <div className="admin-dash-header">
              <div>
                <h2>SELVA MUSIC STUDIO</h2>
                <p>Gestión de Artistas, Catálogo y Playlists de Audio</p>
              </div>
              <div className="admin-dash-user-actions">
                <button type="button" className="button button-lime-sm" onClick={handleOpenCreate}>
                  <UserPlus size={16} /> + Nuevo Artista
                </button>
                <button type="button" className="admin-logout-btn" onClick={handleLogout} title="Cerrar Sesión">
                  <LogOut size={16} /> Salir
                </button>
              </div>
            </div>

            {isFormOpen ? (
              /* FORMULARIO DE CREAR / EDITAR ARTISTA */
              <form onSubmit={handleSaveArtist} className="admin-artist-form">
                <div className="form-head">
                  <h3>{editingArtist ? `Editar: ${editingArtist.name}` : "Añadir Nuevo Artista al Sello"}</h3>
                  <button type="button" className="form-cancel-btn" onClick={() => setIsFormOpen(false)}>
                    Cancelar
                  </button>
                </div>

                <div className="form-grid-2">
                  <div className="admin-input-group">
                    <label>Nombre del Artista / Grupo *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej: Emily Escobar"
                      required
                    />
                  </div>

                  <div className="admin-input-group">
                    <label>Rol o Título</label>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="Ej: Vocalista · Pop Urbano"
                    />
                  </div>

                  <div className="admin-input-group">
                    <label>Categoría</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as "dj" | "vocal" | "group")}
                    >
                      <option value="vocal">Cantante / Vocalista Urbano</option>
                      <option value="dj">DJ & Productor</option>
                      <option value="group">Agrupación / Orquesta en Vivo</option>
                    </select>
                  </div>

                  <div className="admin-input-group">
                    <label>Género Musical</label>
                    <input
                      type="text"
                      value={genre}
                      onChange={(e) => setGenre(e.target.value)}
                      placeholder="Ej: Electro Tumbado / Funk Latino"
                    />
                  </div>

                  <div className="admin-input-group">
                    <label>Origen / Ubicación</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Ej: Cochabamba, Bolivia"
                    />
                  </div>

                  <div className="admin-input-group">
                    <label>URL de Foto del Artista</label>
                    <input
                      type="text"
                      value={photo}
                      onChange={(e) => setPhoto(e.target.value)}
                      placeholder="https://... o ./assets/..."
                    />
                  </div>
                </div>

                <div className="admin-input-group">
                  <label>Biografía & Trayectoria</label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Escribe la historia, logros y estilo del artista..."
                  />
                </div>

                <div className="form-grid-2">
                  <div className="admin-input-group">
                    <label>Formato de Show en Vivo</label>
                    <input
                      type="text"
                      value={showFormat}
                      onChange={(e) => setShowFormat(e.target.value)}
                      placeholder="Ej: Show vocal en vivo con bailarinas (45 min)"
                    />
                  </div>

                  <div className="admin-input-group">
                    <label>YouTube ID del Video Destacado</label>
                    <input
                      type="text"
                      value={featuredYoutubeId}
                      onChange={(e) => setFeaturedYoutubeId(e.target.value)}
                      placeholder="Ej: TlTuiVFTb0g"
                    />
                  </div>
                </div>

                {/* GESTIÓN DE CANCIONES DEL ARTISTA */}
                <div className="admin-tracks-subform">
                  <h4>
                    <Music size={16} /> Canciones & Playlist del Artista ({artistTracks.length})
                  </h4>
                  <p>Añade los temas que se reproducirán en su perfil y en la playlist general de la web.</p>

                  <div className="add-track-inline">
                    <input
                      type="text"
                      placeholder="Título de la canción"
                      value={newTrackTitle}
                      onChange={(e) => setNewTrackTitle(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="URL del archivo MP3 / WAV"
                      value={newTrackAudioUrl}
                      onChange={(e) => setNewTrackAudioUrl(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Duración (3:15)"
                      value={newTrackDuration}
                      onChange={(e) => setNewTrackDuration(e.target.value)}
                      className="track-dur-input"
                    />
                    <button type="button" className="button button-lime-sm" onClick={handleAddTrack}>
                      <Plus size={14} /> Añadir
                    </button>
                  </div>

                  <div className="tracks-list-preview">
                    {artistTracks.map((tr) => (
                      <div key={tr.id} className="track-preview-pill">
                        <Music size={13} />
                        <span>{tr.title}</span>
                        <small>{tr.duration}</small>
                        <button
                          type="button"
                          className="track-delete-icon"
                          onClick={() => handleRemoveTrack(tr.id)}
                          aria-label="Eliminar canción"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-submit-row">
                  <button type="submit" className="button button-lime">
                    <Check size={16} /> Guardar Artista en el Roster
                  </button>
                </div>
              </form>
            ) : (
              /* LISTA DE ARTISTAS REGISTRADOS */
              <div className="admin-artists-list">
                <div className="admin-list-summary">
                  <span>{artists.length} Artistas en el catálogo oficial</span>
                </div>

                <div className="admin-cards-scroll">
                  {artists.map((art) => (
                    <div key={art.id} className="admin-artist-row">
                      <img src={art.photo} alt="" className="admin-row-thumb" />
                      <div className="admin-row-info">
                        <strong>{art.name}</strong>
                        <span>{art.role}</span>
                        <small>
                          {art.genre} • {art.tracks?.length || 0} canciones registradas
                        </small>
                      </div>
                      <div className="admin-row-actions">
                        <button
                          type="button"
                          className="admin-edit-action"
                          onClick={() => handleOpenEdit(art)}
                        >
                          <Edit3 size={15} /> Editar
                        </button>
                        <button
                          type="button"
                          className="admin-delete-action"
                          onClick={() => handleDeleteArtist(art.id)}
                        >
                          <Trash2 size={15} /> Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
