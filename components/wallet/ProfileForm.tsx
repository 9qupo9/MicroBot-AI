'use client';

import { useState } from 'react';
import { OnChainProfile } from '@/lib/linera-wallet';

interface ProfileFormProps {
  profile: OnChainProfile | null;
  hasProfile: boolean;
  isLoading: boolean;
  error: string | null;
  onSubmit: (username: string, avatar: string) => void;
  onCancel: () => void;
}

export default function ProfileForm({ 
  profile, 
  hasProfile, 
  isLoading, 
  error, 
  onSubmit, 
  onCancel 
}: ProfileFormProps) {
  const [username, setUsername] = useState(profile?.username || '');
  const [avatar, setAvatar] = useState(profile?.avatar || '');

  const handleSubmit = () => {
    if (!username.trim()) {
      alert('Please enter a username');
      return;
    }
    onSubmit(username.trim(), avatar.trim());
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border border-[var(--border-light)] rounded-lg bg-background/50 focus:outline-none focus:ring-2 focus:ring-[var(--soft-red)]/50"
          placeholder="Enter your username"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
          Avatar URL (optional)
        </label>
        <input
          type="url"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          className="w-full px-3 py-2 border border-[var(--border-light)] rounded-lg bg-background/50 focus:outline-none focus:ring-2 focus:ring-[var(--soft-red)]/50"
          placeholder="https://example.com/avatar.jpg"
        />
      </div>

      {error && (
        <div className="p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-[var(--border-light)] rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="flex-1 px-4 py-2 bg-gradient-to-r from-[var(--soft-red)] to-[var(--soft-red-light)] text-white rounded-lg hover:from-[var(--soft-red-dark)] hover:to-[var(--soft-red)] transition-all duration-300 disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : hasProfile ? 'Update' : 'Create'}
        </button>
      </div>
    </div>
  );
}