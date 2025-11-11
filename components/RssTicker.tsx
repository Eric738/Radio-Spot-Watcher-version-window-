
import React from 'react';
import { Spot } from '../types';

interface RssTickerProps {
  spots: Spot[];
}

const RssTicker: React.FC<RssTickerProps> = ({ spots }) => {
  const tickerText = spots.slice(0, 10).map(spot => 
    ` | ${spot.freq} ${spot.dxCall} spotted by ${spot.spotterCall}`
  ).join('');

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-yellow-400 h-8 flex items-center overflow-hidden whitespace-nowrap border-t-2 border-yellow-500">
        <style>
            {`
            @keyframes ticker {
                0% { transform: translateX(100%); }
                100% { transform: translateX(-100%); }
            }
            .animate-ticker {
                display: inline-block;
                padding-left: 100%;
                animation: ticker 60s linear infinite;
            }
            `}
        </style>
        <p className="animate-ticker font-mono">{tickerText}</p>
    </div>
  );
};

export default RssTicker;
