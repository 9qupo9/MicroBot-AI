'use client';

import { ThemeProvider } from '../theme/ThemeProvider';
import { AuthProvider } from '../auth/AuthProvider';
import ErrorBoundary from '../utils/ErrorBoundary';

interface AppProvidersProps {
  children: React.ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <ErrorBoundary>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}