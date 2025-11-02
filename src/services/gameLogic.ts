import { GameState, SpinResult, Planet } from '../types';
import { INITIAL_PLANETS } from '../constants';

export const getInitialGameState = (): GameState => ({
  kibble: 10000,
  spins: 10,
  maxSpins: 10,
  planets: JSON.parse(JSON.stringify(INITIAL_PLANETS)), // Deep copy
  currentPlanetIndex: 0,
  gamePhase: 'spinning',
  eventLog: ['Welcome to Cosmic Corgis! 🚀'],
});

export const processSpinResult = (state: GameState, result: SpinResult): { newState: GameState; logMessage: string } => {
  let newState = { ...state };
  let logMessage = '';

  switch (result.type) {
    case 'kibble':
    case 'big_kibble':
    case 'huge_kibble':
      const amount = result.value || 0;
      newState.kibble += amount;
      logMessage = `You won ${amount.toLocaleString()} Star Kibble! 🍖`;
      break;
  }
  
  if (newState.spins > 0) {
    newState.spins -= 1;
  }

  return { newState, logMessage };
};

export const processBuild = (state: GameState): { newState: GameState; logMessage: string | null; } => {
    let newState = { ...state };
    let logMessage: string | null = null;
    
    const currentPlanet = newState.planets[newState.currentPlanetIndex];
    const nextBuilding = currentPlanet.buildings.find(b => !b.built);

    if (nextBuilding && newState.kibble >= nextBuilding.cost) {
        newState.kibble -= nextBuilding.cost;
        const buildingIndex = currentPlanet.buildings.findIndex(b => b.name === nextBuilding.name);
        
        // Deep copy for immutability
        const newPlanets = JSON.parse(JSON.stringify(newState.planets));
        newPlanets[newState.currentPlanetIndex].buildings[buildingIndex].built = true;
        newState.planets = newPlanets;
        
        logMessage = `You built the ${nextBuilding.name} on ${currentPlanet.name}!`;
        
        const allBuilt = newPlanets[newState.currentPlanetIndex].buildings.every((b: { built: any; }) => b.built);
        if (allBuilt) {
            logMessage += ` 🎉 Planet complete! You've earned a bonus 500,000 Kibble!`;
            newState.kibble += 500000;
        }

    } else if (nextBuilding) {
        logMessage = `Not enough Kibble to build ${nextBuilding.name}!`;
    }

    return { newState, logMessage };
};
