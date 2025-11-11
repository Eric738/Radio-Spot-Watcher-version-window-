import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Spot } from '../types';

// Fix for default icon path issue with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});


interface DxMapProps {
  spots: Spot[];
}

const DxMap: React.FC<DxMapProps> = ({ spots }) => {
  const latestSpot = spots[0];
  const center: [number, number] = latestSpot ? [latestSpot.dxLat, latestSpot.dxLon] : [20, 0];

  return (
    <MapContainer center={center} zoom={2} scrollWheelZoom={true} className="h-full w-full bg-slate-700">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {spots.map((spot) => (
        <Marker key={spot.id} position={[spot.dxLat, spot.dxLon]}>
            <Popup>
              <b>DX: {spot.dxCall}</b> ({spot.band} / {spot.mode})<br />
              {spot.dxcc.flag} {spot.dxcc.name}<br />
              Freq: {spot.freq}<br />
              Spotted by: {spot.spotterCall}
            </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default DxMap;