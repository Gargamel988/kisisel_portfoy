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
      className="min-h-screen bg-gradient-to-b from-black to-green-500 overflow-hidden flex justify-center"
    >
      <div className="flex flex-col items-center justify-center mt-20 md:mt-0 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={aboutSectionRef}
          className="text-center mb-8  lg:mb-16 xl:mb-20 "
          initial={{ opacity: 0, y: -80 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -80 }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: [0.25, 0.1, 0.25, 1], 
            type: "tween",
          }}
        >
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light tracking-widest mb-2 xl:mb-3 ">
            Hakkımda
          </h1>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-green-500 via-emerald-500 to-lime-400 rounded-full mb-4"/>

          <p className="text-slate-100 text-xs md:text-sm lg:text-base xl:text-lg leading-relaxed max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto text-center mb-4 px-4 xl:px-6">
            {aboutText}
          </p>
          <p className="text-gray-300 text-xs lg:text-sm xl:text-base mt-8 italic text-center ">
            Ayrıca Git, Expo, Vercel gibi araçlarla üretim sürecimi optimize
            ediyorum.
          </p>
        </motion.div>

        {/* Teknolojiler */}
        <div className="flex flex-col items-center justify-center ">
          <motion.div
            className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light tracking-wide mb-8 text-center text-green-400"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.45, 0, 0.55, 1],
              type: "tween"}}
          >
            Bildiğim Teknolojiler
          </motion.div>

          {/* Mobile: Grid layout for smaller screens */}
          <div className="block sm:hidden max-w-md">
            <div className="grid grid-cols-2 gap-3">
              {interests.map((interest, index) => (
                <motion.div
                  key={`interest-mobile-${index}`}
                  initial={{ opacity: 0, y: 80 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }
                  }
                  transition={{
                    duration: 1,
                    delay: 0.7 + index * 0.1,
                    ease: [0.25, 0.1, 0.25, 1],
                    type: "tween",
                  }}
                  className="flex flex-col items-center p-3 bg-slate-700/30 rounded-xl border border-slate-600/30"
                >
                  <div
                    className={`mb-2  ${
                      colorClassMap[interest.color]
                    }`}
                  >
                    {interest.icon}
                  </div>
                  <span className="text-slate-300 text-sm font-medium tracking-wider text-center">
                    {interest.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tablet: Scrolling layout */}
          <div className="hidden sm:block lg:hidden ">
              <motion.div
                animate={
                  isInView
                    ? { x: [0, -800], y: [0, 0] }
                    : { x: [0, 0], y: [0, 0] }
                }
                transition={{
                  duration: 25,
                  ease: [0.25, 0.1, 0.25, 1],
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="flex flex-row gap-3 "
              >
                  {[...interests, ...interests].map((interest, index) => (
                    <motion.div
                      key={`interest-tablet-${index}`}
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{
                        duration: 1.2,
                        ease: [0.45, 0, 0.55, 1],
                        type: "tween",
                      }}
                      className="flex flex-col items-center justify-center h-28 w-32 p-4 bg-slate-700/30 rounded-xl border border-slate-600/30"
                    >
                      <div
                        className={`mb-2 ${
                          colorClassMap[interest.color]
                        } `}
                      >
                        {interest.icon}
                      </div>
                      <span className="text-slate-300 text-sm font-medium tracking-wider text-center">
                        {interest.name}
                      </span>
                    </motion.div>
                  ))}
              </motion.div>
          </div>

          {/* Desktop: Original scrolling layout (1024px - 1535px) */}
          <div className="hidden lg:block xl:hidden ">
            <div className="overflow-hidden ">
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
                className="flex flex-row gap-2 "
              >
                  {[...interests, ...interests].map((interest, index) => (
                    <motion.div
                      key={`interest-desktop-${index}`}
                      initial={{ opacity: 0 }}
                      animate={
                        isInView ? { opacity: 1 } : { opacity: 0 }
                      }
                      transition={{
                        duration: 1,
                        ease: [0.45, 0, 0.55, 1],
                        type: "tween",
                      }}
                      className="flex flex-col items-center justify-center h-32 w-40 p-6 bg-slate-700/30 rounded-xl border border-slate-600/30"
                    >
                      <div
                        className={`mb-3 ${
                          colorClassMap[interest.color]
                        } `}
                      >
                        {interest.icon}
                      </div>
                      <span className="text-slate-300 text-sm font-medium tracking-wider">
                        {interest.name}
                      </span>
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
