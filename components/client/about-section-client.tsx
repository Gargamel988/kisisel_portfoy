"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Interest } from "../about-section";

interface AboutSectionClientProps {
  interests: Interest[];
  colorClassMap: { [key: string]: string };
  aboutText: string;
}

const AboutSectionClient: React.FC<AboutSectionClientProps> = ({
  interests,
  colorClassMap,
  aboutText,
}) => {
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(aboutSectionRef);

  return (
    <section id="about-section" className="min-h-screen bg-gradient-to-b from-black to-green-500 p-4 sm:p-6 lg:p-10 xl:p-12 2xl:p-16">
      <div className="flex flex-col items-center justify-center w-full min-h-screen overflow-hidden">
        {/* Header */}
        <motion.div
          ref={aboutSectionRef}
          className="text-center mb-8 sm:mb-12 lg:mb-16 xl:mb-20 2xl:mb-24"
          initial={{ opacity: 0, x: 0, y: -150 }}
          animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 0, y: -150 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
        >
          <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-light tracking-widest mb-2 xl:mb-3 2xl:mb-4">Hakkımda</h1>
          <div className="w-16 sm:w-20 lg:w-24 xl:w-28 2xl:w-32 h-0.5 xl:h-1 2xl:h-1.5 bg-green-500 mx-auto mb-2 xl:mb-3 2xl:mb-4"></div>
          <p className="text-slate-300 text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl leading-relaxed max-w-xl sm:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto text-center mb-4 px-4 xl:px-6 2xl:px-8">
            {aboutText}
          </p>
        </motion.div>

        {/* Teknolojiler */}
        <div className="flex flex-col items-center justify-center w-full">
          <motion.div
            className="text-lg sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-center font-light tracking-widest mb-4 sm:mb-6 lg:mb-8 xl:mb-10 2xl:mb-12 px-4 xl:px-6 2xl:px-8"
            initial={{ opacity: 0, x: 0, y: 100 }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 0, y: 100 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
          >
            Bildiğim Teknolojiler
          </motion.div>

          {/* Mobile: Grid layout for smaller screens */}
          <div className="block sm:hidden w-full max-w-md">
            <div className="grid grid-cols-2 gap-3 px-4">
              {interests.map((interest, index) => (
                <motion.div
                  key={`interest-mobile-${index}`}
                  initial={{ opacity: 0, y: 150 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 150 }
                  }
                  transition={{
                    duration: 1,
                    delay: 0.7 + index * 0.1,
                    ease: "easeInOut",
                  }}
                  className="flex flex-col items-center h-24 w-full p-3 bg-slate-700/30 rounded-xl border border-slate-600/30"
                >
                  <div
                    className={`mb-2 ${colorClassMap[interest.color]} transition-colors text-xl`}
                  >
                    {interest.icon}
                  </div>
                  <span className="text-slate-300 text-xs font-medium tracking-wider text-center">
                    {interest.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tablet: Scrolling layout */}
          <div className="hidden sm:block lg:hidden w-full max-w-4xl">
            <div className="overflow-hidden w-full px-6">
              <motion.div
                animate={
                  isInView
                    ? { x: [0, -800], y: [0, 0] }
                    : { x: [0, 0], y: [0, 0] }
                }
                transition={{
                  duration: 20,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="flex flex-row gap-3 w-max"
              >
                <div className="flex flex-row gap-3">
                  {[...interests, ...interests].map((interest, index) => (
                    <motion.div
                      key={`interest-tablet-${index}`}
                      initial={{ opacity: 0, y: 150 }}
                      animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 150 }
                      }
                      transition={{
                        duration: 1,
                        delay: 0.7 + index * 0.1,
                        ease: "easeInOut",
                      }}
                      className="flex flex-col items-center h-28 w-32 p-4 bg-slate-700/30 rounded-xl border border-slate-600/30"
                    >
                      <div
                        className={`mb-2 ${colorClassMap[interest.color]} transition-colors text-2xl`}
                      >
                        {interest.icon}
                      </div>
                      <span className="text-slate-300 text-xs font-medium tracking-wider text-center">
                        {interest.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Desktop: Original scrolling layout (1024px - 1535px) */}
          <div className="hidden lg:block xl:hidden w-full max-w-7xl">
            <div className="overflow-hidden w-full px-10">
              <motion.div
                animate={
                  isInView
                    ? { x: [0, -1000], y: [0, 0] }
                    : { x: [0, 0], y: [0, 0] }
                }
                transition={{
                  duration: 25,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="flex flex-row gap-2 w-max"
              >
                <div className="flex flex-row gap-2">
                  {[...interests, ...interests].map((interest, index) => (
                    <motion.div
                      key={`interest-desktop-${index}`}
                      initial={{ opacity: 0, y: 150 }}
                      animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 150 }
                      }
                      transition={{
                        duration: 1,
                        delay: 0.7 + index * 0.1,
                        ease: "easeInOut",
                      }}
                      className="flex flex-col items-center h-32 w-40 p-6 bg-slate-700/30 rounded-xl border border-slate-600/30"
                    >
                      <div
                        className={`mb-3 ${colorClassMap[interest.color]} transition-colors text-3xl`}
                      >
                        {interest.icon}
                      </div>
                      <span className="text-slate-300 text-sm font-medium tracking-wider">
                        {interest.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* 2K Screens: Enhanced scrolling layout (1536px - 2559px) */}
          <div className="hidden xl:block 2xl:hidden w-full max-w-[90vw]">
            <div className="overflow-hidden w-full px-12">
              <motion.div
                animate={
                  isInView
                    ? { x: [0, -1400], y: [0, 0] }
                    : { x: [0, 0], y: [0, 0] }
                }
                transition={{
                  duration: 30,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="flex flex-row gap-4 w-max"
              >
                <div className="flex flex-row gap-4">
                  {[...interests, ...interests, ...interests].map((interest, index) => (
                    <motion.div
                      key={`interest-2k-${index}`}
                      initial={{ opacity: 0, y: 150 }}
                      animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 150 }
                      }
                      transition={{
                        duration: 1,
                        delay: 0.7 + index * 0.05,
                        ease: "easeInOut",
                      }}
                      className="flex flex-col items-center h-40 w-48 p-8 bg-slate-700/30 rounded-2xl border border-slate-600/30 backdrop-blur-sm"
                    >
                      <div
                        className={`mb-4 ${colorClassMap[interest.color]} transition-colors text-4xl`}
                      >
                        {interest.icon}
                      </div>
                      <span className="text-slate-300 text-base font-medium tracking-wider text-center">
                        {interest.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* 4K Screens: Premium scrolling layout (2560px+) */}
          <div className="hidden 2xl:block w-full max-w-[95vw]">
            <div className="overflow-hidden w-full px-16">
              <motion.div
                animate={
                  isInView
                    ? { x: [0, -2000], y: [0, 0] }
                    : { x: [0, 0], y: [0, 0] }
                }
                transition={{
                  duration: 35,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="flex flex-row gap-6 w-max"
              >
                <div className="flex flex-row gap-6">
                  {[...interests, ...interests, ...interests, ...interests].map((interest, index) => (
                    <motion.div
                      key={`interest-4k-${index}`}
                      initial={{ opacity: 0, y: 150 }}
                      animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 150 }
                      }
                      transition={{
                        duration: 1,
                        delay: 0.7 + index * 0.03,
                        ease: "easeInOut",
                      }}
                      className="flex flex-col items-center h-48 w-56 p-10 bg-slate-700/30 rounded-3xl border border-slate-600/30 backdrop-blur-sm hover:bg-slate-700/50 transition-all duration-300"
                    >
                      <div
                        className={`mb-6 ${colorClassMap[interest.color]} transition-colors text-5xl`}
                      >
                        {interest.icon}
                      </div>
                      <span className="text-slate-300 text-lg font-medium tracking-wider text-center">
                        {interest.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionClient;