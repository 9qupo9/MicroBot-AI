import { ethers, BrowserProvider } from 'ethers';
import { LineraWalletService, OnChainProfile } from './linera-wallet';

// Smart contract ABI for user profiles and chat storage
const USER_PROFILE_ABI = [
  "function createProfile(string memory username, string memory avatar) external",
  "function updateProfile(string memory username, string memory avatar) external",
  "function getProfile(address user) external view returns (string memory username, string memory avatar, uint256 createdAt)",
  "function profileExists(address user) external view returns (bool)",
  "event ProfileCreated(address indexed user, string username)",
  "event ProfileUpdated(address indexed user, string username)"
];

const CHAT_STORAGE_ABI = [
  "function saveChat(string memory chatId, string memory title, string memory encryptedData) external",
  "function getChat(address user, string memory chatId) external view returns (string memory title, string memory encryptedData, uint256 timestamp)",
  "function getUserChats(address user) external view returns (string[] memory chatIds)",
  "function deleteChat(string memory chatId) external",
  "event ChatSaved(address indexed user, string indexed chatId, string title)",
  "event ChatDeleted(address indexed user, string indexed chatId)"
];

export interface ContractAddresses {
  userProfile: string;
  chatStorage: string;
}

// OnChainProfile type is imported from linera-wallet.ts

export interface OnChainChat {
  title: string;
  encryptedData: string;
  timestamp: number;
}

export class SmartContractService {
  private walletService: LineraWalletService;
  private contracts: ContractAddresses;

  constructor(walletService: LineraWalletService, contracts: ContractAddresses) {
    this.walletService = walletService;
    this.contracts = contracts;
  }

  private getUserProfileContract(): ethers.Contract | null {
    const signer = this.walletService.getSigner();
    if (!signer) return null;

    return new ethers.Contract(
      this.contracts.userProfile,
      USER_PROFILE_ABI,
      signer
    );
  }

  private getChatStorageContract(): ethers.Contract | null {
    const signer = this.walletService.getSigner();
    if (!signer) return null;

    return new ethers.Contract(
      this.contracts.chatStorage,
      CHAT_STORAGE_ABI,
      signer
    );
  }

  async createProfile(username: string, avatar: string = ''): Promise<string> {
    const contract = this.getUserProfileContract();
    if (!contract) throw new Error('Wallet not connected');

    try {
      const tx = await contract.createProfile(username, avatar);
      await tx.wait();
      return tx.hash;
    } catch (error) {
      console.error('Failed to create profile:', error);
      throw new Error('Failed to create profile on blockchain');
    }
  }

  async updateProfile(username: string, avatar: string = ''): Promise<string> {
    const contract = this.getUserProfileContract();
    if (!contract) throw new Error('Wallet not connected');

    try {
      const tx = await contract.updateProfile(username, avatar);
      await tx.wait();
      return tx.hash;
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw new Error('Failed to update profile on blockchain');
    }
  }

  async getProfile(address: string): Promise<OnChainProfile | null> {
    const provider: BrowserProvider | null = this.walletService.getProvider();
    if (!provider) throw new Error('Wallet not connected');

    const contract = new ethers.Contract(
      this.contracts.userProfile,
      USER_PROFILE_ABI,
      provider
    );

    try {
      const exists = await contract.profileExists(address);
      if (!exists) return null;

      const [username, avatar, createdAt] = await contract.getProfile(address);
      return {
        username,
        avatar,
        address,
      };
    } catch (error) {
      console.error('Failed to get profile:', error);
      return null;
    }
  }

  async saveChat(chatId: string, title: string, chatData: any): Promise<string> {
    const contract = this.getChatStorageContract();
    if (!contract) throw new Error('Wallet not connected');

    try {
      // Encrypt chat data (simple base64 encoding for demo)
      const encryptedData = btoa(JSON.stringify(chatData));
      
      const tx = await contract.saveChat(chatId, title, encryptedData);
      await tx.wait();
      return tx.hash;
    } catch (error) {
      console.error('Failed to save chat:', error);
      throw new Error('Failed to save chat to blockchain');
    }
  }

  async getChat(userAddress: string, chatId: string): Promise<OnChainChat | null> {
    const provider: BrowserProvider | null = this.walletService.getProvider();
    if (!provider) throw new Error('Wallet not connected');

    const contract = new ethers.Contract(
      this.contracts.chatStorage,
      CHAT_STORAGE_ABI,
      provider
    );

    try {
      const [title, encryptedData, timestamp] = await contract.getChat(userAddress, chatId);
      
      if (!title) return null;

      return {
        title,
        encryptedData,
        timestamp: Number(timestamp),
      };
    } catch (error) {
      console.error('Failed to get chat:', error);
      return null;
    }
  }

  async getUserChats(userAddress: string): Promise<string[]> {
    const provider: BrowserProvider | null = this.walletService.getProvider();
    if (!provider) throw new Error('Wallet not connected');

    const contract = new ethers.Contract(
      this.contracts.chatStorage,
      CHAT_STORAGE_ABI,
      provider
    );

    try {
      return await contract.getUserChats(userAddress);
    } catch (error) {
      console.error('Failed to get user chats:', error);
      return [];
    }
  }

  async deleteChat(chatId: string): Promise<string> {
    const contract = this.getChatStorageContract();
    if (!contract) throw new Error('Wallet not connected');

    try {
      const tx = await contract.deleteChat(chatId);
      await tx.wait();
      return tx.hash;
    } catch (error) {
      console.error('Failed to delete chat:', error);
      throw new Error('Failed to delete chat from blockchain');
    }
  }

  decryptChatData(encryptedData: string): any {
    try {
      return JSON.parse(atob(encryptedData));
    } catch (error) {
      console.error('Failed to decrypt chat data:', error);
      return null;
    }
  }
}

// Default contract addresses (replace with actual deployed contract addresses)
const DEFAULT_CONTRACTS: ContractAddresses = {
  userProfile: process.env.NEXT_PUBLIC_USER_PROFILE_CONTRACT || '0x0000000000000000000000000000000000000000',
  chatStorage: process.env.NEXT_PUBLIC_CHAT_STORAGE_CONTRACT || '0x0000000000000000000000000000000000000000',
};

export const smartContractService = new SmartContractService(
  new (require('./linera-wallet').LineraWalletService)(),
  DEFAULT_CONTRACTS
);