// Fix: Provide content for App.tsx, the main component for the application.
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import GameScreen from './components/GameScreen';
import ActionScreen from './components/ActionScreen';
import { GameState, SpinResult } from './types';
import { getInitialGameState, handleSpinResult, handleBuild } from './services/gameLogic';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(getInitialGameState());
  const [logs, setLogs] = useState<string[]>(['Welcome to Cosmic Corgis!']);
  const [currentAction, setCurrentAction] = useState<SpinResult | null>(null);

  const addLog = (message: string) => {
    setLogs(prevLogs => [message, ...prevLogs.slice(0, 19)]); // Keep last 20 logs
  };

  const onSpin = (result: SpinResult) => {
    const { newState, logMessage } = handleSpinResult(gameState, result);
    setGameState(newState);
    addLog(logMessage);

    if (result.type === 'play_fetch' || result.type === 'leave_puddle') {
      // Delay showing the action screen to let the spinner finish animating
      setTimeout(() => {
        setCurrentAction(result);
      }, 500);
    }
  };
  
  const onBuild = () => {
    const { newState, logMessage } = handleBuild(gameState);
    setGameState(newState);
    addLog(logMessage);
  };

  const closeActionScreen = () => {
    setCurrentAction(null);
  };

  // Effect to add spins over time
  useEffect(() => {
    const interval = setInterval(() => {
      setGameState(prevState => {
        if (prevState.spins < prevState.maxSpins) {
          return { ...prevState, spins: prevState.spins + 1 };
        }
        return prevState;
      });
    }, 60 * 1000); // 1 spin per minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-space-dark text-white min-h-screen font-sans">
      <Header gameState={gameState} />
      <GameScreen 
        gameState={gameState} 
        logs={logs}
        onSpin={onSpin} 
        onBuild={onBuild} 
      />
      <ActionScreen action={currentAction} onClose={closeActionScreen} />
    </div>
  );
};

export default App;
