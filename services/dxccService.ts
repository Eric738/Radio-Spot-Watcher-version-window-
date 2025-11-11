
import { DxccData } from '../types';

// Sort entries by prefix length descending to ensure longest match is found first
const sortDxccData = (data: DxccData[]): DxccData[] => {
    return [...data].sort((a, b) => b.prefix.length - a.prefix.length);
};

export const getDxccForCallsign = (callsign: string, dxccData: DxccData[]): DxccData | null => {
    const upperCallsign = callsign.toUpperCase();
    const sortedData = sortDxccData(dxccData);

    for (const entry of sortedData) {
        if (upperCallsign.startsWith(entry.prefix)) {
            return entry;
        }
    }
    return null;
};
