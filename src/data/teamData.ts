import { FormationConfig, FormationKey, Player, PlaySequence } from '../types/football';

export const CLUB_INFO = {
  name: 'LOS CHAMOS FC',
  shortName: 'CHAMOS',
  motto: 'MÁS HECHOS QUE PALABRAS',
  founded: '2026',
  category: 'FÚTBOL 5 / FUTSAL PRO',
  crestUrl: '/src/assets/images/chamos_crest_official_1790634332330.jpg',
  colors: {
    primary: '#dc2626', // Red Escarlata
    dark: '#09090b',    // Black Carbón
    accent: '#f59e0b',  // Gold Amber
    goldHighlight: '#fbbf24'
  }
};

export const INITIAL_STARTERS: Player[] = [
  {
    id: 'p-franco',
    name: 'Franco',
    nickname: 'FRANCO',
    number: 9,
    position: 'PIV',
    role: 'Pívot Izquierdo / Goleador Letal',
    rat: 92,
    stats: { rit: 94, tir: 93, pas: 88, reg: 91, def: 50, fis: 88 },
    icon: '⚡',
    photo: '',
    cardType: 'gold_special',
    playstyle: 'Cañonazo +',
    preferredFoot: 'Derecha',
    desc: 'Potencia pura de cara al arco. Definición letal de primera intención y olfato goleador insuperable.',
    goalsThisSeason: 18,
    assistsThisSeason: 7
  },
  {
    id: 'p-henry',
    name: 'Henry',
    nickname: 'HENRY',
    number: 7,
    position: 'PIV',
    role: 'Pívot Derecho / Extremo Eléctrico',
    rat: 92,
    stats: { rit: 93, tir: 92, pas: 85, reg: 90, def: 55, fis: 86 },
    icon: '🔥',
    photo: '',
    cardType: 'gold_special',
    playstyle: 'Paso Rápido +',
    preferredFoot: 'Derecha',
    desc: 'Atacante desequilibrante, velocidad pura por banda y bombazos cruzados inatajables.',
    goalsThisSeason: 14,
    assistsThisSeason: 11
  },
  {
    id: 'p-percu',
    name: 'Percu',
    nickname: 'PERCU',
    number: 5,
    position: 'MED',
    role: 'Medio Campo / Especialista Táctico',
    rat: 92,
    stats: { rit: 88, tir: 87, pas: 91, reg: 89, def: 90, fis: 93 },
    icon: '⚔️',
    photo: '',
    cardType: 'gold_special',
    playstyle: 'Presión Férrea +',
    preferredFoot: 'Derecha',
    desc: 'Especialista en presión alta, recuperación física de balón y distribución limpia hacia los pívots.',
    goalsThisSeason: 4,
    assistsThisSeason: 9
  },
  {
    id: 'p-aaron',
    name: 'Aaron',
    nickname: 'AARON',
    number: 4,
    position: 'CIE',
    role: 'Cierre / Muro Defensivo',
    rat: 92,
    stats: { rit: 86, tir: 80, pas: 85, reg: 82, def: 94, fis: 92 },
    icon: '🛡️',
    photo: '',
    cardType: 'gold_special',
    playstyle: 'Anticipación +',
    preferredFoot: 'Derecha',
    desc: 'Muro defensivo impenetrable. Proyección al ataque con potencia y remates de larga distancia.',
    goalsThisSeason: 5,
    assistsThisSeason: 6
  },
  {
    id: 'p-raul',
    name: 'Raúl',
    nickname: 'RAÚL',
    number: 1,
    position: 'POR',
    role: 'Portero Titular / El Felino',
    rat: 92,
    stats: { rit: 89, tir: 42, pas: 85, reg: 76, def: 94, fis: 90 }, // est, par, saq, ref, vel, pos
    icon: '🧤',
    photo: '',
    cardType: 'gold_special',
    playstyle: 'Reflejos Felinos +',
    preferredFoot: 'Derecha',
    desc: 'Reflejos felinos bajo los tres palos, achique impecable y salidas rápidas de contragolpe.',
    goalsThisSeason: 0,
    assistsThisSeason: 4
  }
];

