import React from 'react';
import { GameState, SpinResult, Opponent } from '../types';
import Spinner from './Spinner';
import PlanetView from './PlanetView';
import EventLog from './EventLog';
import ActionScreen from './ActionScreen';

interface GameScreenProps {
  gameState: GameState;
  onSpin: (result: SpinResult) => void;
  onBuild: () => void;
  onAction: (opponent: Opponent) => void;
  onActionClose: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ gameState, onSpin, onBuild, onAction, onActionClose }) => {
  return (
    <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center gap-8">
      {gameState.gamePhase === 'spinning' ? (
        <>
          <PlanetView gameState={gameState} onBuild={onBuild} />
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
