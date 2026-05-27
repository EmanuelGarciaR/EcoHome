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
        <article key={i} className="card flex items-center justify-between h-[110px]">
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.iconBg}`}>
              {stat.icon}
            </div>
            <div>
              <div className="text-[13px] text-text-muted font-medium mb-1">{stat.label}</div>
              <div className="text-[24px] font-bold text-text-primary flex items-baseline gap-1">
                {stat.value}
                <span className="text-[14px] font-semibold text-text-muted">{stat.unit}</span>
              </div>
            </div>
          </div>
          {stat.delta && (
            <div className={`self-start px-2 py-1 rounded-md text-[12px] font-semibold flex items-center gap-1 ${
              stat.isPositive ? 'bg-success-bg text-success-text' : 'bg-red-100 text-red-500'
            }`}>
              <ArrowUpRight size={14} />
              {stat.delta}
            </div>
          )}
        </article>
      ))}
    </section>
  );
}
