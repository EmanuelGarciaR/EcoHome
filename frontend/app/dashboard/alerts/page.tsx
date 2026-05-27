'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import AlertCard from '@/components/alerts/AlertCard';
import AchievementCard from '@/components/alerts/AchievementCard';
import MilestoneProgress from '@/components/alerts/MilestoneProgress';
import AlertHistoryDrawer from '@/components/alerts/AlertHistoryDrawer';
import { Alert, mockAlertKpis, mockAlerts, mockOlderAlerts, mockAchievements, mockNextMilestone } from '@/lib/mockData';
import { Bell, Leaf, Zap, Calendar, X, Loader2 } from 'lucide-react';

export default function AlertsPage() {
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  
  const [visibleAlerts, setVisibleAlerts] = useState<Alert[]>(mockAlerts);
  const [isLoadingOlder, setIsLoadingOlder] = useState(false);
  const [hasLoadedOlder, setHasLoadedOlder] = useState(false);
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [highlightedAlertId, setHighlightedAlertId] = useState<string | null>(null);

  const handleSelectFromHistory = (id: string) => {
    setIsDrawerOpen(false);
    
    // Ensure alert is visible if it's from older alerts
    if (!visibleAlerts.find(a => a.id === id)) {
      setVisibleAlerts(prev => [...prev, ...mockOlderAlerts]);
      setHasLoadedOlder(true);
    }
    
    setHighlightedAlertId(id);
    setTimeout(() => {
      setHighlightedAlertId(null);
    }, 800);

    const alert = [...mockAlerts, ...mockOlderAlerts].find(a => a.id === id);
    if (alert) {
      setSelectedAlert(alert);
    }
  };

  const handleLoadOlder = () => {
    setIsLoadingOlder(true);
    setTimeout(() => {
      setVisibleAlerts(prev => [...prev, ...mockOlderAlerts]);
      setIsLoadingOlder(false);
      setHasLoadedOlder(true);
    }, 1200);
  };

  const handleMarkRead = (id: string) => {
    setReadIds(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const kpis = [
    { label: 'Alertas no leídas', value: Math.max(0, mockAlertKpis.unreadAlerts - readIds.size), icon: <Bell size={20} className="text-blue-500" />, iconBg: 'bg-blue-50', border: 'border-blue-500' },
    { label: 'Impacto Mensual', value: mockAlertKpis.monthlyImpact, icon: <Leaf size={20} className="text-brand" />, iconBg: 'bg-success-bg', border: 'border-brand' },
    { label: 'Puntuación de Eficiencia', value: mockAlertKpis.efficiencyScore, icon: <Zap size={20} className="text-text-primary" />, iconBg: 'bg-app-bg', border: 'border-border-light' },
    { label: 'Próximo Reporte En', value: `${mockAlertKpis.nextReportDays} Días`, icon: <Calendar size={20} className="text-brand" />, iconBg: 'bg-success-bg', border: 'border-brand' }
  ];

  return (
    <div className="min-h-screen bg-app-bg font-sans">
      <Header />
      <div className="max-w-[1440px] mx-auto px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <Sidebar />
          
          <main className="flex flex-col w-full h-full overflow-hidden">
            {/* KPI Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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

            <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
              {/* Left Column - Smart Alerts */}
              <div className="flex-1 flex flex-col min-w-0">
                <header className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <h2 className="text-[18px] font-bold text-text-primary">Alertas Inteligentes</h2>
                    <span className="bg-success-bg text-brand text-[10px] font-bold px-2 py-0.5 rounded-full">Nuevo</span>
                  </div>
                  <button onClick={() => setIsDrawerOpen(true)} className="text-[13px] font-semibold text-text-muted hover:text-text-primary transition-colors">
                    Ver Historial Completo
                  </button>
                </header>

                <div className="flex flex-col gap-4">
                  {visibleAlerts.map(alert => (
                    <AlertCard 
                      key={alert.id} 
                      alert={alert} 
                      isRead={readIds.has(alert.id)} 
                      isHighlighted={highlightedAlertId === alert.id}
                      onMarkRead={() => handleMarkRead(alert.id)} 
                      onViewDetails={() => setSelectedAlert(alert)}
                    />
                  ))}
                </div>

                {!hasLoadedOlder ? (
                  <button 
                    onClick={handleLoadOlder}
                    disabled={isLoadingOlder}
                    className="w-full mt-6 py-4 bg-white border border-border-light rounded-[12px] text-[13px] font-bold text-text-muted hover:bg-gray-50 transition-colors border-dashed flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isLoadingOlder ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Cargando...
                      </>
                    ) : (
                      'Cargar notificaciones anteriores'
                    )}
                  </button>
                ) : (
                  <div className="w-full mt-6 py-4 text-center text-[13px] font-bold text-text-muted">
                    Has visto todas las notificaciones ✓
                  </div>
                )}
              </div>

              {/* Right Column - Achievements */}
              <div className="w-full lg:w-[320px] flex-shrink-0 flex flex-col">
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

      {/* Details Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelectedAlert(null)}>
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg" onClick={e => e.stopPropagation()}>
            <header className="flex justify-between items-start mb-4">
              <h3 className="text-[18px] font-bold text-text-primary pr-4">{selectedAlert.title}</h3>
              <button onClick={() => setSelectedAlert(null)} className="text-text-muted hover:text-text-primary">
                <X size={20} />
              </button>
            </header>
            <div className="text-[14px] text-text-secondary leading-relaxed mb-6">
              {selectedAlert.description}
            </div>
            
            <div className="flex justify-end pt-4 border-t border-border-light">
              <button 
                onClick={() => setSelectedAlert(null)} 
                className="px-4 py-2 bg-app-bg hover:bg-gray-200 text-text-primary rounded-[10px] text-[13px] font-bold transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* History Drawer */}
      <AlertHistoryDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        alerts={[...mockAlerts, ...mockOlderAlerts]}
        onSelectAlert={handleSelectFromHistory}
      />
    </div>
  );
}
