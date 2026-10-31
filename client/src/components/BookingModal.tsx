import {
  AlertTriangle,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  FileCheck2,
  FileText,
  MapPin,
  MessageCircle,
  Music2,
  Phone,
  ShieldCheck,
  Sparkles,
  User,
  X,
} from "lucide-react";
import React, { useState } from "react";
import type { Artist, EventBooking } from "@/lib/wilorContent";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  artist: Artist | null;
  existingBookings: EventBooking[];
  onNewBooking: (booking: EventBooking) => void;
}

export default function BookingModal({
  isOpen,
  onClose,
  artist,
  existingBookings,
  onNewBooking,
}: BookingModalProps) {
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [city, setCity] = useState("Cochabamba");
  const [venue, setVenue] = useState("");
  const [eventType, setEventType] = useState("Discoteca / Club");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("23:30");
  const [notes, setNotes] = useState("");
  const [lastBookingId, setLastBookingId] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !artist) return null;

  // Verificación de cruce de fecha para este artista
  const hasConflict = Boolean(
    date &&
      existingBookings.some(
        (b) => b.artistId === artist.id && b.date === date && b.status !== "conflict"
      )
  );

  const conflictingBooking = hasConflict
    ? existingBookings.find((b) => b.artistId === artist.id && b.date === date)
    : null;

  const quickCities = [
    "Cochabamba",
    "Chapare (Villa Tunari)",
    "Shinahota",
    "Santa Cruz",
    "La Paz",
    "Oruro",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim() || !date) return;

    const bookingId = "SMG-" + Math.floor(100000 + Math.random() * 900000);
    setLastBookingId(bookingId);

    const newBooking: EventBooking = {
      id: bookingId,
      artistId: artist.id,
      artistName: artist.name,
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      city: venue ? `${city} (${venue.trim()})` : city,
      eventType,
      date,
      time,
      notes: notes.trim(),
      status: hasConflict ? "conflict" : "pending",
      createdAt: new Date().toISOString().split("T")[0],
    };

    onNewBooking(newBooking);

    // Generar documento formal descargable (.txt membretado)
    const formalVoucher = `================================================================================
SELVA MUSIC GROUP · BOLIVIA
DEPARTAMENTO DE CONTRATACIONES, BOOKING Y GESTIÓN ARTÍSTICA
DOCUMENTO OFICIAL DE SOLICITUD DE RESERVA Y BLOQUEO DE AGENDA
================================================================================

EXPEDIENTE / FOLIO DE RESERVA: ${bookingId}
FECHA DE EMISIÓN: ${new Date().toLocaleDateString("es-BO", { year: "numeric", month: "long", day: "numeric" })}
ESTADO DE DISPONIBILIDAD: ${hasConflict ? "OBSERVADA (FECHA CON EVENTO PREVIO AGENDADO)" : "PRE-CONFIRMADA (SUJETA A ANTICIPO)"}

1. DATOS DEL ARTISTA SOLICITADO
--------------------------------------------------------------------------------
Artista / Agrupación : ${artist.name}
Rol y Categoría      : ${artist.role}
Géneros Musicales    : ${artist.genre}
Localidad Base       : ${artist.location}
Formato de Show      : ${artist.showFormat}

2. DATOS DEL CONTRATANTE / EMPRESA
--------------------------------------------------------------------------------
Responsable / Razón Social : ${clientName.trim()}
Teléfono / WhatsApp        : ${clientPhone.trim()}
Correo de Notificación     : ${clientEmail.trim() || "No especificado"}

3. DETALLES Y LOCALIZACIÓN DEL EVENTO
--------------------------------------------------------------------------------
Ciudad / Municipio   : ${city}
Local / Recinto      : ${venue.trim() || "Por coordinar"}
Tipo de Presentación : ${eventType}
Fecha Programada     : ${date}
Hora Estimada        : ${time} hrs
Requerimientos Extra : ${notes.trim() || "Sin observaciones adicionales"}

4. CLÁUSULA DE BLOQUEO DE FECHA & VALIDEZ
--------------------------------------------------------------------------------
- La presente solicitud no constituye contrato definitivo hasta el pago del
  anticipo correspondiente (50% del cachet acordado) y la firma del contrato.
- En caso de conflicto de fechas, el equipo de producción evaluará la viabilidad
  de traslado interdepartamental o doble show según el horario.

5. CONTACTO DIRECTO DE PRODUCCIÓN
--------------------------------------------------------------------------------
Dirección Ejecutiva: SELVA MUSIC Group - Cochabamba / Trópico de Cochabamba, Bolivia
WhatsApp Oficial de Booking: +591 695 28962
Email: miguelangelmedinacali@gmail.com
================================================================================`;

    const blob = new Blob([formalVoucher], { type: "text/plain;charset=utf-8" });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `VOUCHER_${bookingId}_${artist.name.replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Mensaje estructurado para WhatsApp
    const waText = `*📋 SOLICITUD FORMAL DE BOOKING · SELVA MUSIC GROUP*
