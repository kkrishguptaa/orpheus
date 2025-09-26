'use client';

import { motion, useMotionValue, useTransform } from 'motion/react';
import Image from 'next/image';
import { useEffect } from 'react';
import AuthorImageSource from '@/assets/author.webp';

export default function AuthorImage() {
  /**
   * on mouse move, make the image translate slightly
   */

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      x.set((event.clientX / window.innerWidth - 0.5) * 8);
      y.set((event.clientY / window.innerHeight - 0.5) * 8);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [x, y]);

  const translateX = useTransform(
    x,
    (value) => `${Math.min(Math.max(value, -6), 6)}px`,
  );
  const translateY = useTransform(
    y,
    (value) => `${Math.min(Math.max(value, -6), 6)}px`,
  );

  return (
    <motion.div
      className="max-w-sm"
      style={{
        translateX: translateX,
        translateY: translateY,
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 20,
        mass: 0.8,
      }}
    >
      <Image
        src={AuthorImageSource}
        alt="Krish Gupta"
        className="h-full grayscale hover:grayscale-0 rotate-y-180 transition-all aspect-[4/5] object-cover duration-500 border-8 border-zinc-800 dark:border-zinc-300"
      />
    </motion.div>
  );
}
