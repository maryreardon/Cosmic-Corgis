import React, { useState, useRef } from 'react';
import { SpinResult } from '../types';
import { SPINNER_REWARDS } from '../constants';

interface SpinnerProps {
  onSpin: (result: SpinResult) => void;
  disabled: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ onSpin, disabled }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);

  const getRewardIcon = (type: SpinResult['type']) => {
    switch (type) {
      case 'kibble': return '🍖';
      case 'big_kibble': return '🥩';
      case 'huge_kibble': return '🍗';
      case 'shield': return '🛡️';
      case 'play_fetch': return '🎾';
      case 'leave_puddle': return '💧';
      default: return '❓';
    }
  };

  const handleSpinClick = () => {
    if (disabled || isSpinning) return;

    setIsSpinning(true);
    const randomIndex = Math.floor(Math.random() * SPINNER_REWARDS.length);
    const result = SPINNER_REWARDS[randomIndex];
    
    const wheel = wheelRef.current;
    if (wheel) {
        const segmentAngle = 360 / SPINNER_REWARDS.length;
        // Add multiple full rotations + targeted rotation
        const finalRotation = (360 * 5) - (randomIndex * segmentAngle) - (segmentAngle / 2);
        wheel.style.setProperty('--final-rotation', `${finalRotation}deg`);
        wheel.classList.remove('animate-spinner-spin');
        // A small delay to reflow the animation
        void wheel.offsetWidth; 
        wheel.classList.add('animate-spinner-spin');
    }
    
    onSpin(result);

    setTimeout(() => {
      setIsSpinning(false);
    }, 3000); // Animation duration
  };

  const segmentAngle = 360 / SPINNER_REWARDS.length;

  return (
    <div className="flex flex-col items-center gap-6">
        <div className="relative w-72 h-72 rounded-full border-8 border-amber-300 bg-space-light shadow-2xl">
            <div ref={wheelRef} className="w-full h-full rounded-full transition-transform duration-3000 ease-out">
                {SPINNER_REWARDS.map((reward, index) => (
                    <div 
                        key={index} 
                        className="absolute w-1/2 h-1/2 origin-bottom-right flex justify-center items-start pt-4 text-4xl"
                        style={{ transform: `rotate(${index * segmentAngle}deg)` }}
                    >
                        <span style={{ transform: `rotate(${segmentAngle/2}deg)`}}>
                           {getRewardIcon(reward.type)}
                        </span>
                    </div>
                ))}
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full"></div>
            <div 
                className="absolute -top-4 left-1/2 -translate-x-1/2 text-5xl"
                style={{ filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.5))'}}
            >
                🔻
            </div>
        </div>
        <button
            onClick={handleSpinClick}
            disabled={disabled || isSpinning}
            className="px-16 py-4 font-display text-4xl tracking-wider text-space-dark bg-amber-300 rounded-full shadow-lg border-4 border-amber-200 hover:bg-amber-400 active:scale-95 transition-all disabled:bg-slate-500 disabled:cursor-not-allowed disabled:active:scale-100"
            style={{textShadow: '1px 1px #fff'}}
        >
            {isSpinning ? 'Spinning...' : 'SPIN!'}
        </button>
    </div>
  );
};

export default Spinner;
