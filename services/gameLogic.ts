// Fix: Provide content for gameLogic.ts, containing core game state manipulation functions.
import { GameState, SpinResult } from '../types';
import { INITIAL_PLANETS } from '../constants';

export const getInitialGameState = (): GameState => ({
  kibble: 1000,
  spins: 10,
  maxSpins: 10,
  shields: 1,
  planets: JSON.parse(JSON.stringify(INITIAL_PLANETS)), // Deep copy to avoid mutation
  currentPlanetIndex: 0,
});

export const handleSpinResult = (state: GameState, result: SpinResult): { newState: GameState; logMessage: string } => {
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
    case 'shield':
      if (newState.shields < 3) {
        newState.shields += 1;
        logMessage = 'You gained a shield! 🛡️';
      } else {
        logMessage = 'You found a shield, but you already have the max of 3!';
      }
      break;
    case 'play_fetch':
      logMessage = 'Play Fetch! Attack another player!';
      break;
    case 'leave_puddle':
      logMessage = 'Leave Puddle! Steal from another player!';
      break;
  }
  
  if (newState.spins > 0) {
    newState.spins -= 1;
  }

  return { newState, logMessage };
};

export const handleBuild = (state: GameState): { newState: GameState; logMessage: string } => {
    let newState = { ...state };
    let logMessage = '';
    
    const currentPlanet = newState.planets[newState.currentPlanetIndex];
    const nextBuilding = currentPlanet.buildings.find(b => !b.built);

    if (nextBuilding && newState.kibble >= nextBuilding.cost) {
        newState.kibble -= nextBuilding.cost;
        const buildingIndex = currentPlanet.buildings.findIndex(b => b.name === nextBuilding.name);
        if (buildingIndex !== -1) {
            // Create new arrays/objects for immutability
            const newPlanets = [...newState.planets];
            const newCurrentPlanet = {...newPlanets[newState.currentPlanetIndex]};
            const newBuildings = [...newCurrentPlanet.buildings];
            newBuildings[buildingIndex] = {...newBuildings[buildingIndex], built: true};
            newCurrentPlanet.buildings = newBuildings;
            newPlanets[newState.currentPlanetIndex] = newCurrentPlanet;
            newState.planets = newPlanets;
        }
        logMessage = `You built the ${nextBuilding.name} on ${currentPlanet.name}!`;
    } else if (nextBuilding) {
        logMessage = `Not enough Kibble to build ${nextBuilding.name}!`;
    } else {
        logMessage = `All buildings on ${currentPlanet.name} are complete!`;
    }

    return { newState, logMessage };
};
