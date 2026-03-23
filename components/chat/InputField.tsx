'use client';

import { forwardRef } from 'react';

interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onFocus: () => void;
  onBlur: () => void;
  disabled?: boolean;
  isFocused: boolean;
  placeholder?: string;
}

const InputField = forwardRef<HTMLTextAreaElement, InputFieldProps>(
  ({ value, onChange, onKeyPress, onFocus, onBlur, disabled, placeholder = "Type your message..." }, ref) => {
    return (
      <div className="relative">
        <textarea
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={onKeyPress}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className={`
            w-full px-3 sm:px-4 py-3 pr-4 rounded-2xl border border-[var(--border-light)] bg-background/50 backdrop-blur-sm 
            focus:outline-none focus:ring-2 focus:ring-[var(--soft-red)]/50 focus:border-transparent 
            text-sm sm:text-base disabled:opacity-50 resize-none overflow-x-auto overflow-y-hidden
            max-h-12 min-h-12 leading-6
          `}
          style={{
            whiteSpace: 'nowrap',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        />
        <style jsx>{`
          textarea::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;