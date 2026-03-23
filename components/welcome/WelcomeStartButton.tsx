'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Sparkles } from 'lucide-react';

interface WelcomeStartButtonProps {
  onStartChat: () => void;
}

export default function WelcomeStartButton({ onStartChat }: WelcomeStartButtonProps) {
  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 5.5, // Появляется после всех карточек
        type: "spring" as const,
        stiffness: 200,
        damping: 15
      }
    }
  };

  return (
    <motion.button
      onClick={onStartChat}
      className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[var(--soft-red)] to-[var(--soft-red-light)] text-white rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg shadow-xl group"
      variants={buttonVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        scale: 1.05,
        boxShadow: "0 20px 40px rgba(255, 107, 107, 0.4)"
      }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        whileHover={{ rotate: 12 }}
        transition={{ duration: 0.3 }}
      >
        <MessageCircle className="w-4 h-5 sm:w-6 sm:h-6" />
      </motion.div>

      <span>Start conversation</span>

      <motion.div
        whileHover={{ scale: 1.25, rotate: 180 }}
        transition={{ duration: 0.3 }}
      >
        <Sparkles className="w-8 h-4 sm:w-5 sm:h-5" />
      </motion.div>
    </motion.button>
  );
}