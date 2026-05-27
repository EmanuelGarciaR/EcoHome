import React from 'react';
import { Alert } from '@/lib/mockData';
import { TrendingDown, AlertCircle, Leaf, Calendar, Award, Check, CheckCheck } from 'lucide-react';

interface AlertCardProps {
  alert: Alert;
  isRead?: boolean;
  isHighlighted?: boolean;
  onMarkRead?: () => void;
  onViewDetails?: () => void;
}

export default function AlertCard({ alert, isRead = false, isHighlighted = false, onMarkRead, onViewDetails }: AlertCardProps) {
  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'savings': return { border: 'border-l-[#1D9E75]', badgeBg: 'bg-[#D1FAE5]', badgeText: 'text-[#065F46]', iconColor: 'text-[#1D9E75]', iconBg: 'bg-[#1D9E75]/10' };
      case 'peak': return { border: 'border-l-[#EF4444]', badgeBg: 'bg-[#FEE2E2]', badgeText: 'text-[#991B1B]', iconColor: 'text-[#EF4444]', iconBg: 'bg-[#EF4444]/10' };
      case 'carbon': return { border: 'border-l-[#3B82F6]', badgeBg: 'bg-[#DBEAFE]', badgeText: 'text-[#1E40AF]', iconColor: 'text-[#3B82F6]', iconBg: 'bg-[#3B82F6]/10' };
      case 'scheduling': return { border: 'border-l-[#8B5CF6]', badgeBg: 'bg-[#EDE9FE]', badgeText: 'text-[#5B21B6]', iconColor: 'text-[#8B5CF6]', iconBg: 'bg-[#8B5CF6]/10' };
      case 'achievement': return { border: 'border-l-[#F59E0B]', badgeBg: 'bg-[#FEF3C7]', badgeText: 'text-[#92400E]', iconColor: 'text-[#F59E0B]', iconBg: 'bg-[#F59E0B]/10' };
      default: return { border: 'border-l-gray-300', badgeBg: 'bg-gray-100', badgeText: 'text-gray-800', iconColor: 'text-gray-500', iconBg: 'bg-gray-100' };
    }
  };

  const getIcon = (type: string, colorClass: string) => {
    switch (type) {
      case 'savings': return <TrendingDown size={18} className={colorClass} />;
      case 'peak': return <AlertCircle size={18} className={colorClass} />;
      case 'carbon': return <Leaf size={18} className={colorClass} />;
      case 'scheduling': return <Calendar size={18} className={colorClass} />;
      case 'achievement': return <Award size={18} className={colorClass} />;
      default: return null;
    }
  };

  const styles = getTypeStyles(alert.type);
  const showNew = alert.isNew && !isRead;

  return (
    <article className={`border border-border-light rounded-[12px] p-5 flex gap-4 ${styles.border} border-l-[4px] shadow-sm relative transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-default ${isHighlighted ? 'bg-yellow-50' : 'bg-app-card'} ${isRead ? 'opacity-60 hover:opacity-100' : 'opacity-100'}`}>
      
      {/* Icon */}
      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${styles.iconBg}`}>
        {getIcon(alert.type, styles.iconColor)}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-text-primary text-[15px]">{alert.title}</h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-text-muted whitespace-nowrap">{alert.timeAgo}</span>
            {showNew && (
              <button onClick={onMarkRead} className="cursor-pointer hover:opacity-80 transition-opacity" title="Marcar como leído">
                <CheckCheck size={18} color="#9CA3AF" />
              </button>
            )}
            {!showNew && isRead && (
              <CheckCheck size={18} color="#1D9E75" />
            )}
          </div>
        </div>

        <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed mb-3">
          {alert.description}
        </p>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {alert.highlightText && (
              <span className={`text-[12px] font-bold px-2 py-0.5 rounded-full ${styles.badgeBg} ${styles.badgeText}`}>
                {alert.highlightText}
              </span>
            )}
            {showNew && (
              <span className="text-[10px] font-bold uppercase tracking-wider bg-app-bg text-text-secondary px-2 py-0.5 rounded-full">
                Nuevo
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            {showNew && (
              <button onClick={onMarkRead} className="text-[12px] font-semibold text-brand flex items-center gap-1 hover:underline">
                <Check size={14} /> Marcar como leído
              </button>
            )}
            <button onClick={onViewDetails} className="text-[13px] font-semibold text-text-primary hover:underline">
              Ver Detalles
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
