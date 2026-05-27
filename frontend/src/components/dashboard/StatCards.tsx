import React from 'react';
import { Zap, DollarSign, PiggyBank, ArrowUpRight } from 'lucide-react';
import { StatsSummary } from '@/lib/mockData';

interface StatCardsProps {
  summary: StatsSummary;
}

export default function StatCards({ summary }: StatCardsProps) {
  const stats = [
    {
      label: 'Carga Actual',
      value: (summary.current_power_w / 1000).toFixed(2).toString(),
      unit: 'kW',
      delta: '+10%',
      isPositive: false,
      icon: <Zap size={20} className="text-amber-500" />,
      iconBg: 'bg-amber-100'
    },
    {
      label: 'Acumulado del Mes',
      value: `$${summary.month_cost_cop.toLocaleString('es-CO')}`,
      unit: 'COP',
      delta: '+8%',
      isPositive: true,
      icon: <DollarSign size={20} className="text-success-text" />,
      iconBg: 'bg-success-bg'
    },
    {
      label: 'Ahorro Estimado',
      value: `$${summary.month_savings_cop.toLocaleString('es-CO')}`,
      unit: 'COP',
      delta: '+12%',
      isPositive: true,
      icon: <PiggyBank size={20} className="text-blue-500" />,
      iconBg: 'bg-blue-100'
    }
  ];

  return (
    <section aria-label="Key Metrics" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, i) => (
        <article key={i} className="card flex items-center justify-between h-[110px] p-4 md:p-5">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${stat.iconBg}`}>
              {stat.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] md:text-[13px] text-text-muted font-medium mb-1 truncate">{stat.label}</div>
              <div className="text-[20px] md:text-[24px] font-bold text-text-primary flex items-baseline gap-1">
                <span>{stat.value}</span>
                <span className="text-[12px] md:text-[14px] font-semibold text-text-muted shrink-0">{stat.unit}</span>
              </div>
            </div>
          </div>
          {stat.delta && (
            <div className={`shrink-0 self-start ml-2 px-1.5 py-1 md:px-2 rounded-md text-[11px] md:text-[12px] font-semibold hidden xl:flex items-center gap-0.5 md:gap-1 ${
              stat.isPositive ? 'bg-success-bg text-success-text' : 'bg-red-100 text-red-500'
            }`}>
              <ArrowUpRight size={14} className="shrink-0" />
              <span>{stat.delta}</span>
            </div>
          )}
        </article>
      ))}
    </section>
  );
}
