import React from 'react';
import { Settings, Download } from 'lucide-react';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="h-[64px] bg-app-card border-b border-border-light px-6 flex items-center justify-between w-full">
      {/* Left */}
      <div className="flex items-center gap-3">
        <Image src="/eco_home_logo.png" alt="EcoHome Logo" width={32} height={32} className="rounded-md" />
        <h1 className="text-[20px] font-semibold text-text-primary">
          EcoHome Dashboard
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* 1. Badge Live Tracking */}
        <div className="flex items-center bg-success-bg text-success-text px-3 py-1.5 rounded-full text-[12px] font-medium">
          <span className="w-2 h-2 bg-success-text rounded-full animate-pulse mr-2"></span>
          Live Tracking
        </div>

        {/* 2. Toggle Hourly / Daily */}
        <div className="flex items-center bg-app-bg rounded-full p-1 border border-border-subtle">
          <button className="px-3 py-1 text-sm bg-app-card rounded-full shadow-sm text-text-primary font-medium transition-colors">
            Hourly
          </button>
          <button className="px-3 py-1 text-sm text-text-muted hover:text-text-primary transition-colors">
            Daily
          </button>
        </div>

        {/* 3. Icons */}
        <div className="flex items-center gap-3 ml-2 border-l border-border-light pl-4">
          <button className="text-text-secondary hover:text-text-primary transition-colors">
            <Download size={20} />
          </button>
          <button className="text-text-secondary hover:text-text-primary transition-colors">
            <Settings size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
