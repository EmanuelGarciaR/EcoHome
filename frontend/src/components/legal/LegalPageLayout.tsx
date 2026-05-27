import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-app-bg">
      {/* Header */}
      <div className="bg-app-card border-b border-border-subtle">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-text-muted hover:text-brand text-[13px] mb-4 transition-colors cursor-pointer"
          >
            <ArrowLeft size={15} />
            Volver al Dashboard
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <Image
              src="/icono_ecohome.png"
              alt="EcoHome"
              width={24}
              height={24}
              className="object-contain"
            />
            <span className="text-[13px] font-semibold text-brand">EcoHome</span>
          </div>
          <h1 className="text-[28px] font-extrabold text-text-primary">{title}</h1>
          <p className="text-[13px] text-text-muted mt-1">
            Última actualización: {lastUpdated}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-10">
        <article className="bg-app-card rounded-2xl border border-border-subtle p-8 prose-custom">
          {children}
        </article>
      </div>
    </div>
  );
}
