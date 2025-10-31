// Fix: Provide content for types.ts, defining shared types for the application.

export interface Building {
  name: string;
  cost: number;
  built: boolean;
}

export interface Planet {
  name: string;
  buildings: Building[];
}

export interface GameState {
  kibble: number;
  spins: number;
  maxSpins: number;
  shields: number;
  planets: Planet[];
  currentPlanetIndex: number;
}

export interface SpinResult {
  type: 'kibble' | 'big_kibble' | 'huge_kibble' | 'shield' | 'play_fetch' | 'leave_puddle';
  value?: number;
}
