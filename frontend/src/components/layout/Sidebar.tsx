import React from 'react';
import { LayoutDashboard, Zap, Bell, FileText, Leaf } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-[240px] bg-app-card border-r border-border-light p-5 flex flex-col justify-between h-[calc(100vh-64px)] sticky top-[64px]">
      
      {/* Top Area */}
      <div>
        {/* User Profile */}
        <div className="flex items-center gap-3 mb-8 px-1">
          <div className="w-10 h-10 rounded-full bg-app-bg overflow-hidden flex-shrink-0">
            {/* Avatar placeholder */}
            <img src="https://ui-avatars.com/api/?name=Julian+R&background=EDEEF1&color=141D1C" alt="Julian R." className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="font-bold text-text-primary text-sm">Julian R.</div>
            <div className="text-text-muted text-xs">Eco Enthusiast</div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex flex-col gap-2">
          {/* Active Item */}
          <a href="#" className="flex items-center gap-3 h-[40px] px-3 rounded-[10px] bg-success-bg text-brand border-l-3 border-brand font-semibold transition-colors">
            <LayoutDashboard size={18} />
            <span className="text-sm">Dashboard</span>
          </a>
          
          {/* Inactive Items */}
          <a href="#" className="flex items-center gap-3 h-[40px] px-3 rounded-[10px] text-text-secondary hover:bg-app-bg hover:text-text-primary transition-colors">
            <Zap size={18} />
            <span className="text-sm">Consumption</span>
          </a>
          
          <a href="#" className="flex items-center gap-3 h-[40px] px-3 rounded-[10px] text-text-secondary hover:bg-app-bg hover:text-text-primary transition-colors">
            <Bell size={18} />
            <span className="text-sm">Alerts</span>
          </a>
          
          <a href="#" className="flex items-center gap-3 h-[40px] px-3 rounded-[10px] text-text-secondary hover:bg-app-bg hover:text-text-primary transition-colors">
            <FileText size={18} />
            <span className="text-sm">Reports</span>
          </a>
        </nav>
      </div>

      {/* Bottom Area - Eco Status */}
      <article aria-label="Eco Status" className="bg-success-bg rounded-2xl p-4 border border-border-subtle mt-4">
        <div className="flex items-center gap-2 mb-2">
          <Leaf size={16} className="text-brand" />
          <span className="font-semibold text-text-primary text-sm">Eco Status</span>
        </div>
        <p className="text-xs text-brand mb-3 leading-tight font-medium">
          You are in the top 5% of energy savers in Bogotá this month!
        </p>
        <button className="w-full bg-app-card border border-brand text-brand text-xs font-semibold py-2 rounded-xl shadow-sm hover:bg-brand hover:text-white transition-colors">
          View Achievement
        </button>
      </article>
    </aside>
  );
}
