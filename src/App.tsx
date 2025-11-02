import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import GameScreen from './components/GameScreen';
import { GameState, SpinResult, Opponent } from './types';
import { getInitialGameState, processSpinResult, processBuild, processRaid, processAttack } from './services/gameLogic';

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
                <p>🌀 Spin to win Star Kibble and other rewards.</p>
                <p>🏗️ Use Kibble to build up your planets.</p>
                <p>🎾 Attack rivals to earn big bonuses.</p>
                <p>💧 Raid rivals to steal a portion of their Kibble.</p>
                <p>🛡️ Shields protect you from attacks!</p>
            </div>
        </div>
    </Modal>
);

// --- Shop Modal ---
interface ShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (item: 'kibble' | 'spins', amount: number) => void;
}
const ShopItem: React.FC<{ icon: string, title: string, description: string, onClick: () => void }> = ({ icon, title, description, onClick }) => (
    <button onClick={onClick} className="w-full flex items-center gap-4 p-3 bg-space-dark/60 rounded-lg text-left hover:bg-sky-500/30 transition-colors">
        <span className="text-4xl">{icon}</span>
        <div>
            <p className="font-bold text-lg text-white">{title}</p>
            <p className="text-sm text-slate-400">{description}</p>
        </div>
        <div className="ml-auto text-center px-4 py-2 bg-green-600 rounded-lg font-bold">
            Buy
        </div>
    </button>
);
const ShopModal: React.FC<ShopModalProps> = ({ isOpen, onClose, onPurchase }) => (
    <Modal title="Galactic Market" isOpen={isOpen} onClose={onClose}>
        <div className="space-y-3">
            <ShopItem icon="🍖" title="Bag of Kibble" description="+50,000 Star Kibble" onClick={() => onPurchase('kibble', 50000)} />
            <ShopItem icon="🍗" title="Crate of Kibble" description="+300,000 Star Kibble" onClick={() => onPurchase('kibble', 300000)} />
            <ShopItem icon="🌀" title="Spin Pack" description="+10 Spins" onClick={() => onPurchase('spins', 10)} />
            <ShopItem icon="💫" title="Spin Bundle" description="+50 Spins" onClick={() => onPurchase('spins', 50)} />
        </div>
        <p className="text-xs text-slate-500 mt-4">This is a simulation. No real money will be charged.</p>
    </Modal>
);

// --- Daily Reward Modal ---
interface DailyRewardModalProps {
  isOpen: boolean;
  onClaim: () => void;
}
const DailyRewardModal: React.FC<DailyRewardModalProps> = ({ isOpen, onClaim }) => (
    <Modal title="Daily Bonus!" isOpen={isOpen} onClose={() => {}} hideCloseButton>
      <div className="flex flex-col items-center gap-4">
        <p className="text-lg text-slate-300">Welcome back, space explorer! Here's a reward for logging in today.</p>
        <div className="text-4xl p-6 bg-space-dark/60 rounded-xl">
          🌀 +5 Spins
        </div>
        <button 
          onClick={onClaim}
          className="w-full py-3 font-bold text-xl rounded-lg shadow-lg bg-green-600 hover:bg-green-500 active:scale-95 transition-all"
        >
          Claim Reward
        </button>
      </div>
    </Modal>
);


// --- Main App Component ---
const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    try {
      const savedState = localStorage.getItem(GAME_STATE_KEY);
      return savedState ? JSON.parse(savedState) : getInitialGameState();
    } catch (error) {
      console.error("Could not load game state from localStorage", error);
      return getInitialGameState();
    }
  });

  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isShopOpen, setShopOpen] = useState(false);
  const [isDailyRewardOpen, setDailyRewardOpen] = useState(false);

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

  const onAction = (opponent: Opponent) => {
    let result;
    if (gameState.gamePhase === 'raiding') {
      result = processRaid(gameState, opponent);
    } else if (gameState.gamePhase === 'attacking') {
      result = processAttack(gameState, opponent);
    } else {
      return;
    }
    setGameState(result.newState);
    addLog(result.logMessage);
  };

  const onActionClose = () => {
    setGameState(prevState => ({ ...prevState, gamePhase: 'spinning' }));
  };
  
  const onPurchase = (item: 'kibble' | 'spins', amount: number) => {
    // In a real app, this would involve a payment gateway.
    let logMessage = '';
    setGameState(prevState => {
        const newState = {...prevState};
        if (item === 'kibble') {
            newState.kibble += amount;
            logMessage = `Purchased ${amount.toLocaleString()} Star Kibble!`;
        } else if (item === 'spins') {
            newState.spins += amount;
            logMessage = `Purchased ${amount} spins!`;
        }
        return newState;
    });
    addLog(logMessage);
    setShopOpen(false);
  };

  const onClaimDailyReward = () => {
    const today = new Date().toISOString().split('T')[0];
    setGameState(prevState => ({
      ...prevState,
      spins: prevState.spins + 5,
      lastDailyReward: today,
    }));
    addLog("🎁 Daily reward claimed: +5 spins!");
    setDailyRewardOpen(false);
  };

  // Effect to check for daily reward on load
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (gameState.lastDailyReward !== today) {
      setDailyRewardOpen(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

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

  // Effect to simulate attacks on the player
  useEffect(() => {
    const attackInterval = setInterval(() => {
      if (Math.random() < 0.15) {
        setGameState(prevState => {
          if (prevState.gamePhase !== 'spinning') return prevState; // Don't attack during actions
          const attacker = prevState.opponents[Math.floor(Math.random() * prevState.opponents.length)];
          if (prevState.shields > 0) {
            addLog(`🛡️ ${attacker.name} tried to attack you, but your shield protected you!`);
            return { ...prevState, shields: prevState.shields - 1 };
          } else {
            const kibbleLost = Math.floor(prevState.kibble * 0.1);
            addLog(`⚔️ Oh no! ${attacker.name} attacked you and stole ${kibbleLost.toLocaleString()} kibble!`);
            return { ...prevState, kibble: prevState.kibble - kibbleLost };
          }
        });
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(attackInterval);
  }, [addLog]);


  return (
    <div className="bg-space-dark text-white min-h-screen font-sans">
      <Header 
        gameState={gameState} 
        onOpenShop={() => setShopOpen(true)}
        onOpenSettings={() => setSettingsOpen(true)}
      />
      <GameScreen
        gameState={gameState}
        onSpin={onSpin}
        onBuild={onBuild}
        onAction={onAction}
        onActionClose={onActionClose}
      />
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setSettingsOpen(false)} />
      <ShopModal isOpen={isShopOpen} onClose={() => setShopOpen(false)} onPurchase={onPurchase} />
      <DailyRewardModal 
        isOpen={isDailyRewardOpen} 
        onClaim={onClaimDailyReward}
      />
    </div>
  );
};

export default App;
