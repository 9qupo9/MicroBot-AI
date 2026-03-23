'use client';

import { useState, useRef } from 'react';
import InputField from './InputField';
import SendButton from './SendButton';

interface ChatInputProps {
  onSendMessage: (content: string) => Promise<void>;
  disabled?: boolean;
}

export default function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessage('');
    setIsLoading(true);
    
    try {
      await onSendMessage(userMessage);
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-6 border-t border-[var(--border-light)] glass-effect">
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="flex-1">
          <InputField
            ref={inputRef}
            value={message}
            onChange={setMessage}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled || isLoading}
            isFocused={isFocused}
            placeholder="Press Enter to send, Shift+Enter for new line"
          />
        </div>
        
        <div className="hidden sm:block">
          <SendButton
            onClick={handleSend}
            disabled={!message.trim() || disabled || isLoading}
            hasMessage={!!message.trim() && !isLoading}
          />
        </div>
      </div>
      

    </div>
  );
}