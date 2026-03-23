'use client';

import { useEffect, useState } from 'react';
import { Message } from '@/types/chat';
import MessageAvatar from './MessageAvatar';
import MessageContent from './MessageContent';
import MessageTimestamp from './MessageTimestamp';

interface MessageBubbleProps {
  message: Message;
  isLast?: boolean;
}

export default function MessageBubble({ message, isLast }: MessageBubbleProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isLast) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(true);
    }
  }, [isLast]);

  const isAssistant = message.role === 'assistant';

  return (
    <div 
      className={`flex gap-4 mb-6 transition-all duration-500 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      } ${isAssistant ? 'justify-start' : 'justify-end'}`}
    >
      {isAssistant && <MessageAvatar isAssistant={true} />}
      
      <div className={`max-w-[85%] sm:max-w-[70%] min-w-0 ${isAssistant ? 'order-2' : 'order-1'}`}>
        <MessageContent content={message.content} isAssistant={isAssistant} />
        <MessageTimestamp 
          timestamp={message.timestamp} 
          isAssistant={isAssistant} 
          isVisible={isVisible} 
        />
      </div>

      {!isAssistant && <MessageAvatar isAssistant={false} />}
    </div>
  );
}