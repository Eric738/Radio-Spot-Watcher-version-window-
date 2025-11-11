
import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Spot, Theme } from '../types';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

interface ChartsProps {
  spots: Spot[];
  theme: Theme;
}

const chartColors = [
    '#8b5cf6', '#ec4899', '#f97316', '#10b981', '#3b82f6', '#f59e0b',
    '#ef4444', '#6366f1', '#d946ef', '#0ea5e9', '#14b8a6', '#84cc16'
];


const Charts: React.FC<ChartsProps> = ({ spots, theme }) => {
  const isDarkTheme = !theme.classes.includes('bg-slate-100') && !theme.classes.includes('bg-white') && !theme.classes.includes('bg-stone-200');
  const textColor = isDarkTheme ? '#cbd5e1' : '#475569'; // slate-300 or slate-600
  const gridColor = isDarkTheme ? 'rgba(203, 213, 225, 0.1)' : 'rgba(100, 116, 139, 0.2)';

  const doughnutChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
          legend: {
              position: 'top' as const,
              labels: {
                  color: textColor,
                  boxWidth: 12,
                  font: {
                      size: 10,
                  }
              },
          },
      },
      cutout: '60%',
  };

  const barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
          legend: {
              display: false,
          },
      },
      scales: {
          y: {
              beginAtZero: true,
              ticks: {
                  color: textColor,
                  stepSize: 1, // To avoid decimal ticks for counts
              },
              grid: {
                  color: gridColor,
              }
          },
          x: {
              ticks: {
                  color: textColor,
              },
              grid: {
                  display: false,
              }
          }
      }
  };

  const { bandData, modeData } = useMemo(() => {
    const bandCounts: { [key: string]: number } = {};
    const modeCounts: { [key: string]: number } = {};
    
    spots.forEach(spot => {
      bandCounts[spot.band] = (bandCounts[spot.band] || 0) + 1;
      modeCounts[spot.mode] = (modeCounts[spot.mode] || 0) + 1;
    });
    
    const sortedBands = Object.entries(bandCounts).sort(([,a],[,b]) => b-a);

    const bandData = {
      labels: sortedBands.map(item => item[0]),
      datasets: [{
        label: 'Spots by Band',
        data: sortedBands.map(item => item[1]),
        backgroundColor: chartColors.slice().reverse(),
        borderColor: isDarkTheme ? '#1e293b' : '#ffffff',
        borderWidth: 1,
        borderRadius: 4,
      }],
    };

    const modeData = {
      labels: Object.keys(modeCounts),
      datasets: [{
        label: 'Spots by Mode',
        data: Object.values(modeCounts),
        backgroundColor: chartColors,
        borderColor: isDarkTheme ? '#1e293b' : '#ffffff',
        borderWidth: 2,
      }],
    };
    
    return { bandData, modeData };
  }, [spots, isDarkTheme]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Activity</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-64">
        <div className="flex flex-col">
            <h3 className="text-center text-sm mb-2 text-slate-400">Modes</h3>
            <div className="relative flex-grow">
                <Doughnut data={modeData} options={doughnutChartOptions} />
            </div>
        </div>
        <div className="flex flex-col">
            <h3 className="text-center text-sm mb-2 text-slate-400">Bands</h3>
            <div className="relative flex-grow">
                <Bar data={bandData} options={barChartOptions} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
