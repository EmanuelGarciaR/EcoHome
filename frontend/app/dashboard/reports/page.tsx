'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/src/components/layout/Header';
import Sidebar from '@/src/components/layout/Sidebar';

import ReportHero from '@/src/components/reports/ReportHero';
import ReportsArchive from '@/src/components/reports/ReportsArchive';
import ReportActions from '@/src/components/reports/ReportActions';

import { getReports, getLatestReport } from '@/src/lib/api';
import { MonthlyReport } from '@/src/lib/mockData';

import { Printer, FileText } from 'lucide-react';

export default function ReportsPage() {
  const [reports, setReports] = useState<MonthlyReport[]>([]);
  const [latestReport, setLatestReport] = useState<MonthlyReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [allReports, latest] = await Promise.all([
        getReports(),
        getLatestReport()
      ]);
      setReports(allReports);
      setLatestReport(latest);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-app-bg font-sans">
        <Header />
        <div className="max-w-[1440px] mx-auto px-6 py-6">
          <div className="grid grid-cols-[240px_1fr] gap-6 items-start">
            <Sidebar />
            <main className="flex items-center justify-center min-h-[400px]">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-3 border-brand border-t-transparent rounded-full animate-spin" />
                <span className="text-text-muted text-sm font-medium">Cargando reportes...</span>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app-bg font-sans">
      <Header />
      <div className="max-w-[1440px] mx-auto px-6 py-6">
        <div className="grid grid-cols-[240px_1fr] gap-6 items-start">
          <Sidebar />

          <main className="flex flex-col w-full min-w-0">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-[20px] font-semibold text-text-primary">
                  Reporte Mensual de EcoHome
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-app-card transition-colors"
                  title="Imprimir"
                >
                  <Printer size={20} />
                </button>
                <button
                  className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-app-card transition-colors"
                  title="Exportar"
                >
                  <FileText size={20} />
                </button>
              </div>
            </div>

            {/* Hero Section */}
            {latestReport && <ReportHero report={latestReport} />}

            {/* Archive Table */}
            <ReportsArchive reports={reports} />

            {/* Action Cards */}
            <ReportActions />

            {/* Bottom Nav (Mobile-style from mockup) */}
            <nav className="mt-4 border-t border-border-subtle pt-4 pb-2">
              <div className="flex justify-around items-center text-text-muted text-[12px] font-medium">
                <a href="/" className="flex flex-col items-center gap-1 hover:text-text-primary transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  Home
                </a>
                <a href="/dashboard/consumption" className="flex flex-col items-center gap-1 hover:text-text-primary transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                  Historial
                </a>
                <a href="/dashboard/alerts" className="flex flex-col items-center gap-1 hover:text-text-primary transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                  </svg>
                  Alertas
                </a>
                <a href="/dashboard/reports" className="flex flex-col items-center gap-1 text-brand font-bold transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  </svg>
                  Reportes
                </a>
              </div>
            </nav>
          </main>
        </div>
      </div>
    </div>
  );
}
