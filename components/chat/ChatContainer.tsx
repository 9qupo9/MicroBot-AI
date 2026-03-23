'use client';

import { Chat } from '@/types/chat';
import ChatInterface from './ChatInterface';
import Container from '../layout/Container';

interface ChatContainerProps {
  chat: Chat | null;
  onSendMessage: (content: string) => Promise<void>;
}

export default function ChatContainer({ chat, onSendMessage }: ChatContainerProps) {
  if (!chat) {
    return (
      <Container className="flex items-center justify-center h-full">
        <div className="text-center text-[var(--text-muted)]">
          <p>Select a conversation to start chatting</p>
        </div>
      </Container>
    );
  }

  return (
    <div className="h-full">
      <ChatInterface chat={chat} onSendMessage={onSendMessage} />
    </div>
  );
}