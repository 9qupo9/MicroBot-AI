'use client';

import { Menu, X } from 'lucide-react';
import { Chat } from '@/types/chat';
import ThemeToggle from '@/components/theme/ThemeToggle';
import WalletConnect from '@/components/wallet/WalletConnect';

interface ChatHeaderProps {
  chat: Chat;
  isSidebarOpen?: boolean;
  onSidebarToggle?: () => void;
}

export default function ChatHeader({ chat, isSidebarOpen, onSidebarToggle }: ChatHeaderProps) {
  return (
    <div className="px-4 py-3 sm:p-6 border-b border-[var(--border-light)] glass-effect animate-slide-in-up">
      <div className="flex items-center justify-between gap-4">
        {/* Left menu button */}
        <div className="flex-shrink-0">
          <button
            onClick={onSidebarToggle}
            className="lg:hidden p-2 rounded-lg glass-effect text-[#ff6b6b] hover:bg-white/30 transition-all duration-300 hover:scale-110 touch-manipulation"
          >
            <div className={`transition-transform duration-300 ${isSidebarOpen ? 'rotate-180' : ''}`}>
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </div>
          </button>
          <div className="hidden lg:block w-0"></div>
        </div>
        
        {/* Center content */}
        <div className="flex-1 min-w-0">
          <h2 className="text-base sm:text-xl font-semibold text-[var(--text-primary)] truncate">
            {chat.title}
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] truncate">
            {chat.messages.length} messages • Updated {chat.updatedAt.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <WalletConnect />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}