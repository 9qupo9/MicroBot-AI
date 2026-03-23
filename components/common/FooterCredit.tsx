'use client';

import { Heart } from 'lucide-react';

export default function FooterCredit() {
  return (
    <div className="flex items-center gap-1 sm:gap-2 text-xs text-muted-foreground">
      <span>Created with</span>
      <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 fill-current animate-pulse" />
      <span>for Linera</span>
    </div>
  );
}