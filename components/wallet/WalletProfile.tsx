'use client';

import { User, Shield, Settings, LogOut } from 'lucide-react';
import { LineraWalletConnection, OnChainProfile } from '@/lib/linera-wallet';

interface WalletProfileProps {
  connection: LineraWalletConnection;
  profile: OnChainProfile | null;
  hasProfile: boolean;
  onEditProfile: () => void;
  onDisconnect: () => void;
}

export default function WalletProfile({ 
  connection, 
  profile, 
  hasProfile, 
  onEditProfile, 
  onDisconnect 
}: WalletProfileProps) {
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="flex items-center gap-3">
      {/* Profile Info */}
      <div className="flex items-center gap-2 px-3 py-2 glass-effect rounded-xl">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--soft-red)] to-[var(--soft-red-light)] flex items-center justify-center">
          {hasProfile ? (
            <User className="w-4 h-4 text-white" />
          ) : (
            <Shield className="w-4 h-4 text-white" />
          )}
        </div>
        <div className="text-sm">
          <div className="font-medium text-[var(--text-primary)]">
            {hasProfile ? profile?.username : 'No Profile'}
          </div>
          <div className="text-[var(--text-muted)]">
            {formatAddress(connection.address)}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={onEditProfile}
          className="p-2 glass-effect rounded-lg hover:bg-white/30 transition-all duration-300"
          title={hasProfile ? 'Edit Profile' : 'Create Profile'}
        >
          <Settings className="w-4 h-4 text-[var(--text-primary)]" />
        </button>
        <button
          onClick={onDisconnect}
          className="p-2 glass-effect rounded-lg hover:bg-red-100 hover:text-red-600 transition-all duration-300"
          title="Disconnect Wallet"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}