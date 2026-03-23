'use client';

import { MessageCircle } from 'lucide-react';

export default function SidebarEmptyState() {
  return (
    <div className="text-center py-8 text-[var(--text-muted)] animate-fade-in-scale">
      <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50 animate-pulse" />
      <p>No conversations yet</p>
      <p className="text-sm">Create your first conversation</p>
    </div>
  );
}