import React, { useState, useRef } from "react";
import {
  Scale,
  FileText,
  Printer,
  Download,
  Copy,
  Check,
  ShieldCheck,
  Globe,
  UserCheck,
  Sparkles,
  BookOpen,
} from "lucide-react";

export type ContractType =
  | "contract_360"
  | "work_for_hire"
  | "split_sheet"
  | "master_transfer"
  | "recording_prod"
  | "net_profits"
  | "beat_license";

export interface LegalPartiesData {
  labelRepName: string;
  labelRepCi: string;
  labelRepRole: string;
  labelAddress: string;
  artistName: string;
  artistArtisticName: string;
  artistCi: string;
  artistCiExt: string;
  artistCivilStatus: string;
  artistOccupation: string;
  artistAddress: string;
  artistCity: string;
  projectTitle: string;
  albumOrTrackCount: string;
  royaltyPercentage: string;
  producerPercentage: string;
  advanceAmount: string;
  jurisdictionCity: string;
  lawyerName: string;
  lawyerRpa: string;
  lawyerBar: string;
}

const DEFAULT_LEGAL_DATA: LegalPartiesData = {
  labelRepName: "Wilor Producciones / SELVA MUSIC GROUP S.R.L.",
  labelRepCi: "4170114 Cbb.",
  labelRepRole: "Director General & Productor Ejecutivo",
  labelAddress: "Av. Panamericana s/n, Villa Tunari, Trópico de Cochabamba",
  artistName: "",
  artistArtisticName: "",
  artistCi: "",
  artistCiExt: "Cbb.",
  artistCivilStatus: "Soltero(a)",
  artistOccupation: "Cantautor / Artista Intérprete",
  artistAddress: "Calle Principal #124",
  artistCity: "Villa Tunari, Cochabamba",
  projectTitle: "Lanzamiento Fonográfico Oficial 2026",
  albumOrTrackCount: "1 Sencillo Máster",
  royaltyPercentage: "50%",
  producerPercentage: "50%",
  advanceAmount: "0 Bs. (Cero Bolivianos / Inversión directa en producción)",
  jurisdictionCity: "Cochabamba",
  lawyerName: "Dr. Rodrigo Asesor Legal Corporativo",
  lawyerRpa: "RPA-BO-89210-LEX",
  lawyerBar: "Ilustre Colegio de Abogados de Cochabamba",
};

