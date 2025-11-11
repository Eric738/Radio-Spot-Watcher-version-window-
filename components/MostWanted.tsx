
import React from 'react';

const mostWantedList = [
  { name: 'Bouvet Island', flag: '🇧🇻', prefix: '3Y0J' },
  { name: 'Crozet Island', flag: '🇹🇫', prefix: 'FT/W' },
  { name: 'North Korea', flag: '🇰🇵', prefix: 'P5' },
  { name: 'Scarborough Reef', flag: '🇨🇳', prefix: 'BS7H' },
  { name: 'Pr. Edward & Marion Is.', flag: '🇿🇦', prefix: 'ZS8' },
  { name: 'South Sandwich Is.', flag: '🇬🇸', prefix: 'VP8/S' },
  { name: 'Heard Island', flag: '🇭🇲', prefix: 'VK0/H' },
];

const MostWanted: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Most Wanted DXCC</h2>
      <ul className="space-y-1">
        {mostWantedList.map(dxcc => (
          <li key={dxcc.prefix} className="flex items-center space-x-3 text-sm p-1">
            <span className="text-lg">{dxcc.flag}</span>
            <span className="flex-grow">{dxcc.name}</span>
            <span className="font-mono text-cyan-400">{dxcc.prefix}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MostWanted;
