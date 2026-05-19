import React from 'react';
import { Alert } from '@/src/lib/mockData';
import { TrendingDown, AlertCircle, Leaf, Calendar, Award, Check } from 'lucide-react';

interface AlertCardProps {
  alert: Alert;
}

export default function AlertCard({ alert }: AlertCardProps) {
  const getBorderColor = (type: string) => {
    switch (type) {
      case 'savings': return 'border-l-[#1D9E75]';
      case 'peak': return 'border-l-[#EF4444]';
      case 'carbon': return 'border-l-[#1D9E75]';
      case 'scheduling': return 'border-l-[#3B82F6]';
      case 'achievement': return 'border-l-[#8B5CF6]';
      default: return 'border-l-gray-300';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'savings': return <TrendingDown size={18} className="text-[#1D9E75]" />;
      case 'peak': return <AlertCircle size={18} className="text-[#EF4444]" />;
      case 'carbon': return <Leaf size={18} className="text-[#1D9E75]" />;
      case 'scheduling': return <Calendar size={18} className="text-[#3B82F6]" />;
      case 'achievement': return <Award size={18} className="text-[#8B5CF6]" />;
      default: return null;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case 'savings': return 'bg-[#1D9E75]/10';
      case 'peak': return 'bg-[#EF4444]/10';
      case 'carbon': return 'bg-[#1D9E75]/10';
      case 'scheduling': return 'bg-[#3B82F6]/10';
      case 'achievement': return 'bg-[#8B5CF6]/10';
      default: return 'bg-gray-100';
    }
  };

  return (
    <article className={`bg-app-card border border-border-light rounded-[12px] p-5 flex gap-4 ${getBorderColor(alert.type)} border-l-[4px] shadow-sm`}>
      {/* Icon */}
      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getIconBg(alert.type)}`}>
        {getIcon(alert.type)}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-text-primary text-[15px]">{alert.title}</h3>
          </div>
          <span className="text-xs text-text-muted whitespace-nowrap">{alert.timeAgo}</span>
        </div>

        <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed mb-3">
          {alert.description}
        </p>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {alert.highlightText && (
              <span className={`text-[12px] font-bold px-2 py-0.5 rounded-full ${
                alert.highlightType === 'saving' ? 'bg-success-bg text-brand' :
                alert.highlightType === 'warning' ? 'bg-red-50 text-red-600' :
                alert.highlightType === 'tip' ? 'bg-blue-50 text-blue-600' :
                'bg-app-bg text-text-secondary'
              }`}>
                {alert.highlightText}
              </span>
            )}
            {alert.isNew && (
              <span className="text-[10px] font-bold uppercase tracking-wider bg-app-bg text-text-secondary px-2 py-0.5 rounded-full">
                {alert.highlightType === 'saving' ? 'Ahorro' :
                 alert.highlightType === 'warning' ? 'Aviso' :
                 alert.highlightType === 'milestone' ? 'Logro' :
                 alert.highlightType === 'tip' ? 'Consejo' : alert.highlightType}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            {alert.isNew && (
              <button className="text-[12px] font-semibold text-brand flex items-center gap-1 hover:underline">
                <Check size={14} /> Marcar como leído
              </button>
            )}
            <button className="text-[13px] font-semibold text-text-primary hover:underline">
              Ver Detalles
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
