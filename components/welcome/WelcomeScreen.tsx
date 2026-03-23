'use client';

import { motion } from 'framer-motion';
import WelcomeLogo from './WelcomeLogo';
import WelcomeFeatures from './WelcomeFeatures';
import WelcomeStartButton from './WelcomeStartButton';

interface WelcomeScreenProps {
  onStartChat: () => void;
}

export default function WelcomeScreen({ onStartChat }: WelcomeScreenProps) {
  // Анимация для печатающегося описания (ускорена в 1.5 раза)
  const descriptionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.013, // было 0.02, стало 0.013 (в 1.5 раза быстрее)
        delayChildren: 1.5
      }
    }
  };

  const letterVariants = {
    hidden: { 
      opacity: 0
    },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.033 // было 0.05, стало 0.033 (в 1.5 раза быстрее)
      }
    }
  };

  const description = "Your personal AI assistant, ready to help you with any tasks. Start a conversation and discover the possibilities of artificial intelligence.";

  return (
    <div className="flex-1 flex items-center justify-center p-4 sm:p-8 min-h-0 overflow-hidden">
      <div className="max-w-2xl mx-auto text-center space-y-4 sm:space-y-8 w-full transform scale-95">
        <WelcomeLogo />

        {/* Animated Title and Description */}
        <div className="space-y-3 sm:space-y-4">
          {/* Плавное появление названия */}
          <motion.h1 
            className="text-4xl sm:text-5xl font-bold gradient-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          >
            Microbot AI
          </motion.h1>
          
          {/* Печатающийся текст описания */}
          <motion.div
            className="text-base sm:text-xl text-[var(--text-secondary)] leading-normal sm:leading-relaxed px-2 sm:px-0"
            initial="hidden"
            animate="visible"
            variants={descriptionVariants}
          >
            {description.split('').map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.div>
        </div>

        <WelcomeFeatures />
        <div className="mt-6 sm:mt-0">
          <WelcomeStartButton onStartChat={onStartChat} />
        </div>
      </div>
    </div>
  );
}