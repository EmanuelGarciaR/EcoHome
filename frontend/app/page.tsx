'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Zap,
  BarChart3,
  Bell,
  BrainCircuit,
  FileText,
  Monitor,
  ChevronRight,
  Leaf,
  Shield,
  TrendingDown,
  ArrowRight,
} from 'lucide-react';

/* ──────────────────────────── helpers ──────────────────────────── */

function useIntersectionFade() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('landing-visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function FadeInSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useIntersectionFade();
  return (
    <div ref={ref} className={`landing-fade-in ${className}`}>
      {children}
    </div>
  );
}

/* ──────────────────────────── data ──────────────────────────── */

const features = [
  {
    icon: BarChart3,
    title: 'Visualización de Consumo',
    description:
      'Gráficos e indicadores claros y fáciles de entender para monitorear tu consumo eléctrico en tiempo real.',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    icon: Bell,
    title: 'Alertas Personalizadas',
    description:
      'Notificaciones inteligentes cuando se detecten consumos inusuales o elevados en tu hogar.',
    color: 'from-amber-400 to-orange-500',
  },
  {
    icon: BrainCircuit,
    title: 'Asistente con IA',
    description:
      'Inteligencia artificial que analiza tus patrones de consumo y te ofrece recomendaciones para ahorrar.',
    color: 'from-violet-400 to-purple-600',
  },
  {
    icon: FileText,
    title: 'Informes Automáticos',
    description:
      'Reportes periódicos generados automáticamente para que tengas un seguimiento constante de tu consumo.',
    color: 'from-sky-400 to-blue-600',
  },
  {
    icon: Monitor,
    title: 'Interfaz Intuitiva',
    description:
      'Diseñada para que cualquier persona, incluso sin conocimientos técnicos, pueda interpretar la información.',
    color: 'from-pink-400 to-rose-500',
  },
  {
    icon: TrendingDown,
    title: 'Reduce tu Factura',
    description:
      'Transforma datos de consumo en información útil para reducir costos y adoptar hábitos más eficientes.',
    color: 'from-lime-400 to-green-600',
  },
];

const steps = [
  {
    num: '01',
    title: 'Conecta el Dispositivo',
    description: 'Instala el sensor EcoHome en los enchufes de tu hogar. Mide el consumo de cada electrodoméstico en tiempo real.',
  },
  {
    num: '02',
    title: 'Visualiza tus Datos',
    description: 'Accede a la plataforma web y visualiza gráficos detallados de tu consumo energético de forma sencilla.',
  },
  {
    num: '03',
    title: 'Optimiza y Ahorra',
    description: 'Recibe recomendaciones de IA, alertas inteligentes e informes para tomar mejores decisiones energéticas.',
  },
];

