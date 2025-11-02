export interface Building {
  name: string;
  cost: number;
  built: boolean;
  // FIX: Add corgi_rescue building type to support corgi rescue logic.
  type?: 'structure' | 'corgi_rescue';
}

export interface Planet {
  name: string;
  buildings: Building[];
}

// FIX: Add Opponent interface. This type was missing, causing an error in ActionScreen.tsx.
export interface Opponent {
    id: number;
    name: string;
    planetName: string;
    kibble: number;
}

// FIX: Add Corgi interface. This type was missing, causing an error in MyCorgisView.tsx.
export interface Corgi {
    name: string;
    bio: string;
}

// FIX: Extend GamePhase to include states for attacking and raiding.
export type GamePhase = 'spinning' | 'attacking' | 'raiding';

// FIX: Extend GameState to support all game features like shields, opponents, and corgis.
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
  companionCorgiNames: string[];
  lastDailyReward?: number;
}

// FIX: Extend SpinResult to include new reward types for shields and actions.
export interface SpinResult {
  type: 'kibble' | 'big_kibble' | 'huge_kibble' | 'shield' | 'play_fetch' | 'leave_puddle';
  value?: number;
}
