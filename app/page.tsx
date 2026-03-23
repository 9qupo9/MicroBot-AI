'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Sidebar from '@/components/sidebar/Sidebar';
import ChatInterface from '@/components/chat/ChatInterface';
import WelcomeScreen from '@/components/welcome/WelcomeScreen';
import Footer from '@/components/common/Footer';
import { useChat } from '@/hooks/useChat';
import { useWallet } from '@/hooks/useWallet';
import { useWeb3Chat } from '@/hooks/useWeb3Chat';
import { openRouterClient } from '@/lib/openrouter';

export default function Home() {
  const selectedModel = 'openai/gpt-3.5-turbo'; // Fixed model
  const { setTheme } = useTheme();
  
  const {
    chats,
    activeChat,
    setActiveChat,
    createChat,
    deleteChat,
    addMessage,
    getCurrentChat,
  } = useChat();

  const { connection } = useWallet();
  useWeb3Chat(connection?.address || null); // Инициализируем хук, но не используем возвращаемые значения пока

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const currentChat = getCurrentChat();

  // Принудительно устанавливаем темную тему для стартовой страницы
  useEffect(() => {
    if (chats.length === 0) {
      setTheme('dark');
    }
  }, [chats.length, setTheme]);

  const handleSendMessage = async (content: string) => {
    if (!activeChat) return;
    
    addMessage(activeChat, {
      content,
      role: 'user',
    });

    // Generate AI response using OpenRouter
    try {
      const messages = getCurrentChat()?.messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      })) || [];

      const response = await openRouterClient.createChatCompletion(
        [...messages, { role: 'user', content }],
        selectedModel
      );

      const aiResponse = response.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
      
      addMessage(activeChat, {
        content: aiResponse,
        role: 'assistant',
      });
    } catch (error) {
      console.error('Failed to get AI response:', error);
      addMessage(activeChat, {
        content: 'Sorry, I encountered an error while processing your request. Please try again.',
        role: 'assistant',
      });
    }
  };

  const handleStartChat = () => {
    const newChatId = createChat('New conversation with Microbot AI');
    addMessage(newChatId, {
      content: 'Hello! I\'m Microbot AI, your personal assistant. How can I help you?',
      role: 'assistant',
    });
  };

  return (
    <div className="h-screen flex flex-col relative overflow-hidden">

      
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Sidebar - показывается только если есть чаты */}
        {chats.length > 0 && (
          <Sidebar
            chats={chats}
            activeChat={activeChat}
            onChatSelect={setActiveChat}
            onChatCreate={createChat}
            onChatDelete={deleteChat}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className={`flex-1 flex flex-col ${currentChat ? 'overflow-hidden' : 'overflow-y-auto mobile-scroll-hidden'}`}>
          {currentChat ? (
            <ChatInterface
              chat={currentChat}
              onSendMessage={handleSendMessage}
              isSidebarOpen={isSidebarOpen}
              onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
            />
          ) : (
            <WelcomeScreen onStartChat={handleStartChat} />
          )}
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}