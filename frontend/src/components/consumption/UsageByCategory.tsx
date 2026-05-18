'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function UsageByCategory() {
  const data = [
    { name: 'HVAC', value: 40, color: '#22C55E' },
    { name: 'Cocina', value: 25, color: '#34D399' },
    { name: 'Iluminación', value: 15, color: '#60A5FA' },
    { name: 'Otros', value: 20, color: '#9CA3AF' },
  ];

  return (
    <section aria-label="Usage by Category" className="bg-app-card border border-border-light rounded-[16px] p-6 shadow-sm flex flex-col h-full">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-[15px] font-bold text-text-primary">Consumo por Categoría</h2>
        <a href="#" className="text-brand text-xs font-semibold hover:underline">Ver Detalles</a>
      </header>
      
      <div className="flex items-center gap-6 mt-2">
        <div className="w-[160px] h-[160px] flex-shrink-0 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-text-muted text-[10px] font-bold uppercase tracking-wide">Total</span>
            <span className="text-xl font-bold text-text-primary leading-none">100%</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center gap-3">
          {data.map((item, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                <span className="text-[13px] font-medium text-text-primary">{item.name}</span>
              </div>
              <span className="text-[13px] font-bold text-text-primary">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
