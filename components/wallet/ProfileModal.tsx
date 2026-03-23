'use client';

import { OnChainProfile } from '@/lib/linera-wallet';
import ProfileForm from './ProfileForm';

interface ProfileModalProps {
  profile: OnChainProfile | null;
  hasProfile: boolean;
  isLoading: boolean;
  error: string | null;
  onSubmit: (username: string, avatar: string) => void;
  onClose: () => void;
}

export default function ProfileModal({ 
  profile, 
  hasProfile, 
  isLoading, 
  error, 
  onSubmit, 
  onClose 
}: ProfileModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl p-6 max-w-md w-full glass-effect">
        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">
          {hasProfile ? 'Update Profile' : 'Create Profile'}
        </h3>
        
        <ProfileForm
          profile={profile}
          hasProfile={hasProfile}
          isLoading={isLoading}
          error={error}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}