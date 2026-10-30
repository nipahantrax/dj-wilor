import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";

const navigation = [
  { label: "Música", href: "#portafolio" },
  { label: "Artistas", href: "#artistas" },
  { label: "Servicios", href: "#produccion" },
  { label: "Sello", href: "#sello" },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="WILOR, volver al inicio" onClick={closeMenu}>
        <span className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 34 34" fill="none">
            <path d="M3 8h4l3.1 17L17 9l6.9 16L27 8h4" stroke="currentColor" strokeWidth="2.6" strokeLinecap="square" strokeLinejoin="miter" />
          </svg>
        </span>
        <span className="brand-word">WILOR<span className="brand-period">.</span></span>
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-controls="main-navigation"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Cerrar navegación" : "Abrir navegación"}
        onClick={() => setMenuOpen((current) => !current)}
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      <nav id="main-navigation" className={`main-navigation${menuOpen ? " is-open" : ""}`} aria-label="Navegación principal">
        {navigation.map((item) => (
          <a key={item.href} href={item.href} onClick={closeMenu}>
            {item.label}
          </a>
        ))}
        <a className="nav-booking" href="#contacto" onClick={closeMenu}>
          Contratación <ArrowUpRight size={15} strokeWidth={1.8} />
        </a>
      </nav>
    </header>
  );
}
