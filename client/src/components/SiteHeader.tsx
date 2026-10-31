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
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(id);
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

      {/* Navegación para PC / Pantallas medianas */}
      <nav id="main-navigation" className="main-navigation" aria-label="Navegación principal">
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
            onClick={onOpenAdmin}
            title="Panel de Control Maestro SELVA MUSIC GROUP"
          >
            <Lock size={13} /> Acceso Maestro
          </button>
        )}
      </nav>

      {/* Botón Acceso Maestro directo en Celulares (Reemplaza la hamburguesa redundante) */}
      <div className="mobile-header-actions">
        {onOpenAdmin && (
          <button
            type="button"
            className="mobile-header-admin-pill"
            onClick={onOpenAdmin}
            title="Acceso Maestro SELVA MUSIC"
          >
            <Lock size={12} />
            <span>Maestro</span>
          </button>
        )}
      </div>
    </header>
  );
}
