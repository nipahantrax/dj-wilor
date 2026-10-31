import React from "react";
import {
  Calendar,
  Disc3,
  Home as HomeIcon,
  Sparkles,
  ShieldCheck,
  Users,
} from "lucide-react";

interface MobileAppDockProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function MobileAppDock({
  activeSection,
  onNavigate,
}: MobileAppDockProps) {
  const tabs = [
    { id: "inicio", label: "Inicio", icon: HomeIcon },
    { id: "portafolio", label: "Música", icon: Disc3 },
    { id: "artistas", label: "Artistas", icon: Users },
    { id: "produccion", label: "Servicios", icon: Sparkles },
    { id: "sello", label: "Sello", icon: ShieldCheck },
    { id: "contacto", label: "Booking", icon: Calendar },
  ];

  return (
    <nav className="mobile-app-dock" aria-label="Navegación móvil de SELVA MUSIC">
      <div className="mobile-dock-inner">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              className={`mobile-dock-btn ${isActive ? "is-active" : ""}`}
              onClick={() => onNavigate(tab.id)}
              aria-label={`Ir a ${tab.label}`}
              aria-current={isActive ? "page" : undefined}
            >
              <div className="dock-icon-wrapper">
                <Icon size={17} strokeWidth={isActive ? 2.5 : 1.8} />
              </div>
              <span className="dock-label">{tab.label}</span>
              {isActive && <span className="dock-active-pill" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
