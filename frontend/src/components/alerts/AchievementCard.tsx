import React from 'react';
import { Achievement } from '@/lib/mockData';
import { Leaf, Zap, Cloud, Sun } from 'lucide-react';

interface AchievementCardProps {
  achievement: Achievement;
}

export default function AchievementCard({ achievement }: AchievementCardProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'leaf': return <Leaf size={24} className="text-brand" />;
      case 'zap': return <Zap size={24} className="text-blue-500" />;
      case 'cloud': return <Cloud size={24} className="text-brand" />;
      case 'sun': return <Sun size={24} className="text-amber-500" />;
      default: return null;
    }
  };

  const getIconBg = (iconName: string) => {
    switch (iconName) {
      case 'leaf': return 'bg-success-bg';
      case 'zap': return 'bg-blue-100';
      case 'cloud': return 'bg-success-bg';
      case 'sun': return 'bg-amber-100';
      default: return 'bg-gray-100';
    }
  };

  return (
    <article className="bg-app-card border border-border-light rounded-[16px] p-6 flex flex-col items-center text-center shadow-sm">
      <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${getIconBg(achievement.icon)}`}>
        {getIcon(achievement.icon)}
      </div>
      <h3 className="text-[24px] font-bold text-text-primary leading-tight mb-1">{achievement.value}</h3>
      <div className="text-[13px] font-bold text-text-primary mb-1">{achievement.label}</div>
      <p className="text-[11px] text-text-muted leading-tight">{achievement.subtext}</p>
    </article>
  );
}
