'use client';

import { useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import Footer from '../common/Footer';
import { Chat } from '@/types/chat';

interface MainLayoutProps {
  children: React.ReactNode;
  chats?: Chat[];
  activeChat?: string | null;
  onChatSelect?: (chatId: string) => void;
  onChatCreate?: () => void;
  onChatDelete?: (chatId: string) => void;
  showSidebar?: boolean;
  showFooter?: boolean;
}

export default function MainLayout({
  children,
  chats = [],
  activeChat = null,
  onChatSelect = () => {},
  onChatCreate = () => {},
  onChatDelete = () => {},
  showSidebar = true,
  showFooter = true
}: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-background via-background to-[var(--milk-white)]">
      {showSidebar && (
        <Sidebar
          chats={chats}
          activeChat={activeChat}
          onChatSelect={onChatSelect}
          onChatCreate={onChatCreate}
          onChatDelete={onChatDelete}
        />
      )}
      
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
        
        {showFooter && <Footer />}
      </div>
    </div>
  );
}