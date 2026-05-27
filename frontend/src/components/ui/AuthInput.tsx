import React, { InputHTMLAttributes } from 'react';
import { LucideIcon } from 'lucide-react';

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
  label: string;
}

export function AuthInput({ icon: Icon, label, ...props }: AuthInputProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-text-primary block">{label}</label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-text-muted group-focus-within:text-brand transition-colors">
          <Icon className="h-5 w-5" />
        </div>
        <input
          {...props}
          className="block w-full rounded-xl border border-border-light bg-app-card/50 pl-11 pr-4 py-3 text-sm text-text-primary outline-none transition-all focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/20 placeholder:text-text-muted backdrop-blur-sm"
        />
      </div>
    </div>
  );
}
