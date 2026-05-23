'use client';

import React from 'react';
import { FileDown, Bell } from 'lucide-react';

export default function ReportActions() {
  return (
    <section aria-label="Report Actions" className="grid grid-cols-2 gap-4 mt-8 mb-4">
      {/* Bulk Data Export */}
      <article className="card flex flex-col items-center text-center p-6 hover:shadow-md transition-shadow">
        <div className="w-12 h-12 rounded-full bg-app-bg flex items-center justify-center mb-4">
          <FileDown size={22} className="text-text-secondary" />
        </div>
        <h4 className="text-[15px] font-bold text-text-primary mb-2">Exportación Masiva de Datos</h4>
        <p className="text-[13px] text-text-muted leading-relaxed mb-4 max-w-[280px]">
          ¿Necesitas tus datos en CSV o Excel para impuestos? Genera una exportación personalizada en segundos.
        </p>
        <button className="inline-flex items-center justify-center border-2 border-border-light text-text-primary hover:border-brand hover:text-brand rounded-xl px-5 py-2 text-[13px] font-semibold transition-colors">
          Configurar Exportación
        </button>
      </article>

      {/* Notification Settings */}
      <article className="card flex flex-col items-center text-center p-6 hover:shadow-md transition-shadow">
        <div className="w-12 h-12 rounded-full bg-app-bg flex items-center justify-center mb-4">
          <Bell size={22} className="text-text-secondary" />
        </div>
        <h4 className="text-[15px] font-bold text-text-primary mb-2">Reportes Automáticos</h4>
        <p className="text-[13px] text-text-muted leading-relaxed mb-4 max-w-[280px]">
          Los reportes se generan automáticamente el 1° de cada mes. ¿Quieres cambiar el horario?
        </p>
        <button className="inline-flex items-center justify-center border-2 border-brand text-brand hover:bg-brand hover:text-white rounded-xl px-5 py-2 text-[13px] font-semibold transition-colors">
          Configurar Notificaciones
        </button>
      </article>
    </section>
  );
}
