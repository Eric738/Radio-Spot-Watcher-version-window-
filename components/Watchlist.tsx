
import React, { useState } from 'react';
import { TrashIcon, PlusCircleIcon } from './icons/Icons';

interface WatchlistProps {
  watchlist: string[];
  onAdd: (callsign: string) => void;
  onRemove: (callsign: string) => void;
}

const Watchlist: React.FC<WatchlistProps> = ({ watchlist, onAdd, onRemove }) => {
  const [newCall, setNewCall] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(newCall);
    setNewCall('');
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Watchlist</h2>
      <form onSubmit={handleAdd} className="flex gap-2 mb-2">
        <input
          type="text"
          value={newCall}
          onChange={(e) => setNewCall(e.target.value.toUpperCase())}
          placeholder="Add callsign..."
          className="flex-grow bg-slate-700 text-slate-200 border border-slate-600 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <button type="submit" className="bg-cyan-600 hover:bg-cyan-500 text-white p-2 rounded-md transition-colors">
          <PlusCircleIcon className="h-5 w-5" />
        </button>
      </form>
      <ul className="space-y-1 max-h-40 overflow-y-auto">
        {watchlist.map(call => (
          <li key={call} className="flex justify-between items-center bg-slate-700/50 p-2 rounded-md text-sm">
            <span className="font-mono">{call}</span>
            <button onClick={() => onRemove(call)} className="text-red-500 hover:text-red-400">
              <TrashIcon className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Watchlist;
