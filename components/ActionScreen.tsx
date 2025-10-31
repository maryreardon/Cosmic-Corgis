// Fix: Provide content for ActionScreen.tsx component.
import React from 'react';
import { SpinResult } from '../types';

interface ActionScreenProps {
  action: SpinResult | null;
  onClose: () => void;
}

const ActionScreen: React.FC<ActionScreenProps> = ({ action, onClose }) => {
  if (!action) return null;

  const getActionDetails = () => {
    switch (action.type) {
      case 'play_fetch':
        return {
          title: 'Play Fetch! 🎾',
          description: "You get to attack another Corgi's planet! In a real game, you'd choose a target here.",
          buttonText: "Awesome!",
        };
      case 'leave_puddle':
        return {
          title: 'Leave a Puddle... 💧',
          description: "You get to steal Kibble from another Corgi! In a real game, you'd choose a victim here.",
          buttonText: "Hehe!",
        };
      default:
        return null;
    }
  };

  const details = getActionDetails();
  if (!details) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-space-light rounded-xl p-8 border-2 border-slate-500/50 shadow-2xl max-w-md text-center">
        <h2 className="text-4xl font-display text-amber-300 tracking-wider">{details.title}</h2>
        <p className="mt-4 text-lg text-white">{details.description}</p>
        <button
          onClick={onClose}
          className="mt-6 px-12 py-3 font-bold text-lg rounded-lg shadow-lg bg-sky-600 hover:bg-sky-500 active:scale-95 transition-all"
        >
          {details.buttonText}
        </button>
      </div>
    </div>
  );
};

export default ActionScreen;
