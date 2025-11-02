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
    <section
      id="about-section"
      className="min-h-screen bg-gradient-to-b from-black to-green-500 p-4 sm:p-6 lg:p-10 xl:p-12 2xl:p-16"
    >
      <div className="flex flex-col items-center justify-center w-full min-h-screen overflow-hidden">
        {/* Header */}
        <motion.div
          ref={aboutSectionRef}
          className="text-center mb-8 sm:mb-12 lg:mb-16 xl:mb-20 2xl:mb-24"
          initial={{ opacity: 0, x: 0, y: -150 }}
          animate={
            isInView
              ? { opacity: 1, x: 0, y: 0 }
              : { opacity: 0, x: 0, y: -150 }
          }
          transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-light tracking-widest mb-2 xl:mb-3 2xl:mb-4">
            Hakkımda
          </h1>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-green-500 via-emerald-500 to-lime-400 rounded-full mb-4" />

          <p className="text-slate-100 text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl leading-relaxed max-w-xl sm:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto text-center mb-4 px-4 xl:px-6 2xl:px-8">
            {aboutText}
          </p>
          <p className="text-gray-300 text-xs sm:text-sm mt-8 italic text-center max-w-2xl mx-auto">
            Ayrıca Git, Expo, Vercel  gibi araçlarla üretim
            sürecimi optimize ediyorum.
          </p>
        </motion.div>

        {/* Teknolojiler */}
        <div className="flex flex-col items-center justify-center w-full">
          <motion.div
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light tracking-wide mb-8 text-center text-green-400"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
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
                  whileHover={{
                    boxShadow: "0_0_15px_rgba(34,197,94,0.4)",
                    scale: 1.05,
                    transition: { duration: 0.3, ease: "easeInOut" },
                  }}
                  className="flex flex-col items-center h-24 w-full p-3 bg-slate-700/30 rounded-xl border border-slate-600/30"
                >
                  <div
                    className={`mb-2 ${
                      colorClassMap[interest.color]
                    } transition-colors text-xl`}
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
                        className={`mb-2 ${
                          colorClassMap[interest.color]
                        } transition-colors text-2xl`}
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
                        className={`mb-3 ${
                          colorClassMap[interest.color]
                        } transition-colors text-3xl`}
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
                  {[...interests, ...interests, ...interests].map(
                    (interest, index) => (
                      <motion.div
                        key={`interest-2k-${index}`}
                        initial={{ opacity: 0, y: 150 }}
                        animate={
                          isInView
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 150 }
                        }
                        transition={{
                          duration: 1,
                          delay: 0.7 + index * 0.05,
                          ease: "easeInOut",
                        }}
                        className="flex flex-col items-center h-40 w-48 p-8 bg-slate-700/30 rounded-2xl border border-slate-600/30 backdrop-blur-sm"
                      >
                        <div
                          className={`mb-4 ${
                            colorClassMap[interest.color]
                          } transition-colors text-4xl`}
                        >
                          {interest.icon}
                        </div>
                        <span className="text-slate-300 text-base font-medium tracking-wider text-center">
                          {interest.name}
                        </span>
                      </motion.div>
                    )
                  )}
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
                  {[...interests, ...interests, ...interests, ...interests].map(
                    (interest, index) => (
                      <motion.div
                        key={`interest-4k-${index}`}
                        initial={{ opacity: 0, y: 150 }}
                        animate={
                          isInView
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 150 }
                        }
                        transition={{
                          duration: 1,
                          delay: 0.7 + index * 0.03,
                          ease: "easeInOut",
                        }}
                        className="flex flex-col items-center h-48 w-56 p-10 bg-slate-700/30 rounded-3xl border border-slate-600/30 backdrop-blur-sm hover:bg-slate-700/50 transition-all duration-300"
                      >
                        <div
                          className={`mb-6 ${
                            colorClassMap[interest.color]
                          } transition-colors text-5xl`}
                        >
                          {interest.icon}
                        </div>
                        <span className="text-slate-300 text-lg font-medium tracking-wider text-center">
                          {interest.name}
                        </span>
                      </motion.div>
                    )
                  )}
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
