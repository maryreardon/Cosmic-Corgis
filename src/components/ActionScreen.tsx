import React from 'react';
import { Opponent, GamePhase } from '../types';

interface ActionScreenProps {
  opponents: Opponent[];
  actionType: GamePhase;
  onSelectOpponent: (opponent: Opponent) => void;
  onClose: () => void;
}

const OpponentAvatar: React.FC<{ name: string }> = ({ name }) => {
    const corgiHead = (
        <>
            <path d="M 35 80 C 25 80, 20 60, 30 50 L 70 50 C 80 60, 75 80, 65 80 Z" fill="#d97706" />
            <path d="M 40 50 Q 50 40, 60 50" fill="#d97706" />
            <path d="M 30 50 L 25 30 L 40 45 Z" fill="#d97706" stroke="#854d0e" strokeWidth="1.5" />
            <path d="M 70 50 L 75 30 L 60 45 Z" fill="#d97706" stroke="#854d0e" strokeWidth="1.5" />
            <path d="M 38 78 C 35 70, 65 70, 62 78 Z" fill="#fef3c7" />
            <circle cx="42" cy="58" r="3" fill="#1e293b" />
            <circle cx="58" cy="58" r="3" fill="#1e293b" />
            <ellipse cx="50" cy="65" rx="4" ry="3" fill="#1e293b" />
        </>
    );

    let accessory;
    let mouth = <path d="M 45 72 Q 50 75, 55 72" stroke="#1e293b" strokeWidth="1.5" fill="none" strokeLinecap="round" />;
    
    switch (name) {
        case 'Admiral Fluffington':
            accessory = (
                <>
                    <path d="M 30 35 L 70 35 L 65 25 L 35 25 Z" fill="#0c4a6e" />
                    <path d="M 40 25 L 60 25 L 50 18 Z" fill="#facc15" />
                </>
            );
            break;
        case 'Sir Waggington':
            accessory = (
                <>
                    <rect x="35" y="15" width="30" height="20" fill="#1e293b" />
                    <rect x="30" y="35" width="40" height="5" fill="#1e293b" />
                    <circle cx="60" cy="58" r="7" fill="none" stroke="#facc15" strokeWidth="1.5" />
                    <line x1="67" y1="58" x2="75" y2="45" stroke="#facc15" strokeWidth="1" />
                </>
            );
            break;
        case 'Sergeant Scruffy':
            accessory = (
                <>
                    <path d="M 30 45 C 30 30, 70 30, 70 45 Z" fill="#14532d" />
                </>
            );
            mouth = <path d="M 45 72 Q 50 68, 55 72" stroke="#1e293b" strokeWidth="1.5" fill="none" strokeLinecap="round" />;
            break;
        default:
            accessory = null;
    }

    return (
        <div className="w-20 h-20 flex-shrink-0 mr-2">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
                <g transform="translate(0, 5)">
                    {corgiHead}
                    {mouth}
                </g>
                {accessory}
            </svg>
        </div>
    );
};


const ActionScreen: React.FC<ActionScreenProps> = ({ opponents, actionType, onSelectOpponent, onClose }) => {
  if (actionType === 'spinning') return null;

  const details = {
    raiding: {
      title: "Leave a Puddle... 💧",
      description: "Choose a rival to steal Star Kibble from!",
      icon: "🍖"
    },
    attacking: {
      title: "Play Fetch! 🎾",
      description: "Choose a rival's planet to attack for a Kibble reward!",
      icon: "💥"
    },
  };

  const currentDetails = details[actionType];

  return (
    <div className="w-full max-w-lg animate-fade-in">
      <div className="bg-space-light rounded-xl p-6 border-2 border-slate-500/50 shadow-2xl text-center">
        <h2 className="text-4xl font-display text-amber-300 tracking-wider">{currentDetails.title}</h2>
        <p className="mt-2 text-lg text-slate-300">{currentDetails.description}</p>
        <div className="mt-4 space-y-3">
          {opponents.map(opponent => (
            <button
              key={opponent.id}
              onClick={() => onSelectOpponent(opponent)}
              className="w-full flex items-center p-3 bg-space-dark/60 rounded-lg text-left hover:bg-sky-500/30 transition-colors"
            >
              <OpponentAvatar name={opponent.name} />
              <div className="flex-grow">
                <p className="font-bold text-lg text-white">{opponent.name}</p>
                <p className="text-sm text-slate-400">{opponent.planetName}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-amber-400">{opponent.kibble.toLocaleString()}</p>
                <p className="text-sm text-slate-400">Kibble</p>
              </div>
            </button>
          ))}
        </div>
         <button
          onClick={onClose}
          className="mt-4 text-sm text-slate-400 hover:text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ActionScreen;