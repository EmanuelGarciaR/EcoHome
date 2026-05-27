'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, History, Bell, FileText } from 'lucide-react';

export default function MobileNav() {
  const pathname = usePathname();

  // Do not show MobileNav on auth pages like /login or /signup
  if (pathname === '/login' || pathname === '/signup') return null;

  const links = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/dashboard/consumption', label: 'Historial', icon: History },
    { href: '/dashboard/alerts', label: 'Alertas', icon: Bell },
    { href: '/dashboard/reports', label: 'Reportes', icon: FileText },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border-subtle pb-safe z-50">
      <div className="flex justify-around items-center h-[60px]">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.href} 
              href={link.href} 
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
                isActive ? 'text-brand font-bold' : 'text-text-muted hover:text-text-primary'
              }`}
            >
              <Icon size={20} />
              <span className="text-[10px]">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
