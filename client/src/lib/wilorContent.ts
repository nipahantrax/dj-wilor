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

export type EventBooking = {
  id: string;
  artistId: string;
  artistName: string;
  clientName: string;
  clientPhone: string;
  city: string;
  eventType: string;
  date: string;
  time: string;
  notes?: string;
  status: "pending" | "confirmed" | "conflict";
  createdAt: string;
};

export type Track = {
  id: string;
  title: string;
  artist: string;
  duration: string;
  audioUrl: string;
  coverUrl: string;
  year?: string;
};

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
  gallery: string[];
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
  tracks: Track[];
};

export const defaultDemoAudio = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=tropical-house-113540.mp3";
export const defaultDemoAudio2 = "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=summer-tropical-beat-10928.mp3";
export const defaultDemoAudio3 = "https://cdn.pixabay.com/download/audio/2021/08/04/audio_31a293672d.mp3?filename=latin-urban-reggaeton-11090.mp3";
export const defaultDemoAudio4 = "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=latin-cumbia-electronic-party-15635.mp3";

export const initialBookings: EventBooking[] = [
  {
    id: "book-1",
    artistId: "wilor",
    artistName: "DJ WILOR",
    clientName: "Club Babylon Cochabamba",
    clientPhone: "+591 707 12345",
    city: "Cochabamba",
    eventType: "Discoteca / Club",
    date: "2026-11-14",
    time: "23:30",
    notes: "Presentación estelar de fin de semana con set de electro tumbado.",
    status: "confirmed",
    createdAt: "2026-10-28",
  },
  {
    id: "book-2",
    artistId: "emily-escobar",
    artistName: "Emily Escobar",
    clientName: "Festival Urbano Santa Cruz",
    clientPhone: "+591 789 54321",
    city: "Santa Cruz",
    eventType: "Festival / Concierto",
    date: "2026-11-20",
    time: "21:00",
    notes: "Show en vivo con cuerpo de baile completo para 'Chica Vacilona'.",
    status: "confirmed",
    createdAt: "2026-10-29",
  },
  {
    id: "book-3",
    artistId: "wilor",
    artistName: "DJ WILOR",
    clientName: "Evento Aniversario Villa Tunari",
    clientPhone: "+591 714 88990",
    city: "Chapare (Villa Tunari)",
    eventType: "Aniversario Patronal",
    date: "2026-11-28",
    time: "22:00",
    notes: "Show masivo en el Trópico con pirotecnia de escenario.",
    status: "confirmed",
    createdAt: "2026-10-30",
  },
];

