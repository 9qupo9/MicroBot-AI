'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="p-2 sm:p-3 rounded-lg sm:rounded-xl glass-effect hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-300 hover:scale-110 group"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--soft-red)] group-hover:rotate-12 transition-transform duration-300" />
      ) : (
        <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--soft-red)] group-hover:rotate-12 transition-transform duration-300" />
      )}
    </button>
  );
}