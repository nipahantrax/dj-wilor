import { AlertTriangle, Calendar, CheckCircle, Clock, Download, FileText, MapPin, MessageCircle, Phone, User, X } from "lucide-react";
import { useState } from "react";
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
  const [city, setCity] = useState("Cochabamba");
  const [eventType, setEventType] = useState("Discoteca / Club");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("23:00");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !artist) return null;

  // Verificación de cruce de fecha para este artista
  const hasConflict = date
    ? existingBookings.some(
        (b) => b.artistId === artist.id && b.date === date && b.status !== "pending"
      )
    : false;

  const conflictingBooking = hasConflict
    ? existingBookings.find((b) => b.artistId === artist.id && b.date === date)
    : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone || !date) return;

    const newBooking: EventBooking = {
      id: "booking-" + Date.now(),
      artistId: artist.id,
      artistName: artist.name,
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      city,
      eventType,
      date,
      time,
      notes: notes.trim(),
      status: hasConflict ? "conflict" : "pending",
      createdAt: new Date().toISOString().split("T")[0],
    };

    onNewBooking(newBooking);

    // 1. Descarga del comprobante de reserva en archivo de texto formal
    const contractText = `=================================================================
SOLICITUD DE RESERVA Y CONTRATACIÓN ARTÍSTICA
SELVA MUSIC GROUP · BOLIVIA
=================================================================

CÓDIGO DE SOLICITUD: ${newBooking.id.toUpperCase()}
FECHA DE SOLICITUD: ${newBooking.createdAt}
ESTADO INICIAL: ${hasConflict ? "SUJETO A REVISIÓN POR CRUCE DE FECHA" : "REGISTRADA / PENDIENTE DE CONFIRMACIÓN"}

DATOS DEL ARTISTA:
-----------------------------------------------------------------
ARTISTA / AGRUPACIÓN: ${artist.name}
GÉNERO / FORMATO: ${artist.genre}
SHOW ESTIMADO: ${artist.showFormat}

DATOS DEL EVENTO:
-----------------------------------------------------------------
CONTRATANTE / EMPRESA: ${clientName}
TELÉFONO DE CONTACTO: ${clientPhone}
CIUDAD / LOCALIDAD: ${city}
TIPO DE EVENTO: ${eventType}
FECHA PROGRAMADA: ${date}
HORA PROGRAMADA: ${time}
REQUERIMIENTOS / NOTAS: ${notes || "Sin observaciones adicionales"}

OBSERVACIONES DE AGENDA:
-----------------------------------------------------------------
${
  hasConflict
    ? `ATENCIÓN: Se detectó un evento previo en agenda para ${artist.name} en fecha ${date} (${conflictingBooking?.city}). El equipo de SELVA MUSIC evaluará factibilidad de horario y traslado.`
    : "Fecha disponible preliminarmente en agenda. Sujeta a confirmación oficial con el 50% de anticipo."
}

CANAL OFICIAL DE ATENCIÓN:
SELVA MUSIC Group - Cochabamba, Bolivia
WhatsApp / Booking: +591 695 28962
Email: miguelangelmedinacali@gmail.com
=================================================================`;

    const blob = new Blob([contractText], { type: "text/plain;charset=utf-8" });
    const downloadUrl = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = downloadUrl;
    downloadLink.download = `RESERVA_${artist.name.replace(/\s+/g, "_")}_${date}.txt`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    // 2. Redacción del mensaje para WhatsApp oficial
    const whatsappMessage = `*📋 SOLICITUD FORMAL DE CONTRATACIÓN - SELVA MUSIC GROUP*

*Artista:* ${artist.name}
*Contratante:* ${clientName}
*Teléfono:* ${clientPhone}
*Ciudad:* ${city}
*Tipo de Evento:* ${eventType}
*Fecha solicitada:* ${date}
*Hora:* ${time}
*Notas:* ${notes || "Ninguna"}
${hasConflict ? "\n⚠️ *AVISO:* Solicitud enviada en fecha con evento previo en agenda. Requiere validación de horario." : ""}

He descargado el comprobante de solicitud oficial. Quedo a la espera de la cotización y confirmación de contrato.`;

    const whatsappUrl = `https://wa.me/59169528962?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, "_blank");

    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="booking-modal-backdrop" onClick={onClose}>
      <div className="booking-modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="booking-modal-close"
          onClick={handleResetAndClose}
          aria-label="Cerrar ventana de reserva"
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="booking-form">
            <div className="booking-form-header">
              <span className="booking-pill">SELVA MUSIC GROUP · BOOKING OFICIAL</span>
              <h2>Reservar Fecha para {artist.name}</h2>
              <p>
                Completa el formulario oficial para bloquear agenda. El sistema generará tu comprobante de reserva y se comunicará directamente con la gerencia del sello.
              </p>
            </div>

            {hasConflict && (
              <div className="booking-conflict-alert">
                <AlertTriangle size={20} />
                <div>
                  <strong>Aviso de Cruzamiento de Fecha:</strong>
                  <p>
                    {artist.name} ya cuenta con una presentación agendada para el día <strong>{date}</strong> en <strong>{conflictingBooking?.city}</strong>. Tu solicitud se enviará con prioridad para evaluar compatibilidad de horario o show doble.
                  </p>
                </div>
              </div>
            )}

            <div className="booking-grid">
              <div className="booking-input-wrap">
                <label>
                  <User size={13} /> Nombre del Contratante / Boliche / Empresa *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Marcelo Morales / Club Mirage"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
              </div>

              <div className="booking-input-wrap">
                <label>
                  <Phone size={13} /> Teléfono / WhatsApp de Contacto *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Ej: +591 707 12345"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                />
              </div>

              <div className="booking-input-wrap">
                <label>
                  <MapPin size={13} /> Ciudad o Localidad *
                </label>
                <select value={city} onChange={(e) => setCity(e.target.value)}>
                  <option value="Cochabamba">Cochabamba</option>
                  <option value="Chapare (Villa Tunari / Shinahota)">Chapare (Villa Tunari / Shinahota)</option>
                  <option value="Santa Cruz">Santa Cruz</option>
                  <option value="La Paz / El Alto">La Paz / El Alto</option>
                  <option value="Oruro">Oruro</option>
                  <option value="Tarija">Tarija</option>
                  <option value="Sucre">Sucre</option>
                  <option value="Potosí">Potosí</option>
                  <option value="Beni / Pando">Beni / Pando</option>
                  <option value="Internacional">Fuera de Bolivia (Gira Internacional)</option>
                </select>
              </div>

              <div className="booking-input-wrap">
                <label>Tipo de Evento *</label>
                <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
                  <option value="Discoteca / Club">Discoteca / Club Nocturno</option>
                  <option value="Festival / Concierto">Festival / Concierto Masivo</option>
                  <option value="Fiesta Privada / Boda">Fiesta Privada / Boda / Cumpleaños</option>
                  <option value="Aniversario Patronal / Fraternidad">Aniversario Patronal / Fraternidad</option>
                  <option value="Evento Corporativo / Marca">Evento Corporativo / Marca</option>
                </select>
              </div>

              <div className="booking-input-wrap">
                <label>
                  <Calendar size={13} /> Fecha del Show solicitada *
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="booking-input-wrap">
                <label>
                  <Clock size={13} /> Horario estimado de presentación *
                </label>
                <input
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>

            <div className="booking-input-wrap full-width">
              <label>Requerimientos técnicos o comentarios adicionales</label>
              <textarea
                rows={2}
                placeholder="Especifica si requieres animación, sonido, duración especial o transporte..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="booking-submit-row">
              <button type="submit" className="button button-whatsapp-lg">
                <MessageCircle size={18} />
                <span>Generar Reserva & Enviar a WhatsApp</span>
                <Download size={16} />
              </button>
            </div>
          </form>
        ) : (
          <div className="booking-success-box">
            <div className="success-icon-wrap">
              <CheckCircle size={48} />
            </div>
            <h2>¡Solicitud de Reserva Generada con Éxito!</h2>
            <p>
              Hemos descargado tu comprobante en formato formal y transferido los detalles de la fecha para <strong>{artist.name}</strong> a nuestro WhatsApp de contratación oficial.
            </p>
            <div className="success-actions">
              <button type="button" className="button button-lime" onClick={handleResetAndClose}>
                Entendido / Finalizar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
