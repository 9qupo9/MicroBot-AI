'use client';

import { useState, useCallback } from 'react';
import { smartContractService } from '@/lib/smart-contracts';
import { Chat, Message } from '@/types/chat';

export const useWeb3Chat = (userAddress: string | null) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveChatToBlockchain = useCallback(async (chat: Chat) => {
    if (!userAddress) throw new Error('User not connected');

    setIsLoading(true);
    setError(null);

    try {
      const chatData = {
        id: chat.id,
        title: chat.title,
        messages: chat.messages,
        createdAt: chat.createdAt,
        updatedAt: chat.updatedAt,
      };

      const txHash = await smartContractService.saveChat(
        chat.id,
        chat.title,
        chatData
      );

      return txHash;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save chat';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [userAddress]);

  const loadChatFromBlockchain = useCallback(async (chatId: string): Promise<Chat | null> => {
    if (!userAddress) throw new Error('User not connected');

    setIsLoading(true);
    setError(null);

    try {
      const onChainChat = await smartContractService.getChat(userAddress, chatId);
      if (!onChainChat) return null;

      const chatData = smartContractService.decryptChatData(onChainChat.encryptedData);
      if (!chatData) return null;

      return {
        id: chatData.id,
        title: chatData.title,
        messages: chatData.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        })),
        createdAt: new Date(chatData.createdAt),
        updatedAt: new Date(chatData.updatedAt),
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load chat';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [userAddress]);

  const loadUserChatsFromBlockchain = useCallback(async (): Promise<string[]> => {
    if (!userAddress) return [];

    setIsLoading(true);
    setError(null);

    try {
      return await smartContractService.getUserChats(userAddress);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load user chats';
      setError(errorMessage);
      console.error(errorMessage);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [userAddress]);

  const deleteChatFromBlockchain = useCallback(async (chatId: string) => {
    if (!userAddress) throw new Error('User not connected');

    setIsLoading(true);
    setError(null);

    try {
      const txHash = await smartContractService.deleteChat(chatId);
      return txHash;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete chat';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [userAddress]);

  return {
    isLoading,
    error,
    saveChatToBlockchain,
    loadChatFromBlockchain,
    loadUserChatsFromBlockchain,
    deleteChatFromBlockchain,
  };
};