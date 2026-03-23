'use client';

import { Bell, X } from 'lucide-react';

interface NotificationProps {
  title: string;
  message: string;
  timestamp?: Date;
  isRead?: boolean;
  onRead?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export default function Notification({ 
  title, 
  message, 
  timestamp, 
  isRead = false, 
  onRead, 
  onDismiss,
  className = '' 
}: NotificationProps) {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div 
      className={`
        p-4 border rounded-lg transition-all duration-200 cursor-pointer
        ${isRead ? 'bg-gray-50 border-gray-200' : 'bg-white border-blue-200 shadow-sm'}
        hover:shadow-md ${className}
      `}
      onClick={onRead}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-full ${isRead ? 'bg-gray-100' : 'bg-blue-100'}`}>
          <Bell className={`w-4 h-4 ${isRead ? 'text-gray-500' : 'text-blue-600'}`} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className={`font-medium text-sm ${isRead ? 'text-gray-700' : 'text-gray-900'}`}>
              {title}
            </h4>
            {onDismiss && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDismiss();
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <p className={`text-sm mt-1 ${isRead ? 'text-gray-500' : 'text-gray-700'}`}>
            {message}
          </p>
          
          {timestamp && (
            <p className="text-xs text-gray-400 mt-2">
              {formatTime(timestamp)}
            </p>
          )}
        </div>
        
        {!isRead && (
          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
        )}
      </div>
    </div>
  );
}