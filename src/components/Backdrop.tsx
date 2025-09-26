'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import BackgroundImage1 from '@/assets/orpheus-1.jpg';
import BackgroundImage2 from '@/assets/orpheus-2.jpg';
import BackgroundImage3 from '@/assets/orpheus-3.jpg';
import BackgroundImage4 from '@/assets/orpheus-4.jpg';

export default function Backdrop({ poemsCount = 10 }: { poemsCount: number }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const checkDarkMode = () => {
      setIsDarkMode(
        document.documentElement.classList.contains('dark') ||
          (!document.documentElement.classList.contains('light') &&
            window.matchMedia('(prefers-color-scheme: dark)').matches),
      );
    };

    checkScreenSize();
    checkDarkMode();

    window.addEventListener('resize', checkScreenSize);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', checkDarkMode);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
      mediaQuery.removeEventListener('change', checkDarkMode);
    };
  }, []);

  const images = [
    BackgroundImage1,
    BackgroundImage2,
    BackgroundImage3,
    BackgroundImage4,
  ];

  const imageConfigs = [
    {
      desktop: { left: '10%', top: '10%', width: 280 },
      mobile: { left: '15%', top: '15%', width: 180 },
      parallaxSpeed: 0.3,
    },
    {
      desktop: { left: '80%', top: '25%', width: 220 },
      mobile: { left: '85%', top: '30%', width: 140 },
      parallaxSpeed: 0.5,
    },
    {
      desktop: { left: '75%', top: '70%', width: 180 },
      mobile: { left: '80%', top: '75%', width: 120 },
      parallaxSpeed: 0.7,
    },
    {
      desktop: { left: '5%', top: '85%', width: 350 },
      mobile: { left: '10%', top: '90%', width: 220 },
      parallaxSpeed: 0.4,
    },
  ];

  const { scrollY } = useScroll();

  // Create individual parallax transforms for each image at the top level
  // Reduce parallax intensity on mobile for better performance
  const parallaxMultiplier = isMobile ? -400 : -800;
  const scrollRange = isMobile ? 1500 : 2000;

  const parallax1 = useTransform(
    scrollY,
    [0, scrollRange],
    [isMobile ? 50 : 100, parallaxMultiplier * imageConfigs[0].parallaxSpeed],
  );
  const parallax2 = useTransform(
    scrollY,
    [0, scrollRange],
    [isMobile ? -25 : -50, parallaxMultiplier * imageConfigs[1].parallaxSpeed],
  );
  const parallax3 = useTransform(
    scrollY,
    [0, scrollRange],
    [0, parallaxMultiplier * imageConfigs[2].parallaxSpeed],
  );
  const parallax4 = useTransform(
    scrollY,
    [0, scrollRange],
    [isMobile ? 25 : 50, parallaxMultiplier * imageConfigs[3].parallaxSpeed],
  );

  // Dynamically calculate fade-out range based on poems count and device
  // Mobile: poems are taller due to responsive design
  const itemHeight = isMobile ? 70 : 50;
  const padding = isMobile ? 150 : 100;
  const estimatedContentHeight = poemsCount * itemHeight + padding;
  const fadeStart = Math.max(
    isMobile ? 300 : 400,
    estimatedContentHeight * 0.6,
  );
  const fadeEnd = Math.max(isMobile ? 600 : 800, estimatedContentHeight * 0.9);

  // Fade out opacity as we reach the end of poems list
  // Higher opacity in light mode for better visibility
  const maxOpacity = isDarkMode ? 0.15 : 0.4;
  const backdropOpacity = useTransform(
    scrollY,
    [fadeStart, fadeEnd],
    [maxOpacity, 0],
  );

  const parallaxTransforms = [parallax1, parallax2, parallax3, parallax4];

  return (
    <motion.div
      className="overflow-y-visible -z-10 fixed inset-0 scale-70 sm:scale-80 lg:scale-100"
      style={{
        opacity: backdropOpacity,
      }}
    >
      {imageConfigs.map((config, index) => {
        const activeConfig = isMobile ? config.mobile : config.desktop;
        return (
          <motion.div
            key={`${images[index % images.length].src}`}
            style={{
              y: parallaxTransforms[index],
              left: activeConfig.left,
              top: activeConfig.top,
              transform: `translate(-50%, -50%)`,
            }}
            className="absolute"
          >
            <Image
              src={images[index % images.length]}
              alt=""
              className={`object-cover border-4 ${isMobile ? 'sm:border-6' : 'border-8'} border-zinc-800 dark:border-white shadow-2xl`}
              width={activeConfig.width}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
