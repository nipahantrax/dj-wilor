import { ArrowDownRight, ArrowRight, ArrowUpRight, CheckCircle2, Disc3, Headphones, Lock, MapPin, MessageCircle, Mic2, Music2, Play, Radio, Sparkles, Users, X } from "lucide-react";
import { useState } from "react";
import type { ReactNode, SyntheticEvent } from "react";
import AdminPanel from "@/components/AdminPanel";
import AudioPlayer from "@/components/AudioPlayer";
import SiteHeader from "@/components/SiteHeader";
import { contact, extractAllTracks, milestones, rosterArtists, sealLink, socialLinks, works, type Artist, type Track } from "@/lib/wilorContent";

const heroImage = "./assets/hero-gta-tropico.jpg";
const portraitImage = "./assets/wilor-profile.jpg";

function fallbackImage(fallback: string) {
  return (event: SyntheticEvent<HTMLImageElement>) => {
    const image = event.currentTarget;
    if (image.dataset.fallbackUsed === "true") return;
    image.dataset.fallbackUsed = "true";
    image.src = fallback;
  };
}

function SectionKicker({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="section-kicker">
      <span>{index}</span>
      <span className="kicker-line" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}

function FeaturedPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="featured-player">
      {isPlaying ? (
        <iframe
          src="https://www.youtube-nocookie.com/embed/TlTuiVFTb0g?rel=0&autoplay=1"
          title="Vuelve Vuelve — WILOR, Lesly CH y José Puyal, video oficial"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          className="featured-poster"
          type="button"
          onClick={() => setIsPlaying(true)}
          aria-label="Reproducir video oficial de Vuelve Vuelve"
        >
          <img src="https://i.ytimg.com/vi/TlTuiVFTb0g/maxresdefault.jpg" onError={fallbackImage("https://i.ytimg.com/vi/TlTuiVFTb0g/hqdefault.jpg")} alt="" />
          <span className="featured-poster-overlay">
            <span className="release-play"><Play size={21} fill="currentColor" /></span>
            <span>REPRODUCIR VIDEO OFICIAL</span>
          </span>
        </button>
      )}
      <div className="player-caption"><span><Radio size={14} /> VIDEO OFICIAL</span><span>WILOR × LESLY CH × JOSÉ PUYAL</span></div>
    </div>
  );
}

