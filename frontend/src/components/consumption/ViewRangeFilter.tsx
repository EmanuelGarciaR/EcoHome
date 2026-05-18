import React from 'react';
import { TimeRange } from '@/app/dashboard/consumption/page';

interface ViewRangeFilterProps {
  timeRange: TimeRange;
  onChange: (range: TimeRange) => void;
}

export default function ViewRangeFilter({ timeRange, onChange }: ViewRangeFilterProps) {
  const getButtonClass = (range: TimeRange) => {
    return timeRange === range
      ? "flex items-center h-[36px] px-3 rounded-[10px] bg-success-bg text-brand font-semibold text-[13px] transition-colors w-full text-left"
      : "flex items-center h-[36px] px-3 rounded-[10px] text-text-secondary hover:bg-app-bg text-[13px] font-medium transition-colors w-full text-left";
  };

  return (
    <aside className="w-[220px] flex flex-col gap-[18px] bg-transparent">
      {/* View Range Section */}
      <section aria-label="View Range">
        <h3 className="text-[11px] font-bold text-text-muted uppercase mb-2 tracking-wider">
          VIEW RANGE
        </h3>
        <nav className="flex flex-col gap-1">
          <button onClick={() => onChange('mensual')} className={getButtonClass('mensual')}>
            Mensual
          </button>
          <button onClick={() => onChange('trimestral')} className={getButtonClass('trimestral')}>
            Últimos 3 Meses
          </button>
          <button onClick={() => onChange('anual')} className={getButtonClass('anual')}>
            Anual
          </button>
        </nav>
      </section>

      {/* Category Breakdown Section */}
      <section aria-label="Category Breakdown" className="mt-2">
        <h3 className="text-[11px] font-bold text-text-muted uppercase mb-3 tracking-wider">
          CATEGORY BREAKDOWN
        </h3>
        <ul className="flex flex-col gap-[10px]">
          <li className="flex items-center gap-2 text-[13px] text-text-primary">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
            Calefacción & Refri.
          </li>
          <li className="flex items-center gap-2 text-[13px] text-text-primary">
            <span className="w-2.5 h-2.5 rounded-full bg-green-300"></span>
            Electrodomésticos
          </li>
          <li className="flex items-center gap-2 text-[13px] text-text-primary">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-300"></span>
            Entretenimiento
          </li>
          <li className="flex items-center gap-2 text-[13px] text-text-primary">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-200"></span>
            Iluminación
          </li>
        </ul>
      </section>
    </aside>
  );
}
