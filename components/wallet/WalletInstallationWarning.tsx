'use client';

interface WalletInstallationWarningProps {
  show: boolean;
}

export default function WalletInstallationWarning({ show }: WalletInstallationWarningProps) {
  if (!show) return null;

  return (
    <div className="text-sm text-red-500 mr-2">
      Linera Wallet not installed
    </div>
  );
}