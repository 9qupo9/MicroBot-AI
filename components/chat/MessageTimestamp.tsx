'use client';

interface MessageTimestampProps {
  timestamp: Date;
  isAssistant: boolean;
  isVisible: boolean;
}

export default function MessageTimestamp({ timestamp, isAssistant, isVisible }: MessageTimestampProps) {
  return (
    <p className={`text-xs text-[var(--text-muted)] opacity-70 mt-2 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} ${isAssistant ? 'text-left' : 'text-right'}`}>
      {timestamp.toLocaleTimeString('uk-UA', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })}
    </p>
  );
}