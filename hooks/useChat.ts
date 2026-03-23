'use client';

import { useState, useCallback } from 'react';
import { Chat, Message } from '@/types/chat';

export const useChat = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);

  const createChat = useCallback((title?: string) => {
    const newChat: Chat = {
      id: `chat-${Date.now()}`,
      title: title || `New conversation ${chats.length + 1}`,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setChats(prev => [newChat, ...prev]);
    setActiveChat(newChat.id);
    return newChat.id;
  }, [chats.length]);

  const deleteChat = useCallback((chatId: string) => {
    setChats(prev => {
      // Проверяем, существует ли чат для удаления
      const chatExists = prev.find(chat => chat.id === chatId);
      if (!chatExists) {
        return prev; // Чат уже удален, ничего не делаем
      }

      const filteredChats = prev.filter(chat => chat.id !== chatId);
      
      // Если удаляем активный чат
      if (activeChat === chatId) {
        if (filteredChats.length > 0) {
          // Выбираем самый последний чат (первый в списке)
          setActiveChat(filteredChats[0].id);
          return filteredChats;
        } else {
          // Если это был последний чат - создаем новый дефолтный чат
          const newChatId = `chat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          const defaultChat: Chat = {
            id: newChatId,
            title: 'New conversation with Microbot AI',
            messages: [{
              id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              content: 'Hello! I\'m Microbot AI, your personal assistant. How can I help you?',
              role: 'assistant',
              timestamp: new Date(),
            }],
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          
          setActiveChat(newChatId);
          return [defaultChat];
        }
      }
      
      return filteredChats;
    });
  }, [activeChat]);

  const addMessage = useCallback((chatId: string, message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: `msg-${Date.now()}`,
      timestamp: new Date(),
    };

    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? { 
            ...chat, 
            messages: [...chat.messages, newMessage],
            updatedAt: new Date()
          }
        : chat
    ));

    return newMessage;
  }, []);

  const getCurrentChat = useCallback(() => {
    const currentChat = chats.find(chat => chat.id === activeChat);
    
    // Если нет текущего чата, но есть чаты в списке - выбираем первый
    if (!currentChat && chats.length > 0) {
      setActiveChat(chats[0].id);
      return chats[0];
    }
    
    return currentChat || null;
  }, [chats, activeChat]);

  return {
    chats,
    activeChat,
    setActiveChat,
    createChat,
    deleteChat,
    addMessage,
    getCurrentChat,
  };
};