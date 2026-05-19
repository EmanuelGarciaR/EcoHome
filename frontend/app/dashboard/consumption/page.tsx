'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/src/components/layout/Header';
import Sidebar from '@/src/components/layout/Sidebar';
import InsightsPanel from '@/src/components/dashboard/InsightsPanel';

import ViewRangeFilter from '@/src/components/consumption/ViewRangeFilter';
import ConsumptionKPIs from '@/src/components/consumption/ConsumptionKPIs';
import ConsumptionTrendsChart from '@/src/components/consumption/ConsumptionTrendsChart';
import UsageByCategory from '@/src/components/consumption/UsageByCategory';
import { getRangeData, getSummary } from '@/src/lib/api';
import { RangePoint, StatsSummary } from '@/src/lib/mockData';

export type TimeRange = 'mensual' | 'trimestral' | 'anual';

export default function ConsumptionPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('mensual');
  const [rangeData, setRangeData] = useState<RangePoint[]>([]);
  const [summary, setSummary] = useState<StatsSummary | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [newRangeData, newSummary] = await Promise.all([
        getRangeData(timeRange),
        getSummary()
      ]);
      setRangeData(newRangeData);
      setSummary(newSummary);
    };
    fetchData();
  }, [timeRange]);

  return (
    <div className="min-h-screen bg-app-bg font-sans">
      <Header />
      <div className="max-w-[1440px] mx-auto px-6 py-6">
        <div className="grid grid-cols-[240px_1fr_auto] gap-6 items-start">
          <Sidebar />
          
          <main className="flex flex-col w-full h-full overflow-hidden">
            <h2 className="text-[20px] font-semibold text-text-primary mb-4">
              Historial de Consumo
            </h2>

            <div className="flex gap-6 items-start w-full">
              <div className="flex-shrink-0">
                <ViewRangeFilter timeRange={timeRange} onChange={setTimeRange} />
              </div>

              <div className="flex-1 flex flex-col gap-8 min-w-0">
                {summary && <ConsumptionKPIs summary={summary} />}
                
                <div className="mt-2">
                  {summary && rangeData.length > 0 && (
                    <ConsumptionTrendsChart timeRange={timeRange} data={rangeData} summary={summary} />
                  )}
                </div>
                
                <div className="w-full max-w-[500px]">
                  <UsageByCategory />
                </div>
              </div>
            </div>
          </main>

          <div className="sticky top-[88px]">
            <InsightsPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
