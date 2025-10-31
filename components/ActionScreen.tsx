import React from 'react';
import { Opponent, GamePhase } from '../types';

interface ActionScreenProps {
  opponents: Opponent[];
  actionType: GamePhase;
  onSelectOpponent: (opponent: Opponent) => void;
  onClose: () => void;
}

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
              className="w-full flex items-center justify-between p-3 bg-space-dark/60 rounded-lg text-left hover:bg-sky-500/30 transition-colors"
            >
              <div>
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