export default function Home() {
  const [artists, setArtists] = useState<Artist[]>(() => {
    try {
      const saved = localStorage.getItem("selva_artists_roster");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return rosterArtists;
  });

  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [activeCategory, setActiveCategory] = useState<"all" | "dj" | "vocal" | "group">("all");
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Sistema de Audio Global
  const allTracks = extractAllTracks(artists);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(() => allTracks[0] || null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleNextTrack = () => {
    if (!currentTrack || allTracks.length === 0) return;
    const currentIndex = allTracks.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % allTracks.length;
    setCurrentTrack(allTracks[nextIndex]);
    setIsPlaying(true);
  };

  const handlePrevTrack = () => {
    if (!currentTrack || allTracks.length === 0) return;
    const currentIndex = allTracks.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + allTracks.length) % allTracks.length;
    setCurrentTrack(allTracks[prevIndex]);
    setIsPlaying(true);
  };

  const handleSaveArtists = (updated: Artist[]) => {
    setArtists(updated);
    try {
      localStorage.setItem("selva_artists_roster", JSON.stringify(updated));
    } catch (e) {}
  };

  const filteredArtists = activeCategory === "all"
    ? artists
    : artists.filter((a) => a.category === activeCategory);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <SiteHeader />
      <main id="contenido">
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <img className="hero-image" src={heroImage} onError={fallbackImage("https://i.ytimg.com/vi/TlTuiVFTb0g/maxresdefault.jpg")} alt="Visual de una presentación en vivo relacionada con el portafolio de WILOR." />
          <div className="hero-vignette" aria-hidden="true" />
          <div className="hero-grain" aria-hidden="true" />
          <div className="hero-inner">
            <p className="hero-overline"><span className="status-dot" /> ARTISTA · PRODUCTOR · BOLIVIA</p>
            <h1 id="hero-title">Desde el Trópico.<br /><em>Con sonido propio.</em></h1>
            <div className="hero-lower">
              <p className="hero-copy">DJ WILOR crea desde el Trópico de Cochabamba, Bolivia. Música, escenario y una visión abierta a nuevas voces.</p>
              <div className="hero-actions">
                <a className="button button-lime" href="https://open.spotify.com/artist/6AiurSOGTBZe8MKSNCPuya" target="_blank" rel="noreferrer">
                  Escuchar a WILOR <ArrowUpRight size={16} />
                </a>
                <a className="text-link" href="#portafolio">Explorar portafolio <ArrowDownRight size={17} /></a>
              </div>
            </div>
            <div className="hero-index" aria-hidden="true"><span>ARTISTA DEL TRÓPICO</span><span>COCHABAMBA · BOLIVIA</span></div>
          </div>
          <a className="hero-release" href="https://www.youtube.com/watch?v=TlTuiVFTb0g" target="_blank" rel="noreferrer" aria-label="Escuchar Vuelve Vuelve, colaboración de WILOR, Lesly CH y José Puyal">
            <span className="release-play"><Play size={15} fill="currentColor" /></span>
            <span className="release-info"><small>ÚLTIMO LANZAMIENTO · 2026</small><strong>Vuelve Vuelve</strong><span>WILOR · Lesly CH · José Puyal</span></span>
            <ArrowUpRight className="release-arrow" size={18} />
          </a>
          <div className="hero-image-note">VISUAL EDITORIAL · LANZAMIENTO DESTACADO ABAJO</div>
        </section>

        <div className="signal-strip" aria-label="Identidad de WILOR">
          <span>TRÓPICO DE COCHABAMBA</span><i aria-hidden="true">✳</i><span>PRODUCCIÓN MUSICAL</span><i aria-hidden="true">✳</i><span>SELVA MUSIC GROUP</span><i aria-hidden="true">✳</i><span>TRÓPICO DE COCHABAMBA</span>
        </div>

        <section className="portfolio-section section-wrap" id="portafolio" aria-labelledby="portfolio-title">
          <div className="section-heading">
            <SectionKicker index="01">OBRA SELECCIONADA</SectionKicker>
            <div className="heading-row">
              <h2 id="portfolio-title">Un recorrido en <span>canciones.</span></h2>
              <p>Una selección de lanzamientos y colaboraciones. Cada crédito enlaza a su publicación original.</p>
            </div>
          </div>

          <div className="featured-work">
            <div className="featured-copy">
              <div className="featured-badge"><span className="status-dot" /> EN ROTACIÓN</div>
              <p className="featured-label">SINGLE · 2026</p>
              <h3>Vuelve<br /><em>Vuelve</em></h3>
              <p className="featured-artists">WILOR · LESLY CH · JOSÉ PUYAL</p>
              <p className="featured-description">Una colaboración nacida para el movimiento. Escucha el lanzamiento o mira el video oficial.</p>
              <div className="featured-actions">
                <a className="button button-dark" href="https://open.spotify.com/album/2GPdRKAF2TfnJR2NG59K29" target="_blank" rel="noreferrer">Escuchar en Spotify <ArrowUpRight size={15} /></a>
                <a className="text-link text-link-dark" href="https://www.youtube.com/watch?v=TlTuiVFTb0g" target="_blank" rel="noreferrer">Ver video <ArrowUpRight size={15} /></a>
              </div>
            </div>
            <FeaturedPlayer />
          </div>

          <div className="work-grid" aria-label="Selección de colaboraciones">
            {works.filter((work) => work.title !== "Vuelve Vuelve").map((work, index) => (
              <a className="work-card" href={work.youtubeUrl} target="_blank" rel="noreferrer" key={work.title} aria-label={`Ver ${work.title} en YouTube`}>
                <div className="work-image-wrap">
                  <img src={`https://i.ytimg.com/vi/${work.youtubeId}/hqdefault.jpg`} alt={`Miniatura del video ${work.title}`} loading="lazy" />
                  <span className="work-number">0{index + 1}</span>
                  <span className="work-play" aria-hidden="true"><Play size={14} fill="currentColor" /></span>
                </div>
                <div className="work-card-info">
                  <div className="work-meta"><span>{work.format}</span><span>{work.year}</span></div>
                  <h3>{work.title}</h3>
                  <p>{work.collaborators}</p>
                  {work.sourceLabel && <span className="label-credit">℗ {work.sourceLabel}</span>}
                </div>
              </a>
            ))}
          </div>
          <div className="portfolio-footer"><p>Catálogo oficial de lanzamientos y colaboraciones discográficas.</p><a className="text-link text-link-dark" href="https://www.youtube.com/@Wilordj" target="_blank" rel="noreferrer">Ver canal oficial <ArrowUpRight size={15} /></a></div>
        </section>

        <section className="story-section" id="trayectoria" aria-labelledby="story-title">
          <div className="story-image-wrap">
            <img src={portraitImage} alt="Retrato de perfil publicado por WILOR en Spotify." loading="lazy" />
            <a className="image-source" href="https://open.spotify.com/artist/6AiurSOGTBZe8MKSNCPuya" target="_blank" rel="noreferrer">IMAGEN DEL PERFIL DE ARTISTA · SPOTIFY <ArrowUpRight size={13} /></a>
          </div>
          <div className="story-content">
            <SectionKicker index="02">HISTORIA & TRAYECTORIA</SectionKicker>
            <h2 id="story-title">Una voz que viene <span>del Trópico.</span></h2>
            <p className="story-lede">WILOR se presenta como DJ, artista y productor boliviano. Su identidad pública está conectada con el Chapare y el Trópico de Cochabamba: un origen que acompaña su recorrido entre el escenario, el estudio y las colaboraciones.</p>
            <div className="timeline">
              {milestones.map((item) => (
                <a className="timeline-item" key={item.year + item.title} href={item.url} target="_blank" rel="noreferrer">
                  <span className="timeline-year">{item.year}</span>
                  <span className="timeline-copy"><strong>{item.title}</strong><small>{item.detail}</small></span>
                  <ArrowUpRight size={15} />
                </a>
              ))}
            </div>
            <a className="text-link text-link-dark story-link" href="https://www.tiktok.com/@djwilor" target="_blank" rel="noreferrer">Ver publicaciones y presentaciones <ArrowUpRight size={15} /></a>
          </div>
        </section>

        <section className="production-section section-wrap" id="produccion" aria-labelledby="production-title">
          <div className="production-photo">
            <img src="https://i.ytimg.com/vi/91myZgOitUk/hqdefault.jpg" alt="Miniatura del videoclip LES DUELE VERME BIEN, colaboración de WILOR y Gio Villarroel." loading="lazy" />
            <a className="photo-caption" href="https://www.youtube.com/watch?v=91myZgOitUk" target="_blank" rel="noreferrer">VIDEO OFICIAL · LES DUELE VERME BIEN <ArrowUpRight size={11} /></a>
            <div className="production-stamp" aria-hidden="true"><Sparkles size={19} /><span>IDEA<br />A OBRA</span></div>
          </div>
          <div className="production-copy">
            <SectionKicker index="03">PRODUCCIÓN & DIRECCIÓN</SectionKicker>
            <h2 id="production-title">El sonido empieza con <em>una visión.</em></h2>
            <p>Producción musical, dirección creativa, beats exclusivos, asesoría legal y desarrollo de artistas para llevar cada proyecto al siguiente nivel.</p>
            <div className="service-list">
              <div><span>01</span><strong>Producción Musical Completa</strong><small>Composición, arreglos, mezcla y masterización lista para plataformas de streaming.</small></div>
              <div><span>02</span><strong>Creación de Beats & Instrumentales</strong><small>Pistas exclusivas: electro tumbado, funk latino, cumbia y ritmos urbanos.</small></div>
              <div><span>03</span><strong>Librerías de Samples & Drum Kits</strong><small>Sonidos percusivos, loops y recursos originales diseñados para productores.</small></div>
              <div><span>04</span><strong>Asesoría Legal & Registro de Obras</strong><small>Protección de derechos de autor (SOBODAYCOM/SENAPI), licencias y split-sheets.</small></div>
              <div><span>05</span><strong>Distribución Digital Global</strong><small>Lanzamientos en Spotify, Apple Music, YouTube y TikTok con SELVA MUSIC Group.</small></div>
              <div><span>06</span><strong>Desarrollo Artístico & A&R</strong><small>Dirección ejecutiva, proyección de imagen y gestión para artistas emergentes.</small></div>
            </div>
            <a className="button button-lime production-cta" href="#contacto">Hablemos de tu proyecto <ArrowRight size={16} /></a>
          </div>
        </section>

        {/* =========================================================================
            SECCIÓN 04: ROSTER DE ARTISTAS DE SELVA MUSIC GROUP
           ========================================================================= */}
        <section className="roster-section section-wrap" id="artistas" aria-labelledby="roster-title">
          <div className="section-heading">
            <SectionKicker index="04">ROSTER OFICIAL · SELVA MUSIC GROUP</SectionKicker>
            <div className="heading-row">
              <h2 id="roster-title">Nuestros <span>artistas & talentos.</span></h2>
              <p>Música, biografía, videoclips oficiales y contratación directa de los exponentes que lideran el sonido urbano y tropical de Bolivia.</p>
            </div>
          </div>

          {/* Filtros de Categoría */}
          <div className="roster-filters" role="tablist" aria-label="Filtrar artistas">
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === "all"}
              className={`filter-btn ${activeCategory === "all" ? "is-active" : ""}`}
              onClick={() => setActiveCategory("all")}
            >
              <Music2 size={14} /> Todos ({artists.length})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === "dj"}
              className={`filter-btn ${activeCategory === "dj" ? "is-active" : ""}`}
              onClick={() => setActiveCategory("dj")}
            >
              <Headphones size={14} /> DJs & Productores
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === "vocal"}
              className={`filter-btn ${activeCategory === "vocal" ? "is-active" : ""}`}
              onClick={() => setActiveCategory("vocal")}
            >
              <Mic2 size={14} /> Cantantes Urbanos
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === "group"}
              className={`filter-btn ${activeCategory === "group" ? "is-active" : ""}`}
              onClick={() => setActiveCategory("group")}
            >
              <Users size={14} /> Agrupaciones
            </button>
          </div>

          {/* Grid de Artistas */}
          <div className="roster-grid">
            {filteredArtists.map((artist) => (
              <article className="artist-card" key={artist.id}>
                <div className="artist-card-media" onClick={() => setSelectedArtist(artist)}>
                  <img
                    src={artist.photo}
                    alt={artist.name}
                    loading="lazy"
                    onError={fallbackImage("https://i.ytimg.com/vi/TlTuiVFTb0g/hqdefault.jpg")}
                  />
                  <div className="artist-card-overlay">
                    <span className="artist-badge">{artist.role.split("·")[0].trim()}</span>
                    <button
                      type="button"
                      className="artist-view-btn"
                      aria-label={`Ver perfil completo de ${artist.name}`}
                    >
                      <span>Ver Ficha & Shows</span>
                      <ArrowUpRight size={15} />
                    </button>
                  </div>
                </div>

                <div className="artist-card-body">
                  <div className="artist-location">
                    <MapPin size={12} />
                    <span>{artist.location}</span>
                  </div>
                  <h3 className="artist-name" onClick={() => setSelectedArtist(artist)}>
                    {artist.name}
                  </h3>
                  <p className="artist-genre">{artist.genre}</p>

                  <div
                    className="artist-hit"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (artist.tracks && artist.tracks.length > 0) {
                        handlePlayTrack(artist.tracks[0]);
                      }
                    }}
                    title="Reproducir tema en el reproductor continuo"
                  >
                    <span className="hit-label">
                      {artist.tracks && artist.tracks.some((t) => t.id === currentTrack?.id) && isPlaying
                        ? "Reproduciendo ahora..."
                        : "Hit destacado · Click para escuchar"}
                    </span>
                    <div className="hit-track">
                      <Play size={12} fill="currentColor" />
                      <span>{artist.featuredTrack.title}</span>
                    </div>
                  </div>

                  <div className="artist-card-actions">
                    <button
                      type="button"
                      className="button button-card-view"
                      onClick={() => setSelectedArtist(artist)}
                    >
                      Perfil & Música
                    </button>
                    <a
                      className="button button-whatsapp-sm"
                      href={`https://wa.me/59169528962?text=${encodeURIComponent(
                        `Hola SELVA MUSIC, deseo cotizar una presentación para ${artist.name}.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Cotizar a ${artist.name} por WhatsApp`}
                    >
                      <MessageCircle size={15} /> Cotizar
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="label-section" id="sello" aria-labelledby="label-title">
          <div className="label-orbit label-orbit-one" aria-hidden="true" />
          <div className="label-orbit label-orbit-two" aria-hidden="true" />
          <div className="label-inner">
            <SectionKicker index="05">SELLO & NUEVAS VOCES</SectionKicker>
            <div className="label-heading">
              <div>
                <p className="label-wordmark"><span>SELVA</span><small>MUSIC GROUP</small></p>
                <h2 id="label-title">El sonido también <em>se construye en equipo.</em></h2>
              </div>
              <div className="label-description">
                <p>SELVA MUSIC Group es el sello discográfico independiente fundado por WILOR en el Trópico de Cochabamba, enfocado en descubrir, producir y proyectar las nuevas voces y talentos de la música urbana y tropical boliviana hacia el mercado internacional.</p>
                <a className="button button-outline" href={sealLink} target="_blank" rel="noreferrer">Visitar página del sello <ArrowUpRight size={16} /></a>
              </div>
            </div>
            <div className="label-proof">
              <p className="label-proof-title">LANZAMIENTOS CON CRÉDITO SELVA MUSIC GROUP</p>
              <div className="label-projects">
                <a href="https://www.youtube.com/watch?v=hxXAdDaDedE" target="_blank" rel="noreferrer"><span>2025</span><strong>Chica Vacilona</strong><small>WILOR · Emily</small><ArrowUpRight size={14} /></a>
                <a href="https://www.youtube.com/watch?v=P8i3iDciOhs" target="_blank" rel="noreferrer"><span>2026</span><strong>Imilla Coqueta</strong><small>WILOR · Pampeño</small><ArrowUpRight size={14} /></a>
                <a href="https://www.youtube.com/watch?v=1khpnl4WE5g" target="_blank" rel="noreferrer"><span>2026</span><strong>Los Envidiosos</strong><small>WILOR · Canseco Z.S. · Cumpa Dorian</small><ArrowUpRight size={14} /></a>
              </div>
              <p className="roster-note">Lanzamientos oficiales y coproducciones discográficas bajo el sello.</p>
            </div>
          </div>
        </section>

        <section className="social-section section-wrap" id="redes" aria-labelledby="social-title">
          <div className="social-heading">
            <SectionKicker index="06">PRESENCIA OFICIAL</SectionKicker>
            <h2 id="social-title">Sigue el recorrido.</h2>
            <p>Canales públicos de música, videos, presentaciones y contacto.</p>
          </div>
          <div className="social-grid">
            {socialLinks.map((item) => (
              <a className="social-card" href={item.url} target="_blank" rel="noreferrer" key={item.name}>
                <span className={`social-mark social-mark-${item.name.toLowerCase()}`} aria-hidden="true">{item.mark}</span>
                <span className="social-text"><strong>{item.name}</strong><small>{item.descriptor}</small></span>
                <ArrowUpRight size={17} />
              </a>
            ))}
            <a className="social-card social-card-label" href={sealLink} target="_blank" rel="noreferrer">
              <span className="social-mark social-mark-selva" aria-hidden="true">S</span>
              <span className="social-text"><strong>SELVA MUSIC Group</strong><small>Sello discográfico</small></span>
              <ArrowUpRight size={17} />
            </a>
          </div>
        </section>

        <section className="contact-section" id="contacto" aria-labelledby="contact-title">
          <div className="contact-content">
            <SectionKicker index="07">BOOKING · CONTRATACIONES · PROYECTOS</SectionKicker>
            <h2 id="contact-title">¿Hacemos<br /><em>que suene?</em></h2>
            <p>Para contratación, producción y nuevas colaboraciones, conecta directamente con WILOR.</p>
            <div className="contact-actions">
              <a
                className="button button-whatsapp"
                href="https://wa.me/59169528962?text=Hola%20DJ%20WILOR,%20me%20comunico%20desde%20tu%20web%20oficial%20para%20una%20contrataci%C3%B3n%20/%20proyecto%20musical."
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={18} /> Chatear por WhatsApp <ArrowUpRight size={16} />
              </a>
              <a className="button button-lime" href={`mailto:${contact.email}?subject=${encodeURIComponent("Contratación y proyectos — DJ WILOR")}`}>Escribir por email <ArrowUpRight size={16} /></a>
              <a className="button button-light-outline" href={`tel:${contact.phoneLink}`}>Llamar · {contact.phoneDisplay} <ArrowUpRight size={16} /></a>
            </div>
          </div>
          <div className="contact-side"><span className="contact-mark">W<span>.</span></span><p>TRÓPICO DE<br />COCHABAMBA<br /><strong>BOLIVIA</strong></p><span className="contact-line" /></div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="footer-brand" href="#inicio">WILOR<span>.</span></a>
        <p>Artista · Productor · Cochabamba, Bolivia</p>
        <div className="footer-links">
          <a href="https://www.youtube.com/@Wilordj" target="_blank" rel="noreferrer">YouTube</a>
          <a href="https://www.tiktok.com/@djwilor" target="_blank" rel="noreferrer">TikTok</a>
          <a href="https://open.spotify.com/artist/6AiurSOGTBZe8MKSNCPuya" target="_blank" rel="noreferrer">Spotify</a>
          <a href="https://www.facebook.com/WilorDj/" target="_blank" rel="noreferrer">Facebook</a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 WILOR · Portafolio de música y trayectoria</span>
          <button
            type="button"
            className="footer-admin-trigger"
            onClick={() => setIsAdminOpen(true)}
            title="Panel Maestro de Administración"
          >
            <Lock size={12} /> Acceso Maestro SELVA MUSIC
          </button>
          <a href="#inicio">Volver arriba <ArrowUpRight size={13} /></a>
        </div>
      </footer>

      <a
        className="floating-whatsapp"
        href="https://wa.me/59169528962?text=Hola%20DJ%20WILOR,%20me%20comunico%20desde%20tu%20web%20oficial%20para%20una%20contrataci%C3%B3n%20/%20proyecto%20musical."
        target="_blank"
        rel="noreferrer"
        aria-label="Contactar a DJ WILOR por WhatsApp"
      >
        <MessageCircle size={24} />
        <span>WhatsApp</span>
      </a>

      {/* Modal Ficha Técnica & Shows del Artista */}
      {selectedArtist && (
        <div
          className="artist-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-artist-title"
          onClick={() => setSelectedArtist(null)}
        >
          <div
            className="artist-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="artist-modal-close"
              onClick={() => setSelectedArtist(null)}
              aria-label="Cerrar ficha de artista"
            >
              <X size={20} />
            </button>

            <div className="artist-modal-header">
              <div className="artist-modal-avatar">
                <img
                  src={selectedArtist.photo}
                  alt={selectedArtist.name}
                  onError={fallbackImage("https://i.ytimg.com/vi/TlTuiVFTb0g/hqdefault.jpg")}
                />
              </div>
              <div className="artist-modal-titles">
                <div className="artist-modal-tags">
                  <span className="artist-badge">{selectedArtist.role}</span>
                  <span className="artist-status-pill">
                    <span className="status-dot" /> {selectedArtist.bookingStatus}
                  </span>
                </div>
                <h2 id="modal-artist-title">{selectedArtist.name}</h2>
                <div className="artist-meta-line">
                  <span><MapPin size={13} /> {selectedArtist.location}</span>
                  <span>•</span>
                  <span><Music2 size={13} /> {selectedArtist.genre}</span>
                </div>
              </div>
            </div>

            <div className="artist-modal-body">
              <div className="artist-modal-col">
                <div className="artist-bio-block">
                  <h4>Biografía & Trayectoria</h4>
                  <p>{selectedArtist.bio}</p>
                </div>

                <div className="artist-highlights-block">
                  <h4>Puntos Clave & Logros</h4>
                  <ul>
                    {selectedArtist.highlights.map((item, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={15} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="artist-show-block">
                  <h4><Sparkles size={15} /> Formato de Show en Vivo</h4>
                  <p>{selectedArtist.showFormat}</p>
                </div>
              </div>

              <div className="artist-modal-col">
                {/* PLAYLIST DE CANCIONES DEL ARTISTA */}
                {selectedArtist.tracks && selectedArtist.tracks.length > 0 && (
                  <div className="artist-playlist-block">
                    <h4>
                      <Music2 size={15} /> Playlist del Artista ({selectedArtist.tracks.length})
                    </h4>
                    <div className="artist-modal-tracklist">
                      {selectedArtist.tracks.map((tr, idx) => {
                        const isCurrent = currentTrack?.id === tr.id;
                        return (
                          <div
                            key={tr.id + idx}
                            className={`modal-track-item ${isCurrent ? "is-active" : ""}`}
                            onClick={() => handlePlayTrack(tr)}
                          >
                            <span className="modal-track-num">
                              {isCurrent && isPlaying ? (
                                <span className="audio-equalizer-sm">
                                  <i />
                                  <i />
                                  <i />
                                </span>
                              ) : (
                                <Play size={12} fill="currentColor" />
                              )}
                            </span>
                            <div className="modal-track-meta">
                              <strong>{tr.title}</strong>
                              <span>{tr.artist}</span>
                            </div>
                            <span className="modal-track-dur">{tr.duration}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="artist-player-block">
                  <h4>Videoclip / Lanzamiento</h4>
                  <div className="artist-video-container">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${selectedArtist.featuredTrack.youtubeId}?rel=0`}
                      title={`${selectedArtist.featuredTrack.title} — ${selectedArtist.name}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="player-track-info">
                    <strong>{selectedArtist.featuredTrack.title}</strong>
                    <small>{selectedArtist.featuredTrack.format}</small>
                  </div>
                </div>

                <div className="artist-socials-block">
                  <h4>Redes Oficiales</h4>
                  <div className="artist-social-pills">
                    {selectedArtist.socials.map((soc) => (
                      <a
                        key={soc.platform}
                        href={soc.url}
                        target="_blank"
                        rel="noreferrer"
                        className="artist-social-link"
                      >
                        {soc.platform} <ArrowUpRight size={13} />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="artist-booking-box">
                  <p>Contratación directa y disponibilidad:</p>
                  <a
                    className="button button-whatsapp-modal"
                    href={`https://wa.me/59169528962?text=${encodeURIComponent(
                      `Hola SELVA MUSIC, deseo cotizar una presentación / contratación de ${selectedArtist.name}.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle size={18} />
                    <span>Cotizar a {selectedArtist.name} por WhatsApp</span>
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reproductor de Audio Continuo Global */}
      <AudioPlayer
        tracks={allTracks}
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlayTrack={handlePlayTrack}
        onTogglePlay={handleTogglePlay}
        onNextTrack={handleNextTrack}
        onPrevTrack={handlePrevTrack}
      />

      {/* Panel de Administración CMS Maestro */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        artists={artists}
        onSaveArtists={handleSaveArtists}
      />
    </div>
  );
}
