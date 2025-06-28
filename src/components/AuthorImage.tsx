"use client";

import Image from "next/image";
import AuthorImageSource from "@/assets/author.png";
import { motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";

export default function AuthorImage() {
  /**
   * on mouse move, make the image translate slightly
   */

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      x.set(event.clientX / 50 - 10);
      y.set(event.clientY / 50 - 10);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [x, y]);

  const translateX = useTransform(
    x,
    (value) => `${Math.min(Math.max(value, -4), 4)}px`
  );
  const translateY = useTransform(
    y,
    (value) => `${Math.min(Math.max(value, -4), 4)}px`
  );

  return (
    <motion.div
      className="max-w-sm transition-transform"
      style={{
        translateX: translateX,
        translateY: translateY,
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      <Image
        src={AuthorImageSource}
        alt="Krish Gupta"
        className="h-full grayscale hover:grayscale-0 rotate-y-180 transition-all aspect-[4/5] object-cover duration-500 border-8 border-zinc-300"
      />
    </motion.div>
  );
}
