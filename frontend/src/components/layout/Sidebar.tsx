'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Zap, Bell, FileText, LogOut, ChevronRight } from 'lucide-react';
import { useSession, signOut } from '@/lib/auth-client';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Consumo', href: '/dashboard/consumption', icon: Zap },
    { name: 'Alertas', href: '/dashboard/alerts', icon: Bell },
    { name: 'Reportes', href: '/dashboard/reports', icon: FileText },
  ];

  const userName = session?.user?.name || 'Usuario';
  const userEmail = session?.user?.email || '';
  // Build initials for the avatar service
  const avatarName = userName.replace(/\s+/g, '+');

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/login');
        }
      }
    });
  };

  return (
    <aside className="sidebar-container hidden lg:flex w-[260px] flex-shrink-0 flex-col justify-between h-[calc(100vh-64px)] sticky top-[64px] z-10">

      {/* Top Area */}
      <div className="flex flex-col gap-6">

        {/* ── User Profile Card ── */}
        <div className="sidebar-profile-card">
          <div className="sidebar-avatar-wrap">
            <img
              src={`https://ui-avatars.com/api/?name=${avatarName}&background=29C76C&color=fff&bold=true&size=80`}
              alt={userName}
              className="sidebar-avatar-img"
            />
            <span className="sidebar-online-dot" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="sidebar-user-name">{userName}</div>
            <div className="sidebar-user-email">{userEmail}</div>
          </div>
        </div>

        {/* ── Section Label ── */}
        <div className="sidebar-section-label">
          <span>MENÚ PRINCIPAL</span>
          <span className="sidebar-section-line" />
        </div>

        {/* ── Navigation ── */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`sidebar-nav-item ${isActive ? 'sidebar-nav-active' : ''}`}
              >
                <span className="sidebar-nav-icon-wrap">
                  <Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
                </span>
                <span className="sidebar-nav-label">{item.name}</span>
                {isActive && (
                  <ChevronRight size={14} className="sidebar-nav-chevron" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ── Bottom Area - Sign Out ── */}
      <div className="sidebar-bottom">
        <button
          onClick={handleSignOut}
          className="sidebar-signout-btn"
        >
          <LogOut size={18} />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}
