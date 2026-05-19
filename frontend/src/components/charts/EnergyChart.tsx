'use client';

import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TimeSeriesPoint } from '@/src/lib/mockData';
import { getHourlyData, getDailyData } from '@/src/lib/api';

interface EnergyChartProps {
  mode: "hourly" | "daily";
  onModeChange: (mode: "hourly" | "daily") => void;
}

export default function EnergyChart({ mode, onModeChange }: EnergyChartProps) {
  const [data, setData] = useState<TimeSeriesPoint[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const newData = mode === "hourly"
        ? await getHourlyData()
        : await getDailyData();
      setData(newData);
    };
    fetchData();
  }, [mode]);
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-app-darkCard text-white p-3 rounded-xl text-sm shadow-lg">
          <p className="font-semibold mb-1">{label}</p>
          <p className="text-brand font-bold">
            {payload[0].value} kW
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <section aria-labelledby="energy-chart-title" className="card h-[360px] flex flex-col p-6">
      <header className="flex justify-between items-start mb-6">
        <div>
          <h2 id="energy-chart-title" className="text-[16px] font-bold text-text-primary">Perfil de Consumo de Energía</h2>
          <p className="text-[13px] text-text-muted mt-1">Monitoreo en vivo</p>
        </div>
        
        {/* Toggle Hourly / Daily */}
        <div className="flex items-center bg-[#F3F4F6] rounded-full p-1 border border-border-subtle">
          <button 
            onClick={() => onModeChange('hourly')}
            className={`px-3 py-1 text-sm rounded-full font-medium transition-colors ${
              mode === 'hourly' ? 'bg-[#1D9E75] text-white shadow-sm' : 'text-[#6B7280]'
            }`}
          >
            Por Hora
          </button>
          <button 
            onClick={() => onModeChange('daily')}
            className={`px-3 py-1 text-sm rounded-full font-medium transition-colors ${
              mode === 'daily' ? 'bg-[#1D9E75] text-white shadow-sm' : 'text-[#6B7280]'
            }`}
          >
            Diario
          </button>
        </div>
      </header>

      <div className="flex-grow w-full h-full -ml-4 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-brand)" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="var(--color-brand)" stopOpacity={0.02}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="var(--color-border-subtle)" />
            <XAxis 
              dataKey="label" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }}
              domain={[0, 8]}
              ticks={[0, 2, 4, 6, 8]}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--color-border-subtle)', strokeWidth: 2, strokeDasharray: '4 4' }} />
            <Area 
              type="monotone" 
              dataKey="kwh" 
              stroke="var(--color-brand)" 
              strokeWidth={2.5}
              fillOpacity={1} 
              fill="url(#colorValue)" 
              activeDot={{ r: 6, fill: 'var(--color-brand)', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
