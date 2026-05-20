import React, { InputHTMLAttributes } from 'react';
import { LucideIcon } from 'lucide-react';

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
  label: string;
}

export function AuthInput({ icon: Icon, label, ...props }: AuthInputProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-slate-700 block">{label}</label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
          <Icon className="h-5 w-5" />
        </div>
        <input
          {...props}
          className="block w-full rounded-xl border border-slate-200 bg-white/50 pl-11 pr-4 py-3 text-sm outline-none transition-all focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-600/10 placeholder:text-slate-400 backdrop-blur-sm"
        />
      </div>
    </div>
  );
}
