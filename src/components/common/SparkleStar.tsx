import React from 'react';
import { motion } from 'framer-motion';

interface SparkleStarProps {
  className?: string;
  size?: number;
  delay?: number;
}

export const SparkleStar: React.FC<SparkleStarProps> = ({
  className = '',
  size = 48,
  delay = 0,
}) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-theme-primary select-none pointer-events-none ${className}`}
      animate={{
        scale: [1, 1.15, 1],
        rotate: [0, 8, -8, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      {/* 4-pointed sparkle star with curved organic edges */}
      <path d="M50 0C50 27.6142 72.3858 50 100 50C72.3858 50 50 72.3858 50 100C50 72.3858 27.6142 50 0 50C27.6142 50 50 27.6142 50 0Z" />
    </motion.svg>
  );
};
