"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Instagram, Linkedin, Github } from "lucide-react";
import Image from "next/image";
import profile from "@/public/profile.jpeg";

interface SocialMedia {
  name: string;
  icon: React.ElementType;
  href: string;
}

const HeroSectionClient: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroSectionRef);
  const socialMedia: SocialMedia[] = [
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/omeraydin_/",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/omeraydin/",
    },
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/omeraydin",
    },
  ];

  return (
    <section id="home-section"
      className="min-h-screen bg-gradient-to-b from-green-500 to-black p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 2xl:p-12 4xl:p-16 overflow-hidden">
      <div
        className="grid grid-cols-1 lg:grid-cols-2 lg:gap-0 pt-8 sm:pt-10 md:pt-16 lg:pt-20 xl:pt-24 2xl:pt-28 4xl:pt-32 w-full min-h-screen max-w-screen-4xl mx-auto"
        ref={heroSectionRef}
      >
        <motion.div
          initial={{ opacity: 0, x: -150, y: 0 }}
          animate={
            isInView
              ? { opacity: 1, x: 0, y: 0 }
              : { opacity: 0, x: -150, y: 0 }
          }
          transition={{ duration: 1.2, delay: 0, ease: "easeInOut" }}
          className="flex flex-col items-center lg:items-start justify-center p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 2xl:p-12 4xl:p-16 gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8 2xl:gap-10 4xl:gap-12 w-full h-full text-center lg:text-left order-2 lg:order-1"
        >
          <h1 id="hero-title" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl 4xl:text-8xl font-bold mb-2 sm:mb-3 md:mb-2 lg:mb-5 xl:mb-6 2xl:mb-8 4xl:mb-10 leading-tight">
            Merhaba <br />
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl 4xl:text-9xl mb-2 sm:mb-3 md:mb-4 lg:mb-5 xl:mb-6 2xl:mb-8 4xl:mb-10 text-green-500 font-sans">
              Ben Ömer Aydın
            </span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl 4xl:text-3xl max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl 4xl:max-w-4xl mb-4 sm:mb-5 md:mb-0 lg:mb-7 xl:mb-8 2xl:mb-10 4xl:mb-12 px-3 sm:px-4 lg:px-0 leading-relaxed">
            Modern web teknolojileriyle kullanıcı odaklı arayüzler geliştiriyorum.
          </p>

          <motion.div
            initial={{ opacity: 0, x: -150, y: 0 }}
            animate={
              isInView
                ? { opacity: 1, x: 0, y: 0 }
                : { opacity: 0, x: -150, y: 0 }
            }
            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
            className="flex items-center justify-center lg:justify-start lg:pl-12 xl:pl-16 2xl:pl-20 4xl:pl-24 h-auto lg:h-full w-full"
          >
            <div className="flex items-center justify-center gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 4xl:gap-16">
              {socialMedia.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  whileHover={{
                    scale: 1.2,
                    rotate: 10,
                    boxShadow: "0px 4px 20px rgba(34,197,94,0.3)",
                    backgroundColor: "#22c55e",
                  }}
                  whileTap={{ scale: 0.95, rotate: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="rounded-full flex items-center justify-center bg-white/10 hover:bg-green-500/20 p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 2xl:p-7 4xl:p-8 shadow-md shadow-green-500/30 transition-colors duration-300 group"
                >
                  <item.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 2xl:w-9 2xl:h-9 4xl:w-12 4xl:h-12 text-green-500 group-hover:text-white transition-colors duration-300" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 150, y: 0 }}
          animate={
            isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 150, y: 0 }
          }
          transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
          className="flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 2xl:p-12 4xl:p-16 order-1 lg:order-2"
        >
          <div
            className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-64 lg:h-64 xl:w-72 xl:h-72 2xl:w-80 2xl:h-80 4xl:w-96 4xl:h-96 flex items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            role="img"
            aria-label="Ömer Aydın profil fotoğrafı"
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: isHovered ? Infinity : 0,
              }}
              className="absolute inset-0 rounded-full border border-green-500 z-10 border-b-transparent border-r-transparent"
            ></motion.div>
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: isHovered ? -360 : 0 }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: isHovered ? Infinity : 0,
              }}
              className="absolute inset-0 rounded-full border border-green-500 z-10 border-r-transparent border-l-transparent"
            ></motion.div>
            <motion.div
              className="rounded-full overflow-hidden w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-64 lg:h-64 xl:w-72 xl:h-72 2xl:w-80 2xl:h-80 4xl:w-96 4xl:h-96 z-30"
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
            >
              <Image
                src={profile}
                alt="Ömer Aydın"
                width={384}
                height={384}
                className="rounded-full w-full h-full object-cover"
                priority
                sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, (max-width: 1024px) 208px, (max-width: 1280px) 256px, (max-width: 1536px) 288px, (max-width: 1920px) 320px, 384px"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default HeroSectionClient;