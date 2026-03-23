# Microbot AI - Web3 AI Assistant

A decentralized AI assistant built with Next.js, integrating OpenRouter for AI responses, Linera Wallet for authentication, and smart contracts for data storage.

## Features

- 🤖 **AI Integration**: Multiple AI models via OpenRouter (GPT-4, Claude, Llama, etc.)
- 🔐 **Web3 Authentication**: Linera Wallet integration for secure user authentication
- 📱 **Smart Contract Storage**: User profiles and chat data stored on blockchain
- 🌙 **Theme Support**: Light and dark mode with smooth transitions
- 💬 **Real-time Chat**: Beautiful chat interface with typing indicators
- 🔒 **Decentralized**: No central server for user data storage

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   Copy `.env.example` to `.env.local` and configure:
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your configuration:
   - `NEXT_PUBLIC_OPENROUTER_API_KEY`: Your OpenRouter API key
   - `NEXT_PUBLIC_USER_PROFILE_CONTRACT`: Deployed user profile contract address
   - `NEXT_PUBLIC_CHAT_STORAGE_CONTRACT`: Deployed chat storage contract address

3. **Install Linera Wallet**
   Users need to install the Linera Wallet browser extension to connect.

4. **Deploy Smart Contracts**
   Deploy the user profile and chat storage contracts to your preferred blockchain network.

5. **Run Development Server**
   ```bash
   npm run dev
   ```

## Smart Contract Integration

### User Profile Contract
- `createProfile(username, avatar)`: Create user profile
- `updateProfile(username, avatar)`: Update existing profile
- `getProfile(address)`: Get user profile data
- `profileExists(address)`: Check if profile exists

### Chat Storage Contract
- `saveChat(chatId, title, encryptedData)`: Save chat to blockchain
- `getChat(user, chatId)`: Retrieve specific chat
- `getUserChats(user)`: Get all user's chat IDs
- `deleteChat(chatId)`: Delete chat from blockchain

## OpenRouter Integration

The app supports multiple AI models through OpenRouter:
- GPT-4 and GPT-3.5 Turbo
- Claude 3 (Opus, Sonnet)
- Llama 2 70B
- Mixtral 8x7B
- And many more...

## Architecture

```
├── components/          # React components
│   ├── WalletConnect.tsx    # Wallet connection UI
│   ├── AIModelSelector.tsx # AI model selection
│   └── ...
├── hooks/              # Custom React hooks
│   ├── useWallet.ts        # Wallet management
│   ├── useWeb3Chat.ts      # Blockchain chat operations
│   └── ...
├── lib/                # Core libraries
│   ├── openrouter.ts       # OpenRouter API client
│   ├── linera-wallet.ts    # Linera Wallet integration
│   └── smart-contracts.ts  # Smart contract interactions
└── types/              # TypeScript type definitions
```

## Security Features

- **Encrypted Storage**: Chat data is encrypted before storing on blockchain
- **Wallet Authentication**: Secure authentication via Linera Wallet
- **Decentralized**: No central point of failure for user data
- **Privacy**: Users control their own data through their wallet

Creator - 9qupo9