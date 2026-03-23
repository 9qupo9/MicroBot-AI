'use client';

import { Send } from 'lucide-react';

interface SendButtonProps {
  onClick: () => void;
  disabled: boolean;
  hasMessage: boolean;
}

export default function SendButton({ onClick, disabled, hasMessage }: SendButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        p-2 sm:p-3 rounded-2xl text-white transition-all duration-300 touch-manipulation
        disabled:opacity-50 disabled:cursor-not-allowed 
        ${hasMessage && !disabled 
          ? 'bg-gradient-to-r from-[var(--soft-red)] to-[var(--soft-red-light)] shadow-lg hover:shadow-xl hover:from-[var(--soft-red-dark)] hover:to-[var(--soft-red)] hover:scale-105' 
          : 'bg-gray-400 hover:bg-gray-500'
        }
      `}
    >
      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
    </button>
  );
}