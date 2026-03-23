'use client';

import FooterCopyright from './FooterCopyright';
import FooterCredit from './FooterCredit';
import FooterSocialLinks from './FooterSocialLinks';

export default function Footer() {
  return (
    <footer className="border-t border-border/20 bg-background/80 backdrop-blur-sm p-2 sm:p-4 mt-auto">
      <div className="max-w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4 px-2 sm:px-8">
        {/* Левый угол */}
        <div className="flex items-center gap-4 order-1">
          <FooterCopyright />
        </div>
        
        {/* Центр */}
        <div className="order-3 sm:order-2">
          <FooterCredit />
        </div>
        
        {/* Правый угол */}
        <div className="order-2 sm:order-3">
          <FooterSocialLinks />
        </div>
      </div>
    </footer>
  );
}