import React from 'react';
import AuthNavbar from '@/components/layout/AuthNavbar';
import Footer from '@/components/layout/Footer';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-app-bg flex flex-col relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 bg-white skew-y-12"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-soft blur-3xl rounded-full mix-blend-multiply opacity-70"></div>
      <div className="absolute top-24 -right-24 w-96 h-96 bg-brand/10 blur-3xl rounded-full mix-blend-multiply opacity-70"></div>
      
      {/* Top Navigation */}
      <AuthNavbar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative z-10 w-full py-4">
        <div className="w-full max-w-md">
          {/* Form Card */}
          <div className="bg-white/80 backdrop-blur-xl py-6 px-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:rounded-3xl sm:px-10 border border-white/60">
            {children}
          </div>
        </div>
      </main>

      {/* Footer */}
      <div className="z-10">
        <Footer />
      </div>
    </div>
  );
}
