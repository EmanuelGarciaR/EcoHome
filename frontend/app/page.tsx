'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import StatCards from '@/components/dashboard/StatCards';
import EnergyChart from '@/components/charts/EnergyChart';
import ApplianceTable from '@/components/dashboard/ApplianceTable';
import InsightsPanel from '@/components/dashboard/InsightsPanel';
import { getSummary } from '@/lib/api';
import { StatsSummary } from '@/lib/mockData';

export default function Home() {
  const [chartMode, setChartMode] = useState<"hourly" | "daily">("hourly");
  const [summary, setSummary] = useState<StatsSummary | null>(null);

  useEffect(() => {
    getSummary().then(setSummary);
  }, []);

  if (!summary) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col w-full">
      <Header />
      <div className="w-full px-6 py-6 flex-grow">
        <div className="max-w-[1440px] mx-auto w-full flex flex-col lg:flex-row gap-6 items-start">
          <Sidebar />
          
          <main className="flex flex-col gap-6 w-full lg:flex-1 min-w-0">
            <StatCards summary={summary} />
            <EnergyChart mode={chartMode} onModeChange={setChartMode} />
            <ApplianceTable />
          </main>
          
          <div className="w-full lg:w-auto">
            <InsightsPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
