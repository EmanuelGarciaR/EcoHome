import React, { ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export function AuthButton({ children, isLoading, disabled, ...props }: AuthButtonProps) {
  return (
    <button
      {...props}
      disabled={isLoading || disabled}
      className="relative w-full flex items-center justify-center rounded-xl bg-indigo-600 py-3.5 px-4 text-sm font-semibold text-white shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:bg-indigo-500 hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-[1px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:-translate-y-0 disabled:hover:shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] transition-all duration-200"
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        children
      )}
    </button>
  );
}
