import { ArrowUpRight, Lock, Menu, X } from "lucide-react";
import { useState } from "react";
import SelvaLogo from "./SelvaLogo";

const navigation = [
  { label: "Música", href: "#portafolio" },
  { label: "Artistas", href: "#artistas" },
  { label: "Servicios", href: "#produccion" },
  { label: "Sello", href: "#sello" },
];

interface SiteHeaderProps {
  onOpenAdmin?: () => void;
}

export default function SiteHeader({ onOpenAdmin }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <a className="brand selva-brand" href="#inicio" aria-label="SELVA MUSIC GROUP, volver al inicio" onClick={closeMenu}>
        <SelvaLogo variant="full" size="md" />
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
        {onOpenAdmin && (
          <button
            type="button"
            className="nav-admin-btn"
            onClick={() => {
              closeMenu();
              onOpenAdmin();
            }}
            title="Panel de Control Maestro SELVA MUSIC GROUP"
          >
            <Lock size={13} /> Acceso Maestro
          </button>
        )}
      </nav>
    </header>
  );
}
