
import React from 'react';
import { Spot, Theme } from '../types';

interface SpotsTableProps {
  spots: Spot[];
  watchlist: string[];
  theme: Theme;
}

const SpotsTable: React.FC<SpotsTableProps> = ({ spots, watchlist, theme }) => {

  const isWatched = (call: string) => watchlist.includes(call.toUpperCase());

  return (
    <div className="overflow-x-auto h-80 overflow-y-scroll">
      <table className="min-w-full text-sm text-left">
        <thead className={`sticky top-0 ${theme.classes.split(' ')[0]} z-10`}>
          <tr>
            <th className="p-2">Time</th>
            <th className="p-2">Freq</th>
            <th className="p-2">DX Station</th>
            <th className="p-2">DXCC</th>
            <th className="p-2">Spotter</th>
            <th className="p-2 hidden md:table-cell">Comment</th>
          </tr>
        </thead>
        <tbody className="divide-y border-t border-slate-700">
          {spots.map(spot => (
            <tr 
                key={spot.id} 
                className={`transition-colors duration-300 ${isWatched(spot.dxCall) ? 'bg-yellow-500 bg-opacity-30' : 'hover:bg-slate-700/50'}`}
            >
              <td className="p-2 font-mono">{spot.timestamp.toLocaleTimeString()}</td>
              <td className="p-2 font-mono">{spot.freq}</td>
              <td className="p-2 font-bold">
                <a 
                  href={`https://www.qrz.com/db/${spot.dxCall}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  {spot.dxCall}
                </a>
              </td>
              <td className="p-2">{spot.dxcc.flag} {spot.dxcc.name}</td>
              <td className="p-2">{spot.spotterCall}</td>
              <td className="p-2 hidden md:table-cell italic text-slate-400">{spot.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SpotsTable;