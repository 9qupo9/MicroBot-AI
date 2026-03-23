'use client';

import { useRef, useEffect } from 'react';
import { Chat } from '@/types/chat';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

interface ChatMessagesProps {
  chat: Chat;
  isTyping: boolean;
}

export default function ChatMessages({ chat, isTyping }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat.messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4 w-full">
      {chat.messages.map((msg, index) => (
        <MessageBubble 
          key={msg.id} 
          message={msg} 
          isLast={index === chat.messages.length - 1}
        />
      ))}
      
      {isTyping && <TypingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
}