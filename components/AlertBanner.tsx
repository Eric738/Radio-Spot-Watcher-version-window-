
import React from 'react';
import { Spot } from '../types';
import { XIcon, MegaphoneIcon } from './icons/Icons';

interface AlertBannerProps {
  spot: Spot;
  onDismiss: () => void;
}

const AlertBanner: React.FC<AlertBannerProps> = ({ spot, onDismiss }) => {
  if (!spot) return null;

  return (
    <div className="bg-yellow-400 text-black p-3 rounded-lg shadow-lg flex items-center justify-between animate-fade-in">
      <div className="flex items-center gap-4">
        <MegaphoneIcon className="h-8 w-8 text-yellow-800" />
        <div>
          <p className="font-bold">WATCHLIST ALERT!</p>
          <p>
            <span className="font-mono font-semibold">{spot.dxCall}</span> spotted by {spot.spotterCall} on <span className="font-mono">{spot.band} ({spot.mode})</span>.
          </p>
        </div>
      </div>
      <button onClick={onDismiss} className="p-1 rounded-full hover:bg-yellow-500 transition-colors">
        <XIcon className="h-6 w-6" />
      </button>
    </div>
  );
};

export default AlertBanner;
