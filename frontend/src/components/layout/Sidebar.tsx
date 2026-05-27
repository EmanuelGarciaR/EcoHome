'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Zap, Bell, FileText, Leaf } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Consumo', href: '/dashboard/consumption', icon: Zap },
    { name: 'Alertas', href: '/dashboard/alerts', icon: Bell },
    { name: 'Reportes', href: '/dashboard/reports', icon: FileText },
  ];

  return (
    <aside className="hidden lg:flex w-[240px] flex-shrink-0 bg-app-card border-r border-border-light p-5 flex-col justify-between h-[calc(100vh-64px)] sticky top-[64px] z-10">

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
            <div className="text-text-muted text-xs">Entusiasta Ecológico</div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex flex-col gap-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-6 h-[48px] px-4 rounded-[10px] transition-colors ${isActive
                  ? 'bg-success-bg text-brand border-l-4 border-brand font-semibold'
                  : 'text-text-secondary hover:bg-app-bg hover:text-text-primary'
                  }`}
              >
                <Icon size={20} />
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Area - Eco Status */}
      {/* <article aria-label="Eco Status" className="bg-success-bg rounded-2xl p-4 border border-border-subtle mt-4">
        <div className="flex items-center gap-2 mb-2">
          <Leaf size={16} className="text-brand" />
          <span className="font-semibold text-text-primary text-sm">Estado Ecológico</span>
        </div>
        <p className="text-xs text-brand mb-3 leading-tight font-medium">
          ¡Estás en el 5% superior de ahorradores de energía en Bogotá este mes!
        </p>
        <button className="w-full bg-app-card border border-brand text-brand text-xs font-semibold py-2 rounded-xl shadow-sm hover:bg-brand hover:text-white transition-colors">
          Ver Logro
        </button>
      </article> */}
    </aside>
  );
}