*Folio:* ${bookingId}

*Artista:* ${artist.name}
*Contratante:* ${clientName.trim()}
*Teléfono:* ${clientPhone.trim()}
*Ciudad / Local:* ${city}${venue ? ` - ${venue.trim()}` : ""}
*Tipo de Evento:* ${eventType}
*Fecha solicitada:* ${date} (a las ${time} hrs)
${notes ? `*Requerimientos:* ${notes.trim()}\n` : ""}${hasConflict ? `\n⚠️ *ATENCIÓN:* Se identificó fecha concurrente con otro evento. Solicito evaluar horario de traslado.\n` : ""}
He descargado el Voucher Oficial *${bookingId}*. Deseo coordinar la cotización oficial y los pasos para el anticipo del 50%.`;

    const waUrl = `https://wa.me/59169528962?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, "_blank");

    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="booking-modal-overlay" onClick={handleClose}>
      <div className="booking-modal-window" onClick={(e) => e.stopPropagation()}>
        {/* Cabecera de Alto Nivel */}
        <div className="booking-modal-top">
          <div className="booking-modal-badge-group">
            <span className="booking-tag-gold">
              <ShieldCheck size={13} /> SELVA MUSIC GROUP · BOOKING OFICIAL
            </span>
            <span className="booking-tag-status">
              <span className="status-dot-gold" /> TEMPORADA 2026
            </span>
          </div>
          <button
            type="button"
            className="booking-btn-exit"
            onClick={handleClose}
            aria-label="Cerrar formulario de contratación"
          >
            <X size={18} />
          </button>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="booking-modal-content-form">
            {/* Tarjeta Ejecutiva del Artista */}
            <div className="booking-artist-banner">
              <img
                src={artist.photo}
                alt={artist.name}
                className="booking-artist-avatar"
              />
              <div className="booking-artist-details">
                <span className="booking-artist-sub">{artist.role}</span>
                <h3 className="booking-artist-name">{artist.name}</h3>
                <div className="booking-artist-chips">
                  <span><MapPin size={11} /> {artist.location.split(",")[0]}</span>
                  <span>•</span>
                  <span><Music2 size={11} /> {artist.genre}</span>
                </div>
              </div>
              <div className="booking-format-pill">
                <strong>Formato del Show:</strong>
                <span>{artist.showFormat}</span>
              </div>
            </div>

            {/* Alerta de Conflicto si existe */}
            {hasConflict && (
              <div className="booking-clash-box">
                <AlertTriangle size={20} className="booking-clash-icon" />
                <div>
                  <strong>AVISO DE AGENDA CONCURRENTE:</strong>
                  <p>
                    {artist.name} tiene un evento agendado para la fecha <strong>{date}</strong> en <strong>{conflictingBooking?.city}</strong>. Tu solicitud ingresará con prioridad para evaluar logística de horario y factibilidad de doble presentación.
                  </p>
                </div>
              </div>
            )}

            {/* Cuerpo del Formulario en 2 Columnas */}
            <div className="booking-sections-grid">
              {/* Columna 1: Contratante */}
              <div className="booking-section-card">
                <h4 className="booking-section-title">
                  <User size={15} /> 1. Datos del Contratante
                </h4>

                <div className="booking-field-group">
                  <label>Nombre Completo / Productora / Boliche *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Marcelo Morales / Club Babylon"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="booking-input"
                  />
                </div>

                <div className="booking-field-group">
                  <label>WhatsApp / Teléfono Móvil *</label>
                  <div className="booking-input-phone">
                    <span className="booking-phone-prefix">🇧🇴 +591</span>
                    <input
                      type="tel"
                      required
                      placeholder="707 12345"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="booking-input"
                    />
                  </div>
                </div>

                <div className="booking-field-group">
                  <label>Correo Electrónico (Para envío de contrato)</label>
                  <input
                    type="email"
                    placeholder="contacto@productora.com (opcional)"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="booking-input"
                  />
                </div>
              </div>

              {/* Columna 2: Evento */}
              <div className="booking-section-card">
                <h4 className="booking-section-title">
                  <Calendar size={15} /> 2. Coordenadas del Show
                </h4>

                <div className="booking-field-group">
                  <label>Ciudad o Localidad *</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="booking-input booking-select"
                  >
                    <option value="Cochabamba">Cochabamba (Cercado)</option>
                    <option value="Chapare (Villa Tunari)">Chapare (Villa Tunari)</option>
                    <option value="Shinahota / Chimoré">Shinahota / Chimoré</option>
                    <option value="Santa Cruz">Santa Cruz de la Sierra</option>
                    <option value="La Paz / El Alto">La Paz / El Alto</option>
                    <option value="Oruro">Oruro</option>
                    <option value="Tarija">Tarija</option>
                    <option value="Sucre">Sucre</option>
                    <option value="Potosí">Potosí</option>
                    <option value="Beni / Pando">Beni / Pando</option>
                    <option value="Gira Internacional">Gira Fuera de Bolivia</option>
                  </select>

                  {/* Chips de ciudad rápida */}
                  <div className="booking-quick-chips">
                    {quickCities.map((c) => (
                      <button
                        type="button"
                        key={c}
                        onClick={() => setCity(c)}
                        className={`booking-chip ${city.includes(c.split(" ")[0]) ? "is-selected" : ""}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="booking-field-group">
                  <label>Nombre del Local o Recinto</label>
                  <input
                    type="text"
                    placeholder="Ej: Salón de Eventos El Dorado / Campo Ferial"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    className="booking-input"
                  />
                </div>

                <div className="booking-two-cols">
                  <div className="booking-field-group">
                    <label>Tipo de Evento *</label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="booking-input booking-select"
                    >
                      <option value="Discoteca / Club">Discoteca / Club</option>
                      <option value="Festival / Masivo">Festival Masivo</option>
                      <option value="Fiesta Privada / Boda">Fiesta Privada / Boda</option>
                      <option value="Aniversario Patronal">Aniversario Patronal</option>
                      <option value="Evento Universitario">Fiesta Universitaria</option>
                    </select>
                  </div>

                  <div className="booking-field-group">
                    <label>Hora Estimada *</label>
                    <input
                      type="time"
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="booking-input"
                    />
                  </div>
                </div>

                <div className="booking-field-group">
                  <label>Fecha Requerida *</label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="booking-input booking-date"
                  />
                </div>
              </div>
            </div>

            {/* Requerimientos Técnicos */}
            <div className="booking-section-card full-span">
              <label className="booking-notes-label">
                <FileText size={13} /> Requerimientos Especiales, Rider Técnico u Observaciones
              </label>
              <textarea
                rows={2}
                placeholder="Indica requerimientos de sonido, tarima, pirotecnia, duración solicitada o logística de hospedaje..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="booking-input booking-textarea"
              />
            </div>

            {/* Previsualización del Comprobante & Cláusula */}
            <div className="booking-preview-card">
              <div className="booking-preview-left">
                <FileCheck2 size={24} className="text-lime" />
                <div>
                  <strong>Proceso Oficial de Bloqueo de Fecha</strong>
                  <p>
                    Al presionar el botón se descargará automáticamente tu <strong>Voucher Formal de Solicitud</strong> con membrete y se transferirá la orden directamente a la línea gerencial de WhatsApp de SELVA MUSIC (+591 695 28962).
                  </p>
                </div>
              </div>
              <div className="booking-guarantee-badge">
                <span>🛡️ RESPALDO SELVA MUSIC</span>
                <small>Anticipo del 50% al confirmar</small>
              </div>
            </div>

            {/* Botón Monumental de Envío */}
            <button type="submit" className="booking-btn-main">
              <div className="booking-btn-main-inner">
                <MessageCircle size={22} className="btn-wa-icon" />
                <div className="btn-text-block">
                  <strong>DESCARGAR COMPROBANTE & ENVIAR SOLICITUD POR WHATSAPP</strong>
                  <span>Atención inmediata con la gerencia de DJ WILOR (+591 695 28962)</span>
                </div>
                <Download size={20} className="btn-dl-icon" />
              </div>
            </button>
          </form>
        ) : (
          /* Pantalla de Éxito / Ticket VIP */
          <div className="booking-success-screen">
            <div className="booking-success-card">
              <div className="success-icon-badge">
                <CheckCircle2 size={44} />
              </div>
              <span className="success-pretitle">EXPEDIENTE GENERADO CON ÉXITO</span>
              <h3 className="success-title">¡Solicitud de Reserva Registrada!</h3>
              <div className="success-folio-box">
                <span>FOLIO OFICIAL:</span>
                <strong>{lastBookingId}</strong>
              </div>

              <p className="success-desc">
                Tu solicitud para <strong>{artist.name}</strong> en fecha <strong>{date}</strong> ({city}) ha sido ingresada en el sistema maestro y se ha descargado tu comprobante formal en tu dispositivo.
              </p>

              <div className="success-actions-row">
                <a
                  className="button button-whatsapp"
                  href={`https://wa.me/59169528962?text=${encodeURIComponent(
                    `Hola DJ WILOR / SELVA MUSIC, acabo de generar la solicitud con Folio ${lastBookingId} para ${artist.name} el día ${date} en ${city}. Deseo confirmar los detalles.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={18} /> Abrir Chat de WhatsApp
                </a>
                <button
                  type="button"
                  onClick={handleClose}
                  className="button button-outline"
                >
                  Cerrar y Volver a la Web
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
