export type Work = {
  title: string;
  collaborators: string;
  year: string;
  format: string;
  youtubeId: string;
  youtubeUrl: string;
  sourceLabel?: string;
};

export const works: Work[] = [
  {
    title: "Vuelve Vuelve",
    collaborators: "WILOR · Lesly CH · José Puyal",
    year: "2026",
    format: "Single · estreno",
    youtubeId: "TlTuiVFTb0g",
    youtubeUrl: "https://www.youtube.com/watch?v=TlTuiVFTb0g",
    sourceLabel: "SELVA MUSIC GROUP",
  },
  {
    title: "Los Envidiosos",
    collaborators: "WILOR · Canseco Z.S. · Cumpa Dorian",
    year: "2026",
    format: "Single · electro tumbado",
    youtubeId: "Jn05irCh1UQ",
    youtubeUrl: "https://www.youtube.com/watch?v=Jn05irCh1UQ",
    sourceLabel: "SELVA MUSIC GROUP",
  },
  {
    title: "Imilla Coqueta",
    collaborators: "WILOR · Pampeño",
    year: "2026",
    format: "Single · funk",
    youtubeId: "P8i3iDciOhs",
    youtubeUrl: "https://www.youtube.com/watch?v=P8i3iDciOhs",
    sourceLabel: "SELVA MUSIC GROUP",
  },
  {
    title: "LES DUELE VERME BIEN",
    collaborators: "WILOR · Gio Villarroel",
    year: "2026",
    format: "Single · electro tumbado",
    youtubeId: "91myZgOitUk",
    youtubeUrl: "https://www.youtube.com/watch?v=91myZgOitUk",
  },
  {
    title: "Chica Vacilona",
    collaborators: "WILOR · Emily",
    year: "2025",
    format: "Single · funk",
    youtubeId: "hxXAdDaDedE",
    youtubeUrl: "https://www.youtube.com/watch?v=hxXAdDaDedE",
    sourceLabel: "SELVA MUSIC GROUP",
  },
  {
    title: "La Cita",
    collaborators: "WILOR · Elmer D8",
    year: "2023",
    format: "Videoclip oficial",
    youtubeId: "-vFXHU1r0WM",
    youtubeUrl: "https://www.youtube.com/watch?v=-vFXHU1r0WM",
  },
];

export const milestones = [
  {
    year: "2023",
    title: "La Cita",
    detail: "Lanzamiento y videoclip junto a Elmer D8.",
    url: "https://www.youtube.com/watch?v=-vFXHU1r0WM",
  },
  {
    year: "2025",
    title: "Chica Vacilona",
    detail: "Colaboración con Emily, publicada bajo el crédito de SELVA MUSIC GROUP.",
    url: "https://www.youtube.com/watch?v=hxXAdDaDedE",
  },
  {
    year: "2026",
    title: "Una etapa de colaboraciones",
    detail: "Lanzamientos junto a Gio Villarroel, Canseco Z.S., Cumpa Dorian, Pampeño, Lesly CH y José Puyal.",
    url: "https://www.youtube.com/@Wilordj",
  },
];

export const socialLinks = [
  {
    name: "Spotify",
    descriptor: "Perfil de artista",
    url: "https://open.spotify.com/artist/6AiurSOGTBZe8MKSNCPuya",
    mark: "S",
  },
  {
    name: "YouTube",
    descriptor: "Videoclips y lanzamientos",
    url: "https://www.youtube.com/@Wilordj",
    mark: "▶",
  },
  {
    name: "TikTok",
    descriptor: "Shows y detrás de escena",
    url: "https://www.tiktok.com/@djwilor",
    mark: "♪",
  },
  {
    name: "Facebook",
    descriptor: "Página pública de WILOR",
    url: "https://www.facebook.com/WilorDj/",
    mark: "f",
  },
];

export const contact = {
  phoneDisplay: "+591 695 28962",
  phoneLink: "+59169528962",
  email: "miguelangelmedinacali@gmail.com",
};

export const sealLink = "https://www.facebook.com/61591489856517/";

export type ArtistSocial = {
  platform: string;
  url: string;
};

export type Artist = {
  id: string;
  name: string;
  role: string;
  category: "dj" | "vocal" | "group";
  genre: string;
  location: string;
  photo: string;
  bio: string;
  featuredTrack: {
    title: string;
    format: string;
    youtubeId: string;
    youtubeUrl: string;
  };
  highlights: string[];
  showFormat: string;
  bookingStatus: string;
  socials: ArtistSocial[];
};

