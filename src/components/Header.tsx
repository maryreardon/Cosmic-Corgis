import React from 'react';
import { GameState } from '../types';

interface HeaderProps {
  gameState: GameState;
  onOpenSettings: () => void;
}

const StatBox: React.FC<{ label: string; value: string | number; icon: string; bgColor: string; }> = ({ label, value, icon, bgColor }) => (
  <div className={`flex items-center gap-2 p-2 rounded-lg text-white ${bgColor} relative shadow-md`}>
    <span className="text-2xl">{icon}</span>
    <div>
      <div className="text-xs font-bold uppercase opacity-80">{label}</div>
      <div className="text-lg font-bold">{value}</div>
    </div>
  </div>
);

const Header: React.FC<HeaderProps> = ({ gameState, onOpenSettings }) => {
  const { kibble, spins, maxSpins } = gameState;

  return (
    <header className="bg-space-light/50 backdrop-blur-sm border-b-2 border-slate-500/50 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
             <h1 className="text-2xl sm:text-4xl font-display text-amber-300 tracking-wider" style={{textShadow: '2px 2px #000'}}>
                Cosmic Corgis
             </h1>
             <button onClick={onOpenSettings} className="text-2xl sm:text-3xl hover:opacity-80 transition-opacity active:scale-90" aria-label="Open Settings">⚙️</button>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <StatBox label="Kibble" value={kibble.toLocaleString()} icon="🍖" bgColor="bg-amber-500/80" />
            <StatBox label="Spins" value={`${spins}/${maxSpins}`} icon="🌀" bgColor="bg-sky-500/80" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
