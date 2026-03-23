'use client';

import { useState } from 'react';
import { useWallet } from '@/hooks/useWallet';
import WalletButton from './WalletButton';
import WalletProfile from './WalletProfile';
import ProfileModal from './ProfileModal';

export default function WalletConnect() {
  const {
    connection,
    profile,
    isLoading,
    error,
    connectWallet,
    disconnectWallet,
    createProfile,
    updateProfile,
    checkWalletInstalled,
    isConnected,
    hasProfile,
  } = useWallet();

  const [showProfileForm, setShowProfileForm] = useState(false);
  const [walletInstalled, setWalletInstalled] = useState<boolean | null>(null);

  const handleConnect = async () => {
    try {
      const installed = await checkWalletInstalled();
      setWalletInstalled(installed);
      
      if (!installed) {
        alert('Linera Wallet is not installed. Please install it first.');
        return;
      }

      await connectWallet();
    } catch (err) {
      console.error('Failed to connect:', err);
    }
  };

  const handleProfileSubmit = async (username: string, avatar: string) => {
    try {
      if (hasProfile) {
        await updateProfile(username, avatar);
      } else {
        await createProfile(username, avatar);
      }
      setShowProfileForm(false);
    } catch (err) {
      console.error('Failed to save profile:', err);
    }
  };

  if (!isConnected) {
    return (
      <WalletButton
        isLoading={isLoading}
        walletInstalled={walletInstalled}
        onConnect={handleConnect}
      />
    );
  }

  return (
    <div className="relative">
      <WalletProfile
        connection={connection!}
        profile={profile}
        hasProfile={hasProfile}
        onEditProfile={() => setShowProfileForm(true)}
        onDisconnect={disconnectWallet}
      />

      {showProfileForm && (
        <ProfileModal
          profile={profile}
          hasProfile={hasProfile}
          isLoading={isLoading}
          error={error}
          onSubmit={handleProfileSubmit}
          onClose={() => setShowProfileForm(false)}
        />
      )}
    </div>
  );
}