export const rosterArtists: Artist[] = [
  {
    id: "wilor",
    name: "DJ WILOR",
    role: "Fundador · DJ & Productor Ejecutivo",
    category: "dj",
    genre: "Electro Tumbado / Funk Latino / RKT",
    location: "Trópico de Cochabamba, Bolivia",
    photo: "./assets/wilor-profile.jpg",
    bio: "Pilar fundamental y director creativo de SELVA MUSIC Group. Desde el Trópico de Cochabamba, DJ WILOR ha revolucionado la escena urbana boliviana produciendo éxitos como 'Vuelve Vuelve', 'Los Envidiosos' e 'Imilla Coqueta', fusionando el beat internacional con la identidad de su tierra.",
    featuredTrack: {
      title: "Vuelve Vuelve",
      format: "Single Oficial · 2026",
      youtubeId: "TlTuiVFTb0g",
      youtubeUrl: "https://www.youtube.com/watch?v=TlTuiVFTb0g",
    },
    highlights: [
      "Director y Productor Ejecutivo en SELVA MUSIC Group",
      "Producción de hits con millones de reproducciones en streaming",
      "Pionero en la internacionalización del sonido del Chapare",
    ],
    showFormat: "Live DJ Set estelar con visuales, animación urbana y percusión en vivo (60 a 90 min).",
    bookingStatus: "Disponible para Festivales, Discotecas & Giras Nacionales",
    socials: [
      { platform: "Spotify", url: "https://open.spotify.com/artist/6AiurSOGTBZe8MKSNCPuya" },
      { platform: "YouTube", url: "https://www.youtube.com/@Wilordj" },
      { platform: "TikTok", url: "https://www.tiktok.com/@djwilor" },
      { platform: "Facebook", url: "https://www.facebook.com/WilorDj/" },
    ],
  },
  {
    id: "emily-escobar",
    name: "Emily Escobar",
    role: "Vocalista · Artista Revelación",
    category: "vocal",
    genre: "Funk Latino / Pop Urbano / Cumbia",
    location: "Bolivia",
    photo: "https://i.ytimg.com/vi/hxXAdDaDedE/hqdefault.jpg",
    bio: "Una de las voces más frescas y magnéticas de la nueva ola urbana. Co-intérprete del éxito viral 'Chica Vacilona' junto a WILOR bajo el crédito de SELVA MUSIC Group, destaca por su versatilidad melódica, carisma en escena y fuerza vocal.",
    featuredTrack: {
      title: "Chica Vacilona",
      format: "Videoclip Oficial · Funk Remix",
      youtubeId: "hxXAdDaDedE",
      youtubeUrl: "https://www.youtube.com/watch?v=hxXAdDaDedE",
    },
    highlights: [
      "Voz líder en el hit viral 'Chica Vacilona'",
      "Gran arrastre en plataformas digitales y redes sociales",
      "Puesta en escena juvenil y enérgica con cuerpo de baile",
    ],
    showFormat: "Show vocal en vivo con secuencias, bailarinas e interactividad (45 a 60 min).",
    bookingStatus: "Disponible para Fiestas Juveniles, Clubs & Festivales",
    socials: [
      { platform: "YouTube", url: "https://www.youtube.com/watch?v=hxXAdDaDedE" },
      { platform: "TikTok", url: "https://www.tiktok.com/@djwilor" },
    ],
  },
  {
    id: "canseco-dorian",
    name: "Canseco Z.S. & Cumpa Dorian",
    role: "Dúo Urbano · Flow & Rimas",
    category: "vocal",
    genre: "Electro Tumbado / Trap / RKT",
    location: "Zona Sur, Bolivia",
    photo: "https://i.ytimg.com/vi/Jn05irCh1UQ/hqdefault.jpg",
    bio: "Exponentes indiscutidos del electro tumbado callejero con líricas auténticas y energía arrolladora. Creadores e intérpretes de 'Los Envidiosos' junto a WILOR, una de las pistas con mayor impacto en boliches y eventos urbanos.",
    featuredTrack: {
      title: "Los Envidiosos",
      format: "Single Oficial · Electro Tumbado",
      youtubeId: "Jn05irCh1UQ",
      youtubeUrl: "https://www.youtube.com/watch?v=Jn05irCh1UQ",
    },
    highlights: [
      "Coautores e intérpretes del himno 'Los Envidiosos'",
      "Sonido callejero innovador producido por SELVA MUSIC Group",
      "Alta interacción y conexión directa con el público joven",
    ],
    showFormat: "Show urbano dinámico a dos voces con beats pesados e iluminación sincronizada (45 a 60 min).",
    bookingStatus: "Disponible para Discotecas, Tardeadas & Conciertos Urbanos",
    socials: [
      { platform: "YouTube", url: "https://www.youtube.com/watch?v=Jn05irCh1UQ" },
    ],
  },
  {
    id: "gio-villarroel",
    name: "Gio Villarroel",
    role: "Cantautor · Melodía & Voz",
    category: "vocal",
    genre: "Pop Urbano / Electro Tumbado",
    location: "Cochabamba, Bolivia",
    photo: "https://i.ytimg.com/vi/91myZgOitUk/hqdefault.jpg",
    bio: "Cantautor prolífico dotado de un registro vocal distintivo y emotivo. En alianza con SELVA MUSIC Group y WILOR lanzó 'LES DUELE VERME BIEN', combinando un mensaje de superación con arreglos acústicos y urbanos de primer nivel.",
    featuredTrack: {
      title: "LES DUELE VERME BIEN",
      format: "Videoclip Oficial · 2026",
      youtubeId: "91myZgOitUk",
      youtubeUrl: "https://www.youtube.com/watch?v=91myZgOitUk",
    },
    highlights: [
      "Autor de temas como '¿Qué Somos?' y 'Ninguna Excusa Más'",
      "Reconocimiento nacional por su calidad compositiva e interpretación",
      "Sonido crossover apto tanto para festivales como para radios",
    ],
    showFormat: "Concierto vocal con acompañamiento acústico y secuencias electrónicas (45 a 60 min).",
    bookingStatus: "Disponible para Ferias, Conciertos & Eventos Masivos",
    socials: [
      { platform: "YouTube", url: "https://www.youtube.com/watch?v=91myZgOitUk" },
    ],
  },
  {
    id: "pampeno",
    name: "Pampeño",
    role: "Artista Festivo · Funk & Fiesta",
    category: "vocal",
    genre: "Funk Latino / Cumbia Remix / Fiesta",
    location: "Bolivia",
    photo: "https://i.ytimg.com/vi/P8i3iDciOhs/hqdefault.jpg",
    bio: "Sinónimo de fiesta, euforia y ritmo. Junto a WILOR dio a luz a 'Imilla Coqueta', una obra que funde la esencia festiva boliviana con los bajos contundentes del funk brasileño, convirtiéndose en infaltable en celebraciones de todo el país.",
    featuredTrack: {
      title: "Imilla Coqueta",
      format: "Single Oficial · Funk Latino",
      youtubeId: "P8i3iDciOhs",
      youtubeUrl: "https://www.youtube.com/watch?v=P8i3iDciOhs",
    },
    highlights: [
      "Creador del fenómeno viral 'Imilla Coqueta'",
      "Capacidad única para encender pistas de baile y carnavales",
      "Fusión genuina de picardía folclórica con beats de club modernos",
    ],
    showFormat: "Show fiestero ultra contagioso con animación y baile continúo (45 a 60 min).",
    bookingStatus: "Disponible para Fiestas Patronales, Aniversarios & Discotecas",
    socials: [
      { platform: "YouTube", url: "https://www.youtube.com/watch?v=P8i3iDciOhs" },
    ],
  },
  {
    id: "yoniko-australia",
    name: "Yoniko y su Grupo Australia",
    role: "Orquesta Tropical · Show en Vivo",
    category: "group",
    genre: "Cumbia Sureña / Fusión Tropical",
    location: "Bolivia",
    photo: "https://i.ytimg.com/vi/1khpnl4WE5g/hqdefault.jpg",
    bio: "Agrupación insignia de música tropical en vivo, apadrinada en producción y distribución por SELVA MUSIC Group. Con músicos de trayectoria e instrumentos en directo, ofrecen un despliegue escénico impecable para grandes celebraciones.",
    featuredTrack: {
      title: "Lanzamientos Especiales",
      format: "Catálogo SELVA MUSIC Group",
      youtubeId: "1khpnl4WE5g",
      youtubeUrl: "https://www.youtube.com/watch?v=1khpnl4WE5g",
    },
    highlights: [
      "Banda orquestal completa en directo con vientos y percusiones",
      "Repertorio bailable de alta duración para grandes eventos",
      "Sonido e ingeniería respaldados por el sello SELVA MUSIC",
    ],
    showFormat: "Concierto masivo con formación musical completa (90 a 120 min).",
    bookingStatus: "Disponible para Grandes Conciertos, Festivales & Aniversarios",
    socials: [
      { platform: "Facebook", url: "https://www.facebook.com/61591489856517/" },
    ],
  },
];
