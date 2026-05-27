'use client';

import React, { useState } from 'react';
import { Download, Share2, Zap, CreditCard, TreePine, ShieldCheck, CheckCircle2, Eye } from 'lucide-react';
import { MonthlyReport } from '@/lib/mockData';
import dynamic from 'next/dynamic';
import ReportPDF from './ReportPDF';
import ReportViewModal from './ReportViewModal';

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then(m => m.PDFDownloadLink),
  { ssr: false, loading: () => (
    <button className="btn-primary gap-2 rounded-full px-5 py-2.5 text-sm opacity-60 cursor-not-allowed">
      <Download size={16} /> Preparando...
    </button>
  )}
);

interface ReportHeroProps {
  report: MonthlyReport;
}

export default function ReportHero({ report }: ReportHeroProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <section aria-label="Latest Report Overview" className="grid grid-cols-[1fr_auto] gap-4">
      {/* ── Left: Main Report Card ──────────────────────────────── */}
      <article className="bg-gradient-to-br from-[#E8FAF0] to-[#D6F0E8] border border-brand/20 rounded-2xl p-6 flex flex-col justify-between row-span-2 min-h-[200px]">
        {/* Badges */}
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-brand text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            Último Reporte
          </span>
          <span className="flex items-center gap-1.5 text-text-secondary text-[12px] font-medium">
            <ShieldCheck size={14} className="text-brand" />
            Datos Verificados
          </span>
        </div>

        {/* Period */}
        <h2 className="text-[32px] font-extrabold text-text-primary leading-tight mb-2">
          {report.period}
        </h2>

        {/* AI Summary */}
        <p className="text-[14px] text-text-secondary leading-relaxed mb-6 max-w-[400px]">
          {report.aiSummary}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <PDFDownloadLink
            document={<ReportPDF report={report} />}
            fileName={`EcoHome-${report.period.replace(' ', '-')}.pdf`}
          >
            {({ loading }) => (
              <button className="btn-primary gap-2 rounded-full px-5 py-2.5 text-sm shadow-md shadow-brand/20 hover:shadow-lg hover:shadow-brand/30 transition-all cursor-pointer">
                <Download size={16} />
                {loading ? 'Generando PDF...' : 'Descargar PDF'}
              </button>
            )}
          </PDFDownloadLink>
          <button
            onClick={() => setShowModal(true)}
            className="btn-secondary gap-2 rounded-full px-5 py-2.5 text-sm cursor-pointer"
          >
            <Eye size={16} />
            Ver Reporte
          </button>
          <button className="btn-secondary gap-2 rounded-full px-5 py-2.5 text-sm cursor-pointer">
            <Share2 size={16} />
            Compartir
          </button>
        </div>
      </article>

      {/* ── Right: Stat Cards (2×2 grid) ────────────────────────── */}
      <div className="grid grid-cols-2 gap-3 w-[380px]">
        {/* Total Consumption */}
        <div className="card flex flex-col gap-2 p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Zap size={16} className="text-blue-600" />
            </div>
            <span className="text-[11px] text-text-muted font-semibold uppercase tracking-wider">Consumo Total</span>
          </div>
          <div className="text-[22px] font-extrabold text-text-primary">
            {report.consumptionKwh} <span className="text-[14px] font-semibold text-text-muted">kWh</span>
          </div>
        </div>

        {/* Savings Achieved */}
        <div className="card flex flex-col gap-2 p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-success-bg flex items-center justify-center">
              <CreditCard size={16} className="text-brand" />
            </div>
            <span className="text-[11px] text-text-muted font-semibold uppercase tracking-wider">Ahorro Logrado</span>
          </div>
          <div className="text-[22px] font-extrabold text-text-primary">
            ${report.savingsCop.toLocaleString('es-CO')} <span className="text-[14px] font-semibold text-text-muted">COP</span>
          </div>
        </div>

        {/* Nature Impact */}
        <div className="card flex flex-col gap-2 p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
              <TreePine size={16} className="text-emerald-600" />
            </div>
            <span className="text-[11px] text-text-muted font-semibold uppercase tracking-wider">Impacto Natural</span>
          </div>
          <div className="text-[22px] font-extrabold text-text-primary">
            {report.treesSaved} <span className="text-[14px] font-semibold text-text-muted">Árboles Salvados</span>
          </div>
        </div>

        {/* Data Completeness */}
        <div className="card flex flex-col gap-2 p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-text-muted font-semibold uppercase tracking-wider">Completitud de Datos</span>
            <span className="bg-brand text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
              {report.dataCompleteness}%
            </span>
          </div>
          <p className="text-[12px] text-text-secondary leading-relaxed">
            Todos los medidores inteligentes reportaron correctamente para este periodo. Sin intervención manual requerida.
          </p>
          <div className="w-full bg-brand/15 rounded-full h-1.5 mt-1">
            <div
              className="bg-brand h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${report.dataCompleteness}%` }}
            />
          </div>
        </div>
      </div>

      {showModal && (
        <ReportViewModal
          report={report}
          onClose={() => setShowModal(false)}
        />
      )}
    </section>
  );
}
