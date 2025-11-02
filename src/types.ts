export interface Corgi {
  name: string;
  bio: string;
}

export interface Building {
  name: string;
  cost: number;
  built: boolean;
  type?: 'structure' | 'corgi_rescue';
}

export interface Planet {
  name: string;
  buildings: Building[];
}

export interface Opponent {
  id: number;
  name: string;
  kibble: number;
  planetName: string;
}

export type GamePhase = 'spinning' | 'raiding' | 'attacking';

export interface GameState {
  kibble: number;
  spins: number;
  maxSpins: number;
  shields: number;
  planets: Planet[];
  currentPlanetIndex: number;
  opponents: Opponent[];
  gamePhase: GamePhase;
  eventLog: string[];
  rescuedCorgis: Corgi[];
  lastDailyReward?: string; // YYYY-MM-DD
}

export interface SpinResult {
  type: 'kibble' | 'big_kibble' | 'huge_kibble' | 'shield' | 'play_fetch' | 'leave_puddle';
  value?: number;
}