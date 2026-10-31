import { ArrowUpRight, Lock, Menu, X } from "lucide-react";
import React, { useState } from "react";
import SelvaLogo from "./SelvaLogo";

const navigation = [
  { id: "portafolio", label: "Música" },
  { id: "artistas", label: "Artistas" },
  { id: "produccion", label: "Servicios" },
  { id: "sello", label: "Sello" },
];

interface SiteHeaderProps {
  activeSection?: string;
  onNavigate?: (sectionId: string) => void;
  onOpenAdmin?: () => void;
}

export default function SiteHeader({
  activeSection = "inicio",
  onNavigate,
  onOpenAdmin,
}: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(id);
      closeMenu();
    }
  };

  return (
    <header className="site-header">
      <a
        className="brand selva-brand"
        href="#inicio"
        aria-label="SELVA MUSIC GROUP, volver al inicio"
        onClick={(e) => handleClick(e, "inicio")}
      >
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

      <nav
        id="main-navigation"
        className={`main-navigation${menuOpen ? " is-open" : ""}`}
        aria-label="Navegación principal"
      >
        {navigation.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={isActive ? "is-nav-active" : ""}
              onClick={(e) => handleClick(e, item.id)}
            >
              <span>{item.label}</span>
              {isActive && <span className="nav-active-dot" />}
            </a>
          );
        })}

        <a
          className={`nav-booking ${activeSection === "contacto" ? "is-nav-active" : ""}`}
          href="#contacto"
          onClick={(e) => handleClick(e, "contacto")}
        >
          <span>Contratación</span>
          <ArrowUpRight size={15} strokeWidth={2} />
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
