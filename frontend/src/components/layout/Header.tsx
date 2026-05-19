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
          Panel de EcoHome
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* 1. Badge Live Tracking */}
        <div className="flex items-center bg-success-bg text-success-text px-3 py-1.5 rounded-full text-[12px] font-medium">
          <span className="w-2 h-2 bg-success-text rounded-full animate-pulse mr-2"></span>
          Seguimiento en Vivo
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
