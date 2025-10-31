// Fix: Provide content for constants.ts, defining spinner rewards and initial planet data.
import { SpinResult, Planet } from './types';

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
        { name: "Pawsome Pad", cost: 5000, built: false },
        { name: "Kibble Kitchen", cost: 15000, built: false },
        { name: "Squeaky Toy Factory", cost: 40000, built: false },
        { name: "Hydrant Fountain", cost: 100000, built: false },
        { name: "Statue of the Great Corgi", cost: 250000, built: false },
      ],
    },
    // Future planets can be added here
];
