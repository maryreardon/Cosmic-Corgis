import React from 'react';
import { GameState, SpinResult } from '../types';
import Spinner from './Spinner';
import PlanetView from './PlanetView';
import EventLog from './EventLog';

interface GameScreenProps {
  gameState: GameState;
  onSpin: (result: SpinResult) => void;
  onBuild: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ gameState, onSpin, onBuild }) => {
  return (
    <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center gap-8">
      <PlanetView gameState={gameState} onBuild={onBuild} />
      <Spinner onSpin={onSpin} disabled={gameState.spins <= 0} />
      <EventLog logs={gameState.eventLog} />
    </main>
  );
};

export default GameScreen;
