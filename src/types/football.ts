export type Position = 'POR' | 'CIE' | 'ALA' | 'MED' | 'PIV';

export type CardType = 'gold_special' | 'toty_blue' | 'icon_legend' | 'fut_hero';

export interface PlayerStats {
  rit: number; // Ritmo / Estirada (GK)
  tir: number; // Tiro / Paradas (GK)
  pas: number; // Pase / Saque (GK)
  reg: number; // Regate / Reflejos (GK)
  def: number; // Defensa / Velocidad (GK)
  fis: number; // Físico / Posicionamiento (GK)
}

export interface Player {
  id: string;
  name: string;
  nickname: string;
  number: number;
  position: Position;
  role: string;
  rat: number; // OVR (80 - 99)
  stats: PlayerStats;
  icon: string;
  photo: string;
  cardType: CardType;
  playstyle: string;
  preferredFoot: 'Derecha' | 'Izquierda' | 'Ambidiestro';
  desc: string;
  goalsThisSeason?: number;
  assistsThisSeason?: number;
}

export type FormationKey = '1-2-1' | '2-2' | '2-1-1' | '1-1-2';

export interface PositionCoordinates {
  top: number;  // % from top of court (0 - 100)
  left: number; // % from left of court (0 - 100)
}

export interface FormationConfig {
  name: string;
  description: string;
  slots: {
    role: string;
    position: Position;
    coords: PositionCoordinates;
  }[];
}

export type CourtSurface = 'turf_pro' | 'parquet_blue' | 'street_urban';
export type CameraAngle = '3d' | '2d';

export interface PlaySequence {
  id: string;
  title: string;
  subtext: string;
  scorerSlotIndex: number;
  steps: {
    description: string;
    ballTarget: { top: number; left: number };
    playerMovements?: { slotIndex: number; top: number; left: number }[];
    sound: 'kick' | 'pass' | 'whistle' | 'post' | 'goal';
    durationMs: number;
  }[];
  goalMotto: string;
}
