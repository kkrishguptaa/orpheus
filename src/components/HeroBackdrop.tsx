"use client";

import BackgroundImage1 from "@/assets/orpheus-1.jpg";
import BackgroundImage2 from "@/assets/orpheus-2.jpg";
import BackgroundImage3 from "@/assets/orpheus-3.jpg";
import BackgroundImage4 from "@/assets/orpheus-4.jpg";
import clsx from "clsx";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";

export default function HeroBackdrop() {
  const images = [
    BackgroundImage1,
    BackgroundImage2,
    BackgroundImage3,
    BackgroundImage4,
  ];

  const imageConfigs = [
    {
      pos: `-left-10/100 top-90/100 sm:left-10/100 sm:top-80/100 md:left-15/100 md:top-75/100 lg:left-20/100 lg:top-70/100`,
      width: 300,
    },
    {
      pos: `left-5/100 top-10/100 sm:left-20/100 sm:top-15/100 md:left-30/100 md:top-20/100 lg:left-50/100 lg:top-25/100`,
      width: 250,
    },
    {
      pos: `left-100/100 top-20/100 sm:left-80/100 sm:top-25/100 md:left-75/100 md:top-30/100 lg:left-80/100 lg:top-33/100`,
      width: 200,
    },
    {
      pos: `left-100/100 top-85/100 sm:left-85/100 sm:top-80/100 md:left-80/100 md:top-80/100 lg:left-75/100 lg:top-75/100`,
      width: 450,
    },
  ];

  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 1200], [0, 300]);

  return (
    <motion.div
      style={{
        y: y,
      }}
      className="overflow-y-visible z-0 absolute inset-0 opacity-30 scale-60 sm:block sm:scale-75 lg:scale-100"
    >
      {imageConfigs.map((config, index) => (
        <Image
          key={index}
          src={images[index % images.length]}
          alt=""
          className={clsx(
            `absolute object-cover border-8 border-white`,
            config.pos
          )}
          width={config.width}
          style={{
            transform: `translate(-50%, -50%)`,
          }}
        />
      ))}
    </motion.div>
  );
}