/* ──────────────────────────── component ──────────────────────────── */

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F5F7F6] overflow-hidden">
      {/* ─── Navbar ─── */}
      <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Image src="/eco_home_logo.png" alt="EcoHome Logo" width={38} height={38} className="rounded-lg" />
            <span className="text-xl font-extrabold tracking-tight text-[#141D1C] group-hover:text-[#29C76C] transition-colors">
              EcoHome
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#46544E]">
            <a href="#funcionalidades" className="hover:text-[#29C76C] transition-colors">Funcionalidades</a>
            <a href="#como-funciona" className="hover:text-[#29C76C] transition-colors">¿Cómo funciona?</a>
            <a href="#beneficios" className="hover:text-[#29C76C] transition-colors">Beneficios</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              id="nav-login-btn"
              className="px-5 py-2 text-sm font-semibold text-[#29C76C] border border-[#29C76C]/30 rounded-xl hover:bg-[#29C76C]/10 transition-all duration-200"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/signup"
              id="nav-signup-btn"
              className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#29C76C] to-[#1fa85a] rounded-xl hover:shadow-lg hover:shadow-[#29C76C]/30 hover:-translate-y-0.5 transition-all duration-200"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#29C76C]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-[#29C76C]/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-teal-200/20 to-emerald-200/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium text-[#29C76C] bg-[#29C76C]/10 rounded-full border border-[#29C76C]/20">
              <Leaf className="w-4 h-4" />
              Monitoreo Inteligente de Energía
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#141D1C] leading-tight tracking-tight">
              Controla tu consumo{' '}
              <span className="bg-gradient-to-r from-[#29C76C] to-[#1fa85a] bg-clip-text text-transparent">
                eléctrico
              </span>{' '}
              de forma inteligente
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-[#46544E] leading-relaxed max-w-2xl mx-auto">
              EcoHome integra hardware y software para ayudarte a comprender, controlar y optimizar tu uso de energía.
              Reduce costos y adopta hábitos energéticos más eficientes y sostenibles.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                id="hero-signup-btn"
                className="group inline-flex items-center gap-2 px-8 py-3.5 text-base font-bold text-white bg-gradient-to-r from-[#29C76C] to-[#1fa85a] rounded-2xl hover:shadow-xl hover:shadow-[#29C76C]/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                Comenzar Gratis
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/login"
                id="hero-login-btn"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-bold text-[#141D1C] bg-white border border-[#C0CFCB] rounded-2xl hover:border-[#29C76C] hover:shadow-md transition-all duration-300"
              >
                Ya tengo cuenta
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Hero visual — glowing stat cards preview */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="relative rounded-3xl bg-white/60 backdrop-blur-xl border border-white/50 shadow-2xl shadow-slate-200/60 p-6 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {[
                  { label: 'Ahorro Promedio', value: '23%', sub: 'en factura eléctrica', icon: TrendingDown, gradient: 'from-emerald-500 to-teal-600' },
                  { label: 'Monitoreo', value: '24/7', sub: 'tiempo real', icon: Zap, gradient: 'from-amber-500 to-orange-500' },
                  { label: 'Alertas Activas', value: '∞', sub: 'personalizables', icon: Shield, gradient: 'from-violet-500 to-purple-600' },
                ].map((card) => (
                  <div
                    key={card.label}
                    className="relative group bg-white rounded-2xl p-5 border border-[#EDEEF1] hover:border-[#29C76C]/40 hover:shadow-lg hover:shadow-[#29C76C]/10 transition-all duration-300"
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-3`}>
                      <card.icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-sm text-[#94A59D] font-medium">{card.label}</p>
                    <p className="text-3xl font-extrabold text-[#141D1C] mt-1">{card.value}</p>
                    <p className="text-xs text-[#94A59D] mt-1">{card.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section id="funcionalidades" className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 text-sm font-medium text-[#29C76C] bg-[#29C76C]/10 rounded-full border border-[#29C76C]/20 mb-4">
              Funcionalidades
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#141D1C] tracking-tight">
              Todo lo que necesitas para{' '}
              <span className="bg-gradient-to-r from-[#29C76C] to-[#1fa85a] bg-clip-text text-transparent">
                ahorrar energía
              </span>
            </h2>
            <p className="mt-4 text-[#46544E] text-lg">
              Herramientas potentes diseñadas para transformar datos de consumo en información útil.
            </p>
          </FadeInSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <FadeInSection key={f.title}>
                <div
                  className="group relative bg-white rounded-2xl p-6 border border-[#EDEEF1] hover:border-[#29C76C]/40 hover:shadow-xl hover:shadow-[#29C76C]/5 transition-all duration-300 hover:-translate-y-1 h-full"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <f.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#141D1C] mb-2">{f.title}</h3>
                  <p className="text-sm text-[#46544E] leading-relaxed">{f.description}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section id="como-funciona" className="py-20 sm:py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#29C76C]/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeInSection className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 text-sm font-medium text-[#29C76C] bg-[#29C76C]/10 rounded-full border border-[#29C76C]/20 mb-4">
              ¿Cómo Funciona?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#141D1C] tracking-tight">
              Tres pasos para{' '}
              <span className="bg-gradient-to-r from-[#29C76C] to-[#1fa85a] bg-clip-text text-transparent">
                optimizar
              </span>{' '}
              tu energía
            </h2>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-16 left-[16.66%] right-[16.66%] h-0.5 bg-gradient-to-r from-[#29C76C]/20 via-[#29C76C]/40 to-[#29C76C]/20" />

            {steps.map((s, i) => (
              <FadeInSection key={s.num}>
                <div className="relative text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#29C76C] to-[#1fa85a] text-white font-extrabold text-lg shadow-lg shadow-[#29C76C]/30 mb-6 relative z-10">
                    {s.num}
                  </div>
                  <h3 className="text-xl font-bold text-[#141D1C] mb-3">{s.title}</h3>
                  <p className="text-sm text-[#46544E] leading-relaxed max-w-xs mx-auto">{s.description}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Benefits / About ─── */}
      <section id="beneficios" className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeInSection>
              <span className="inline-block px-4 py-1.5 text-sm font-medium text-[#29C76C] bg-[#29C76C]/10 rounded-full border border-[#29C76C]/20 mb-4">
                Beneficios
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#141D1C] tracking-tight mb-6">
                Más que datos,{' '}
                <span className="bg-gradient-to-r from-[#29C76C] to-[#1fa85a] bg-clip-text text-transparent">
                  decisiones inteligentes
                </span>
              </h2>
              <p className="text-[#46544E] leading-relaxed mb-8 text-lg">
                EcoHome no solo muestra datos de consumo, sino que los transforma en información útil,
                permitiéndote reducir costos en tu factura eléctrica y adoptar hábitos energéticos más
                eficientes y sostenibles.
              </p>
              <ul className="space-y-4">
                {[
                  'Monitoreo en tiempo real de cada electrodoméstico',
                  'Recomendaciones personalizadas con inteligencia artificial',
                  'Reportes automáticos para seguimiento constante',
                  'Interfaz diseñada para todos los usuarios',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-[#29C76C]/15 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-[#29C76C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[#46544E]">{item}</span>
                  </li>
                ))}
              </ul>
            </FadeInSection>

            <FadeInSection>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-[#29C76C]/20 to-teal-400/10 rounded-3xl blur-2xl" />
                <div className="relative bg-white rounded-3xl border border-[#EDEEF1] shadow-2xl shadow-slate-200/50 p-8">
                  <div className="space-y-5">
                    {/* Mock chart bars */}
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-[#94A59D] w-12">Lun</span>
                      <div className="flex-1 h-6 bg-[#F5F7F6] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#29C76C] to-[#1fa85a] rounded-full" style={{ width: '72%' }} />
                      </div>
                      <span className="text-xs font-bold text-[#141D1C] w-14 text-right">3.2 kWh</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-[#94A59D] w-12">Mar</span>
                      <div className="flex-1 h-6 bg-[#F5F7F6] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#29C76C] to-[#1fa85a] rounded-full" style={{ width: '58%' }} />
                      </div>
                      <span className="text-xs font-bold text-[#141D1C] w-14 text-right">2.6 kWh</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-[#94A59D] w-12">Mié</span>
                      <div className="flex-1 h-6 bg-[#F5F7F6] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#29C76C] to-[#1fa85a] rounded-full" style={{ width: '85%' }} />
                      </div>
                      <span className="text-xs font-bold text-[#141D1C] w-14 text-right">3.8 kWh</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-[#94A59D] w-12">Jue</span>
                      <div className="flex-1 h-6 bg-[#F5F7F6] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#29C76C] to-[#1fa85a] rounded-full" style={{ width: '45%' }} />
                      </div>
                      <span className="text-xs font-bold text-[#141D1C] w-14 text-right">2.0 kWh</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-[#94A59D] w-12">Vie</span>
                      <div className="flex-1 h-6 bg-[#F5F7F6] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" style={{ width: '92%' }} />
                      </div>
                      <span className="text-xs font-bold text-orange-500 w-14 text-right">4.1 kWh</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-[#94A59D] w-12">Sáb</span>
                      <div className="flex-1 h-6 bg-[#F5F7F6] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#29C76C] to-[#1fa85a] rounded-full" style={{ width: '38%' }} />
                      </div>
                      <span className="text-xs font-bold text-[#141D1C] w-14 text-right">1.7 kWh</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-5 border-t border-[#EDEEF1] flex items-center justify-between">
                    <div>
                      <p className="text-xs text-[#94A59D]">Consumo semanal</p>
                      <p className="text-xl font-extrabold text-[#141D1C]">17.4 kWh</p>
                    </div>
                    <div className="flex items-center gap-1 text-[#29C76C] bg-[#29C76C]/10 px-3 py-1.5 rounded-full">
                      <TrendingDown className="w-4 h-4" />
                      <span className="text-sm font-bold">-12%</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#141D1C] via-[#1a2a27] to-[#0d1514]" />
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDQxLDE5OSwxMDgsMC4xKSIvPjwvc3ZnPg==')] opacity-60" />
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#29C76C]/10 rounded-full blur-[100px]" />
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-500/10 rounded-full blur-[80px]" />

              <div className="relative z-10 py-16 px-6 sm:px-12 text-center">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6">
                  Empieza a ahorrar{' '}
                  <span className="bg-gradient-to-r from-[#29C76C] to-[#5EEEA0] bg-clip-text text-transparent">
                    energía hoy
                  </span>
                </h2>
                <p className="text-lg text-white/70 max-w-xl mx-auto mb-10">
                  Únete a EcoHome y transforma la manera en que consumes electricidad. Tu hogar más inteligente comienza aquí.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/signup"
                    id="cta-signup-btn"
                    className="group inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-[#141D1C] bg-gradient-to-r from-[#29C76C] to-[#5EEEA0] rounded-2xl hover:shadow-xl hover:shadow-[#29C76C]/30 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Crear Cuenta Gratis
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/login"
                    id="cta-login-btn"
                    className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-white border border-white/20 rounded-2xl hover:bg-white/10 transition-all duration-300"
                  >
                    Iniciar Sesión
                  </Link>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-[#EDEEF1] bg-white/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Image src="/eco_home_logo.png" alt="EcoHome" width={32} height={32} className="rounded-lg" />
              <span className="text-lg font-bold text-[#141D1C]">EcoHome</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-[#94A59D]">
              <Link href="/legal" className="hover:text-[#29C76C] transition-colors">Legal</Link>
              <a href="#funcionalidades" className="hover:text-[#29C76C] transition-colors">Funcionalidades</a>
              <a href="#como-funciona" className="hover:text-[#29C76C] transition-colors">¿Cómo funciona?</a>
            </div>
            <p className="text-sm text-[#94A59D]">
              © {new Date().getFullYear()} EcoHome. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
