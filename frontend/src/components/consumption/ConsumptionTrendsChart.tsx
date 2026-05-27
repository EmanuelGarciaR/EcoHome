'use client';

import React from 'react';
import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RangePoint, StatsSummary } from '@/lib/mockData';
import { ArrowDown } from 'lucide-react';
import { TimeRange } from '@/app/dashboard/consumption/page';

interface ConsumptionTrendsChartProps {
  timeRange: TimeRange;
  data: RangePoint[];
  summary: StatsSummary;
}

export default function ConsumptionTrendsChart({ timeRange, data, summary }: ConsumptionTrendsChartProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-app-darkCard text-white p-3 rounded-xl text-sm shadow-lg">
          <p className="font-semibold mb-2">{label}</p>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-brand"></span>
               <span className="text-text-muted text-xs">Actual:</span>
               <span className="font-bold text-white">{payload[0].value} kWh</span>
            </div>
            {payload[1] && (
               <div className="flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-text-muted"></span>
                 <span className="text-text-muted text-xs">Anterior:</span>
                 <span className="font-bold text-text-muted">{payload[1].value} kWh</span>
               </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <section aria-labelledby="trends-title" className="bg-app-card border border-border-light rounded-[16px] p-6 shadow-sm flex flex-col">
      <header className="flex justify-between items-start mb-6">
        <div>
          <h2 id="trends-title" className="text-[16px] font-bold text-text-primary">Tendencias de Consumo</h2>
          <p className="text-[13px] text-text-muted mt-1">Compara el uso actual vs periodo anterior</p>
        </div>
      </header>

      <div className="h-[320px] w-full -ml-4 mt-2" style={{ minWidth: '100%', minHeight: '100%' }}>
        <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-brand)" stopOpacity={0.08}/>
                <stop offset="95%" stopColor="var(--color-brand)" stopOpacity={0.01}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="var(--color-border-subtle)" />
            <XAxis 
              dataKey="label" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--color-border-subtle)', strokeWidth: 2, strokeDasharray: '4 4' }} />
            
            <Area 
              type="monotone" 
              dataKey="current_kwh" 
              stroke="none" 
              fillOpacity={1} 
              fill="url(#areaGradient)" 
            />
            <Line 
              type="monotone" 
              dataKey="previous_kwh" 
              stroke="var(--color-text-muted)" 
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={false}
              activeDot={{ r: 4, fill: 'var(--color-text-muted)', stroke: '#fff', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="current_kwh" 
              stroke="var(--color-brand)" 
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 6, fill: 'var(--color-brand)', stroke: '#fff', strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-border-subtle">
        <div className="flex flex-col">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1">Costo de Energía Ahorrado</span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-text-primary">{summary.month_kwh} kWh</span>
          </div>
          <span className="text-xs text-text-muted mt-0.5 flex items-center gap-1">
            <ArrowDown size={12} className="text-success-text" /> Uso total mensual
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1">Hora Pico de Consumo</span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-text-primary">{summary.peak_time}</span>
          </div>
          <span className="text-xs text-text-muted mt-0.5">({summary.peak_power_w} W)</span>
        </div>

        <div className="flex flex-col">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1">Ahorros Estimados</span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-text-primary">${summary.month_savings_cop.toLocaleString('es-CO')} COP</span>
          </div>
          <span className="text-xs text-success-text font-medium mt-0.5">En camino a incrementar</span>
        </div>
      </div>
    </section>
  );
}
