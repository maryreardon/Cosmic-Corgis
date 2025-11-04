import { GameState, SpinResult, Planet, Opponent } from '../types';
import { INITIAL_PLANETS, OPPONENTS_DATA } from '../constants';

export const getInitialGameState = (): GameState => ({
  kibble: 10000,
  spins: 10,
  maxSpins: 10,
  shields: 1,
  planets: JSON.parse(JSON.stringify(INITIAL_PLANETS)), // Deep copy
  currentPlanetIndex: 0,
  opponents: JSON.parse(JSON.stringify(OPPONENTS_DATA)), // Deep copy
  gamePhase: 'spinning',
  eventLog: ['Welcome to Cosmic Corgis! 🚀'],
  rescuedCorgis: [],
  companionCorgiNames: [],
  lastDailyReward: undefined,
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
    case 'shield':
      if (newState.shields < 3) {
        newState.shields += 1;
        logMessage = 'You gained a shield! 🛡️';
      } else {
        logMessage = 'You found a shield, but you already have the max of 3!';
      }
      break;
    case 'play_fetch':
      newState.gamePhase = 'attacking';
      logMessage = 'Play Fetch! Choose a rival to attack!';
      break;
    case 'leave_puddle':
      newState.gamePhase = 'raiding';
      logMessage = 'Leave Puddle! Choose a rival to steal from!';
      break;
  }
  
  if (newState.spins > 0) {
    newState.spins -= 1;
  }

  return { newState, logMessage };
};

export const processBuild = (state: GameState): { newState: GameState; logMessage: string | null; corgiToRescue: boolean; } => {
    let newState = { ...state };
    let logMessage: string | null = null;
    let corgiToRescue = false;
    
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
        
        if (nextBuilding.type === 'corgi_rescue') {
            corgiToRescue = true;
            logMessage += ' A rescue signal was sent! 📡';
        }

        const allBuilt = newPlanets[newState.currentPlanetIndex].buildings.every((b: { built: any; }) => b.built);
        if (allBuilt) {
            logMessage += ` 🎉 Planet complete! You've earned a bonus 500,000 Kibble!`;
            newState.kibble += 500000;
        }

    } else if (nextBuilding) {
        logMessage = `Not enough Kibble to build ${nextBuilding.name}!`;
    }

    return { newState, logMessage, corgiToRescue };
};


export const processRaid = (state: GameState, opponent: Opponent): { newState: GameState; logMessage: string } => {
  const kibbleStolen = Math.floor(opponent.kibble * 0.25); // Steal 25%
  const newState = {
    ...state,
    kibble: state.kibble + kibbleStolen,
    gamePhase: 'spinning' as const,
  };
  const logMessage = `💧 You left a puddle at ${opponent.planetName} and stole ${kibbleStolen.toLocaleString()} kibble from ${opponent.name}!`;
  return { newState, logMessage };
};

export const processAttack = (state: GameState, opponent: Opponent): { newState: GameState; logMessage: string } => {
  const kibbleWon = 50000;
  const newState = {
    ...state,
    kibble: state.kibble + kibbleWon,
    gamePhase: 'spinning' as const,
  };
  const logMessage = `🎾 You played fetch with ${opponent.name} at ${opponent.planetName} and won ${kibbleWon.toLocaleString()} kibble!`;
  return { newState, logMessage };
};
