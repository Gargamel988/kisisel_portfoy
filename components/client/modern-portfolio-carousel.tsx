"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import ModalContent from "../modal-content";

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image: StaticImageData | string;
  technologies: string[];
  modalItems: ModalItem[];
  status: string;
}

export interface ModalItem {
  title: string;
  description: string;
  category: string;
  image: StaticImageData | string;
  technologies: string[];
  features: string[];
  duration: string;
  role: string;
  team: string;
  link: string;
  libraries: string[];
}

export default function ModernPortfolioCarousel({
  items = [],
}: {
  items: PortfolioItem[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlay = true;
  const interval = 5000;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(portfolioRef);

  useEffect(() => {
    if (!autoPlay || isHovered || isModalOpen) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, items.length, isHovered, isModalOpen]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <section
        id="projects-section"
        className="relative w-full min-h-screen bg-gradient-to-b from-green-500 to-black overflow-hidden"
      >
      <div className="relative z-10 container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
        {/* Carousel Container */}
        <div
          className="relative max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-7xl xl:max-w-8xl 2xl:max-w-9xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Carousel */}
          <div
            ref={portfolioRef}
            className="relative h-[60vh] sm:h-[70vh] md:h-[calc(100vh-120px)] lg:h-[calc(100vh-140px)] xl:h-[calc(100vh-160px)] 2xl:h-[calc(100vh-180px)] rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden flex flex-col items-center justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.5 }
                }
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  {items[currentIndex].image &&
                  items[currentIndex].image !== "" ? (
                    <Image
                      src={items[currentIndex].image}
                      alt={items[currentIndex].title}
                      className="w-full h-full object-cover"
                      priority
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1536px) 80vw, 70vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white text-lg sm:text-xl md:text-2xl"></div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex items-end p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 2xl:p-12">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
                    }
                    transition={{
                      duration: 0.6,
                      delay: 0.2,
                      ease: "easeInOut",
                    }}
                    className="absolute top-0 left-0 px-10 py-2 text-white text-xs sm:text-sm md:text-base font-medium"
                  >
                    <span className="inline-block px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-full text-green-300 text-xs sm:text-sm md:text-base font-medium">
                      {items[currentIndex].status}
                    </span>
                  </motion.div>
                  <div className="max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl">
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={
                        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
                      }
                      transition={{
                        duration: 0.6,
                        delay: 0.2,
                        ease: "easeInOut",
                      }}
                      className="mb-2 sm:mb-3 md:mb-4"
                    >
                      <span className="inline-block px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-full text-green-300 text-xs sm:text-sm md:text-base font-medium">
                        {items[currentIndex].category}
                      </span>
                    </motion.div>

                    <motion.h2
                      initial={{ opacity: 0, x: -50 }}
                      animate={
                        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
                      }
                      transition={{
                        duration: 0.6,
                        delay: 0.3,
                        ease: "easeInOut",
                      }}
                      className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white mb-2 sm:mb-3 md:mb-4 leading-tight"
                    >
                      {items[currentIndex].title}
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0, x: -50 }}
                      animate={
                        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
                      }
                      transition={{
                        duration: 0.6,
                        delay: 0.4,
                        ease: "easeInOut",
                      }}
                      className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-200 mb-3 sm:mb-4 md:mb-6 leading-relaxed"
                    >
                      {items[currentIndex].description}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={
                        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
                      }
                      transition={{
                        duration: 0.6,
                        delay: 0.5,
                        ease: "easeInOut",
                      }}
                      className="flex flex-col gap-1 sm:gap-2 mb-4 sm:mb-6 md:mb-8"
                    >
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {items[currentIndex].technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 sm:px-3 py-1 bg-black/30 backdrop-blur-sm border border-gray-600/30 rounded-md sm:rounded-lg text-gray-300 text-xs sm:text-sm md:text-base"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>

                    {items[currentIndex].modalItems.length > 0 && (
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
                    
                        <motion.div
                          initial={{ opacity: 0, x: -50 }}
                          animate={
                            isInView
                              ? { opacity: 1, x: 0 }
                              : { opacity: 0, x: -50 }
                          }
                          transition={{
                            duration: 0.6,
                            delay: 0.6,
                            ease: "easeInOut",
                          }}
                          className="flex-1 sm:flex-none"
                        >
                          <button
                            onClick={openModal}
                            className="w-full sm:w-auto px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 bg-white text-green-500 font-semibold rounded-lg sm:rounded-xl text-sm sm:text-base md:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/25"
                          >
                            Detayları Gör
                          </button>
                        </motion.div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.7, ease: "easeInOut" }}
            className="absolute top-1/2 -translate-y-1/2 left-1 sm:left-2 md:left-4 z-20"
          >
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-black/20 backdrop-blur-sm border-white/20 text-white hover:bg-black/40 hover:border-white/40 transition-all duration-300"
            >
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeInOut" }}
            className="absolute top-1/2 -translate-y-1/2 right-1 sm:right-2 md:right-4 z-20"
          >
            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-black/20 backdrop-blur-sm border-white/20 text-white hover:bg-black/40 hover:border-white/40 transition-all duration-300"
            >
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
            </Button>
          </motion.div>

          {/* Dots Indicator */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.9, ease: "easeInOut" }}
            className="flex justify-center items-center mt-4 sm:mt-6 md:mt-8 gap-2 sm:gap-3"
          >
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "bg-green-400 scale-125 shadow-lg shadow-green-400/50"
                    : "bg-white/30 hover:bg-white/50"
                )}
              />
            ))}
          </motion.div>
        </div>
      </div>
      </section>
      <ModalContent 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen}
        item={items[currentIndex]}
      />
    </>
  );
}
