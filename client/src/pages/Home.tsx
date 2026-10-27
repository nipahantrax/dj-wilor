import { ArrowDownRight, ArrowRight, ArrowUpRight, Play, Radio, Sparkles } from "lucide-react";
import { useState } from "react";
import type { ReactNode, SyntheticEvent } from "react";
import SiteHeader from "@/components/SiteHeader";
import { contact, milestones, sealLink, socialLinks, works } from "@/lib/wilorContent";

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
          <div className="portfolio-footer"><p>Créditos compilados desde publicaciones de WILOR y plataformas musicales.</p><a className="text-link text-link-dark" href="https://www.youtube.com/@Wilordj" target="_blank" rel="noreferrer">Ver canal oficial <ArrowUpRight size={15} /></a></div>
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
            <p>Producción musical, dirección creativa y desarrollo de artistas para convertir una idea en un proyecto con identidad y dirección.</p>
            <div className="service-list">
              <div><span>01</span><strong>Producción musical</strong><small>Construcción y evolución del sonido.</small></div>
              <div><span>02</span><strong>Desarrollo artístico</strong><small>Dirección para artistas en crecimiento.</small></div>
              <div><span>03</span><strong>Sello & lanzamientos</strong><small>Trabajo de catálogo bajo SELVA MUSIC Group.</small></div>
            </div>
            <a className="button button-lime production-cta" href="#contacto">Hablemos de tu proyecto <ArrowRight size={16} /></a>
          </div>
        </section>

        <section className="label-section" id="sello" aria-labelledby="label-title">
          <div className="label-orbit label-orbit-one" aria-hidden="true" />
          <div className="label-orbit label-orbit-two" aria-hidden="true" />
          <div className="label-inner">
            <SectionKicker index="04">SELLO & NUEVAS VOCES</SectionKicker>
            <div className="label-heading">
              <div>
                <p className="label-wordmark"><span>SELVA</span><small>MUSIC GROUP</small></p>
                <h2 id="label-title">El sonido también <em>se construye en equipo.</em></h2>
              </div>
              <div className="label-description">
                <p>SELVA MUSIC Group es el sello que WILOR presentó públicamente. En su anuncio afirmó haber firmado a sus primeros artistas y grupos; los nombres del roster no aparecen enumerados en las fuentes consultadas.</p>
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
              <p className="roster-note">Colaboradores y créditos de lanzamientos, no una lista de contrataciones individuales.</p>
            </div>
          </div>
        </section>

        <section className="social-section section-wrap" id="redes" aria-labelledby="social-title">
          <div className="social-heading">
            <SectionKicker index="05">PRESENCIA OFICIAL</SectionKicker>
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
            <SectionKicker index="06">BOOKING · COLABORACIONES · PROYECTOS</SectionKicker>
            <h2 id="contact-title">¿Hacemos<br /><em>que suene?</em></h2>
            <p>Para contratación, producción y nuevas colaboraciones, conecta directamente con WILOR.</p>
            <div className="contact-actions">
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
        <div className="footer-bottom"><span>© 2026 WILOR · Portafolio de música y trayectoria</span><a href="#inicio">Volver arriba <ArrowUpRight size={13} /></a></div>
      </footer>
    </div>
  );
}
