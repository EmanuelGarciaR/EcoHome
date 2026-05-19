import React from 'react';
import { Alert } from '@/src/lib/mockData';
import { X } from 'lucide-react';

interface AlertHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: Alert[];
  onSelectAlert: (id: string) => void;
}

export default function AlertHistoryDrawer({ isOpen, onClose, alerts, onSelectAlert }: AlertHistoryDrawerProps) {
  const getDotColor = (type: string) => {
    switch (type) {
      case 'savings': return 'bg-[#1D9E75]';
      case 'peak': return 'bg-[#EF4444]';
      case 'carbon': return 'bg-[#3B82F6]';
      case 'scheduling': return 'bg-[#8B5CF6]';
      case 'achievement': return 'bg-[#F59E0B]';
      default: return 'bg-gray-300';
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={onClose}
        ></div>
      )}

      {/* Drawer */}
      <aside 
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="px-6 py-5 border-b border-border-light flex justify-between items-center bg-app-bg">
          <h2 className="text-[18px] font-bold text-text-primary">Historial de notificaciones</h2>
          <button onClick={onClose} className="text-text-muted hover:text-text-primary transition-colors">
            <X size={20} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto">
          <ul className="flex flex-col">
            {alerts.map(alert => (
              <li 
                key={alert.id}
                className="px-6 border-b border-border-light flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors h-[44px]"
                onClick={() => onSelectAlert(alert.id)}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${getDotColor(alert.type)}`}></span>
                  <span className="text-[14px] text-text-primary font-medium truncate">{alert.title}</span>
                </div>
                <span className="text-[12px] text-text-muted flex-shrink-0 ml-4">{alert.timeAgo}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
