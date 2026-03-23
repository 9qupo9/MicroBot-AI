'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Zap, Heart, Sparkles } from 'lucide-react';
import WelcomeFeatureCard from './WelcomeFeatureCard';

export default function WelcomeFeatures() {
  const features = [
    {
      icon: MessageCircle,
      title: 'Smart Responses',
      description: 'Get detailed and helpful answers to any questions'
    },
    {
      icon: Zap,
      title: 'Fast Performance',
      description: 'Instant request processing and quick responses'
    },
    {
      icon: Heart,
      title: 'Friendly Interface',
      description: 'Simple and intuitive communication experience'
    },
    {
      icon: Sparkles,
      title: 'Creativity',
      description: 'Help with creative tasks and idea generation'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4, // Увеличиваем интервал между карточками
        delayChildren: 3.5 // Начинаем после завершения печати основного текста
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 mt-4 sm:mt-12 px-2 sm:px-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {features.map((feature, index) => (
        <WelcomeFeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          index={index}
        />
      ))}
    </motion.div>
  );
}