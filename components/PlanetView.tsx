import React from 'react';
import { GameState, Building } from '../types';

interface PlanetViewProps {
  gameState: GameState;
  onBuild: () => void;
}

const PlanetView: React.FC<PlanetViewProps> = ({ gameState, onBuild }) => {
    const { planets, currentPlanetIndex, kibble } = gameState;
    const currentPlanet = planets[currentPlanetIndex];
    const nextBuilding = currentPlanet.buildings.find(b => !b.built);
    const canBuild = nextBuilding && kibble >= nextBuilding.cost;
    const isPlanetComplete = !nextBuilding;

  return (
    <div className="w-full max-w-lg bg-space-light/70 backdrop-blur-sm rounded-xl p-6 border-2 border-slate-500/50 shadow-2xl">
        <h2 className="text-center text-3xl font-display text-amber-300 tracking-wider">
            {currentPlanet.name}
        </h2>
        
        <div className="mt-4 grid grid-cols-5 gap-4">
            {currentPlanet.buildings.map((building, index) => (
                <div key={index} className={`flex flex-col items-center p-2 rounded-lg transition-all ${building.built ? 'bg-green-500/50' : 'bg-slate-700/50'}`}>
                    <span className="text-4xl" style={{ filter: building.built ? 'none' : 'grayscale(100%) opacity(0.6)'}}>
                        {['🏠', '🦴', '📦', '💧', '🗿'][index]}
                    </span>
                    <p className="text-xs text-center text-white/80 mt-1 h-8">{building.name}</p>
                </div>
            ))}
        </div>
        
        <div className="mt-6">
            {isPlanetComplete ? (
                <div className="text-center p-4 bg-green-500/50 rounded-lg">
                    <p className="font-bold text-lg">Planet Complete!</p>
                    <p className="text-sm">Ready to warp to the next galaxy!</p>
                </div>
            ) : (
                <button
                    onClick={onBuild}
                    disabled={!canBuild}
                    className="w-full py-3 font-bold text-lg rounded-lg shadow-lg bg-green-600 hover:bg-green-500 active:scale-95 transition-all disabled:bg-slate-600 disabled:cursor-not-allowed disabled:text-slate-400"
                >
                    Build {nextBuilding.name} <br/> 
                    <span className="text-sm font-normal">(Cost: {nextBuilding.cost.toLocaleString()} 🍖)</span>
                </button>
            )}
        </div>
    </div>
  );
};

export default PlanetView;
