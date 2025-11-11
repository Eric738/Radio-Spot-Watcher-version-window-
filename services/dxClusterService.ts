
import { Spot, DxccData } from '../types';
import { BANDS, MODES, CALLSIGNS, COMMENTS } from '../data/mockData';
import { dxccEntries } from '../data/dxccData';
import { getDxccForCallsign } from './dxccService';

const getRandomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomCoord = (base: number, range: number) => base + (Math.random() - 0.5) * range;

class DXClusterService {
  private intervalId: number | null = null;

  start(onNewSpot: (spot: Omit<Spot, 'id' | 'timestamp' | 'dxcc'>) => void) {
    if (this.intervalId) {
      this.stop();
    }

    this.intervalId = window.setInterval(() => {
      const band = getRandomElement(BANDS);
      const dxCall = getRandomElement(CALLSIGNS);
      const dxccInfo = getDxccForCallsign(dxCall, dxccEntries as DxccData[]);
      
      let dxLat: number;
      let dxLon: number;

      if (dxccInfo && typeof dxccInfo.lat === 'number' && typeof dxccInfo.lon === 'number') {
        // Add some jitter to the country's central coordinates
        dxLat = getRandomCoord(dxccInfo.lat, 10); // 10 degree range for variety
        dxLon = getRandomCoord(dxccInfo.lon, 10);
      } else {
        // Fallback to purely random coordinates if no DXCC info is found
        dxLat = getRandomCoord(20, 180);
        dxLon = getRandomCoord(0, 360) - 180;
      }

      const newSpot = {
        freq: `${(band.freq + Math.random() * (band.freq * 0.01)).toFixed(3)}`,
        dxCall: dxCall,
        spotterCall: getRandomElement(CALLSIGNS),
        band: band.name,
        mode: getRandomElement(MODES),
        dxLat: dxLat,
        dxLon: dxLon,
        spotterLat: getRandomCoord(40, 60),
        spotterLon: getRandomCoord(-40, 80),
        comment: getRandomElement(COMMENTS),
      };
      onNewSpot(newSpot);
    }, 7000); // Polling 7s per spec
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

export const dxClusterService = new DXClusterService();