"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, AlertCircle } from 'lucide-react';
import { AuthInput } from '@/src/components/ui/AuthInput';
import { AuthButton } from '@/src/components/ui/AuthButton';
import { signUp } from '@/src/lib/auth-client';

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const { data, error: signUpError } = await signUp.email({
      email,
      password,
      name,
    });

    if (signUpError) {
      setError(signUpError.message || 'Failed to create account. Please try again.');
      setIsLoading(false);
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  };

  return (
    <div>
      <div className="mb-8 text-center">
        <h3 className="text-2xl font-bold text-slate-900">Create an account</h3>
        <p className="text-slate-500 mt-2 text-sm">Start managing your home energy today</p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 text-red-600 p-3 rounded-xl text-sm flex items-start gap-2 border border-red-100">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        <AuthInput
          label="Full name"
          icon={User}
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jane Doe"
        />

        <AuthInput
          label="Email address"
          icon={Mail}
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />

        <AuthInput
          label="Password"
          icon={Lock}
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          minLength={8}
        />

        <div className="pt-2">
          <AuthButton type="submit" isLoading={isLoading}>
            Create account
          </AuthButton>
        </div>
      </form>

      <div className="mt-8 text-center text-sm">
        <span className="text-slate-500">Already have an account? </span>
        <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
          Sign in
        </Link>
      </div>
    </div>
  );
}