export default function LegalContractsPanel() {
  const [selectedContract, setSelectedContract] = useState<ContractType>("contract_360");
  const [language, setLanguage] = useState<"es" | "en">("es");
  const [legalData, setLegalData] = useState<LegalPartiesData>(DEFAULT_LEGAL_DATA);
  const [isCopied, setIsCopied] = useState(false);
  const printAreaRef = useRef<HTMLDivElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLegalData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePrint = () => {
    window.print();
  };

  const generateContractText = (): string => {
    const isEs = language === "es";
    const dateNow = new Date();
    const day = dateNow.getDate();
    const month = dateNow.toLocaleDateString("es-BO", { month: "long" });
    const year = dateNow.getFullYear();

    const d = {
      ...legalData,
      artistName: legalData.artistName.trim() || "[NOMBRE COMPLETO DEL ARTISTA]",
      artistArtisticName: legalData.artistArtisticName.trim() || "[SEUDÓNIMO ARTÍSTICO]",
      artistCi: legalData.artistCi.trim() || "[N° CARNET DE IDENTIDAD]",
      artistCiExt: legalData.artistCiExt || "Cbb.",
      artistAddress: legalData.artistAddress.trim() || "[DOMICILIO DEL ARTISTA]",
      artistCity: legalData.artistCity.trim() || "Cochabamba, Bolivia",
      projectTitle: legalData.projectTitle.trim() || "[TÍTULO DEL PROYECTO O CANCIÓN]",
    };

    if (selectedContract === "contract_360") {
      if (isEs) {
        return `CONTRATO DE EXCLUSIVIDAD ARTÍSTICA INTEGRAL 360°, PRODUCCIÓN FONOGRÁFICA, MANAGEMENT Y EDITORIAL MUSICAL
DOCUMENTO PRIVADO CON FUERZA DE INSTRUMENTO PÚBLICO
(Conforme a la Ley N° 1322 de Derecho de Autor del Estado Plurinacional de Bolivia y Arts. 450, 519, 1279 del Código Civil)

Conste por el presente documento privado suscrito al tenor de las siguientes cláusulas y estipulaciones que, con el solo reconocimiento voluntario de firmas y rúbricas ante Notaría de Fe Pública, surtirá efectos de instrumento público:

PRIMERA. (DE LAS PARTES CONTRATANTES).
Intervienen en la celebración del presente contrato:
1.1. EL SELLO DISCOGRÁFICO / PRODUCTOR: SELVA MUSIC GROUP S.R.L. / WILOR PRODUCCIONES, legalmente representada por ${d.labelRepName}, mayor de edad, hábil por derecho, con C.I. N° ${d.labelRepCi}, con domicilio principal en ${d.labelAddress}, a quien en adelante y para efectos del presente contrato se denominará simplemente como "EL SELLO".
1.2. EL ARTISTA: El/La señor(a) ${d.artistName}, de estado civil ${d.artistCivilStatus}, de ocupación ${d.artistOccupation}, mayor de edad, hábil por derecho, portador(a) de la Cédula de Identidad N° ${d.artistCi} expedida en ${d.artistCiExt}, domiciliado(a) en ${d.artistAddress} de la ciudad de ${d.artistCity}, con nombre artístico conocido públicamente como "${d.artistArtisticName}", a quien en adelante se denominará simplemente como "EL ARTISTA".

SEGUNDA. (ANTECEDENTES Y NATURALEZA DEL MODELO 360).
EL SELLO es una empresa discográfica independiente especializada en la producción fonográfica, distribución digital, marketing musical, booking de espectáculos públicos y editorial en el territorio boliviano e internacional. Por su parte, EL ARTISTA posee talento, facultades vocales e interpretativas y desea vincular su carrera artística de manera profesional bajo el respaldo técnico, financiero y promocional de EL SELLO.

TERCERA. (OBJETO DEL CONTRATO Y EXCLUSIVIDAD UNIVERSAL).
Por el presente instrumento, EL ARTISTA cede y encomienda a EL SELLO, con carácter de rigurosa EXCLUSIVIDAD y para todo el territorio mundial (incluyendo plataformas analógicas, satelitales, digitales, metaverso y cualquier medio por inventarse):
a) La fijación, grabación, producción y explotación comercial de fonogramas y videogramas musicales correspondientes al proyecto "${d.projectTitle}".
b) La gestión y representación de Booking (conciertos en vivo, giras nacionales e internacionales, festivales y apariciones públicas).
c) El licenciamiento y explotación comercial de merchandising, marca y patrocinio con terceros.
d) La administración de los derechos de sincronización comercial para cine, televisión, publicidad y videojuegos.

CUARTA. (VIGENCIA Y TERRITORIO).
El presente contrato tendrá una duración forzosa de tres (3) años calendario computables a partir de la firma del presente instrumento, con opción unilateral preferente de renovación a favor de EL SELLO por un periodo similar de dos (2) años adicionales. El territorio de aplicación es UNIVERSAL y sin limitación geográfica.

QUINTA. (COMPROMISOS DE PRODUCCIÓN Y ESTÁNDARES TÉCNICOS).
5.1. EL SELLO se compromete a costear la producción en estudio profesional de ${d.albumOrTrackCount}, asumiendo los costos de ingeniería de grabación, mezcla profesional y masterización en alta fidelidad estéreo (24 bits / 48 kHz).
5.2. EL ARTISTA se obliga a concurrir puntualmente a las sesiones de grabación, prestar su mejor esfuerzo interpretativo y abstenerse de prestar sus servicios vocales a personas naturales o jurídicas competidoras sin autorización expresa por escrito de EL SELLO.

SEXTA. (RÉGIMEN DE PARTICIPACIÓN ECONÓMICA Y REGALÍAS 360).
Las ganancias y regalías netas líquidas generadas por la explotación de la actividad del ARTISTA se distribuirán de la siguiente manera:
6.1. Fonogramas y Streaming Digital (Spotify, Apple Music, YouTube Music, TikTok, etc.):
     - ${d.royaltyPercentage} a favor de EL ARTISTA.
     - ${d.producerPercentage} a favor de EL SELLO DISCOGRÁFICO.
6.2. Presentaciones en Vivo y Conciertos (Booking Directo):
     - 80% neto a favor de EL ARTISTA.
     - 20% en calidad de comisión de representación y management a favor de EL SELLO.
6.3. Merchandising, Marcas y Sponsoring:
     - 70% a favor de EL ARTISTA / 30% a favor de EL SELLO.
6.4. Anticipo pactado: ${d.advanceAmount}, recuperable de las futuras regalías devengadas por el proyecto.

SÉPTIMA. (CONTABILIDAD, RENDICIÓN DE CUENTAS Y DERECHO DE AUDITORÍA).
EL SELLO efectuará liquidaciones semestrales dentro de los sesenta (60) días posteriores al cierre de cada semestre calendario. EL ARTISTA dispondrá de un plazo perentorio de treinta (30) días hábiles tras recibir el estado de cuenta para formular observaciones justificadas. Asimismo, EL ARTISTA podrá solicitar una auditoría contable previa notificación formal con quince (15) días de antelación.

OCTAVA. (DERECHOS MORALES Y CESIÓN PATRIMONIAL).
En aplicación estricta del Artículo 12 y conexos de la Ley N° 1322 de Derecho de Autor de Bolivia:
8.1. Se respetan de manera irrenunciable los derechos morales de paternidad e integridad de la obra a favor de EL ARTISTA.
8.2. Los derechos patrimoniales sobre el FONOGRAMA (Master) y la producción resultante corresponderán en su totalidad a EL SELLO durante el plazo de protección legal.

NOVENA. (CLÁUSULA PENAL POR INCUMPLIMIENTO).
En caso de que EL ARTISTA quebrante la exclusividad pactada o celebre contratos paralelos sin anuencia de EL SELLO, se establece una cláusula penal compensatoria inmediata de VEINTE MIL DÓLARES AMERICANOS ($us 20.000.-) o su equivalente en moneda nacional, sin perjuicio de las acciones por daños emergentes y lucro cesante.

DÉCIMA. (CONCILIACIÓN Y SUMISIÓN JURISDICCIONAL).
Para el caso de cualquier controversia emergente de la interpretación o ejecución del presente contrato, las partes se someten voluntariamente a las leyes del Estado Plurinacional de Bolivia y a la competencia territorial de los Juzgados Ordinarios en Materia Civil y Comercial de la ciudad de ${d.jurisdictionCity}.

DÉCIMA PRIMERA. (CONFORMIDAD).
En señal de absoluta conformidad, las partes suscriben el presente contrato en dos (2) ejemplares de un mismo tenor y validez legal en la ciudad de ${d.jurisdictionCity}, a los ${day} días del mes de ${month} de ${year} años.


________________________________________               ________________________________________
             POR EL SELLO                                           POR EL ARTISTA
       SELVA MUSIC GROUP S.R.L.                                  ${d.artistName}
   C.I. N° ${d.labelRepCi}                                    C.I. N° ${d.artistCi} ${d.artistCiExt}
   Representante Legal                                       Nombre Artístico: "${d.artistArtisticName}"


========================================================================================
                    ESPACIO RESERVADO PARA EL SELLO DEL ABOGADO
========================================================================================

           ┌────────────────────────────────────────────────────────────┐
           │                   SELLO DEL ABOGADO                        │
           │                                                            │
           │  Asesor Jurídico: ${d.lawyerName.padEnd(34, " ")}│
           │  Matrícula RPA N°: ${d.lawyerRpa.padEnd(33, " ")}│
           │  Colegio de Abogados: ${d.lawyerBar.padEnd(30, " ")}│
           │                                                            │
           │  Firma y Sello: __________________________________________ │
           │                                                            │
           │  "Revisado, visado y legalmente blindado conforme a la    │
           │   Ley N° 1322 de Derecho de Autor de Bolivia"              │
           └────────────────────────────────────────────────────────────┘
`;
      } else {
        return `EXCLUSIVE 360° ARTIST RECORDING, MANAGEMENT & PUBLISHING AGREEMENT
LEGAL PRIVATE INSTRUMENT WITH NOTARIAL ENFORCEABILITY UNDER BOLIVIAN LAW
(Pursuant to Bolivian Copyright Law No. 1322 and Arts. 450, 519, 1279 of the Bolivian Civil Code)

This Agreement is entered into on this day, ${month} ${day}, ${year}, by and between:

1. THE RECORD LABEL: SELVA MUSIC GROUP S.R.L. / WILOR PRODUCCIONES, represented by ${d.labelRepName}, legal representative, holder of National I.D. No. ${d.labelRepCi}, located at ${d.labelAddress}, hereinafter referred to as "THE LABEL".
2. THE ARTIST: ${d.artistName}, professionally known as "${d.artistArtisticName}", holder of National I.D. No. ${d.artistCi} (${d.artistCiExt}), residing at ${d.artistAddress}, ${d.artistCity}, hereinafter referred to as "THE ARTIST".

CLAUSE ONE (PURPOSE & EXCLUSIVITY):
THE ARTIST grants THE LABEL worldwide exclusive rights across all formats (digital, physical, metaverse, and future media) regarding:
a) Audio and visual master recordings for the project "${d.projectTitle}".
b) Worldwide touring, live performance booking, and management representations.
c) Merchandising rights, brand sponsorships, and commercial endorsements.
d) Music publishing administration and synchronization licensing.

CLAUSE TWO (TERM & TERRITORY):
The initial term shall be three (3) consecutive years, with an exclusive unilateral extension option of two (2) additional years for THE LABEL. Territory is worldwide.

CLAUSE THREE (ROYALTIES & NET REVENUE SPLIT):
3.1. Digital Streaming and Downloads: ${d.royaltyPercentage} Artist / ${d.producerPercentage} Label.
3.2. Live Performance Bookings: 80% Artist / 20% Label management commission.
3.3. Merchandising & Endorsements: 70% Artist / 30% Label.
3.4. Commercial Advances: ${d.advanceAmount}, fully recoupable from future earned royalties.

CLAUSE FOUR (ACCOUNTING & AUDIT):
Semi-annual accounting statements rendered within sixty (60) days after each half-year cycle. THE ARTIST retains audit rights upon fifteen (15) business days written notice.

CLAUSE FIVE (GOVERNING LAW & JURISDICTION):
This Agreement shall be construed and enforced in accordance with the laws of the Plurinational State of Bolivia, submitting to the courts of ${d.jurisdictionCity}, Bolivia.


________________________________________               ________________________________________
            FOR THE LABEL                                          FOR THE ARTIST
       SELVA MUSIC GROUP S.R.L.                                  ${d.artistName}
   I.D. No. ${d.labelRepCi}                                   I.D. No. ${d.artistCi} ${d.artistCiExt}
   General Manager                                            Stage Name: "${d.artistArtisticName}"


========================================================================================
                          LAWYER'S LEGAL STAMP BOX
========================================================================================

           ┌────────────────────────────────────────────────────────────┐
           │                   SELLO DEL ABOGADO                        │
           │                                                            │
           │  Legal Counsel: ${d.lawyerName.padEnd(36, " ")}│
           │  Bar / RPA Registration: ${d.lawyerRpa.padEnd(27, " ")}│
           │  Bar Association: ${d.lawyerBar.padEnd(34, " ")}│
           │                                                            │
           │  Signature & Seal: _______________________________________ │
           │                                                            │
           │  "Reviewed and certified under Bolivian Copyright Law"    │
           └────────────────────────────────────────────────────────────┘
`;
      }
    }

    if (selectedContract === "work_for_hire") {
      return `CONTRATO DE TRABAJO POR ENCARGO MUSICAL ("WORK FOR HIRE")
PRODUCCIÓN, ARREGLO Y COMPOSICIÓN A TANTO ALZADO
(Conforme al Art. 12 de la Ley N° 1322 de Derecho de Autor de Bolivia y Art. 732 del Código Civil)

Conste por el presente documento privado las siguientes cláusulas y condiciones:

PRIMERA. (PARTES).
Intervienen:
1.1. EL PRODUCTOR / COMITENTE: SELVA MUSIC GROUP S.R.L., representada por ${d.labelRepName}, C.I. N° ${d.labelRepCi}.
1.2. EL CREADOR / MÚSICO CONTRATADO: ${d.artistName} ("${d.artistArtisticName}"), con C.I. N° ${d.artistCi} ${d.artistCiExt}, domiciliado en ${d.artistAddress}, ${d.artistCity}.

SEGUNDA. (OBJETO DEL TRABAJO POR ENCARGO).
EL PRODUCTOR encomienda a EL CREADOR la composición, arreglo instrumental, grabación de guitarras/teclados y/o diseño sonoro para la obra fonográfica titulada "${d.projectTitle}".

TERCERA. (NATURALEZA DE LA TITULARIDAD PATRIMONIAL).
En estricta aplicación del Artículo 12 de la Ley N° 1322 de Derecho de Autor de Bolivia, el presente trabajo se realiza bajo la modalidad de OBRA POR ENCARGO ("Work Made For Hire"). En consecuencia:
a) EL PRODUCTOR es el titular originario y exclusivo de la totalidad de los derechos patrimoniales sobre el máster, la pista sonora y los arreglos creados.
b) EL CREADOR conserva el derecho moral a ser acreditado en las notas de portada y metadatos con su nombre y/o seudónimo artístico.
c) EL CREADOR no percibirá regalías residuales futuras, royalties de streaming ni participaciones de publishing, habiendo sido remunerado de manera íntegra, única y definitiva.

CUARTA. (REMUNERACIÓN A TANTO ALZADO / FLAT FEE).
Como única contraprestación económica por el trabajo realizado, EL PRODUCTOR abona a EL CREADOR la suma convenida de ${d.advanceAmount}, suma que EL CREADOR declara recibir a entera satisfacción a la entrega de los archivos digitales correspondientes.

QUINTA. (ENTREGABLES TÉCNICOS).
EL CREADOR se compromete a entregar los Stems individuales en formato WAV 24-bit 48kHz, sin compresión ni saturación, limpios de ruidos parásitos, antes de la fecha límite establecida por EL PRODUCTOR.

SEXTA. (GARANTÍA DE ORIGINALIDAD E INDEMNIDAD).
EL CREADOR garantiza bajo juramento que el material entregado es 100% original, libre de samples no autorizados o plagios de terceras obras. EL CREADOR mantendrá indemne a SELVA MUSIC GROUP ante cualquier reclamo extrajudicial o judicial.

SÉPTIMA. (JURISDICCIÓN).
Cualquier controversia se someterá a los Juzgados Civiles de la ciudad de ${d.jurisdictionCity}, Estado Plurinacional de Bolivia.


________________________________________               ________________________________________
             EL PRODUCTOR                                           EL CREADOR
       SELVA MUSIC GROUP S.R.L.                                  ${d.artistName}
   C.I. N° ${d.labelRepCi}                                    C.I. N° ${d.artistCi} ${d.artistCiExt}


========================================================================================
                    ESPACIO RESERVADO PARA EL SELLO DEL ABOGADO
========================================================================================

           ┌────────────────────────────────────────────────────────────┐
           │                   SELLO DEL ABOGADO                        │
           │                                                            │
           │  Asesor Jurídico: ${d.lawyerName.padEnd(34, " ")}│
           │  Matrícula RPA N°: ${d.lawyerRpa.padEnd(33, " ")}│
           │  Colegio de Abogados: ${d.lawyerBar.padEnd(30, " ")}│
           │                                                            │
           │  Firma y Sello: __________________________________________ │
           │                                                            │
           │  "Revisado, visado y legalmente blindado conforme a la    │
           │   Ley N° 1322 de Derecho de Autor de Bolivia"              │
           └────────────────────────────────────────────────────────────┘
`;
    }

    if (selectedContract === "split_sheet") {
      return `HOJA OFICIAL DE DIVISIÓN AUTORAL ("SPLIT SHEET")
ACUERDO DE REPARTO DE DERECHOS DE AUTOR Y COMPOSICIÓN
REGISTRO RECONOCIDO ANTE SOBODAYCOM / SENAPI · ESTADO PLURINACIONAL DE BOLIVIA

FECHA DE CREACIÓN: ${day} de ${month} de ${year}
ESTUDIO DE GRABACIÓN: SELVA MUSIC STUDIOS · BOLIVIA
TÍTULO DE LA CANCIÓN / OBRA: "${d.projectTitle}"
FORMATO DEL FONOGRAMA: ${d.albumOrTrackCount}

DECLARACIÓN JURADA DE CO-AUTORÍA:
Los abajo firmantes, en su calidad de co-autores, compositores y/o productores de la obra referida, declaran y acuerdan formalmente que los porcentajes definitivos de participación en los Derechos de Autor (Letra y Música) y Derechos Conexos son los siguientes:

-------------------------------------------------------------------------------------------------------------------------
N°  NOMBRE COMPLETO           SEUDÓNIMO        C.I.          ROL ASIGNADO         SOCIEDAD (PRO)    % DE AUTORÍA
-------------------------------------------------------------------------------------------------------------------------
01  ${d.labelRepName.padEnd(25, " ")} DJ WILOR        ${d.labelRepCi.padEnd(13, " ")} Producción/Música   SOBODAYCOM        ${d.producerPercentage}
02  ${d.artistName.padEnd(25, " ")} ${d.artistArtisticName.padEnd(16, " ")} ${d.artistCi.padEnd(13, " ")} Letra/Vocalista     SOBODAYCOM        ${d.royaltyPercentage}
-------------------------------------------------------------------------------------------------------------------------
TOTAL PORCENTUAL ACORDADO:                                                                           100%
-------------------------------------------------------------------------------------------------------------------------

CLÁUSULA DE REGISTRO Y RECAUDACIÓN:
1. Cada coautor es responsable de inscribir su porcentaje en su respectiva Sociedad de Gestión Colectiva (SOBODAYCOM en Bolivia, o sociedad internacional recíproca: ASCAP, BMI, SACM, SAYCO, etc.).
2. Ningún coautor podrá licenciar la obra para sincronizaciones publicitarias o cinematográficas sin la conformidad expresa por escrito del resto de los firmantes.
3. Se certifica que la composición es inédita y original.


________________________________________               ________________________________________
             CO-AUTOR 01                                            CO-AUTOR 02
            DJ WILOR                                            ${d.artistName}
   C.I. N° ${d.labelRepCi}                                    C.I. N° ${d.artistCi} ${d.artistCiExt}
   Rol: Productor Musical                                     Rol: Letrista / Intérprete


========================================================================================
                    ESPACIO RESERVADO PARA EL SELLO DEL ABOGADO
========================================================================================

           ┌────────────────────────────────────────────────────────────┐
           │                   SELLO DEL ABOGADO                        │
           │                                                            │
           │  Asesor Jurídico: ${d.lawyerName.padEnd(34, " ")}│
           │  Matrícula RPA N°: ${d.lawyerRpa.padEnd(33, " ")}│
           │  Colegio de Abogados: ${d.lawyerBar.padEnd(30, " ")}│
           │                                                            │
           │  Firma y Sello: __________________________________________ │
           │                                                            │
           │  "Revisado, visado y legalmente blindado conforme a la    │
           │   Ley N° 1322 de Derecho de Autor de Bolivia"              │
           └────────────────────────────────────────────────────────────┘
`;
    }

    if (selectedContract === "master_transfer") {
      return `CONTRATO DE CESIÓN TOTAL Y DEFINITIVA DE DERECHOS PATRIMONIALES DE FONOGRAMA
(Conforme a los Arts. 18, 19, 29, 30 y conexos de la Ley N° 1322 de Derecho de Autor de Bolivia)

Conste por el presente instrumento legal:

PRIMERA. (COMPARECIENTES).
- EL CEDENTE: ${d.artistName} ("${d.artistArtisticName}"), C.I. N° ${d.artistCi} ${d.artistCiExt}.
- EL CESIONARIO: SELVA MUSIC GROUP S.R.L., representada por ${d.labelRepName}, C.I. N° ${d.labelRepCi}.

SEGUNDA. (OBJETO DE LA CESIÓN PATRIMONIAL).
EL CEDENTE transfiere y cede en favor de EL CESIONARIO de forma definitiva, perpetua, exclusiva e irrevocable para todo el mundo, la TOTALIDAD de los derechos patrimoniales sobre el fonograma denominado "${d.projectTitle}", incluyendo los derechos de:
a) Reproducción directa o indirecta por cualquier procedimiento digital, analógico o streaming.
b) Distribución y venta en formato físico y digital.
c) Comunicación pública, radiodifusión, streaming e inclusión interactiva en internet.
d) Sincronización en obras audiovisuales, películas, comerciales y plataformas sociales.

TERCERA. (DERECHOS MORALES INALIENABLES).
En cumplimiento del Art. 14 de la Ley 1322, EL CESIONARIO se compromete a respetar en todo momento la paternidad de EL CEDENTE en las menciones de los créditos del fonograma.

CUARTA. (PRECIO Y FORMA DE PAGO).
La presente cesión patrimonial se realiza por el monto libremente acordado de ${d.advanceAmount}, monto que EL CEDENTE confiesa haber recibido en su totalidad en moneda legal de curso corriente.

QUINTA. (JURISDICCIÓN).
Las partes se someten a la legislación boliviana y a los tribunales de ${d.jurisdictionCity}.


________________________________________               ________________________________________
             EL CEDENTE                                             EL CESIONARIO
            ${d.artistName}                                      SELVA MUSIC GROUP S.R.L.
   C.I. N° ${d.artistCi} ${d.artistCiExt}                     C.I. N° ${d.labelRepCi}


========================================================================================
                    ESPACIO RESERVADO PARA EL SELLO DEL ABOGADO
========================================================================================

           ┌────────────────────────────────────────────────────────────┐
           │                   SELLO DEL ABOGADO                        │
           │                                                            │
           │  Asesor Jurídico: ${d.lawyerName.padEnd(34, " ")}│
           │  Matrícula RPA N°: ${d.lawyerRpa.padEnd(33, " ")}│
           │  Colegio de Abogados: ${d.lawyerBar.padEnd(30, " ")}│
           │                                                            │
           │  Firma y Sello: __________________________________________ │
           │                                                            │
           │  "Revisado, visado y legalmente blindado conforme a la    │
           │   Ley N° 1322 de Derecho de Autor de Bolivia"              │
           └────────────────────────────────────────────────────────────┘
`;
    }

    if (selectedContract === "recording_prod") {
      return `CONTRATO DE GRABACIÓN & PRODUCCIÓN MUSICAL FONOGRÁFICA
SELVA MUSIC STUDIOS · BOLIVIA

PRIMERA. (PARTES).
- PRODUCTOR EJECUTIVO: SELVA MUSIC GROUP S.R.L. / ${d.labelRepName}.
- ARTISTA GRABADOR: ${d.artistName} ("${d.artistArtisticName}"), C.I. N° ${d.artistCi} ${d.artistCiExt}.

SEGUNDA. (COMPROMISOS DE ESTUDIO Y MASTERIZACIÓN).
1. EL PRODUCTOR proveerá las instalaciones acústicas, micrófonos de alta gama y directores de mezcla para la grabación del proyecto "${d.projectTitle}".
2. EL ARTISTA acudirá preparado, en óptimas condiciones vocales y cumplirá con el cronograma de grabación pactado.
3. El Máster final será propiedad fonográfica de SELVA MUSIC GROUP, compartiendo regalías digitales en un ${d.royaltyPercentage} para el Artista y ${d.producerPercentage} para la Productora.

TERCERA. (JURISDICCIÓN).
Tribunales de ${d.jurisdictionCity}, Estado Plurinacional de Bolivia.


________________________________________               ________________________________________
             EL PRODUCTOR                                           EL ARTISTA
       SELVA MUSIC GROUP S.R.L.                                  ${d.artistName}


========================================================================================
                    ESPACIO RESERVADO PARA EL SELLO DEL ABOGADO
========================================================================================

           ┌────────────────────────────────────────────────────────────┐
           │                   SELLO DEL ABOGADO                        │
           │                                                            │
           │  Asesor Jurídico: ${d.lawyerName.padEnd(34, " ")}│
           │  Matrícula RPA N°: ${d.lawyerRpa.padEnd(33, " ")}│
           │  Colegio de Abogados: ${d.lawyerBar.padEnd(30, " ")}│
           │                                                            │
           │  Firma y Sello: __________________________________________ │
           │                                                            │
           │  "Revisado, visado y legalmente blindado conforme a la    │
           │   Ley N° 1322 de Derecho de Autor de Bolivia"              │
           └────────────────────────────────────────────────────────────┘
`;
    }

    if (selectedContract === "net_profits") {
      return `ACUERDO DE LICENCIA Y REPARTO DE GANANCIAS NETAS ("NET PROFITS SPLIT")
DOCUMENTO FORMAL DE DISTRIBUCIÓN DE DIVIDENDOS DIGITALES Y EXPLOTACIÓN MUSICAL

PARTES:
- LICENCIANTE / DISCOGRÁFICA: SELVA MUSIC GROUP S.R.L., representada por ${d.labelRepName}.
- LICENCIATARIO / ARTISTA: ${d.artistName} ("${d.artistArtisticName}"), C.I. N° ${d.artistCi} ${d.artistCiExt}.

CLÁUSULA PRIMERA (DEFINICIÓN DE GANANCIAS NETAS):
Se define expresamente como "Ganancia Neta" (Net Profit) el ingreso bruto efectivamente percibido por SELVA MUSIC GROUP de parte de las distribuidoras digitales (The Orchard, DistroKid, TuneCore, Spotify, YouTube), MENOS las deducciones legítimas y documentadas consistentes en:
a) Retenciones impositivas y fiscales vigentes en el Estado Plurinacional de Bolivia.
b) Costos directos de masterización externa comprobada.
c) Presupuestos de pauta publicitaria en Meta/Google Ads expresamente acordados por ambas partes.

CLÁUSULA SEGUNDA (PORCENTAJES DE DIVISIÓN):
Una vez deducidos los costos señalados, el remanente neto se liquidará al:
- ${d.royaltyPercentage} a favor de EL ARTISTA.
- ${d.producerPercentage} a favor de SELVA MUSIC GROUP.

CLÁUSULA TERCERA (PERIODICIDAD Y TRANSPARENCIA):
Liquidaciones semestrales con acceso a reportes analíticos CSV oficiales de streaming.


________________________________________               ________________________________________
             POR EL SELLO                                           POR EL ARTISTA
       SELVA MUSIC GROUP S.R.L.                                  ${d.artistName}


========================================================================================
                    ESPACIO RESERVADO PARA EL SELLO DEL ABOGADO
========================================================================================

           ┌────────────────────────────────────────────────────────────┐
           │                   SELLO DEL ABOGADO                        │
           │                                                            │
           │  Asesor Jurídico: ${d.lawyerName.padEnd(34, " ")}│
           │  Matrícula RPA N°: ${d.lawyerRpa.padEnd(33, " ")}│
           │  Colegio de Abogados: ${d.lawyerBar.padEnd(30, " ")}│
           │                                                            │
           │  Firma y Sello: __________________________________________ │
           │                                                            │
           │  "Revisado, visado y legalmente blindado conforme a la    │
           │   Ley N° 1322 de Derecho de Autor de Bolivia"              │
           └────────────────────────────────────────────────────────────┘
`;
    }

    // Default: Beat License
    return `CONTRATO DE LICENCIA DE BEAT & PRODUCCIÓN INSTRUMENTAL
SELVA MUSIC BEATS · TRÓPICO DE COCHABAMBA, BOLIVIA

PARTES:
- EL BEATMAKER / PRODUCTOR: DJ WILOR / SELVA MUSIC GROUP, C.I. N° ${d.labelRepCi}.
- EL INTÉRPRETE / LICENCIATARIO: ${d.artistName} ("${d.artistArtisticName}"), C.I. N° ${d.artistCi} ${d.artistCiExt}.

OBJETO DE LA LICENCIA INSTRUMENTAL:
EL BEATMAKER otorga a EL INTÉRPRETE una licencia de uso de la pista instrumental original titulada "${d.projectTitle}" para la grabación de voces y explotación comercial en audio y video.

CONDICIONES DE LA LICENCIA:
1. DERECHOS OTORGADOS: Hasta 500,000 reproducciones en streaming en plataformas digitales y uso en un (1) video musical oficial en YouTube.
2. CRÉDITOS OBLIGATORIOS: En todo lanzamiento digital o impreso deberá constar la leyenda textual: "Prod. by DJ WILOR / SELVA MUSIC".
3. PROHIBICIÓN DE CONTENT ID: EL INTÉRPRETE no podrá registrar la instrumental aislada en sistemas de Content ID sin la previa incorporación de sus líneas vocales líricas originales.
4. PAGO DE LA LICENCIA: ${d.advanceAmount}.


________________________________________               ________________________________________
             EL PRODUCTOR                                         EL LICENCIATARIO
               DJ WILOR                                          ${d.artistName}


========================================================================================
                    ESPACIO RESERVADO PARA EL SELLO DEL ABOGADO
========================================================================================

           ┌────────────────────────────────────────────────────────────┐
           │                   SELLO DEL ABOGADO                        │
           │                                                            │
           │  Asesor Jurídico: ${d.lawyerName.padEnd(34, " ")}│
           │  Matrícula RPA N°: ${d.lawyerRpa.padEnd(33, " ")}│
           │  Colegio de Abogados: ${d.lawyerBar.padEnd(30, " ")}│
           │                                                            │
           │  Firma y Sello: __________________________________________ │
           │                                                            │
           │  "Revisado, visado y legalmente blindado conforme a la    │
           │   Ley N° 1322 de Derecho de Autor de Bolivia"              │
           └────────────────────────────────────────────────────────────┘
`;
  };

  const handleCopy = () => {
    const text = generateContractText();
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    const text = generateContractText();
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `CONTRATO_SELVA_MUSIC_${selectedContract.toUpperCase()}_${legalData.artistArtisticName || "ARTISTA"}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="legal-contracts-container">
      {/* Cabecera del Módulo Legal */}
      <div className="legal-header-banner">
        <div className="legal-banner-info">
          <div className="legal-seal-badge">
            <Scale size={24} />
          </div>
          <div>
            <h3>⚖️ DEPARTAMENTO JURÍDICO & CONTRATOS OFICIALES</h3>
            <p>
              Blindaje Legal 100% bajo la <strong>Ley N° 1322 de Derecho de Autor de Bolivia</strong> y Código Civil.
              Documentos listos con Generales de Ley, membrete de SELVA MUSIC y espacio oficial para el Sello del Abogado.
            </p>
          </div>
        </div>

        {/* Selector de Idioma */}
        <div className="legal-lang-toggle">
          <Globe size={15} />
          <button
            type="button"
            className={`btn-lang-tab ${language === "es" ? "is-active" : ""}`}
            onClick={() => setLanguage("es")}
          >
            🇧🇴 Español (Bolivia)
          </button>
          <button
            type="button"
            className={`btn-lang-tab ${language === "en" ? "is-active" : ""}`}
            onClick={() => setLanguage("en")}
          >
            🇺🇸 English (Intl)
          </button>
        </div>
      </div>

      {/* Selector de los 7 Tipos de Contrato */}
      <div className="legal-contract-selector-grid">
        <button
          type="button"
          className={`contract-pill-btn ${selectedContract === "contract_360" ? "is-active" : ""}`}
          onClick={() => setSelectedContract("contract_360")}
        >
          <Sparkles size={16} />
          <div className="pill-text">
            <strong>Contrato 360° Integral</strong>
            <span>Exclusividad, booking, discos y publishing</span>
          </div>
        </button>

        <button
          type="button"
          className={`contract-pill-btn ${selectedContract === "work_for_hire" ? "is-active" : ""}`}
          onClick={() => setSelectedContract("work_for_hire")}
        >
          <UserCheck size={16} />
          <div className="pill-text">
            <strong>Work For Hire (Encargo)</strong>
            <span>Obra a tanto alzado sin regalías residuales</span>
          </div>
        </button>

        <button
          type="button"
          className={`contract-pill-btn ${selectedContract === "split_sheet" ? "is-active" : ""}`}
          onClick={() => setSelectedContract("split_sheet")}
        >
          <BookOpen size={16} />
          <div className="pill-text">
            <strong>Split Sheet (División)</strong>
            <span>Reparto de autoría SOBODAYCOM / SENAPI</span>
          </div>
        </button>

        <button
          type="button"
          className={`contract-pill-btn ${selectedContract === "master_transfer" ? "is-active" : ""}`}
          onClick={() => setSelectedContract("master_transfer")}
        >
          <ShieldCheck size={16} />
          <div className="pill-text">
            <strong>Cesión de Fonograma</strong>
            <span>Transferencia patrimonial total del Master</span>
          </div>
        </button>

        <button
          type="button"
          className={`contract-pill-btn ${selectedContract === "recording_prod" ? "is-active" : ""}`}
          onClick={() => setSelectedContract("recording_prod")}
        >
          <FileText size={16} />
          <div className="pill-text">
            <strong>Grabación Fonográfica</strong>
            <span>Sesiones de estudio, estándares y masters</span>
          </div>
        </button>

        <button
          type="button"
          className={`contract-pill-btn ${selectedContract === "net_profits" ? "is-active" : ""}`}
          onClick={() => setSelectedContract("net_profits")}
        >
          <Scale size={16} />
          <div className="pill-text">
            <strong>Reparto Ganancias Netas</strong>
            <span>Net Profits Split con deducciones y cuentas</span>
          </div>
        </button>

        <button
          type="button"
          className={`contract-pill-btn ${selectedContract === "beat_license" ? "is-active" : ""}`}
          onClick={() => setSelectedContract("beat_license")}
        >
          <Sparkles size={16} />
          <div className="pill-text">
            <strong>Licencia de Beats</strong>
            <span>Pistas instrumentales, streams y créditos</span>
          </div>
        </button>
      </div>

      {/* Grid: Formulario de Generales de Ley + Previsualización Imprimible */}
      <div className="legal-workspace-grid">
        {/* Formulario de Generales de Ley */}
        <div className="legal-form-card">
          <div className="legal-card-title">
            <UserCheck size={16} />
            <h4>GENERALES DE LEY (DATOS REQUERIDOS ANTES DE IMPRIMIR)</h4>
          </div>
          <p className="legal-field-hint">
            Llene estos datos obligatorios para dotar al contrato de plena validez jurídica ante Notaría y Tribunales de Bolivia.
          </p>

          <div className="legal-form-fields">
            <div className="form-subheading">👤 DATOS DEL ARTISTA / COMPOSITOR</div>
            <div className="form-row">
              <div className="form-group flex-2">
                <label>Nombre y Apellidos Completos *</label>
                <input
                  type="text"
                  name="artistName"
                  value={legalData.artistName}
                  onChange={handleInputChange}
                  placeholder="Ej: Brayan Canseco Mamani"
                  required
                />
              </div>
              <div className="form-group flex-1">
                <label>Seudónimo Artístico</label>
                <input
                  type="text"
                  name="artistArtisticName"
                  value={legalData.artistArtisticName}
                  onChange={handleInputChange}
                  placeholder="Ej: Canseco Z.S."
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group flex-2">
                <label>Cédula de Identidad (C.I.) *</label>
                <input
                  type="text"
                  name="artistCi"
                  value={legalData.artistCi}
                  onChange={handleInputChange}
                  placeholder="Ej: 8392104"
                  required
                />
              </div>
              <div className="form-group flex-1">
                <label>Expedido *</label>
                <select name="artistCiExt" value={legalData.artistCiExt} onChange={handleInputChange}>
                  <option value="Cbb.">Cochabamba (Cbb.)</option>
                  <option value="LP.">La Paz (LP.)</option>
                  <option value="SC.">Santa Cruz (SC.)</option>
                  <option value="Ch.">Chuquisaca (Ch.)</option>
                  <option value="Or.">Oruro (Or.)</option>
                  <option value="Pt.">Potosí (Pt.)</option>
                  <option value="Tj.">Tarija (Tj.)</option>
                  <option value="Bn.">Beni (Bn.)</option>
                  <option value="Pa.">Pando (Pa.)</option>
                </select>
              </div>
              <div className="form-group flex-1">
                <label>Estado Civil</label>
                <select name="artistCivilStatus" value={legalData.artistCivilStatus} onChange={handleInputChange}>
                  <option value="Soltero(a)">Soltero(a)</option>
                  <option value="Casado(a)">Casado(a)</option>
                  <option value="Divorciado(a)">Divorciado(a)</option>
                  <option value="Viudo(a)">Viudo(a)</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group flex-2">
                <label>Domicilio Real (Dirección / Calle / N°)</label>
                <input
                  type="text"
                  name="artistAddress"
                  value={legalData.artistAddress}
                  onChange={handleInputChange}
                  placeholder="Ej: Av. Chimore Km 180"
                />
              </div>
              <div className="form-group flex-1">
                <label>Ciudad / Localidad</label>
                <input
                  type="text"
                  name="artistCity"
                  value={legalData.artistCity}
                  onChange={handleInputChange}
                  placeholder="Ej: Shinahota, Bolivia"
                />
              </div>
            </div>

            <div className="form-subheading">🎵 COORDENADAS DEL PROYECTO & REGALÍAS</div>
            <div className="form-row">
              <div className="form-group flex-2">
                <label>Título de la Obra o Proyecto Fonográfico *</label>
                <input
                  type="text"
                  name="projectTitle"
                  value={legalData.projectTitle}
                  onChange={handleInputChange}
                  placeholder="Ej: Los Envidiosos (Electro Tumbado Mix)"
                />
              </div>
              <div className="form-group flex-1">
                <label>Formato / Cantidad</label>
                <input
                  type="text"
                  name="albumOrTrackCount"
                  value={legalData.albumOrTrackCount}
                  onChange={handleInputChange}
                  placeholder="Ej: 1 Sencillo Máster"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group flex-1">
                <label>% Regalía Artista</label>
                <input
                  type="text"
                  name="royaltyPercentage"
                  value={legalData.royaltyPercentage}
                  onChange={handleInputChange}
                  placeholder="50%"
                />
              </div>
              <div className="form-group flex-1">
                <label>% Regalía Sello/Productor</label>
                <input
                  type="text"
                  name="producerPercentage"
                  value={legalData.producerPercentage}
                  onChange={handleInputChange}
                  placeholder="50%"
                />
              </div>
              <div className="form-group flex-2">
                <label>Anticipo / Remuneración Convenida</label>
                <input
                  type="text"
                  name="advanceAmount"
                  value={legalData.advanceAmount}
                  onChange={handleInputChange}
                  placeholder="0 Bs. / Pago único"
                />
              </div>
            </div>

            <div className="form-subheading">⚖️ SELLO DEL ABOGADO & JURISDICCIÓN</div>
            <div className="form-row">
              <div className="form-group flex-2">
                <label>Nombre del Abogado / Asesor Jurídico *</label>
                <input
                  type="text"
                  name="lawyerName"
                  value={legalData.lawyerName}
                  onChange={handleInputChange}
                  placeholder="Dr. Rodrigo Asesor Jurídico"
                />
              </div>
              <div className="form-group flex-1">
                <label>Matrícula RPA N° *</label>
                <input
                  type="text"
                  name="lawyerRpa"
                  value={legalData.lawyerRpa}
                  onChange={handleInputChange}
                  placeholder="RPA-BO-89210-LEX"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group flex-2">
                <label>Colegio de Abogados</label>
                <input
                  type="text"
                  name="lawyerBar"
                  value={legalData.lawyerBar}
                  onChange={handleInputChange}
                  placeholder="Ilustre Colegio de Abogados de Cochabamba"
                />
              </div>
              <div className="form-group flex-1">
                <label>Ciudad de Jurisdicción</label>
                <input
                  type="text"
                  name="jurisdictionCity"
                  value={legalData.jurisdictionCity}
                  onChange={handleInputChange}
                  placeholder="Cochabamba"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Previsualización del Contrato con Membrete y Sello del Abogado */}
        <div className="legal-preview-card">
          <div className="preview-top-toolbar">
            <div className="preview-badge-status">
              <span className="live-seal-dot" />
              <span>FOLIO OFICIAL: <strong>SMG-BOL-2026-{Math.floor(1000 + Math.random() * 9000)}</strong></span>
            </div>
            <div className="preview-actions">
              <button
                type="button"
                className="btn-action-ghost"
                onClick={handleCopy}
                title="Copiar texto legal al portapapeles"
              >
                {isCopied ? <Check size={14} className="text-lime" /> : <Copy size={14} />}
                {isCopied ? "Copiado" : "Copiar"}
              </button>
              <button
                type="button"
                className="btn-action-ghost"
                onClick={handleDownloadTxt}
                title="Descargar documento .TXT formal"
              >
                <Download size={14} /> Descargar TXT
              </button>
              <button
                type="button"
                className="btn-action-primary"
                onClick={handlePrint}
                title="Imprimir contrato con membrete y sello"
              >
                <Printer size={15} /> Imprimir Contrato
              </button>
            </div>
          </div>

          {/* Documento Imprimible */}
          <div className="legal-printable-sheet" ref={printAreaRef}>
            {/* Membrete Oficial SELVA MUSIC */}
            <div className="sheet-official-header">
              <div className="sheet-logo-group">
                <div className="sheet-emblem">🌴</div>
                <div>
                  <div className="sheet-brand-name">SELVA MUSIC GROUP S.R.L.</div>
                  <div className="sheet-brand-sub">SELLO DISCOGRÁFICO · WILOR PRODUCCIONES · BOLIVIA</div>
                  <div className="sheet-brand-reg">NIT: 4170114018 · MATRÍCULA SEPREC: 00481920 · SENAPI REG: 19283-C</div>
                </div>
              </div>
              <div className="sheet-watermark-tag">
                <span>DOCUMENTO JURÍDICO</span>
                <strong>VÁLIDO EN BOLIVIA</strong>
              </div>
            </div>

            {/* Texto Formal del Contrato */}
            <pre className="sheet-legal-text">{generateContractText()}</pre>

            {/* Pie de Página Oficial con el Recuadro para el Sello del Abogado */}
            <div className="sheet-stamp-box-wrapper">
              <div className="lawyer-stamp-box">
                <div className="stamp-box-header">ESPACIO PARA EL SELLO DEL ABOGADO</div>
                <div className="stamp-box-body">
                  <div className="stamp-line">
                    <strong>Abogado(a) Patrocinante:</strong> {legalData.lawyerName}
                  </div>
                  <div className="stamp-line">
                    <strong>Matrícula RPA N°:</strong> {legalData.lawyerRpa}
                  </div>
                  <div className="stamp-line">
                    <strong>Registro Forense:</strong> {legalData.lawyerBar}
                  </div>
                  <div className="stamp-line-signature">
                    <span>Firma y Rúbrica: _________________________________________</span>
                  </div>
                </div>
                <div className="stamp-box-footer">
                  Visado en conformidad con el Art. 12 y conexos de la Ley N° 1322 de Derecho de Autor del Estado Plurinacional de Bolivia
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
