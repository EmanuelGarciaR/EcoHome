import React from 'react';
import Header from '@/src/components/layout/Header';
import Sidebar from '@/src/components/layout/Sidebar';
import AlertCard from '@/src/components/alerts/AlertCard';
import AchievementCard from '@/src/components/alerts/AchievementCard';
import MilestoneProgress from '@/src/components/alerts/MilestoneProgress';
import { mockAlertKpis, mockAlerts, mockAchievements, mockNextMilestone } from '@/src/lib/mockData';
import { Bell, Leaf, Zap, Calendar } from 'lucide-react';

export default function AlertsPage() {
  const kpis = [
    { label: 'Alertas no leídas', value: mockAlertKpis.unreadAlerts, icon: <Bell size={20} className="text-blue-500" />, iconBg: 'bg-blue-50', border: 'border-blue-500' },
    { label: 'Impacto Mensual', value: mockAlertKpis.monthlyImpact, icon: <Leaf size={20} className="text-brand" />, iconBg: 'bg-success-bg', border: 'border-brand' },
    { label: 'Puntuación de Eficiencia', value: mockAlertKpis.efficiencyScore, icon: <Zap size={20} className="text-text-primary" />, iconBg: 'bg-app-bg', border: 'border-border-light' },
    { label: 'Próximo Reporte En', value: `${mockAlertKpis.nextReportDays} Días`, icon: <Calendar size={20} className="text-brand" />, iconBg: 'bg-success-bg', border: 'border-brand' }
  ];

  return (
    <div className="min-h-screen bg-app-bg font-sans">
      <Header />
      <div className="max-w-[1440px] mx-auto px-6 py-6">
        <div className="grid grid-cols-[240px_1fr] gap-8 items-start">
          <Sidebar />
          
          <main className="flex flex-col w-full h-full overflow-hidden">
            {/* KPI Row */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {kpis.map((kpi, i) => (
                <div key={i} className={`bg-white border rounded-[12px] p-4 flex items-center gap-4 shadow-sm ${kpi.border}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${kpi.iconBg}`}>
                    {kpi.icon}
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-text-muted mb-0.5">{kpi.label}</div>
                    <div className="text-[20px] font-bold text-text-primary leading-tight">{kpi.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-8 items-start w-full">
              {/* Left Column - Smart Alerts */}
              <div className="flex-1 flex flex-col min-w-0">
                <header className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <h2 className="text-[18px] font-bold text-text-primary">Alertas Inteligentes</h2>
                    <span className="bg-success-bg text-brand text-[10px] font-bold px-2 py-0.5 rounded-full">Nuevo</span>
                  </div>
                  <a href="#" className="text-[13px] font-semibold text-text-muted hover:text-text-primary transition-colors">
                    Ver Historial Completo
                  </a>
                </header>

                <div className="flex flex-col gap-4">
                  {mockAlerts.map(alert => (
                    <AlertCard key={alert.id} alert={alert} />
                  ))}
                </div>

                <button className="w-full mt-6 py-4 bg-white border border-border-light rounded-[12px] text-[13px] font-bold text-text-muted hover:bg-gray-50 transition-colors border-dashed">
                  Cargar notificaciones anteriores
                </button>
              </div>

              {/* Right Column - Achievements */}
              <div className="w-[320px] flex-shrink-0 flex flex-col">
                <header className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <h2 className="text-[18px] font-bold text-text-primary">Logros</h2>
                    <span className="bg-[#E6F5F0] text-brand text-[10px] font-bold px-2 py-0.5 rounded-full">Nivel 4 Eco-Héroe</span>
                  </div>
                  <a href="#" className="text-[13px] font-semibold text-text-muted hover:text-text-primary transition-colors">
                    Clasificaciones
                  </a>
                </header>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {mockAchievements.map(achievement => (
                    <AchievementCard key={achievement.id} achievement={achievement} />
                  ))}
                </div>

                <MilestoneProgress milestone={mockNextMilestone} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
