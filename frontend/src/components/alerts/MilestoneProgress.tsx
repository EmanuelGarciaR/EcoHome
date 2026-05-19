import React from 'react';
import { Milestone } from '@/src/lib/mockData';
import { Leaf } from 'lucide-react';

interface MilestoneProgressProps {
  milestone: Milestone;
}

export default function MilestoneProgress({ milestone }: MilestoneProgressProps) {
  return (
    <article className="bg-[#E6F5F0] rounded-[16px] p-6 flex flex-col shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-[15px] font-bold text-text-primary mb-1">Próximo Logro</h3>
          <p className="text-[13px] font-medium text-text-secondary">{milestone.title}</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-brand">
          <Leaf size={16} />
        </div>
      </div>

      <div className="mt-4 mb-4">
        <div className="flex justify-between text-[10px] font-bold text-text-primary uppercase tracking-wider mb-2">
          <span>Progreso</span>
          <span>{milestone.progressPercent}%</span>
        </div>
        <div className="w-full bg-white rounded-full h-2">
          <div 
            className="bg-brand h-2 rounded-full" 
            style={{ width: `${milestone.progressPercent}%` }}
          />
        </div>
      </div>

      <p className="text-[12px] italic text-text-secondary leading-relaxed mb-5">
        {milestone.description}
      </p>

      <button className="w-full bg-[#22C55E] hover:bg-[#16A34A] transition-colors text-white font-bold py-3 rounded-[12px] shadow-sm">
        Canjear Recompensas
      </button>
    </article>
  );
}
