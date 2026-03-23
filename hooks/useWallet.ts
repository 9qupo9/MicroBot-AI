'use client';

import { useState, useEffect, useCallback } from 'react';
import { lineraWallet, LineraWalletConnection, OnChainProfile } from '@/lib/linera-wallet';
import { smartContractService } from '@/lib/smart-contracts';

export const useWallet = () => {
  const [connection, setConnection] = useState<LineraWalletConnection | null>(null);
  const [profile, setProfile] = useState<OnChainProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const walletConnection = await lineraWallet.connectWallet();
      setConnection(walletConnection);

      // Try to load existing profile
      const existingProfile = await smartContractService.getProfile(walletConnection.address);
      setProfile(existingProfile);

      return walletConnection;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect wallet';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const disconnectWallet = useCallback(async () => {
    await lineraWallet.disconnectWallet();
    setConnection(null);
    setProfile(null);
    setError(null);
  }, []);

  const createProfile = useCallback(async (username: string, avatar?: string) => {
    if (!connection) throw new Error('Wallet not connected');

    setIsLoading(true);
    setError(null);

    try {
      await smartContractService.createProfile(username, avatar || '');
      
      // Reload profile
      const newProfile = await smartContractService.getProfile(connection.address);
      setProfile(newProfile);

      return newProfile;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create profile';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [connection]);

  const updateProfile = useCallback(async (username: string, avatar?: string) => {
    if (!connection) throw new Error('Wallet not connected');

    setIsLoading(true);
    setError(null);

    try {
      await smartContractService.updateProfile(username, avatar || '');
      
      // Reload profile
      const updatedProfile = await smartContractService.getProfile(connection.address);
      setProfile(updatedProfile);

      return updatedProfile;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [connection]);

  const checkWalletInstalled = useCallback(async () => {
    return await lineraWallet.isWalletInstalled();
  }, []);

  useEffect(() => {
    // Set up event listeners for wallet changes
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else if (connection && accounts[0] !== connection.address) {
        // Account changed, reconnect
        connectWallet();
      }
    };

    const handleChainChanged = (chainId: string) => {
      if (connection && chainId !== connection.chainId) {
        // Chain changed, update connection
        setConnection(prev => prev ? { ...prev, chainId } : null);
      }
    };

    lineraWallet.onAccountsChanged(handleAccountsChanged);
    lineraWallet.onChainChanged(handleChainChanged);

    return () => {
      lineraWallet.removeAllListeners();
    };
  }, [connection, connectWallet, disconnectWallet]);

  return {
    connection,
    profile,
    isLoading,
    error,
    connectWallet,
    disconnectWallet,
    createProfile,
    updateProfile,
    checkWalletInstalled,
    isConnected: !!connection?.isConnected,
    hasProfile: !!profile,
  };
};