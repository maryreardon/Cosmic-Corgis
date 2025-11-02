import React from 'react';
import { Corgi } from '../types';
import CorgiAvatar from './CorgiAvatar';

const CorgiCard: React.FC<{ corgi: Corgi }> = ({ corgi }) => (
    <div className="bg-space-dark/60 p-4 rounded-lg text-center flex flex-col items-center gap-2 border border-slate-600">
        <CorgiAvatar className="w-24 h-24" />
        <h3 className="text-xl font-bold text-amber-300">{corgi.name}</h3>
        <p className="text-sm text-slate-300 flex-grow">"{corgi.bio}"</p>
    </div>
);

interface MyCorgisViewProps {
  corgis: Corgi[];
}

const MyCorgisView: React.FC<MyCorgisViewProps> = ({ corgis }) => {
  return (
    <div className="w-full max-w-lg animate-slide-up">
        <div className="bg-space-light/50 backdrop-blur-sm p-4 rounded-xl border border-slate-600/50">
            <h2 className="text-2xl font-bold text-center text-amber-300 mb-4">My Corgi Crew</h2>
            {corgis.length === 0 ? (
                <div className="text-center text-slate-400 p-8">
                    <p className="text-5xl mb-4">🐾</p>
                    <h3 className="text-xl font-bold text-white mb-2">Your Corgi Crew is Empty!</h3>
                    <p>Build <span className="font-bold text-amber-300">Rescue Beacons</span> and <span className="font-bold text-amber-300">Astro-Corgi Pods</span> on your planets to find new friends.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {corgis.map((corgi) => (
                        <CorgiCard key={corgi.name} corgi={corgi} />
                    ))}
                </div>
            )}
        </div>
    </div>
  );
};

export default MyCorgisView;