export const INITIAL_BENCH: Player[] = [
  {
    id: 'p-jhondeiber',
    name: 'Jhondeiber',
    nickname: 'JHONDEIBER',
    number: 11,
    position: 'ALA',
    role: 'Ala / Revulsivo Explosivo',
    rat: 92,
    stats: { rit: 95, tir: 89, pas: 86, reg: 93, def: 65, fis: 85 },
    icon: '🚀',
    photo: '',
    cardType: 'gold_special',
    playstyle: 'Acrobático +',
    preferredFoot: 'Izquierda',
    desc: 'Velocidad explosiva y desborde electrizante para encender los ataques en momentos decisivos.',
    goalsThisSeason: 8,
    assistsThisSeason: 6
  },
  {
    id: 'p-josue',
    name: 'Josué',
    nickname: 'JOSUÉ',
    number: 10,
    position: 'MED',
    role: 'Medio / Organizador y Visión',
    rat: 92,
    stats: { rit: 88, tir: 87, pas: 95, reg: 93, def: 72, fis: 82 },
    icon: '🎯',
    photo: '',
    cardType: 'gold_special',
    playstyle: 'Pase Incisivo +',
    preferredFoot: 'Ambidiestro',
    desc: 'Cerebro del equipo en el centro. Visión de juego privilegiada y pausas de maestro.',
    goalsThisSeason: 9,
    assistsThisSeason: 19
  },
  {
    id: 'p-gerardo',
    name: 'Gerardo',
    nickname: 'GERARDO',
    number: 12,
    position: 'POR',
    role: 'Portero / Capitán Histórico',
    rat: 92,
    stats: { rit: 87, tir: 40, pas: 88, reg: 72, def: 93, fis: 89 },
    icon: '👑',
    photo: '',
    cardType: 'gold_special',
    playstyle: 'Liderazgo +',
    preferredFoot: 'Derecha',
    desc: 'Liderazgo vocal, saques precisos desde el área y temple de acero en finales.',
    goalsThisSeason: 0,
    assistsThisSeason: 3
  }
];

export const FORMATIONS: Record<FormationKey, FormationConfig> = {
  '2-2': {
    name: '2-2 Cuadrado Táctico',
    description: 'Equilibrio simétrico: dos atacantes arriba y dos defensas abajo.',
    slots: [
      { role: 'Pívot Izquierdo', position: 'PIV', coords: { top: 20, left: 32 } },
      { role: 'Pívot Derecho', position: 'PIV', coords: { top: 20, left: 68 } },
      { role: 'Medio / Conector', position: 'MED', coords: { top: 50, left: 50 } },
      { role: 'Cierre Central', position: 'CIE', coords: { top: 72, left: 50 } },
      { role: 'Portero', position: 'POR', coords: { top: 88, left: 50 } }
    ]
  },
  '1-2-1': {
    name: '1-2-1 Rombo Clásico',
    description: 'La formación reina del fútbol sala. Circulación veloz por bandas.',
    slots: [
      { role: 'Pívot Referencia', position: 'PIV', coords: { top: 18, left: 50 } },
      { role: 'Ala Derecha', position: 'PIV', coords: { top: 40, left: 78 } },
      { role: 'Ala Izquierda', position: 'MED', coords: { top: 40, left: 22 } },
      { role: 'Cierre Organizador', position: 'CIE', coords: { top: 68, left: 50 } },
      { role: 'Portero', position: 'POR', coords: { top: 88, left: 50 } }
    ]
  },
  '1-1-2': {
    name: '1-1-2 Y Ofensiva (Presión Total)',
    description: 'Presión alta de dos delanteros para asfixiar la salida rival.',
    slots: [
      { role: 'Pívot Presión Izq', position: 'PIV', coords: { top: 16, left: 28 } },
      { role: 'Pívot Presión Der', position: 'PIV', coords: { top: 16, left: 72 } },
      { role: 'Volante Tapón', position: 'MED', coords: { top: 46, left: 50 } },
      { role: 'Líbero Último Hombre', position: 'CIE', coords: { top: 70, left: 50 } },
      { role: 'Portero', position: 'POR', coords: { top: 88, left: 50 } }
    ]
  },
  '2-1-1': {
    name: '2-1-1 Pirámide Defensiva',
    description: 'Bloque bajo impenetrable para contragolpear con letalidad.',
    slots: [
      { role: 'Pívot de Desahogo', position: 'PIV', coords: { top: 18, left: 50 } },
      { role: 'Medio Ofensivo', position: 'MED', coords: { top: 44, left: 50 } },
      { role: 'Lateral Cierre Izq', position: 'CIE', coords: { top: 66, left: 26 } },
      { role: 'Lateral Cierre Der', position: 'CIE', coords: { top: 66, left: 74 } },
      { role: 'Portero', position: 'POR', coords: { top: 88, left: 50 } }
    ]
  }
};

