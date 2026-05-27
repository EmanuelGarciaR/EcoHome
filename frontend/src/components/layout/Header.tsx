'use client';

import React from 'react';
import { Settings, Download, LogOut } from 'lucide-react';
import Image from 'next/image';
import { useSession, signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  const userName = session?.user?.name || 'Usuario';
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
    <header className="h-[64px] bg-app-card border-b border-border-light px-6 flex items-center justify-between w-full">
      {/* Left */}
      <div className="flex items-center gap-3">
        <Image src="/icono_ecohome.png" alt="EcoHome Logo" width={32} height={32} className="rounded-md" />
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

        {/* 2. User info (visible on desktop) */}
        <div className="hidden md:flex items-center gap-2 border-l border-border-light pl-4">
          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
            <img 
              src={`https://ui-avatars.com/api/?name=${avatarName}&background=EDEEF1&color=141D1C&size=32`} 
              alt={userName} 
              className="w-full h-full object-cover" 
            />
          </div>
          <span className="text-sm font-medium text-text-primary max-w-[120px] truncate">{userName}</span>
        </div>

        {/* 3. Icons */}
        <div className="flex items-center gap-3 ml-2 border-l border-border-light pl-4">
          <button className="text-text-secondary hover:text-text-primary transition-colors">
            <Download size={20} />
          </button>
          <button className="text-text-secondary hover:text-text-primary transition-colors">
            <Settings size={20} />
          </button>
          {/* Logout button visible on mobile (where sidebar is hidden) */}
          <button 
            onClick={handleSignOut}
            className="lg:hidden text-red-400 hover:text-red-500 transition-colors"
            title="Cerrar sesión"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
