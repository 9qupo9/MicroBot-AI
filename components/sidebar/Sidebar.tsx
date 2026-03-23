'use client';

import { useState, useEffect } from 'react';
import { Chat } from '@/types/chat';
import SidebarMobileToggle from './SidebarMobileToggle';
import SidebarBackdrop from './SidebarBackdrop';
import SidebarHeader from './SidebarHeader';
import SidebarChatList from './SidebarChatList';

interface SidebarProps {
  chats: Chat[];
  activeChat: string | null;
  onChatSelect: (chatId: string) => void;
  onChatCreate: () => void;
  onChatDelete: (chatId: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ 
  chats, 
  activeChat, 
  onChatSelect, 
  onChatCreate, 
  onChatDelete,
  isOpen = false,
  onClose
}: SidebarProps) {
  const [animateChats, setAnimateChats] = useState(false);

  useEffect(() => {
    if (chats.length > 0) {
      setAnimateChats(true);
    }
  }, [chats.length]);

  const handleChatCreate = () => {
    onChatCreate();
    setAnimateChats(false);
    setTimeout(() => setAnimateChats(true), 100);
  };

  return (
    <>
      <SidebarBackdrop isOpen={isOpen} onClose={onClose || (() => {})} />


      {/* Sidebar */}
      <div 
        className={`
          fixed lg:static inset-y-0 left-0 z-40 w-72 sm:w-80 max-w-[85vw] sm:max-w-[80vw] bg-gradient-to-b from-background/60 to-[var(--milk-white)]/60 
          backdrop-blur-xl border-r border-[var(--border-light)] dark:border-[var(--border-light)] flex flex-col transition-all duration-300 lg:translate-x-0
          lg:h-full h-screen
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex-shrink-0">
          <SidebarHeader onChatCreate={handleChatCreate} />
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 sidebar-scroll min-h-0">
          <SidebarChatList
            chats={chats}
            activeChat={activeChat}
            animateChats={animateChats}
            onChatSelect={onChatSelect}
            onChatDelete={onChatDelete}
            onCloseSidebar={onClose || (() => {})}
          />
        </div>
      </div>
    </>
  );
}