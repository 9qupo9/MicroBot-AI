'use client';

import { Smile } from 'lucide-react';

interface InputActionsProps {
  disabled?: boolean;
}

export default function InputActions({ disabled = false }: InputActionsProps) {
  return (
    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
      <button 
        className="p-1 text-[var(--text-muted)] hover:text-[var(--soft-red)] transition-all duration-200 hover:scale-110"
        disabled={disabled}
      >
        <Smile className="w-4 h-4" />
      </button>
    </div>
  );
}