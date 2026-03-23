'use client';

import { LucideIcon } from 'lucide-react';

interface NavItemProps {
  icon?: LucideIcon;
  label: string;
  href?: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function NavItem({ 
  icon: Icon, 
  label, 
  href, 
  isActive = false, 
  onClick, 
  className = '' 
}: NavItemProps) {
  const baseClasses = `
    flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
    hover:bg-accent hover:text-accent-foreground
    ${isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}
    ${className}
  `;

  const content = (
    <>
      {Icon && <Icon className="w-4 h-4" />}
      <span className="text-sm font-medium">{label}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={baseClasses} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button className={baseClasses} onClick={onClick}>
      {content}
    </button>
  );
}