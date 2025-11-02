import React from 'react';
import { GameState } from '../types';

// --- New CorgiAstronaut Component ---
const CorgiAstronaut: React.FC = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 150 150"
      className="w-36 h-36 drop-shadow-lg animate-float"
      aria-label="A cute corgi wearing an astronaut helmet."
      role="img"
    >
      <g>
        {/* Helmet Glass */}
        <circle cx="75" cy="75" r="50" fill="#e0f2fe" opacity="0.5" />
  
        {/* Corgi Body */}
        <path d="M50,110 a25,25 0 0,1 50,0 Z" fill="#f97316" />
        {/* Front Paws */}
         <rect x="60" y="105" width="10" height="15" rx="5" fill="#ea580c" />
         <rect x="80" y="105" width="10" height="15" rx="5" fill="#ea580c" />
  
  
        {/* Corgi Head */}
        <circle cx="75" cy="75" r="35" fill="#fb923c" />
  
        {/* Ears */}
        <path d="M 50,45 L 65,30 L 70,50 Z" fill="#f97316" stroke="#ea580c" strokeWidth="2" />
        <path d="M 100,45 L 85,30 L 80,50 Z" fill="#f97316" stroke="#ea580c" strokeWidth="2" />
  
        {/* Muzzle */}
        <path
          d="M75,80 a15,12 0 0,1 0,15 a15,12 0 0,1 0,-15"
          transform="translate(0, -5)"
          fill="#fff"
        />
        
        {/* Eyes */}
        <circle cx="65" cy="70" r="4" fill="#27272a" />
        <circle cx="85" cy="70" r="4" fill="#27272a" />
  
        {/* Nose */}
        <circle cx="75" cy="82" r="3" fill="#27272a" />
        
         {/* Smile */}
        <path d="M 70 90 Q 75 95 80 90" stroke="#27272a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
  
        {/* Helmet Rim */}
        <circle
          cx="75"
          cy="75"
          r="50"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="5"
        />
      </g>
    </svg>
  );

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
      <div className="flex justify-center mb-4">
        <CorgiAstronaut />
      </div>
      <div className="bg-space-light/50 backdrop-blur-sm p-4 rounded-xl border border-slate-600/50">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-bold text-white">{currentPlanet.name}</h2>
          <span className="text-sm font-semibold bg-slate-700/50 px-3 py-1 rounded-full">{buildingsComplete}/{totalBuildings} Built</span>
        </div>

        <div className="space-y-2 mb-4">
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