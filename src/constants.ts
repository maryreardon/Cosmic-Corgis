import { SpinResult, Planet } from './types';

export const SPINNER_REWARDS: SpinResult[] = [
  { type: 'kibble', value: 1000 },
  { type: 'kibble', value: 2500 },
  { type: 'big_kibble', value: 10000 },
  { type: 'kibble', value: 5000 },
  { type: 'big_kibble', value: 20000 },
  { type: 'huge_kibble', value: 50000 },
  { type: 'kibble', value: 2500 },
  { type: 'big_kibble', value: 10000 },
];

export const INITIAL_PLANETS: Planet[] = [
    {
      name: "Corginia Prime",
      buildings: [
        { name: "Pawsome Pad", cost: 5000, built: false, type: 'structure' },
        { name: "Kibble Kitchen", cost: 15000, built: false, type: 'structure' },
        { name: "Comms Tower", cost: 40000, built: false, type: 'structure' },
        { name: "Hydrant Fountain", cost: 100000, built: false, type: 'structure' },
        { name: "Observatory", cost: 250000, built: false, type: 'structure' },
      ],
    },
    // Future planets can be added here
];
