import React from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { StatsSummary } from '@/src/lib/mockData';

interface ConsumptionKPIsProps {
  summary: StatsSummary;
}

export default function ConsumptionKPIs({ summary }: ConsumptionKPIsProps) {
  const kpis = [
    {
      label: 'Consumo Total',
      value: summary.month_kwh.toString(),
      unit: 'kWh',
      delta: '↓ 4.4%',
      isPositive: true,
    },
    {
      label: 'Costo Mensual',
      value: `$${summary.month_cost_cop.toLocaleString('es-CO')}`,
      unit: 'COP',
      delta: '↓ 10.2%',
      isPositive: true,
    },
    {
      label: 'Pico de Demanda',
      value: (summary.peak_power_w / 1000).toString(),
      unit: 'kW',
      delta: '↑ 6.1%',
      isPositive: false,
    },
    {
      label: 'Impacto Ahorrado',
      value: summary.trees_equivalent.toString(),
      unit: 'Árboles',
      delta: '↑ 20%',
      isPositive: true,
    }
  ];

  return (
    <section aria-label="KPIs" className="grid grid-cols-2 gap-4 w-full">
      {kpis.map((kpi, index) => (
        <article key={index} className="bg-app-card border border-border-light rounded-[16px] p-4 flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-start mb-3 gap-2">
            <span className="text-[11px] font-bold text-text-muted uppercase tracking-wide leading-tight">{kpi.label}</span>
            <div className={`flex-shrink-0 px-1.5 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-0.5 ${
              kpi.isPositive ? 'bg-success-bg text-success-text' : 'bg-red-100 text-red-500'
            }`}>
              {kpi.isPositive ? <ArrowDownRight size={12} /> : <ArrowUpRight size={12} />}
              {kpi.delta.replace(/[↑↓]/g, '').trim()}
            </div>
          </div>
          <div className="flex items-baseline gap-1 mt-auto">
            <span className="text-[24px] font-bold text-text-primary leading-none">{kpi.value}</span>
            <span className="text-[12px] font-semibold text-text-muted">{kpi.unit}</span>
          </div>
        </article>
      ))}
    </section>
  );
}
