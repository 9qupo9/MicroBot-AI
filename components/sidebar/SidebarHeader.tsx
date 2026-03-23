'use client';

import { Plus } from 'lucide-react';
import Logo from '../media/Logo';

interface SidebarHeaderProps {
  onChatCreate: () => void;
}

export default function SidebarHeader({ onChatCreate }: SidebarHeaderProps) {
  return (
    <div className="p-6 border-b border-[var(--border-light)] dark:border-[var(--border-light)]">
      <div className="mb-4 animate-slide-in-up">
        <Logo size="md" showText={true} animated={true} />
        <p className="text-sm text-[var(--text-muted)] mt-1 ml-13">Your smart assistant</p>
      </div>
      
      <button
        onClick={onChatCreate}
        className="w-full flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-[var(--soft-red)] to-[var(--soft-red-light)] text-white hover:from-[var(--soft-red-dark)] hover:to-[var(--soft-red)] transition-all duration-300 shadow-lg hover:shadow-xl group hover:scale-[1.02] animate-fade-in-scale stagger-1"
      >
        <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        <span className="font-medium">New conversation</span>
      </button>
    </div>
  );
}