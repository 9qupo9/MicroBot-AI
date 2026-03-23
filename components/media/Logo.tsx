'use client';

import { Bot } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'welcome';
  showText?: boolean;
  className?: string;
  animated?: boolean;
}

export default function Logo({ size = 'md', showText = true, className = '', animated = false }: LogoProps) {
  const sizeClasses = {
    sm: { container: 'w-8 h-8', icon: 'w-4 h-4', text: 'text-sm', rounded: 'rounded-lg' },
    md: { container: 'w-10 h-10', icon: 'w-5 h-5', text: 'text-base', rounded: 'rounded-xl' },
    lg: { container: 'w-12 h-12', icon: 'w-6 h-6', text: 'text-lg', rounded: 'rounded-xl' },
    xl: { container: 'w-16 h-16', icon: 'w-8 h-8', text: 'text-xl', rounded: 'rounded-2xl' },
    welcome: { container: 'w-24 h-24', icon: 'w-12 h-12', text: 'text-5xl', rounded: 'rounded-3xl' }
  };

  const classes = sizeClasses[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`
        ${classes.container} ${classes.rounded} 
        bg-gradient-to-br from-[var(--soft-red)] to-[var(--soft-red-light)] 
        flex items-center justify-center shadow-lg
        ${animated ? 'animate-float' : ''}
        ${size === 'welcome' ? 'shadow-2xl' : ''}
      `}>
        <Bot className={`${classes.icon} text-white`} />
      </div>
      {showText && (
        <span className={`font-bold gradient-text ${classes.text}`}>
          {size === 'welcome' ? 'Microbot AI' : 'Microbot AI'}
        </span>
      )}
    </div>
  );
}