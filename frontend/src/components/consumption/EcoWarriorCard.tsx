import React from 'react';
import { Zap } from 'lucide-react';

export default function EcoWarriorCard() {
  return (
    <section aria-label="Eco Warrior Status" className="rounded-[16px] p-6 shadow-sm flex flex-col justify-between" style={{ background: 'linear-gradient(135deg, #CFF5E4 0%, #A7E8C9 100%)' }}>
      <div className="flex flex-col items-center text-center">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm">
          <Zap size={24} className="text-brand" fill="currentColor" />
        </div>
        <h2 className="text-[18px] font-bold text-[#064E3B] mb-2">Eco-Warrior Status</h2>
        <p className="text-[13px] text-[#064E3B] font-medium leading-relaxed opacity-90 mb-5 px-2">
          ¡Estás en el top 15% de hogares con mayor eficiencia energética en tu vecindario este mes!
        </p>

        <div className="flex gap-3 mb-5 w-full">
          <div className="flex-1 bg-white/60 rounded-[12px] p-2 flex flex-col items-center">
            <span className="text-[10px] font-bold text-[#064E3B] uppercase tracking-wider opacity-70 mb-1">Puntaje Global</span>
            <span className="text-[15px] font-bold text-brand bg-white px-3 py-0.5 rounded-full shadow-sm">#1,242</span>
          </div>
          <div className="flex-1 bg-white/60 rounded-[12px] p-2 flex flex-col items-center">
            <span className="text-[10px] font-bold text-[#064E3B] uppercase tracking-wider opacity-70 mb-1">Meta Mensual</span>
            <span className="text-[15px] font-bold text-brand bg-white px-3 py-0.5 rounded-full shadow-sm">94%</span>
          </div>
        </div>

        <button className="w-full bg-brand hover:bg-brand-hover transition-colors text-white font-semibold text-[13px] h-[40px] rounded-full shadow-sm">
          Ver Logros
        </button>
      </div>
    </section>
  );
}
