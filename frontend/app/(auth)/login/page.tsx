"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { AuthInput } from '@/components/ui/AuthInput';
import { AuthButton } from '@/components/ui/AuthButton';
import { signIn } from '@/lib/auth-client';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const { data, error: signInError } = await signIn.email({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message || 'Error al iniciar sesión. Por favor, revisa tus credenciales.');
      setIsLoading(false);
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  };

  return (
    <div>
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">Bienvenido de nuevo</h2>
        <p className="text-text-secondary text-sm">Inicia sesión en tu cuenta para continuar hacia un hogar más verde.</p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 text-red-600 p-3 rounded-xl text-sm flex items-start gap-2 border border-red-100">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        <AuthInput
          label="Correo electrónico"
          icon={Mail}
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tucorreo@ejemplo.com"
        />

        <AuthInput
          label="Contraseña"
          icon={Lock}
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />

        <div className="pt-2">
          <AuthButton type="submit" isLoading={isLoading}>
            Iniciar sesión
          </AuthButton>
        </div>
      </form>

      <div className="mt-8 text-center text-sm">
        <span className="text-text-secondary">¿No tienes una cuenta? </span>
        <Link href="/signup" className="font-medium text-brand hover:text-brand-hover transition-colors">
          Regístrate ahora
        </Link>
      </div>
    </div>
  );
}
