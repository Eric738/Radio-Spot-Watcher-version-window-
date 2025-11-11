
import React from 'react';
import { StatusOnlineIcon, DatabaseIcon, RssIcon } from './icons/Icons';

interface StatusPanelProps {
  status: {
    isConnected: boolean;
    receivedCount: number;
    dxccLoaded: string;
  };
}

const StatusPanel: React.FC<StatusPanelProps> = ({ status }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/50 border border-slate-700 text-slate-300 p-2 sm:p-3 rounded-lg text-xs sm:text-sm shadow-md">
      <div className="flex items-center space-x-2">
        <StatusOnlineIcon className={`h-5 w-5 ${status.isConnected ? 'text-green-400 animate-pulse' : 'text-red-500'}`} />
        <span>Cluster: {status.isConnected ? 'Connected' : 'Disconnected'}</span>
      </div>
      <div className="flex items-center space-x-2">
        <RssIcon className="h-5 w-5 text-cyan-400" />
        <span>RX Spots: {status.receivedCount}</span>
      </div>
      <div className="flex items-center space-x-2">
        <DatabaseIcon className="h-5 w-5 text-purple-400" />
        <span>DXCC Loaded: {new Date(status.dxccLoaded).toLocaleString()}</span>
      </div>
       <div className="flex items-center space-x-2">
        <span className="text-slate-400">Last Update: {new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  );
};

export default StatusPanel;
