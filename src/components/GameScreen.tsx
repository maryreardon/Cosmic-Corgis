import React, { useState } from 'react';
import { GameState, SpinResult, Opponent } from '../types';
import Spinner from './Spinner';
import PlanetView from './PlanetView';
import EventLog from './EventLog';
import ActionScreen from './ActionScreen';

// --- Leaderboard Component ---
const BUILDING_VALUE = 80000; // Estimate the value of a single built item

const Leaderboard: React.FC<{ gameState: GameState }> = ({ gameState }) => {
    const calculateNetWorth = (kibble: number, buildingsBuilt: number) => {
        return kibble + (buildingsBuilt * BUILDING_VALUE);
    };
    
    const playerBuildings = gameState.planets.reduce((total, planet) => {
        return total + planet.buildings.filter(b => b.built).length;
    }, 0);

    const playerData = {
        name: "You",
        netWorth: calculateNetWorth(gameState.kibble, playerBuildings),
        isPlayer: true,
    };

    // A simple mock for opponent buildings, in a real game this would be part of their state
    const opponentBuildings = [2, 4, 1]; 
    const opponentData = gameState.opponents.map((opp, i) => ({
        name: opp.name,
        netWorth: calculateNetWorth(opp.kibble, opponentBuildings[i]),
        isPlayer: false,
    }));
    
    const allPlayers = [playerData, ...opponentData].sort((a, b) => b.netWorth - a.netWorth);

    return (
        <div className="w-full max-w-lg animate-slide-up">
            <div className="bg-space-light/50 backdrop-blur-sm p-4 rounded-xl border border-slate-600/50">
                <h2 className="text-2xl font-bold text-center text-amber-300 mb-4">Galactic Rankings</h2>
                <div className="space-y-2">
                    {allPlayers.map((player, index) => (
                        <div key={player.name} className={`flex items-center p-2 rounded-lg ${player.isPlayer ? 'bg-sky-500/40 border-2 border-sky-400' : 'bg-space-dark/50'}`}>
                            <span className="font-bold text-lg w-8">{index + 1}.</span>
                            <span className="flex-grow font-semibold">{player.name}</span>
                            <span className="font-bold text-amber-400">{player.netWorth.toLocaleString()} 💰</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


interface GameScreenProps {
  gameState: GameState;
  onSpin: (result: SpinResult) => void;
  onBuild: () => void;
  onAction: (opponent: Opponent) => void;
  onActionClose: () => void;
}

type View = 'planet' | 'leaderboard';

const GameScreen: React.FC<GameScreenProps> = ({ gameState, onSpin, onBuild, onAction, onActionClose }) => {
  const [currentView, setCurrentView] = useState<View>('planet');
  
  const ViewToggle: React.FC = () => (
    <div className="flex justify-center bg-space-light p-1 rounded-full mb-4 shadow-lg">
      <button 
        onClick={() => setCurrentView('planet')}
        className={`px-6 py-2 rounded-full font-bold transition-colors ${currentView === 'planet' ? 'bg-sky-600 text-white' : 'text-slate-300 hover:bg-slate-600/50'}`}
      >
        Planet
      </button>
      <button 
        onClick={() => setCurrentView('leaderboard')}
        className={`px-6 py-2 rounded-full font-bold transition-colors ${currentView === 'leaderboard' ? 'bg-sky-600 text-white' : 'text-slate-300 hover:bg-slate-600/50'}`}
      >
        Rankings
      </button>
    </div>
  );

  return (
    <main className="flex-grow px-4 py-8 flex flex-col items-center gap-8">
      {gameState.gamePhase === 'spinning' ? (
        <>
          <ViewToggle />
          {currentView === 'planet' ? (
             <PlanetView gameState={gameState} onBuild={onBuild} />
          ) : (
            <Leaderboard gameState={gameState} />
          )}
          <Spinner onSpin={onSpin} disabled={gameState.spins <= 0} />
        </>
      ) : (
        <ActionScreen 
          opponents={gameState.opponents}
          actionType={gameState.gamePhase}
          onSelectOpponent={onAction}
          onClose={onActionClose}
        />
      )}
      <EventLog logs={gameState.eventLog} />
    </main>
  );
};

export default GameScreen;
