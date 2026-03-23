// Main components exports (backward compatibility)
export { default as ChatInterface } from './chat/ChatInterface';
export { default as Footer } from './common/Footer';
export { default as MessageBubble } from './chat/MessageBubble';
export { default as Sidebar } from './sidebar/Sidebar';
export { default as ThemeProvider } from './theme/ThemeProvider';
export { default as ThemeToggle } from './theme/ThemeToggle';
export { default as TypingIndicator } from './chat/TypingIndicator';
export { default as WalletConnect } from './wallet/WalletConnect';
export { default as WelcomeScreen } from './welcome/WelcomeScreen';

// Feature-based components
export * from './chat';
export * from './sidebar';
export * from './wallet';
export * from './welcome';
export * from './theme';
export * from './common';

// Logical groups
export * from './layout';
export * from './animations';
export * from './utils';
export * from './media';
export * from './auth';
export * from './feedback';
export * from './providers';

// UI components by category
export * from './ui/forms';
export * from './ui/navigation';
export * from './ui/overlays';
export * from './ui/display';
export * from './ui/interactive';