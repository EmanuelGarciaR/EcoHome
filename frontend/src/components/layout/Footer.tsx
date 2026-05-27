'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full border-t border-border-subtle bg-app-card mt-auto">
      <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between gap-4 flex-wrap">

        {/* Logo + tagline */}
        <div className="flex items-center gap-2">
          <Image
            src="/icono_ecohome.png"
            alt="EcoHome"
            width={28}
            height={28}
            className="object-contain"
          />
          <span className="text-[14px] font-bold text-text-primary">EcoHome</span>
        </div>

        {/* Legal links */}
        <nav className="flex items-center gap-5" aria-label="Enlaces legales">
          <Link
            href="/legal/terminos"
            className="text-[13px] text-text-muted hover:text-brand transition-colors cursor-pointer"
          >
            Términos y Condiciones
          </Link>
          <Link
            href="/legal/privacidad"
            className="text-[13px] text-text-muted hover:text-brand transition-colors cursor-pointer"
          >
            Política de Tratamiento de Datos
          </Link>
        </nav>

        {/* Copyright */}
        <p className="text-[12px] text-text-muted whitespace-nowrap">
          © {new Date().getFullYear()} EcoHome Inc.
        </p>

      </div>
    </footer>
  );
}
