import React from 'react';
import { GameState } from '../types';

interface PlanetViewProps {
  gameState: GameState;
  onBuild: () => void;
}

const CorgiAvatar = () => (
    <div className="relative mx-auto mb-2 w-32 h-32 animate-float">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
            {/* Helmet Glass */}
            <circle cx="50" cy="45" r="28" fill="rgba(203, 213, 225, 0.7)" stroke="#94a3b8" strokeWidth="2" />
            
            {/* Corgi Head */}
            <g transform="translate(0, 5)">
                <path d="M 35 80 C 25 80, 20 60, 30 50 L 70 50 C 80 60, 75 80, 65 80 Z" fill="#d97706" />
                <path d="M 40 50 Q 50 40, 60 50" fill="#d97706" />
                
                {/* Ears */}
                <path d="M 30 50 L 25 30 L 40 45 Z" fill="#d97706" stroke="#854d0e" strokeWidth="1.5" />
                <path d="M 70 50 L 75 30 L 60 45 Z" fill="#d97706" stroke="#854d0e" strokeWidth="1.5" />
                
                {/* Face details */}
                <path d="M 38 78 C 35 70, 65 70, 62 78 Z" fill="#fef3c7" />
                
                {/* Eyes */}
                <circle cx="42" cy="58" r="3" fill="#1e293b" />
                <circle cx="58" cy="58" r="3" fill="#1e293b" />
                
                {/* Nose */}
                <ellipse cx="50" cy="65" rx="4" ry="3" fill="#1e293b" />

                {/* Mouth */}
                <path d="M 45 72 Q 50 75, 55 72" stroke="#1e293b" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </g>
        </svg>
    </div>
);


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
        <CorgiAvatar />
        <h2 className="text-2xl font-bold text-white -mt-4">{currentPlanet.name}</h2>
        <span className="text-sm font-semibold bg-slate-700/50 px-3 py-1 rounded-full">{buildingsComplete}/{totalBuildings} Built</span>
        
        <div className="space-y-2 my-4 text-left">
          {currentPlanet.buildings.map((building) => (
            <div
              key={building.name}
              className={`flex justify-between items-center p-2 rounded transition-all ${building.built ? 'bg-green-500/30 text-slate-300' : 'bg-space-dark/50'}`}
            >
              <span>{building.built ? '✅' : '🏗️'} {building.name}</span>
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