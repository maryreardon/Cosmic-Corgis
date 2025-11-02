import { SpinResult, Planet, Opponent } from './types';

export const SPINNER_REWARDS: SpinResult[] = [
  { type: 'kibble', value: 1000 },
  { type: 'kibble', value: 2500 },
  { type: 'big_kibble', value: 10000 },
  { type: 'shield' },
  { type: 'play_fetch' },
  { type: 'huge_kibble', value: 50000 },
  { type: 'leave_puddle' },
  { type: 'shield' },
];

export const INITIAL_PLANETS: Planet[] = [
    {
      name: "Corginia Prime",
      buildings: [
        { name: "Pawsome Pad", cost: 5000, built: false, type: 'structure' },
        { name: "Kibble Kitchen", cost: 15000, built: false, type: 'structure' },
        { name: "Rescue Beacon", cost: 40000, built: false, type: 'corgi_rescue' },
        { name: "Hydrant Fountain", cost: 100000, built: false, type: 'structure' },
        { name: "Astro-Corgi Pod", cost: 250000, built: false, type: 'corgi_rescue' },
      ],
    },
    // Future planets can be added here
];

export const OPPONENTS_DATA: Opponent[] = [
    { id: 1, name: "Admiral Fluffington", kibble: 25000, planetName: "Fort Bark" },
    { id: 2, name: "Sir Waggington", kibble: 78000, planetName: "The Kennel Klub" },
    { id: 3, name: "Sergeant Scruffy", kibble: 1500, planetName: "Dirtopia" },
];