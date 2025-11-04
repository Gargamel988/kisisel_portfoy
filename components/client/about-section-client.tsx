"use client";
import React, { useRef, useMemo, useEffect, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

// Types
interface Interest {
  name: string;
  icon: React.ReactNode;
  color: string;
}

interface AboutSectionClientProps {
  interests: Interest[];
  colorClassMap: { [key: string]: string };
  aboutText: string;
}

// Constants
const ANIMATION_CONFIG = {
  SCROLL_DURATION: 25,
  ITEM_DELAY_INCREMENT: 0.1,
  BASE_DELAY: 0.7,
  FADE_DURATION: 0.8,
  SCROLL_DISTANCE_TABLET: -800,
  SCROLL_DISTANCE_DESKTOP: -1000,
} as const;

const EASING = {
  SMOOTH: [0.25, 0.1, 0.25, 1] as const,
  LINEAR: "linear" as const,
} as const;

// Reusable Interest Card Component
const InterestCard: React.FC<{
  interest: Interest;
  colorClass: string;
  className?: string;
}> = ({ interest, colorClass, className = "" }) => (
  <div
    className={`flex flex-col items-center justify-center bg-slate-700/30 rounded-xl border border-slate-600/30 ${className}`}
    role="article"
    aria-label={`Teknoloji: ${interest.name}`}
  >
    <div className={`mb-2 lg:mb-3 ${colorClass}`} aria-hidden="true">
      {interest.icon}
    </div>
    <span className="text-slate-300 text-sm font-medium tracking-wider text-center">
      {interest.name}
    </span>
  </div>
);

const AboutSectionClient: React.FC<AboutSectionClientProps> = ({
  interests,
  colorClassMap,
  aboutText,
}) => {
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(aboutSectionRef, { once: false, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const shouldAnimate = isMounted && isInView;

  // Memoize duplicated interests array
  const duplicatedInterests = useMemo(
    () => [...interests, ...interests],
    [interests]
  );

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: ANIMATION_CONFIG.FADE_DURATION,
        ease: EASING.SMOOTH,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: ANIMATION_CONFIG.FADE_DURATION,
        ease: EASING.SMOOTH,
        delay: 0.5,
      },
    },
  };

  return (
    <section
      id="about-section"
      className="min-h-screen bg-gradient-to-b from-black to-green-500 flex justify-center w-full"
      aria-labelledby="about-heading"
    >
      <div className="flex flex-col items-center justify-center w-full max-w-7xl px-4">
        {/* Header */}
        <motion.div
          ref={aboutSectionRef}
          className="text-center mb-12 lg:mb-16 xl:mb-20"
          initial={false}
          animate={shouldAnimate ? "visible" : "hidden"}
          variants={headerVariants}
        >
          <h1
            id="about-heading"
            className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light tracking-widest mb-2 xl:mb-3"
          >
            Hakkımda
          </h1>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-green-500 via-emerald-500 to-lime-400 rounded-full mb-4" />

          <p className="text-slate-100 text-xs md:text-sm lg:text-base xl:text-lg leading-relaxed max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl text-center mb-4 px-4 xl:px-6">
            {aboutText}
          </p>
          <p className="text-gray-300 text-xs lg:text-sm xl:text-base mt-8 italic text-center">
            Ayrıca Git, Expo, Vercel gibi araçlarla üretim sürecimi optimize
            ediyorum.
          </p>
        </motion.div>

        {/* Teknolojiler */}
        <div className="flex flex-col items-center justify-center w-full">
          <motion.h2
            className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light tracking-wide mb-8 text-center text-green-400"
            initial={false}
            animate={shouldAnimate ? "visible" : "hidden"}
            variants={titleVariants}
          >
            Bildiğim Teknolojiler
          </motion.h2>

          {/* Mobile: Grid layout */}
          <div className="block sm:hidden w-full max-w-md">
            <div className="grid grid-cols-2 gap-3 px-4">
              {interests.map((interest, index) => (
                <motion.div
                  key={`interest-mobile-${interest.name}-${index}`}
                  initial={false}
                  animate={
                    shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }
                  }
                  transition={{
                    duration: prefersReducedMotion ? 0 : 1,
                    delay: prefersReducedMotion
                      ? 0
                      : ANIMATION_CONFIG.BASE_DELAY +
                        index * ANIMATION_CONFIG.ITEM_DELAY_INCREMENT,
                    ease: EASING.SMOOTH,
                  }}
                >
                  <InterestCard
                    interest={interest}
                    colorClass={colorClassMap[interest.color]}
                    className="p-3 h-28"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tablet: Scrolling layout */}
          <div className="hidden sm:block lg:hidden w-full">
            <div className="overflow-hidden">
              <motion.div
                animate={
                  shouldAnimate && !prefersReducedMotion
                    ? {
                        x: [0, ANIMATION_CONFIG.SCROLL_DISTANCE_TABLET],
                        
                      }
                    : { x: 0 }
                }
                transition={{
                  duration: ANIMATION_CONFIG.SCROLL_DURATION,
                  ease: EASING.LINEAR,
                  delay: 0.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="flex flex-row gap-3"
              >
                {duplicatedInterests.map((interest, index) => (
                  <motion.div
                    key={`interest-tablet-${interest.name}-${index}`}
                    initial={false}
                    animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
                    transition={{
                      duration: prefersReducedMotion
                        ? 0
                        : ANIMATION_CONFIG.FADE_DURATION,
                      ease: EASING.SMOOTH,
                    }}
                  >
                    <InterestCard
                      interest={interest}
                      colorClass={colorClassMap[interest.color]}
                      className="h-28 w-32 p-4 flex-shrink-0"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Desktop: Scrolling layout */}
          <div className="hidden lg:block w-full">
            <div className="overflow-hidden">
              <motion.div
                animate={
                  shouldAnimate && !prefersReducedMotion
                    ? {
                        x: [0, ANIMATION_CONFIG.SCROLL_DISTANCE_DESKTOP],
                      }
                    : { x: 0 }
                }
                transition={{
                  duration: ANIMATION_CONFIG.SCROLL_DURATION,
                  ease: EASING.LINEAR,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="flex flex-row gap-2"
              >
                {duplicatedInterests.map((interest, index) => (
                  <motion.div
                    key={`interest-desktop-${interest.name}-${index}`}
                    initial={false}
                    animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
                    transition={{
                      duration: prefersReducedMotion
                        ? 0
                        : ANIMATION_CONFIG.FADE_DURATION,
                      ease: EASING.SMOOTH,
                      delay: 0.5,
                    }}
                  >
                    <InterestCard
                      interest={interest}
                      colorClass={colorClassMap[interest.color]}
                      className="h-32 w-40 p-6 flex-shrink-0"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionClient;