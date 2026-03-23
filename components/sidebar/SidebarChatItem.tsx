'use client';

import { Trash2 } from 'lucide-react';
import { Chat } from '@/types/chat';

interface SidebarChatItemProps {
  chat: Chat;
  isActive: boolean;
  index: number;
  animateChats: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export default function SidebarChatItem({
  chat,
  isActive,
  index,
  animateChats,
  onSelect,
  onDelete
}: SidebarChatItemProps) {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return 'Yesterday';
    return date.toLocaleDateString('en-US');
  };

  return (
    <div
      onClick={onSelect}
      className={`
        group relative p-2 sm:p-3 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/40 hover:scale-[1.02]
        ${isActive
          ? 'bg-gradient-to-r from-[var(--soft-red)]/10 to-[var(--soft-red-light)]/10 border border-[var(--soft-red)]/20 scale-[1.02]'
          : 'hover:shadow-md'
        }
        ${animateChats ? `animate-slide-in-left stagger-${Math.min(index + 1, 6)}` : ''}
      `}
    >
      <div className="flex items-start justify-between gap-2 sm:gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm sm:text-base text-[var(--text-primary)] truncate group-hover:text-[var(--soft-red)] transition-colors">
            {chat.title}
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] truncate">
            {chat.messages.length > 0
              ? chat.messages[chat.messages.length - 1].content
              : 'New conversation'
            }
          </p>
          <p className="text-xs text-[var(--text-muted)] opacity-70 mt-1">
            {formatDate(chat.updatedAt)}
          </p>
        </div>

        <div className="flex-shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="opacity-60 hover:opacity-100 p-1.5 sm:p-2 rounded-lg hover:bg-red-100 text-red-500 transition-all duration-200 hover:scale-110 touch-manipulation"
            title="Delete chat"
          >
            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}