import { ethers, BrowserProvider, formatEther } from 'ethers';

export interface LineraWalletConnection {
  address: string;
  chainId: string;
  isConnected: boolean;
}

export interface UserProfile {
  address: string;
  username: string;
  avatar?: string;
  createdAt: Date;
  preferences: {
    theme: 'light' | 'dark';
    language: string;
    aiModel: string;
  };
}

export interface OnChainProfile {
  username: string;
  avatar?: string;
  address: string;
}

declare global {
  interface Window {
    linera?: {
      isLinera: boolean;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (data: any) => void) => void;
      removeListener: (event: string, callback: (data: any) => void) => void;
    };
  }
}

export class LineraWalletService {
  private provider: BrowserProvider | null = null;
  private signer: ethers.Signer | null = null;

  async isWalletInstalled(): Promise<boolean> {
    return typeof window !== 'undefined' && !!window.linera?.isLinera;
  }

  async connectWallet(): Promise<LineraWalletConnection> {
    if (!await this.isWalletInstalled()) {
      throw new Error('Linera Wallet is not installed');
    }

    try {
      // Request account access
      const accounts = await window.linera!.request({
        method: 'eth_requestAccounts',
      });

      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found');
      }

      // Get chain ID
      const chainId = await window.linera!.request({
        method: 'eth_chainId',
      });

      // Set up provider and signer
      this.provider = new BrowserProvider(window.linera as any);
      this.signer = await this.provider.getSigner();

      return {
        address: accounts[0],
        chainId,
        isConnected: true,
      };
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw new Error('Failed to connect to Linera Wallet');
    }
  }

  async disconnectWallet(): Promise<void> {
    this.provider = null;
    this.signer = null;
  }

  async getBalance(address: string): Promise<string> {
    if (!this.provider) {
      throw new Error('Wallet not connected');
    }

    const balance = await this.provider.getBalance(address);
    return formatEther(balance);
  }

  async signMessage(message: string): Promise<string> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    return await this.signer.signMessage(message);
  }

  getSigner(): ethers.Signer | null {
    return this.signer;
  }

  getProvider(): BrowserProvider | null {
    return this.provider;
  }

  onAccountsChanged(callback: (accounts: string[]) => void): void {
    if (window.linera) {
      window.linera.on('accountsChanged', callback);
    }
  }

  onChainChanged(callback: (chainId: string) => void): void {
    if (window.linera) {
      window.linera.on('chainChanged', callback);
    }
  }

  removeAllListeners(): void {
    // Implementation depends on Linera Wallet API
  }
}

export const lineraWallet = new LineraWalletService();