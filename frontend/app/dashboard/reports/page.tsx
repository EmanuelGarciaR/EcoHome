'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

import ReportHero from '@/components/reports/ReportHero';
import ReportsArchive from '@/components/reports/ReportsArchive';
import ReportActions from '@/components/reports/ReportActions';

import { getReports, getLatestReport } from '@/lib/api';
import { MonthlyReport } from '@/lib/mockData';

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
          <div className="flex flex-col lg:flex-row gap-6 items-start">
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
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <Sidebar />

          <main className="flex flex-col w-full lg:flex-1 min-w-0">
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


          </main>
        </div>
      </div>
    </div>
  );
}
