import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import GameScreen from './components/GameScreen';
import { GameState, SpinResult } from './types';
import { getInitialGameState, processSpinResult, processBuild } from './services/gameLogic';

const GAME_STATE_KEY = 'cosmicCorgisGameState';

// --- Reusable Modal Component ---
interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  hideCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, children, hideCloseButton }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-space-light w-full max-w-md rounded-2xl border-2 border-slate-500/50 shadow-2xl p-6 text-center animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-4xl font-display text-amber-300 tracking-wider mb-4">{title}</h2>
        {children}
        {!hideCloseButton && (
           <button
            onClick={onClose}
            className="mt-6 text-sm font-bold bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
};

// --- Settings Modal ---
interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const SettingsToggle: React.FC<{ label: string }> = ({ label }) => (
    <div className="flex justify-between items-center bg-space-dark/60 p-3 rounded-lg">
        <span className="font-bold">{label}</span>
        <div className="relative inline-block w-12 h-6 bg-slate-600 rounded-full">
            <input type="checkbox" className="absolute w-full h-full opacity-0 cursor-pointer peer" disabled/>
            <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></span>
        </div>
    </div>
);
const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => (
    <Modal title="Settings" isOpen={isOpen} onClose={onClose}>
        <div className="space-y-3 text-left">
            <SettingsToggle label="Sound FX" />
            <SettingsToggle label="Music" />
            <a 
                href="/privacy-policy.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full text-center p-3 bg-sky-600/80 hover:bg-sky-500/80 rounded-lg font-bold transition-colors"
            >
                Privacy Policy
            </a>
            <div className="bg-space-dark/60 p-3 rounded-lg text-sm text-slate-300">
                <h3 className="font-bold text-white mb-1">How to Play</h3>
                <p>🌀 Spin to win Star Kibble.</p>
                <p>🏗️ Use Kibble to build up your planets.</p>
                <p>🎉 Complete a planet for a big bonus!</p>
            </div>
        </div>
    </Modal>
);

// --- Main App Component ---
const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const initialState = getInitialGameState();
    try {
      const savedState = localStorage.getItem(GAME_STATE_KEY);
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        // Merge the saved state over the initial state. This ensures that if new
        // properties are added to the game state, old saves don't break the game.
        return { ...initialState, ...parsedState };
      }
      return initialState;
    } catch (error) {
      console.error("Could not load game state from localStorage. Resetting state.", error);
      // If parsing fails, the saved state is likely corrupt. Clear it.
      localStorage.removeItem(GAME_STATE_KEY);
      return initialState;
    }
  });

  const [isSettingsOpen, setSettingsOpen] = useState(false);

  // Save state on change
  useEffect(() => {
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(gameState));
  }, [gameState]);
  
  const addLog = useCallback((message: string) => {
    setGameState(prevState => ({
      ...prevState,
      eventLog: [message, ...prevState.eventLog.slice(0, 19)],
    }));
  }, []);

  const onSpin = (result: SpinResult) => {
    const { newState, logMessage } = processSpinResult(gameState, result);
    setGameState(newState);
    addLog(logMessage);
  };

  const onBuild = () => {
    const { newState, logMessage } = processBuild(gameState);
    setGameState(newState);
    if (logMessage) addLog(logMessage);
  };

  // Effect to add spins over time
  useEffect(() => {
    const spinInterval = setInterval(() => {
      setGameState(prevState => {
        if (prevState.spins < prevState.maxSpins) {
          return { ...prevState, spins: prevState.spins + 1 };
        }
        return prevState;
      });
    }, 60 * 1000); // 1 spin per minute

    return () => clearInterval(spinInterval);
  }, []);

  return (
    <div className="bg-space-dark text-white min-h-screen font-sans flex flex-col">
      <Header 
        gameState={gameState} 
        onOpenSettings={() => setSettingsOpen(true)}
      />
      <GameScreen
        gameState={gameState}
        onSpin={onSpin}
        onBuild={onBuild}
      />
      <footer className="text-center p-2 text-xs text-slate-400 flex justify-center items-center gap-x-3">
        <a href="/privacy-policy.html" target="_blank" rel="noopener noreferrer" className="hover:text-white underline">
          Privacy Policy
        </a>
        <span className="opacity-50">|</span>
        <a href="https://play.google.com/store/apps/details?id=com.cosmiccorgis.game" target="_blank" rel="noopener noreferrer" className="hover:text-white underline">
          Get on Google Play
        </a>
      </footer>
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
};

export default App;