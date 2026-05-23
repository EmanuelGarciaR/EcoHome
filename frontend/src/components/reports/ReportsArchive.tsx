'use client';

import React, { useState, useMemo } from 'react';
import { FileText, Eye, Download, MoreVertical, TreePine, ChevronRight } from 'lucide-react';
import { MonthlyReport } from '@/src/lib/mockData';
import dynamic from 'next/dynamic';
import ReportPDF from './ReportPDF';
import ReportViewModal from './ReportViewModal';

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then(m => m.PDFDownloadLink),
  { ssr: false }
);

interface ReportsArchiveProps {
  reports: MonthlyReport[];
}

type YearFilter = 'all' | '2023' | '2022';

export default function ReportsArchive({ reports }: ReportsArchiveProps) {
  const [yearFilter, setYearFilter] = useState<YearFilter>('all');
  const [selectedReport, setSelectedReport] = useState<MonthlyReport | null>(null);

  const filteredReports = useMemo(() => {
    if (yearFilter === 'all') return reports;
    return reports.filter(r => r.periodDate.startsWith(yearFilter));
  }, [reports, yearFilter]);

  const yearTabs: { label: string; value: YearFilter }[] = [
    { label: 'Todo', value: 'all' },
    { label: '2023', value: '2023' },
    { label: '2022', value: '2022' },
  ];

  return (
    <section aria-label="Past Reports Archive" className="mt-8">
      {/* Header */}
      <div className="flex items-end justify-between mb-5">
        <div>
          <h3 className="text-[18px] font-bold text-text-primary">Archivo de Reportes Anteriores</h3>
          <p className="text-[13px] text-text-muted mt-0.5">
            Gestiona y exporta el historial de tu huella energética.
          </p>
        </div>

        {/* Year Filter Tabs */}
        <div className="flex items-center bg-app-bg rounded-lg p-1 gap-0.5">
          {yearTabs.map(tab => (
            <button
              key={tab.value}
              onClick={() => setYearFilter(tab.value)}
              className={`px-4 py-1.5 rounded-md text-[13px] font-semibold transition-all ${
                yearFilter === tab.value
                  ? 'bg-app-card text-text-primary shadow-sm'
                  : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-subtle">
              <th className="text-left text-[12px] text-text-muted font-semibold uppercase tracking-wider px-5 py-3.5">
                Periodo
              </th>
              <th className="text-left text-[12px] text-text-muted font-semibold uppercase tracking-wider px-5 py-3.5">
                Estado
              </th>
              <th className="text-left text-[12px] text-text-muted font-semibold uppercase tracking-wider px-5 py-3.5">
                Consumo
              </th>
              <th className="text-left text-[12px] text-text-muted font-semibold uppercase tracking-wider px-5 py-3.5">
                Ahorro (COP)
              </th>
              <th className="text-left text-[12px] text-text-muted font-semibold uppercase tracking-wider px-5 py-3.5">
                Árboles Salvados
              </th>
              <th className="text-right text-[12px] text-text-muted font-semibold uppercase tracking-wider px-5 py-3.5">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report, idx) => {
              const periodParts = report.period.split(' ');
              const month = periodParts[0];
              const year = periodParts[1];

              return (
                <tr
                  key={report.id}
                  className={`group transition-colors hover:bg-app-bg/60 ${
                    idx < filteredReports.length - 1 ? 'border-b border-border-subtle' : ''
                  }`}
                >
                  {/* Period */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-app-bg flex items-center justify-center flex-shrink-0">
                        <FileText size={16} className="text-text-muted" />
                      </div>
                      <div>
                        <div className="text-[14px] font-bold text-text-primary">{month}</div>
                        <div className="text-[12px] text-text-muted">{year}</div>
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <span className="text-[13px] text-text-secondary font-medium">
                      {report.status === 'complete' ? 'Completo' : report.status === 'pending' ? 'Pendiente' : 'Fallido'}
                    </span>
                  </td>

                  {/* Consumption */}
                  <td className="px-5 py-4">
                    <span className="text-[14px] font-semibold text-text-primary">
                      {report.consumptionKwh} kWh
                    </span>
                  </td>

                  {/* Savings */}
                  <td className="px-5 py-4">
                    <span className="text-[14px] font-semibold text-text-primary">
                      ${report.savingsCop.toLocaleString('es-CO')}
                    </span>
                  </td>

                  {/* Trees Saved */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <TreePine size={16} className="text-brand" />
                      <span className="text-[14px] font-bold text-brand">{report.treesSaved}</span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedReport(report)}
                        className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-app-bg transition-colors cursor-pointer"
                        title="Ver reporte"
                      >
                        <Eye size={16} />
                      </button>
                      <PDFDownloadLink
                        document={<ReportPDF report={report} />}
                        fileName={`EcoHome-${report.period.replace(' ', '-')}.pdf`}
                      >
                        {({ loading }) => (
                          <button
                            className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-app-bg transition-colors cursor-pointer"
                            title={loading ? 'Generando...' : 'Descargar'}
                            disabled={loading}
                          >
                            <Download size={16} />
                          </button>
                        )}
                      </PDFDownloadLink>
                      <button
                        className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-app-bg transition-colors"
                        title="Más opciones"
                      >
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* View Full History Link */}
        <div className="flex justify-center py-4 border-t border-border-subtle">
          <button className="flex items-center gap-1 text-brand text-[14px] font-semibold hover:underline transition-all group cursor-pointer">
            Ver Historial Completo
            <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {selectedReport && (
        <ReportViewModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </section>
  );
}
