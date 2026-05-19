import Header from '@/src/components/layout/Header';
import Sidebar from '@/src/components/layout/Sidebar';
import StatCards from '@/src/components/dashboard/StatCards';
import EnergyChart from '@/src/components/charts/EnergyChart';
import ApplianceTable from '@/src/components/dashboard/ApplianceTable';
import InsightsPanel from '@/src/components/dashboard/InsightsPanel';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Header />
      <div className="w-full px-6 py-6 flex-grow">
        <div className="max-w-[1440px] mx-auto w-full grid grid-cols-[240px_1fr_auto] gap-6 items-start">
          <Sidebar />
          
          <main className="flex flex-col gap-6 w-full min-w-0">
            <StatCards />
            <EnergyChart />
            <ApplianceTable />
          </main>
          
          <InsightsPanel />
        </div>
      </div>
    </div>
  );
}
