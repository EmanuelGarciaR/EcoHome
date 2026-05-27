'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import InsightsPanel from '@/components/dashboard/InsightsPanel';

import ViewRangeFilter from '@/components/consumption/ViewRangeFilter';
import ConsumptionKPIs from '@/components/consumption/ConsumptionKPIs';
import ConsumptionTrendsChart from '@/components/consumption/ConsumptionTrendsChart';

import { getRangeData, getSummary } from '@/lib/api';
import { RangePoint, StatsSummary } from '@/lib/mockData';

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
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <Sidebar />
          
          <main className="flex flex-col w-full h-full overflow-hidden lg:flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[20px] font-semibold text-text-primary">
                Historial de Consumo
              </h2>
              <ViewRangeFilter timeRange={timeRange} onChange={setTimeRange} />
            </div>

            <div className="flex flex-col gap-8 w-full">
              {summary && <ConsumptionKPIs summary={summary} />}
              
              <div className="mt-2 w-full">
                {summary && rangeData.length > 0 && (
                  <ConsumptionTrendsChart timeRange={timeRange} data={rangeData} summary={summary} />
                )}
              </div>
            </div>
          </main>

          <div className="w-full lg:w-auto lg:sticky lg:top-[88px]">
            <InsightsPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