export const PLAYS_CATALOG: PlaySequence[] = [
  {
    id: 'play-pivots-one-two',
    title: 'Pared Rápida de Pívots (Franco ⚡ Henry)',
    subtext: 'Triangulación fulminante a un toque entre los dos atacantes y definición cruzada',
    scorerSlotIndex: 0,
    goalMotto: 'DUPLA LETAL EN EL ÁREA - MÁS HECHOS QUE PALABRAS',
    steps: [
      {
        description: 'Percu recupera en el círculo central y toca de primera hacia Franco',
        ballTarget: { top: 38, left: 35 },
        playerMovements: [
          { slotIndex: 2, top: 48, left: 45 },
          { slotIndex: 0, top: 28, left: 36 }
        ],
        sound: 'pass',
        durationMs: 650
      },
      {
        description: 'Franco pivotea de espaldas y descarga rápido para Henry que pica al espacio',
        ballTarget: { top: 25, left: 62 },
        playerMovements: [
          { slotIndex: 1, top: 22, left: 64 },
          { slotIndex: 0, top: 16, left: 40 }
        ],
        sound: 'pass',
        durationMs: 700
      },
      {
        description: 'Henry devuelve la pared rasante al corazón del área para Franco',
        ballTarget: { top: 15, left: 42 },
        sound: 'pass',
        durationMs: 600
      },
      {
        description: '¡¡FRANCO DEFINE DE PRIMERA CON VOLEA CRUDA AL ÁNGULO SUPERIOR!!',
        ballTarget: { top: 2, left: 48 },
        sound: 'goal',
        durationMs: 900
      }
    ]
  },
  {
    id: 'play-percu-cannon',
    title: 'Misil de Media Distancia de Percu',
    subtext: 'Presión alta de Percu, robo de balón y zapatazo teledirigido',
    scorerSlotIndex: 2,
    goalMotto: 'GARRA, RECUPERACIÓN Y DISPARO IMPARABLE',
    steps: [
      {
        description: 'Percu presiona la salida rival y gana la pelota dividida con fuerza',
        ballTarget: { top: 44, left: 48 },
        playerMovements: [
          { slotIndex: 2, top: 44, left: 48 },
          { slotIndex: 0, top: 18, left: 26 },
          { slotIndex: 1, top: 18, left: 74 }
        ],
        sound: 'kick',
        durationMs: 650
      },
      {
        description: 'Los pívots abren la defensa jalando marcas a los costados',
        ballTarget: { top: 36, left: 50 },
        playerMovements: [
          { slotIndex: 2, top: 36, left: 50 }
        ],
        sound: 'pass',
        durationMs: 600
      },
      {
        description: '¡¡PERCU ACOMODA EL PERFIL Y REVIENTA EL ARCO CON UN ZAPATAZO INATAJABLE!!',
        ballTarget: { top: 2, left: 52 },
        sound: 'goal',
        durationMs: 900
      }
    ]
  },
  {
    id: 'play-aaron-counter',
    title: 'Recuperación y Contraataque Feroz de Aaron',
    subtext: 'El cierre corta un ataque rival y lidera la contra hasta reventar las redes',
    scorerSlotIndex: 3,
    goalMotto: 'EL MURO DEFENSIVO TAMBIÉN TIENE DINAMITA',
    steps: [
      {
        description: 'Aaron intercepta de cabeza en la frontal del área propia',
        ballTarget: { top: 76, left: 50 },
        playerMovements: [
          { slotIndex: 3, top: 74, left: 50 }
        ],
        sound: 'kick',
        durationMs: 600
      },
      {
        description: 'Aaron conduce a toda velocidad superando dos líneas de presión',
        ballTarget: { top: 48, left: 54 },
        playerMovements: [
          { slotIndex: 3, top: 48, left: 54 },
          { slotIndex: 1, top: 20, left: 72 }
        ],
        sound: 'pass',
        durationMs: 700
      },
      {
        description: 'Amaga el pase a banda y suelta un bombazo de derecha que rompe el travesaño',
        ballTarget: { top: 2, left: 49 },
        playerMovements: [
          { slotIndex: 3, top: 36, left: 50 }
        ],
        sound: 'goal',
        durationMs: 900
      }
    ]
  },
  {
    id: 'play-keeper-rush',
    title: 'Jugada Maestra: Portero-Jugador (Raúl)',
    subtext: 'Raúl se suma al ataque como 5to hombre y pone la asistencia dorada para Henry',
    scorerSlotIndex: 1,
    goalMotto: 'ESTRATEGIA TOTAL DE 5 HOMBRES - SUPERIORIDAD NUMÉRICA',
    steps: [
      {
        description: 'Raúl sale jugando con los pies y adelanta líneas hasta mitad de cancha',
        ballTarget: { top: 62, left: 48 },
        playerMovements: [
          { slotIndex: 4, top: 62, left: 48 },
          { slotIndex: 3, top: 76, left: 34 }
        ],
        sound: 'pass',
        durationMs: 750
      },
      {
        description: 'Raúl triangula con Percu que arrastra marcas rivales al centro',
        ballTarget: { top: 42, left: 38 },
        playerMovements: [
          { slotIndex: 2, top: 42, left: 38 },
          { slotIndex: 4, top: 50, left: 52 }
        ],
        sound: 'pass',
        durationMs: 700
      },
      {
        description: 'Percu devuelve para Raúl que mete un pase de tres dedos al segundo palo',
        ballTarget: { top: 20, left: 70 },
        playerMovements: [
          { slotIndex: 1, top: 20, left: 70 }
        ],
        sound: 'pass',
        durationMs: 650
      },
      {
        description: '¡¡HENRY ENTRA EN CARRERA Y LA CLAVA DE TIJERA EN LAS REDES!!',
        ballTarget: { top: 2, left: 51 },
        sound: 'goal',
        durationMs: 900
      }
    ]
  },
  {
    id: 'play-free-kick',
    title: 'Tiro Libre Directo con Comba de Franco',
    subtext: 'Falta al borde del área: disparo con efecto sobre la barrera al ángulo',
    scorerSlotIndex: 0,
    goalMotto: 'TIRO LIBRE DE DIBUJO ANIMADO - PRECISIÓN MILIMÉTRICA',
    steps: [
      {
        description: 'Franco se para frente al balón, mide la barrera rival y escucha el silbato',
        ballTarget: { top: 32, left: 50 },
        playerMovements: [
          { slotIndex: 0, top: 34, left: 46 },
          { slotIndex: 2, top: 40, left: 30 },
          { slotIndex: 1, top: 24, left: 72 }
        ],
        sound: 'whistle',
        durationMs: 800
      },
      {
        description: 'Carrera corta de Franco con golpe de empeine interior con efecto comba',
        ballTarget: { top: 18, left: 42 },
        sound: 'kick',
        durationMs: 600
      },
      {
        description: '¡¡EL BALÓN SUPERA LA BARRERA Y BAJA DE GOLPE EN LA ESCUADRA SUPERIOR!!',
        ballTarget: { top: 2, left: 47 },
        sound: 'goal',
        durationMs: 950
      }
    ]
  },
  {
    id: 'play-henry-winger',
    title: 'Desborde Eléctrico y Cañón de Henry',
    subtext: 'Bicicleta por la banda derecha y misil cruzado al segundo palo',
    scorerSlotIndex: 1,
    goalMotto: 'VELOCIDAD Y PEGADA PURA - INALCANZABLE',
    steps: [
      {
        description: 'Percu filtra para Henry que encara por la banda derecha',
        ballTarget: { top: 42, left: 74 },
        playerMovements: [
          { slotIndex: 1, top: 42, left: 74 }
        ],
        sound: 'pass',
        durationMs: 650
      },
      {
        description: 'Henry tira la diagonal a toda velocidad recortando al defensor',
        ballTarget: { top: 24, left: 62 },
        playerMovements: [
          { slotIndex: 1, top: 24, left: 62 },
          { slotIndex: 0, top: 16, left: 36 }
        ],
        sound: 'pass',
        durationMs: 650
      },
      {
        description: '¡¡BOMBAZO CRUZADO DE HENRY QUE REVIENTA EL POSTE Y ENTRA!!',
        ballTarget: { top: 2, left: 52 },
        sound: 'goal',
        durationMs: 900
      }
    ]
  }
];
