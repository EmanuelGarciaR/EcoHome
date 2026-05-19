'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/src/components/layout/Header';
import Sidebar from '@/src/components/layout/Sidebar';
import StatCards from '@/src/components/dashboard/StatCards';
import EnergyChart from '@/src/components/charts/EnergyChart';
import ApplianceTable from '@/src/components/dashboard/ApplianceTable';
import InsightsPanel from '@/src/components/dashboard/InsightsPanel';
import { getSummary } from '@/src/lib/api';
import { StatsSummary } from '@/src/lib/mockData';

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
        <div className="max-w-[1440px] mx-auto w-full grid grid-cols-[240px_1fr_auto] gap-6 items-start">
          <Sidebar />
          
          <main className="flex flex-col gap-6 w-full min-w-0">
            <StatCards summary={summary} />
            <EnergyChart mode={chartMode} onModeChange={setChartMode} />
            <ApplianceTable />
          </main>
          
          <InsightsPanel />
        </div>
      </div>
    </div>
  );
}
