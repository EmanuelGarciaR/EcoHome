'use client';

import React, { useState } from 'react';
import { Calendar, Leaf, Clock, ArrowUpRight, Zap, ChevronRight, ChevronLeft } from 'lucide-react';

export default function InsightsPanel() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (isCollapsed) {
    return (
      <aside className="w-[60px] flex flex-col gap-6 items-center transition-all duration-300 pt-1">
        <button 
          onClick={() => setIsCollapsed(false)}
          className="p-2 bg-app-card border border-border-light rounded-full hover:bg-app-bg transition-colors shadow-sm"
          title="Desplegar consejos"
        >
          <ChevronLeft size={20} className="text-text-secondary hover:text-text-primary" />
        </button>
        
        <div className="flex flex-col gap-4 w-full px-2">
          <div 
            className="w-11 h-11 mx-auto rounded-xl bg-violet-100 border-l-[3px] border-violet-500 text-violet-900 flex items-center justify-center cursor-pointer hover:shadow-md transition-all shadow-sm" 
            title="¡Ahorros de Suscripción!" 
            onClick={() => setIsCollapsed(false)}
          >
            <Calendar size={20} />
          </div>
          <div 
            className="w-11 h-11 mx-auto rounded-xl bg-emerald-100 border-l-[3px] border-emerald-500 text-emerald-900 flex items-center justify-center cursor-pointer hover:shadow-md transition-all shadow-sm" 
            title="Protector del Planeta" 
            onClick={() => setIsCollapsed(false)}
          >
            <Leaf size={20} />
          </div>
          <div 
            className="w-11 h-11 mx-auto rounded-xl bg-amber-100 border-l-[3px] border-amber-500 text-amber-900 flex items-center justify-center cursor-pointer hover:shadow-md transition-all shadow-sm" 
            title="Oportunidad Valle" 
            onClick={() => setIsCollapsed(false)}
          >
            <Clock size={20} />
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-full lg:w-[300px] flex flex-col gap-4 transition-all duration-300">
      {/* Header */}
      <header className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2">
          <h2 className="text-[16px] font-bold text-text-primary">Consejos Inteligentes</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-text-primary bg-app-card px-2 py-1 rounded-md">3 Nuevos</span>
          <button 
            onClick={() => setIsCollapsed(true)}
            className="p-1.5 text-text-secondary hover:text-text-primary hover:bg-app-card rounded-md transition-colors"
            title="Contraer consejos"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </header>

      {/* Insight 1: Violet */}
      <article className="bg-violet-100 border-l-[3px] border-violet-500 p-4 rounded-2xl flex flex-col gap-2 shadow-sm transition-transform hover:-translate-y-1">
        <div className="flex items-center gap-2 text-violet-900 font-bold text-sm">
          <Calendar size={18} />
          ¡Ahorros de Suscripción!
        </div>
        <p className="text-xs text-violet-900 opacity-90 leading-relaxed font-medium">
          Ahorraste $30,000 COP este mes optimizando el aire acondicionado — ¡suficiente para pagar tu membresía de Netflix!
        </p>
      </article>

      {/* Insight 2: Emerald */}
      <article className="bg-emerald-100 border-l-[3px] border-emerald-500 p-4 rounded-2xl flex flex-col gap-2 shadow-sm transition-transform hover:-translate-y-1">
        <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
          <Leaf size={18} />
          Protector del Planeta
        </div>
        <p className="text-xs text-emerald-900 opacity-90 leading-relaxed font-medium">
          ¡Genial! Tu reducción de huella de carbono este mes equivale a salvar 4 árboles en el Amazonas 🌲
        </p>
      </article>

      {/* Insight 3: Amber */}
      <article className="bg-amber-100 border-l-[3px] border-amber-500 p-4 rounded-2xl flex flex-col gap-2 shadow-sm transition-transform hover:-translate-y-1">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
          <Clock size={18} />
          Oportunidad Valle
        </div>
        <p className="text-xs text-amber-900 opacity-90 leading-relaxed font-medium">
          Si lavas la ropa entre 10 PM y 6 AM podrías ahorrar para comprarte 4 Chocorramos el próximo mes. 🍫
        </p>
      </article>

      {/* CTA CARD - Dark theme from Mockup */}
      <article className="bg-app-darkCard text-white rounded-[20px] p-6 mt-2 flex flex-col shadow-md">
        <h3 className="font-bold text-[18px] mb-2 leading-tight">¿Listo para tu Reporte Mensual?</h3>
        <p className="text-sm text-text-muted mb-5 leading-relaxed opacity-90">
          Tu análisis de energía de junio está listo. Descubre más formas de ahorrar y mira tu puntuación de impacto ambiental.
        </p>
        <button className="bg-brand hover:bg-brand-hover transition-colors text-white font-semibold py-2.5 rounded-full flex items-center justify-center gap-2 text-sm">
          Abrir Centro de Reportes <ArrowUpRight size={16} />
        </button>
      </article>

      {/* Energy Tip */}
      <section aria-label="Energy Tip" className="mt-4 flex flex-col gap-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-text-muted uppercase tracking-wider">
          <Zap size={14} /> CONSEJO DE ENERGÍA
        </div>
        <p className="text-sm italic text-text-secondary leading-relaxed">
          "¿Sabías que los bombillos LED usan 75% menos energía y duran 25 veces más que los incandescentes?"
        </p>
        <a href="#" className="text-brand text-xs font-semibold hover:underline mt-1">
          Aprende más sobre eficiencia en iluminación →
        </a>
      </section>
    </aside>
  );
}
