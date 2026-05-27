'use client';

import { useEffect } from 'react';
import { X, Download, Leaf, Check } from 'lucide-react';
import { MonthlyReport, calcFunFacts } from '@/lib/mockData';
import dynamic from 'next/dynamic';
import ReportPDF from './ReportPDF';

// PDFDownloadLink requiere dynamic import con ssr: false
const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then(m => m.PDFDownloadLink),
  { ssr: false, loading: () => <span>Preparando PDF...</span> }
);

interface ReportViewModalProps {
  report: MonthlyReport | null;
  onClose: () => void;
}

export default function ReportViewModal({ report, onClose }: ReportViewModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!report) return null;

  const facts = calcFunFacts(report.savingsCop);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        {/* Header del modal */}
        <div className="p-5 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{report.period}</h2>
            <p className="text-sm text-gray-500">Reporte de Consumo</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
            <X size={24} />
          </button>
        </div>

        {/* Cuerpo del modal */}
        <div className="p-6 flex flex-col gap-5">
          {/* Sección 1 — 4 stat cards en grid 2x2 */}
          <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-xs uppercase font-semibold">Consumo Total</p>
              <p className="text-[#1D9E75] text-lg font-bold">{report.consumptionKwh} kWh</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase font-semibold">Ahorro Logrado</p>
              <p className="text-[#1D9E75] text-lg font-bold">${report.savingsCop.toLocaleString('es-CO')} COP</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase font-semibold">Impacto Natural</p>
              <p className="text-[#1D9E75] text-lg font-bold">{report.treesSaved} árboles</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase font-semibold">CO₂ Compensado</p>
              <p className="text-[#1D9E75] text-lg font-bold">{report.co2OffsetKg} kg</p>
            </div>
          </div>

          {/* Sección 2 — Impacto ambiental */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">
              <Leaf className="text-[#1D9E75]" size={20} /> Impacto Ambiental
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-700">
                <Check className="text-[#1D9E75]" size={16} /> {report.treesSaved} árboles equivalentes salvados
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-700">
                <Check className="text-[#1D9E75]" size={16} /> {facts.metroTrips} viajes en metro compensados
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-700">
                <Check className="text-[#1D9E75]" size={16} /> {report.co2OffsetKg} kg de CO₂ prevenidos
              </li>
            </ul>
          </div>

          {/* Sección 3 — Fun facts */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3">¿Qué puedes hacer con tu ahorro? 🎉</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="text-lg font-bold text-gray-900">🍫 {facts.chocoramos}</p>
                <p className="text-xs text-gray-500">Chocoramos</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="text-lg font-bold text-gray-900">📺 {facts.netflixMonths}</p>
                <p className="text-xs text-gray-500">Meses de Netflix</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="text-lg font-bold text-gray-900">☕ {facts.coffeeCups}</p>
                <p className="text-xs text-gray-500">Cafés</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="text-lg font-bold text-gray-900">🚇 {facts.metroTrips}</p>
                <p className="text-xs text-gray-500">Viajes en Metro de Medellín</p>
              </div>
            </div>
          </div>

          {/* Sección 4 — Datos técnicos */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3">Datos Técnicos</h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden text-sm">
              <div className="flex bg-gray-50 p-2">
                <span className="w-1/2 text-gray-600 font-medium">Pico máximo</span>
                <span className="w-1/2 text-gray-900">{report.peakPowerW.toLocaleString()} W a las {report.peakTime}</span>
              </div>
              <div className="flex bg-white p-2">
                <span className="w-1/2 text-gray-600 font-medium">Promedio diario</span>
                <span className="w-1/2 text-gray-900">{report.avgDailyKwh} kWh</span>
              </div>
              <div className="flex bg-gray-50 p-2">
                <span className="w-1/2 text-gray-600 font-medium">Factor de potencia</span>
                <span className="w-1/2 text-gray-900">{report.powerFactor}</span>
              </div>
              <div className="flex bg-white p-2">
                <span className="w-1/2 text-gray-600 font-medium">Completitud de datos</span>
                <span className="w-1/2 text-gray-900">{report.dataCompleteness}%</span>
              </div>
              <div className="flex bg-gray-50 p-2">
                <span className="w-1/2 text-gray-600 font-medium">Recomendación IA</span>
                <span className="w-1/2 text-gray-900">{report.aiRecommendations[0]?.title} — {report.aiRecommendations[0]?.estimatedSavings}</span>
              </div>
            </div>
          </div>

          {/* Sección 5 — Recomendaciones IA */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              Recomendaciones IA
              <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full font-medium">
                {report.aiRecommendations.length}
              </span>
            </h3>
            <div className="space-y-3">
              {report.aiRecommendations.map((rec, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-gray-900">{rec.title}</h4>
                    {rec.impact === 'high' && <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-semibold">Alto Impacto</span>}
                    {rec.impact === 'medium' && <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-semibold">Medio Impacto</span>}
                    {rec.impact === 'low' && <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold">Bajo Impacto</span>}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                  <p className="text-sm font-semibold text-[#1D9E75]">Ahorro estimado: {rec.estimatedSavings}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer del modal */}
        <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200 flex justify-between items-center rounded-b-2xl">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer">
            Cerrar
          </button>
          
          <PDFDownloadLink
            document={<ReportPDF report={report} />}
            fileName={`EcoHome-${report.period.replace(' ', '-')}.pdf`}
          >
            {({ loading }) => (
              <button
                className="flex items-center gap-2 bg-[#1D9E75] text-white px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer hover:bg-[#17876A] transition-colors disabled:opacity-60"
                disabled={loading}
              >
                <Download size={16} />
                {loading ? 'Generando PDF...' : 'Descargar PDF'}
              </button>
            )}
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
}
