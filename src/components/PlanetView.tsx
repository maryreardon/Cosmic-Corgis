import React from 'react';
import { Corgi, GameState } from '../types';
import CorgiAvatar from './CorgiAvatar';

interface PlanetViewProps {
  gameState: GameState;
  onBuild: () => void;
}

const PlanetView: React.FC<PlanetViewProps> = ({ gameState, onBuild }) => {
  const currentPlanet = gameState.planets[gameState.currentPlanetIndex];
  const { rescuedCorgis, companionCorgiNames } = gameState;
  const nextBuilding = currentPlanet.buildings.find(b => !b.built);
  const buildingsComplete = currentPlanet.buildings.filter(b => b.built).length;
  const totalBuildings = currentPlanet.buildings.length;
  const planetComplete = buildingsComplete === totalBuildings;

  const canAfford = nextBuilding ? gameState.kibble >= nextBuilding.cost : false;

  // Show the companion corgis
  const companionCorgis = companionCorgiNames
    .map(name => rescuedCorgis.find(c => c.name === name))
    .filter((c): c is Corgi => c !== undefined);

  return (
    <div className="w-full max-w-lg animate-slide-up">
      <div className="bg-space-light/50 backdrop-blur-sm p-4 pt-0 rounded-xl border border-slate-600/50 text-center">
        
        {/* Corgi Display Area */}
        <div className="relative h-36">
            {/* Main Player Corgi */}
            <div className="absolute inset-0 flex justify-center items-center z-10">
                <CorgiAvatar isFloating={true} className="w-32 h-32" />
            </div>

            {/* Rescued Corgis */}
            {companionCorgis.length > 0 && (
                <div 
                    className="absolute bottom-0 left-4"
                    style={{ animation: `float 3.5s ease-in-out infinite 0.5s` }}
                >
                    <div className="group relative" title={companionCorgis[0].name}>
                        <CorgiAvatar className="w-20 h-20" />
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-max bg-black/70 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            {companionCorgis[0].name}
                        </div>
                    </div>
                </div>
            )}
            {companionCorgis.length > 1 && (
                 <div 
                    className="absolute bottom-0 right-4"
                    style={{ animation: `float 4s ease-in-out infinite 1s` }}
                >
                    <div className="group relative" title={companionCorgis[1].name}>
                        <CorgiAvatar className="w-20 h-20" />
                         <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-max bg-black/70 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            {companionCorgis[1].name}
                        </div>
                    </div>
                </div>
            )}
        </div>
        
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