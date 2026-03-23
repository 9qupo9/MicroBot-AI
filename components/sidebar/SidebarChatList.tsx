'use client';

import { Chat } from '@/types/chat';
import SidebarChatItem from './SidebarChatItem';
import SidebarEmptyState from './SidebarEmptyState';

interface SidebarChatListProps {
  chats: Chat[];
  activeChat: string | null;
  animateChats: boolean;
  onChatSelect: (chatId: string) => void;
  onChatDelete: (chatId: string) => void;
  onCloseSidebar: () => void;
}

export default function SidebarChatList({ 
  chats, 
  activeChat, 
  animateChats, 
  onChatSelect, 
  onChatDelete,
  onCloseSidebar 
}: SidebarChatListProps) {
  const handleChatSelect = (chatId: string) => {
    onChatSelect(chatId);
    onCloseSidebar();
  };

  if (chats.length === 0) {
    return <SidebarEmptyState />;
  }

  return (
    <div className="space-y-2">
      {chats.map((chat, index) => (
        <SidebarChatItem
          key={chat.id}
          chat={chat}
          isActive={activeChat === chat.id}
          index={index}
          animateChats={animateChats}
          onSelect={() => handleChatSelect(chat.id)}
          onDelete={() => onChatDelete(chat.id)}
        />
      ))}
    </div>
  );
}