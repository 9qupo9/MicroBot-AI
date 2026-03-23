'use client';

import { Bot, User } from 'lucide-react';

interface MessageAvatarProps {
  isAssistant: boolean;
}

export default function MessageAvatar({ isAssistant }: MessageAvatarProps) {
  if (isAssistant) {
    return (
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[var(--soft-red)] to-[var(--soft-red-light)] flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
        <Bot className="w-5 h-5 text-white" />
      </div>
    );
  }

  return (
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[var(--text-secondary)] to-[var(--text-primary)] flex items-center justify-center shadow-lg order-3 transform hover:scale-110 transition-transform duration-300">
      <User className="w-5 h-5 text-white" />
    </div>
  );
}