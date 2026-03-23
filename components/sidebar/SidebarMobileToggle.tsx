'use client';

import { Menu, X } from 'lucide-react';

interface SidebarMobileToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function SidebarMobileToggle({ isOpen, onToggle }: SidebarMobileToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="lg:hidden fixed top-2 left-2 z-50 p-2 rounded-lg glass-effect text-[#ff6b6b] hover:bg-white/30 transition-all duration-300 hover:scale-110 touch-manipulation"
    >
      <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </div>
    </button>
  );
}