export const rosterArtists: Artist[] = [
  {
    id: "wilor",
    name: "DJ WILOR",
    role: "Fundador · DJ & Productor Ejecutivo",
    category: "dj",
    genre: "Electro Tumbado / Funk Latino / RKT",
    location: "Trópico de Cochabamba, Bolivia",
    photo: "./assets/wilor-profile.jpg",
    gallery: [
      "./assets/hero-gta-tropico.jpg",
      "./assets/wilor-profile.jpg",
      "https://i.ytimg.com/vi/TlTuiVFTb0g/maxresdefault.jpg",
      "https://i.ytimg.com/vi/Jn05irCh1UQ/maxresdefault.jpg",
    ],
    bio: "Pilar fundamental y director creativo de SELVA MUSIC Group. Desde el Trópico de Cochabamba, DJ WILOR ha revolucionado la escena urbana boliviana produciendo éxitos como 'Vuelve Vuelve', 'Los Envidiosos', 'Imilla Coqueta' y 'Empina', fusionando la fuerza de los ritmos autóctonos con el beat internacional.",
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
      "Giras y shows estelares en los festivales más importantes del país",
    ],
    showFormat: "Live DJ Set estelar con visuales cinematográficos, animación urbana y percusión en vivo (60 a 90 min).",
    bookingStatus: "Disponible para Festivales, Discotecas & Giras Nacionales",
    socials: [
      { platform: "Spotify", url: "https://open.spotify.com/artist/6AiurSOGTBZe8MKSNCPuya" },
      { platform: "YouTube", url: "https://www.youtube.com/@Wilordj" },
      { platform: "TikTok", url: "https://www.tiktok.com/@djwilor" },
      { platform: "Facebook", url: "https://www.facebook.com/WilorDj/" },
    ],
    tracks: [
      {
        id: "w-track-1",
        title: "Vuelve Vuelve (Estreno)",
        artist: "DJ WILOR ft. Lesly CH & José Puyal",
        duration: "3:18",
        audioUrl: defaultDemoAudio,
        coverUrl: "https://i.ytimg.com/vi/TlTuiVFTb0g/hqdefault.jpg",
        year: "2026",
      },
      {
        id: "w-track-2",
        title: "Los Envidiosos (Electro Tumbado)",
        artist: "DJ WILOR ft. Canseco Z.S. & Cumpa Dorian",
        duration: "2:54",
        audioUrl: defaultDemoAudio2,
        coverUrl: "https://i.ytimg.com/vi/Jn05irCh1UQ/hqdefault.jpg",
        year: "2026",
      },
      {
        id: "w-track-3",
        title: "Imilla Coqueta (Funk Boliviano)",
        artist: "DJ WILOR ft. Pampeño",
        duration: "2:45",
        audioUrl: defaultDemoAudio3,
        coverUrl: "https://i.ytimg.com/vi/P8i3iDciOhs/hqdefault.jpg",
        year: "2026",
      },
      {
        id: "w-track-4",
        title: "Empina (Club Remix)",
        artist: "DJ WILOR",
        duration: "2:30",
        audioUrl: defaultDemoAudio4,
        coverUrl: "./assets/wilor-profile.jpg",
        year: "2026",
      },
    ],
  },
  {
    id: "emily-escobar",
    name: "Emily Escobar",
    role: "Vocalista · Pop Urbano & Funk Latino",
    category: "vocal",
    genre: "Funk Latino / Pop Urbano / Cumbia",
    location: "Bolivia",
    photo: "https://i.ytimg.com/vi/hxXAdDaDedE/hqdefault.jpg",
    gallery: [
      "https://i.ytimg.com/vi/hxXAdDaDedE/maxresdefault.jpg",
      "https://i.ytimg.com/vi/hxXAdDaDedE/hqdefault.jpg",
      "https://i.ytimg.com/vi/TlTuiVFTb0g/hqdefault.jpg",
    ],
    bio: "Una de las voces más frescas y magnéticas de la nueva ola urbana femenina en Bolivia. Co-intérprete del éxito viral 'Chica Vacilona' junto a WILOR bajo el sello SELVA MUSIC Group, destaca por su versatilidad melódica, carisma en escena y fuerza interpretativa.",
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
    tracks: [
      {
        id: "e-track-1",
        title: "Chica Vacilona",
        artist: "Emily ft. DJ WILOR",
        duration: "2:40",
        audioUrl: defaultDemoAudio,
        coverUrl: "https://i.ytimg.com/vi/hxXAdDaDedE/hqdefault.jpg",
        year: "2025",
      },
      {
        id: "e-track-2",
        title: "Quédate Conmigo (Remix)",
        artist: "Emily Escobar",
        duration: "3:05",
        audioUrl: defaultDemoAudio3,
        coverUrl: "https://i.ytimg.com/vi/hxXAdDaDedE/hqdefault.jpg",
        year: "2026",
      },
    ],
  },
  {
    id: "elmer-d8",
    name: "Elmer D8",
    role: "Cantautor · Flow & Versatilidad",
    category: "vocal",
    genre: "Reggaetón / Funk / Cumbia Urbana",
    location: "Cochabamba, Bolivia",
    photo: "https://i.ytimg.com/vi/-vFXHU1r0WM/hqdefault.jpg",
    gallery: [
      "https://i.ytimg.com/vi/-vFXHU1r0WM/maxresdefault.jpg",
      "https://i.ytimg.com/vi/-vFXHU1r0WM/hqdefault.jpg",
      "https://i.ytimg.com/vi/TlTuiVFTb0g/hqdefault.jpg",
    ],
    bio: "Pionero y creador de éxitos virales urbanos en Bolivia. Con temas como 'La Cita' y 'Mira Mira' junto a DJ WILOR, Elmer D8 ha consolidado un estilo contagioso y romántico-fiestero que llena discotecas y acumula millones de reproducciones.",
    featuredTrack: {
      title: "La Cita",
      format: "Videoclip Oficial · Éxito Urbano",
      youtubeId: "-vFXHU1r0WM",
      youtubeUrl: "https://www.youtube.com/watch?v=-vFXHU1r0WM",
    },
    highlights: [
      "Compositor e intérprete de hits como 'La Cita' y 'Mira Mira'",
      "Gran poder de convocatoria en eventos masivos de todo el país",
      "Colaborador histórico del movimiento impulsado por SELVA MUSIC",
    ],
    showFormat: "Show en vivo explosivo con interacción continua, temas virales y secuencias urbanas (50 a 60 min).",
    bookingStatus: "Disponible para Conciertos, Discotecas & Ferias",
    socials: [
      { platform: "YouTube", url: "https://www.youtube.com/watch?v=-vFXHU1r0WM" },
      { platform: "Spotify", url: "https://open.spotify.com" },
    ],
    tracks: [
      {
        id: "elmer-tr-1",
        title: "La Cita",
        artist: "Elmer D8 ft. DJ WILOR",
        duration: "3:12",
        audioUrl: defaultDemoAudio4,
        coverUrl: "https://i.ytimg.com/vi/-vFXHU1r0WM/hqdefault.jpg",
        year: "2023",
      },
      {
        id: "elmer-tr-2",
        title: "Mira Mira",
        artist: "Elmer D8 & DJ WILOR",
        duration: "2:50",
        audioUrl: defaultDemoAudio,
        coverUrl: "https://i.ytimg.com/vi/-vFXHU1r0WM/hqdefault.jpg",
        year: "2025",
      },
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
    gallery: [
      "https://i.ytimg.com/vi/Jn05irCh1UQ/maxresdefault.jpg",
      "https://i.ytimg.com/vi/Jn05irCh1UQ/hqdefault.jpg",
      "./assets/hero-gta-tropico.jpg",
    ],
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
    tracks: [
      {
        id: "c-track-1",
        title: "Los Envidiosos (Original)",
        artist: "Canseco Z.S. & Cumpa Dorian ft. WILOR",
        duration: "3:02",
        audioUrl: defaultDemoAudio2,
        coverUrl: "https://i.ytimg.com/vi/Jn05irCh1UQ/hqdefault.jpg",
        year: "2026",
      },
      {
        id: "c-track-2",
        title: "Zona Sur Flow",
        artist: "Canseco Z.S.",
        duration: "2:48",
        audioUrl: defaultDemoAudio,
        coverUrl: "https://i.ytimg.com/vi/Jn05irCh1UQ/hqdefault.jpg",
        year: "2026",
      },
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
    gallery: [
      "https://i.ytimg.com/vi/91myZgOitUk/maxresdefault.jpg",
      "https://i.ytimg.com/vi/91myZgOitUk/hqdefault.jpg",
    ],
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
    tracks: [
      {
        id: "g-track-1",
        title: "LES DUELE VERME BIEN",
        artist: "Gio Villarroel ft. DJ WILOR",
        duration: "3:24",
        audioUrl: defaultDemoAudio3,
        coverUrl: "https://i.ytimg.com/vi/91myZgOitUk/hqdefault.jpg",
        year: "2026",
      },
      {
        id: "g-track-2",
        title: "¿Qué Somos?",
        artist: "Gio Villarroel",
        duration: "2:55",
        audioUrl: defaultDemoAudio,
        coverUrl: "https://i.ytimg.com/vi/91myZgOitUk/hqdefault.jpg",
        year: "2025",
      },
    ],
  },
  {
    id: "lesly-jose",
    name: "Lesly CH & José Puyal",
    role: "Dúo Melódico · Romantiqueo Urbano",
    category: "vocal",
    genre: "Cumbia Urbana / Pop Latino / Electro",
    location: "Bolivia",
    photo: "https://i.ytimg.com/vi/TlTuiVFTb0g/hqdefault.jpg",
    gallery: [
      "https://i.ytimg.com/vi/TlTuiVFTb0g/maxresdefault.jpg",
      "https://i.ytimg.com/vi/TlTuiVFTb0g/hqdefault.jpg",
    ],
    bio: "Dúo que conquistó al público boliviano junto a DJ WILOR con 'Vuelve Vuelve', el lanzamiento estelar de 2026 bajo SELVA MUSIC Group. Combinan sentimiento, melodías pegajosas y un ritmo bailable imparable.",
    featuredTrack: {
      title: "Vuelve Vuelve",
      format: "Single Oficial 2026",
      youtubeId: "TlTuiVFTb0g",
      youtubeUrl: "https://www.youtube.com/watch?v=TlTuiVFTb0g",
    },
    highlights: [
      "Voces protagonistas del hit estelar 'Vuelve Vuelve'",
      "Gran química en el escenario y conexión con el público romántico-urbano",
      "Lanzamiento respaldado y distribuido por SELVA MUSIC Group",
    ],
    showFormat: "Show a dos voces con formato de show romántico bailable y animación de público (45 a 60 min).",
    bookingStatus: "Disponible para Fiestas, Boliches & Conciertos",
    socials: [
      { platform: "YouTube", url: "https://www.youtube.com/watch?v=TlTuiVFTb0g" },
    ],
    tracks: [
      {
        id: "lj-track-1",
        title: "Vuelve Vuelve (Original)",
        artist: "Lesly CH, José Puyal & WILOR",
        duration: "3:18",
        audioUrl: defaultDemoAudio,
        coverUrl: "https://i.ytimg.com/vi/TlTuiVFTb0g/hqdefault.jpg",
        year: "2026",
      },
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
    gallery: [
      "https://i.ytimg.com/vi/P8i3iDciOhs/maxresdefault.jpg",
      "https://i.ytimg.com/vi/P8i3iDciOhs/hqdefault.jpg",
    ],
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
    tracks: [
      {
        id: "p-track-1",
        title: "Imilla Coqueta",
        artist: "Pampeño ft. DJ WILOR",
        duration: "2:46",
        audioUrl: defaultDemoAudio3,
        coverUrl: "https://i.ytimg.com/vi/P8i3iDciOhs/hqdefault.jpg",
        year: "2026",
      },
      {
        id: "p-track-2",
        title: "Fiestero Mix",
        artist: "Pampeño",
        duration: "3:10",
        audioUrl: defaultDemoAudio4,
        coverUrl: "https://i.ytimg.com/vi/P8i3iDciOhs/hqdefault.jpg",
        year: "2026",
      },
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
    gallery: [
      "https://i.ytimg.com/vi/1khpnl4WE5g/maxresdefault.jpg",
      "https://i.ytimg.com/vi/1khpnl4WE5g/hqdefault.jpg",
    ],
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
    tracks: [
      {
        id: "y-track-1",
        title: "Presentación Oficial SELVA MUSIC",
        artist: "Yoniko y su Grupo Australia",
        duration: "3:40",
        audioUrl: defaultDemoAudio2,
        coverUrl: "https://i.ytimg.com/vi/1khpnl4WE5g/hqdefault.jpg",
        year: "2026",
      },
    ],
  },
];

export function extractAllTracks(artists: Artist[]): Track[] {
  return artists.flatMap((artist) => artist.tracks || []);
}
