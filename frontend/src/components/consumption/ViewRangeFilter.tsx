import React from 'react';
import { TimeRange } from '@/app/dashboard/consumption/page';

interface ViewRangeFilterProps {
  timeRange: TimeRange;
  onChange: (range: TimeRange) => void;
}

export default function ViewRangeFilter({ timeRange, onChange }: ViewRangeFilterProps) {
  const getButtonClass = (range: TimeRange) => {
    return timeRange === range
      ? "px-4 py-2 rounded-[10px] bg-success-bg text-brand font-semibold text-[13px] transition-colors"
      : "px-4 py-2 rounded-[10px] text-text-secondary hover:bg-app-bg text-[13px] font-medium transition-colors";
  };

  return (
    <nav className="flex items-center gap-1 bg-white p-1 rounded-xl border border-border-light shadow-sm w-max">
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
  );
}
