'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface WelcomeFeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export default function WelcomeFeatureCard({ 
  icon: Icon, 
  title, 
  description
}: WelcomeFeatureCardProps) {
  // Анимация появления карточки
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };




  // Анимация печатающегося текста для описания (ускорена в 1.5 раза)
  const descriptionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02, // было 0.03, стало 0.02 (в 1.5 раза быстрее)
        delayChildren: 0.4 // Начинается после заголовка
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

  return (
    <motion.div 
      className="p-4 sm:p-6 rounded-lg sm:rounded-2xl glass-effect hover:bg-white/40 transition-all duration-300 group cursor-pointer transform scale-95"
      variants={cardVariants}
    >
      <motion.div 
        className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-4 rounded-lg sm:rounded-xl bg-gradient-to-br from-[var(--soft-red)]/20 to-[var(--soft-red-light)]/20 flex items-center justify-center"
        animate={{ 
          y: [0, -5, 0],
          rotate: [0, 3, -3, 0]
        }}
        transition={{
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1 // Начинается через секунду после появления карточки
          },
          rotate: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }
        }}
      >
        <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-[var(--soft-red)]" />
      </motion.div>
      
      {/* Плавное появление заголовка */}
      <motion.h3 
        className="text-xs sm:text-lg font-semibold text-[var(--text-primary)] mb-0.5 sm:mb-2"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
      >
        {title}
      </motion.h3>
      
      {/* Печатающийся текст описания */}
      <motion.div
        className="text-[var(--text-muted)] text-[10px] sm:text-sm leading-tight text-center sm:text-left"
        initial="hidden"
        animate="visible"
        variants={descriptionVariants}
      >
        {description.split('').map((char, charIndex) => (
          <motion.span
            key={charIndex}
            variants={letterVariants}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}