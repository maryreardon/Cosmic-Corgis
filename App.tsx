import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import GameScreen from './components/GameScreen';
import { GameState, SpinResult, Opponent } from './types';
import { getInitialGameState, processSpinResult, processBuild, processRaid, processAttack } from './services/gameLogic';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(getInitialGameState());

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
      // 15% chance to be attacked every 10 seconds
      if (Math.random() < 0.15) {
        setGameState(prevState => {
          const attacker = prevState.opponents[Math.floor(Math.random() * prevState.opponents.length)];
          if (prevState.shields > 0) {
            addLog(`🛡️ ${attacker.name} tried to attack you, but your shield protected you!`);
            return { ...prevState, shields: prevState.shields - 1 };
          } else {
            const kibbleLost = Math.floor(prevState.kibble * 0.1); // Lose 10% of kibble
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
      <Header gameState={gameState} />
      <GameScreen
        gameState={gameState}
        onSpin={onSpin}
        onBuild={onBuild}
        onAction={onAction}
        onActionClose={onActionClose}
      />
    </div>
  );
};

export default App;
