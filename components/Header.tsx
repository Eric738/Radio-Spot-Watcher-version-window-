
import React from 'react';
import { Filter, Theme } from '../types';
import { BANDS, MODES } from '../data/mockData';
import Clock from './Clock';
import { SatelliteIcon, PaletteIcon } from './icons/Icons';

interface HeaderProps {
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  currentTheme: Theme;
}

const THEMES: Theme[] = [
    { name: 'Glacier', classes: 'bg-slate-100 text-slate-800 border-slate-300' },
    { name: 'Midnight', classes: 'bg-gray-900 text-gray-200 border-gray-700' },
    { name: 'Synthwave', classes: 'bg-black text-cyan-300 border-purple-500 font-mono' },
    { name: 'Forest', classes: 'bg-green-900 bg-opacity-90 text-green-100 border-green-700' },
    { name: 'Crimson', classes: 'bg-rose-950 text-rose-100 border-rose-800' },
];

const Header: React.FC<HeaderProps> = ({ filter, setFilter, setTheme, currentTheme }) => {
  return (
    <header className="bg-slate-900 text-white p-2 sm:p-4 shadow-lg sticky top-0 z-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <SatelliteIcon className="h-8 w-8 text-cyan-400" />
          <h1 className="text-xl sm:text-2xl font-bold tracking-wider">Radio Spot Watcher</h1>
          <span className="text-xs font-mono bg-cyan-500 text-slate-900 px-2 py-1 rounded-full">v2.96</span>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Filters */}
          <select
            value={filter.band}
            onChange={(e) => setFilter({ ...filter, band: e.target.value })}
            className="bg-slate-700 border border-slate-600 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <option>All</option>
            {BANDS.map(b => <option key={b.name} value={b.name}>{b.name}</option>)}
          </select>
          <select
            value={filter.mode}
            onChange={(e) => setFilter({ ...filter, mode: e.target.value })}
            className="bg-slate-700 border border-slate-600 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <option>All</option>
            {MODES.map(m => <option key={m} value={m}>{m}</option>)}
          </select>

          {/* Theme Switcher */}
          <div className="relative group">
            <button className="p-2 bg-slate-700 rounded-md hover:bg-slate-600 transition-colors">
              <PaletteIcon className="h-5 w-5" />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-600 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
              {THEMES.map(theme => (
                <button
                  key={theme.name}
                  onClick={() => setTheme(theme)}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-slate-700 ${currentTheme.name === theme.name ? 'text-cyan-400' : ''}`}
                >
                  {theme.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4 font-mono text-sm">
          <div>
            <span className="text-gray-400">UTC: </span>
            <Clock timezone="UTC" />
          </div>
          <div>
            <span className="text-gray-400">Local: </span>
            <Clock />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
