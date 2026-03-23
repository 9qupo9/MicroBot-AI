'use client';

import { Github, Twitter, MessageSquare } from 'lucide-react';

export default function FooterSocialLinks() {
  const socialLinks = [
    {
      href: 'https://github.com',
      icon: Github,
      label: 'GitHub'
    },
    {
      href: 'https://twitter.com',
      icon: Twitter,
      label: 'Twitter/X'
    },
    {
      href: 'https://discord.com',
      icon: MessageSquare,
      label: 'Discord'
    }
  ];

  return (
    <div className="flex items-center gap-1 sm:gap-4">
      <span className="text-xs text-muted-foreground">
        Developed by <span className="font-bold text-xs sm:text-base text-foreground">Mikoriko</span>
      </span>
      
      <div className="flex items-center gap-1 sm:gap-2">
        {socialLinks.map((link) => (
          <a 
            key={link.label}
            href={link.href} 
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 sm:p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-accent transition-all duration-300 hover:scale-110"
            aria-label={link.label}
          >
            <link.icon className="w-3 h-3 sm:w-4 sm:h-4" />
          </a>
        ))}
      </div>
    </div>
  );
}