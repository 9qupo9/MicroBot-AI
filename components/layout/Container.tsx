'use client';

interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  className?: string;
  padding?: boolean;
}

export default function Container({ 
  children, 
  maxWidth = 'lg', 
  className = '', 
  padding = true 
}: ContainerProps) {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    '2xl': 'max-w-7xl',
    full: 'max-w-full'
  };

  return (
    <div className={`mx-auto ${maxWidthClasses[maxWidth]} ${padding ? 'px-4 sm:px-6 lg:px-8' : ''} ${className}`}>
      {children}
    </div>
  );
}