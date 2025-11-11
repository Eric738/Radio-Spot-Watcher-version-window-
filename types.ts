
export interface Spot {
  id: number;
  freq: string;
  dxCall: string;
  spotterCall: string;
  band: string;
  mode: string;
  dxcc: {
    name: string;
    flag: string;
  };
  dxLat: number;
  dxLon: number;
  spotterLat: number;
  spotterLon: number;
  timestamp: Date;
  comment: string;
}

export interface Filter {
  band: string;
  mode: string;
}

export interface DxccData {
    prefix: string;
    name: string;
    flag: string;
    lat: number;
    lon: number;
}

export interface Theme {
    name: string;
    classes: string;
}