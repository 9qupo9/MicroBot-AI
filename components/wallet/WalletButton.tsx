'use client';

import { Wallet } from 'lucide-react';
import WalletInstallationWarning from './WalletInstallationWarning';

interface WalletButtonProps {
  isLoading: boolean;
  walletInstalled: boolean | null;
  onConnect: () => void;
}

export default function WalletButton({ isLoading, walletInstalled, onConnect }: WalletButtonProps) {
  return (
    <div className="flex items-center gap-3">
      <WalletInstallationWarning show={walletInstalled === false} />
      <button
        onClick={onConnect}
        disabled={isLoading}
        className="flex items-center gap-2 p-2 sm:px-4 sm:py-2 bg-gradient-to-r from-[var(--soft-red)] to-[var(--soft-red-light)] text-white rounded-lg sm:rounded-xl hover:from-[var(--soft-red-dark)] hover:to-[var(--soft-red)] transition-all duration-300 disabled:opacity-50 text-sm"
        title={isLoading ? 'Connecting...' : 'Connect Wallet'}
      >
        <Wallet className="w-4 h-4" />
        <span className="hidden sm:inline">{isLoading ? 'Connecting...' : 'Connect Wallet'}</span>
      </button>
    </div>
  );
}