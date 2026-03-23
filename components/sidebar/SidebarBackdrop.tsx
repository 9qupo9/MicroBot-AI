'use client';

interface SidebarBackdropProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SidebarBackdrop({ isOpen, onClose }: SidebarBackdropProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30 animate-in fade-in duration-300"
      onClick={onClose}
    />
  );
}