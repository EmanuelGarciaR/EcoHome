import React from 'react';
import { Calendar, Leaf, Clock, ArrowUpRight, Zap } from 'lucide-react';

export default function InsightsPanel() {
  return (
    <aside className="w-[300px] flex flex-col gap-4">
      {/* Header */}
      <header className="flex justify-between items-center mb-1">
        <h2 className="text-[16px] font-bold text-text-primary">Consejos Inteligentes</h2>
        <span className="text-xs font-bold text-text-primary">3 Nuevos</span>
      </header>

      {/* Insight 1: Teal */}
      <article className="bg-success-bg border-l-[3px] border-brand p-4 rounded-2xl flex flex-col gap-2">
        <div className="flex items-center gap-2 text-green-800 font-semibold text-sm">
          <Calendar size={16} />
          ¡Ahorros de Suscripción!
        </div>
        <p className="text-xs text-green-800 opacity-80 leading-relaxed">
          Ahorraste $30,000 COP este mes optimizando el aire acondicionado — ¡suficiente para pagar tu membresía de Netflix!
        </p>
      </article>

      {/* Insight 2: Green */}
      <article className="bg-green-50 border-l-[3px] border-green-400 p-4 rounded-2xl flex flex-col gap-2">
        <div className="flex items-center gap-2 text-green-800 font-semibold text-sm">
          <Leaf size={16} />
          Protector del Planeta
        </div>
        <p className="text-xs text-green-800 opacity-80 leading-relaxed">
          ¡Genial! Tu reducción de huella de carbono este mes equivale a salvar 4 árboles en el Amazonas 🌲
        </p>
      </article>

      {/* Insight 3: Blue */}
      <article className="bg-blue-50 border-l-[3px] border-blue-400 p-4 rounded-2xl flex flex-col gap-2">
        <div className="flex items-center gap-2 text-blue-800 font-semibold text-sm">
          <Clock size={16} />
          Oportunidad Valle
        </div>
        <p className="text-xs text-blue-800 opacity-80 leading-relaxed">
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
