'use client';

import { useState } from 'react';
import { Chat } from '@/types/chat';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

interface ChatInterfaceProps {
  chat: Chat;
  onSendMessage: (content: string) => Promise<void>;
  isSidebarOpen?: boolean;
  onSidebarToggle?: () => void;
}

export default function ChatInterface({ chat, onSendMessage, isSidebarOpen, onSidebarToggle }: ChatInterfaceProps) {
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (content: string) => {
    setIsTyping(true);
    try {
      await onSendMessage(content);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ChatHeader chat={chat} isSidebarOpen={isSidebarOpen} onSidebarToggle={onSidebarToggle} />
      <ChatMessages chat={chat} isTyping={isTyping} />
      <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
    </div>
  );
}