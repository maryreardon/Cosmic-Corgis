import React from 'react';

interface CorgiAvatarProps {
    className?: string;
    isFloating?: boolean;
}

const CorgiAvatar: React.FC<CorgiAvatarProps> = ({ className = 'w-32 h-32', isFloating = false }) => (
    <div className={`relative mx-auto ${className} ${isFloating ? 'animate-float' : ''}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
            {/* Helmet Glass */}
            <circle cx="50" cy="45" r="28" fill="rgba(203, 213, 225, 0.7)" stroke="#94a3b8" strokeWidth="2" />
            
            {/* Corgi Head */}
            <g transform="translate(0, 5)">
                <path d="M 35 80 C 25 80, 20 60, 30 50 L 70 50 C 80 60, 75 80, 65 80 Z" fill="#d97706" />
                <path d="M 40 50 Q 50 40, 60 50" fill="#d97706" />
                
                {/* Ears */}
                <path d="M 30 50 L 25 30 L 40 45 Z" fill="#d97706" stroke="#854d0e" strokeWidth="1.5" />
                <path d="M 70 50 L 75 30 L 60 45 Z" fill="#d97706" stroke="#854d0e" strokeWidth="1.5" />
                
                {/* Face details */}
                <path d="M 38 78 C 35 70, 65 70, 62 78 Z" fill="#fef3c7" />
                
                {/* Eyes */}
                <circle cx="42" cy="58" r="3" fill="#1e293b" />
                <circle cx="58" cy="58" r="3" fill="#1e293b" />
                
                {/* Nose */}
                <ellipse cx="50" cy="65" rx="4" ry="3" fill="#1e293b" />

                {/* Mouth */}
                <path d="M 45 72 Q 50 75, 55 72" stroke="#1e293b" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </g>
        </svg>
    </div>
);

export default CorgiAvatar;