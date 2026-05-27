import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AuthNavbar() {
  return (
    <nav className="w-full bg-white/40 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 transition-all">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <Image 
                src="/icono_ecohome.png" 
                alt="EcoHome Logo" 
                width={32} 
                height={32} 
                className="rounded-md transition-transform duration-300 group-hover:scale-105" 
              />
              <span className="text-xl font-bold bg-gradient-to-r from-brand to-brand-hover bg-clip-text text-transparent">
                EcoHome
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-6">
            {/* Future links can go here */}
          </div>
        </div>
      </div>
    </nav>
  );
}
