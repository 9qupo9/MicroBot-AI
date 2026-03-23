'use client';

interface MessageContentProps {
  content: string;
  isAssistant: boolean;
}

export default function MessageContent({ content, isAssistant }: MessageContentProps) {
  return (
    <div 
      className={`
        px-3 sm:px-4 py-3 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]
        min-w-0 w-full
        ${isAssistant 
          ? 'bg-background/70 backdrop-blur-sm text-[var(--text-primary)] rounded-tl-lg hover:bg-background/80 border border-[var(--border-light)]' 
          : 'bg-gradient-to-r from-[var(--soft-red)] to-[var(--soft-red-light)] text-white rounded-tr-lg hover:from-[var(--soft-red-dark)] hover:to-[var(--soft-red)]'
        }
      `}
    >
      <p className="leading-relaxed whitespace-pre-wrap text-sm sm:text-base break-words overflow-wrap-anywhere">{content}</p>
    </div>
  );
}