
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Spot, Filter, Theme, DxccData } from './types';
import { getDxccForCallsign } from './services/dxccService';
import { dxClusterService } from './services/dxClusterService';
import { dxccEntries } from './data/dxccData';
import useLocalStorage from './hooks/useLocalStorage';
import Header from './components/Header';
import StatusPanel from './components/StatusPanel';
import SpotsTable from './components/SpotsTable';
import DxMap from './components/DxMap';
import Charts from './components/Charts';
import Watchlist from './components/Watchlist';
import MostWanted from './components/MostWanted';
import RssTicker from './components/RssTicker';
import AlertBanner from './components/AlertBanner';

const MAX_SPOTS = 200;

export default function App() {
  const [spots, setSpots] = useLocalStorage<Spot[]>('spots_cache', []);
  const [watchlist, setWatchlist] = useLocalStorage<string[]>('watchlist', ['W1AW', 'VP8LP']);
  const [filter, setFilter] = useState<Filter>({ band: 'All', mode: 'All' });
  const [theme, setTheme] = useLocalStorage<Theme>('theme', { name: 'Glacier', classes: 'bg-slate-100 text-slate-800 border-slate-300' });
  const [status, setStatus] = useState({ isConnected: false, receivedCount: 0, dxccLoaded: '0' });
  const [watchedSpotAlert, setWatchedSpotAlert] = useState<Spot | null>(null);
  
  useEffect(() => {
    setStatus(prev => ({ ...prev, dxccLoaded: new Date().toISOString() }));
    
    const handleNewSpot = (newSpotData: Omit<Spot, 'id' | 'timestamp' | 'dxcc'>) => {
      const dxccInfo = getDxccForCallsign(newSpotData.dxCall, dxccEntries as DxccData[]);
      const newSpot: Spot = {
        ...newSpotData,
        id: Date.now() + Math.random(),
        timestamp: new Date(),
        dxcc: dxccInfo ? { name: dxccInfo.name, flag: dxccInfo.flag } : { name: 'Unknown', flag: '🏳️' },
      };

      if (watchlist.map(c => c.toUpperCase()).includes(newSpot.dxCall.toUpperCase())) {
        setWatchedSpotAlert(newSpot);
      }

      setSpots(prevSpots => [newSpot, ...prevSpots.slice(0, MAX_SPOTS - 1)]);
      setStatus(prev => ({ ...prev, receivedCount: prev.receivedCount + 1, isConnected: true }));
    };

    dxClusterService.start(handleNewSpot);

    return () => {
      dxClusterService.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchlist]); // Added watchlist to dependencies

  const filteredSpots = useMemo(() => {
    return spots.filter(spot => {
      const bandMatch = filter.band === 'All' || spot.band === filter.band;
      const modeMatch = filter.mode === 'All' || spot.mode === filter.mode;
      return bandMatch && modeMatch;
    });
  }, [spots, filter]);

  const addToWatchlist = useCallback((callsign: string) => {
    if (callsign && !watchlist.includes(callsign.toUpperCase())) {
      setWatchlist([...watchlist, callsign.toUpperCase()]);
    }
  }, [watchlist, setWatchlist]);

  const removeFromWatchlist = useCallback((callsign: string) => {
    setWatchlist(watchlist.filter(c => c !== callsign));
  }, [watchlist, setWatchlist]);

  const themeClasses = theme.classes.split(' ');
  const bgClass = themeClasses.find(c => c.startsWith('bg-')) || 'bg-slate-100';
  const textClass = themeClasses.find(c => c.startsWith('text-')) || 'text-slate-800';
  const fontClass = theme.classes.includes('font-mono') ? 'font-mono' : 'font-sans';
  const appClassName = `min-h-screen ${fontClass} ${bgClass} ${textClass} transition-colors duration-300`;

  return (
    <div className={appClassName}>
      <Header filter={filter} setFilter={setFilter} setTheme={setTheme} currentTheme={theme} />
      <main className="p-2 sm:p-4 space-y-4">
        {watchedSpotAlert && (
            <AlertBanner
              spot={watchedSpotAlert}
              onDismiss={() => setWatchedSpotAlert(null)}
            />
        )}
        <StatusPanel status={status} />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8 space-y-4">
            <div className={`p-4 rounded-lg shadow-lg border ${theme.classes}`}>
              <h2 className="text-xl font-bold mb-2">Live Spots</h2>
              <SpotsTable spots={filteredSpots} watchlist={watchlist} theme={theme} />
            </div>
            <div className={`h-96 lg:h-[500px] rounded-lg shadow-lg border overflow-hidden ${theme.classes}`}>
               <DxMap spots={filteredSpots.slice(0, 50)} />
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className={`p-4 rounded-lg shadow-lg border ${theme.classes}`}>
              <Charts spots={filteredSpots} theme={theme} />
            </div>
            <div className={`p-4 rounded-lg shadow-lg border ${theme.classes}`}>
              <Watchlist watchlist={watchlist} onAdd={addToWatchlist} onRemove={removeFromWatchlist} />
            </div>
            <div className={`p-4 rounded-lg shadow-lg border ${theme.classes}`}>
              <MostWanted />
            </div>
          </div>
        </div>
      </main>
      <RssTicker spots={spots} />
    </div>
  );
}
