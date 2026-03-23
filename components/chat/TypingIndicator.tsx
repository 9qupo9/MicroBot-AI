'use client';

import { Bot } from 'lucide-react';

export default function TypingIndicator() {
  return (
    <div className="flex gap-4 mb-6 animate-slide-in-up">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[var(--soft-red)] to-[var(--soft-red-light)] flex items-center justify-center shadow-lg">
        <Bot className="w-5 h-5 text-white" />
      </div>
      
      <div className="bg-background/70 backdrop-blur-sm px-4 py-3 rounded-2xl rounded-tl-lg shadow-lg border border-[var(--border-light)]">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-[var(--soft-red)] rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-[var(--soft-red)] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-[var(--soft-red)] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}