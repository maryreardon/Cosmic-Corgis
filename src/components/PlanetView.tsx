import React from 'react';
import { GameState } from '../types';
import CorgiAvatar from './CorgiAvatar';

interface PlanetViewProps {
  gameState: GameState;
  onBuild: () => void;
}

const PlanetView: React.FC<PlanetViewProps> = ({ gameState, onBuild }) => {
  const currentPlanet = gameState.planets[gameState.currentPlanetIndex];
  const nextBuilding = currentPlanet.buildings.find(b => !b.built);
  const buildingsComplete = currentPlanet.buildings.filter(b => b.built).length;
  const totalBuildings = currentPlanet.buildings.length;
  const planetComplete = buildingsComplete === totalBuildings;

  const canAfford = nextBuilding ? gameState.kibble >= nextBuilding.cost : false;

  return (
    <div className="w-full max-w-lg animate-slide-up">
      <div className="bg-space-light/50 backdrop-blur-sm p-4 pt-0 rounded-xl border border-slate-600/50 text-center">
        <CorgiAvatar isFloating={true} className="mb-2 w-32 h-32" />
        <h2 className="text-2xl font-bold text-white -mt-4">{currentPlanet.name}</h2>
        <span className="text-sm font-semibold bg-slate-700/50 px-3 py-1 rounded-full">{buildingsComplete}/{totalBuildings} Built</span>
        
        <div className="space-y-2 my-4 text-left">
          {currentPlanet.buildings.map((building) => (
            <div
              key={building.name}
              className={`flex justify-between items-center p-2 rounded transition-all ${building.built ? 'bg-green-500/30 text-slate-300' : 'bg-space-dark/50'}`}
            >
              <span>{building.built ? '✅' : (building.type === 'corgi_rescue' ? '🐾' : '🏗️')} {building.name}</span>
              <span className={`font-bold ${building.built ? 'line-through' : ''}`}>
                {building.cost.toLocaleString()} 🍖
              </span>
            </div>
          ))}
        </div>
        
        <button
          onClick={onBuild}
          disabled={!canAfford || planetComplete}
          className="w-full py-3 font-bold text-xl rounded-lg shadow-lg bg-green-600 hover:bg-green-500 active:scale-95 transition-all disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed disabled:active:scale-100"
        >
          {planetComplete ? 'Planet Complete! 🎉' : (
            nextBuilding ? `Build for ${nextBuilding.cost.toLocaleString()}` : 'Error'
          )}
        </button>
      </div>
    </div>
  );
};

export default PlanetView;