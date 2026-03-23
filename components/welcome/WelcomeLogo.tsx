'use client';

import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

export default function WelcomeLogo() {
  return (
    <motion.div 
      className="flex justify-center mt-4 sm:mt-0"
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 1
      }}
    >
      <motion.div 
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[var(--soft-red)] to-[var(--soft-red-light)] flex items-center justify-center shadow-2xl"
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          },
          rotate: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 500 }}
        >
          <Bot className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}