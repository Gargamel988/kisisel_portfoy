"use client";
import { motion, useInView, Variants } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

interface SocialMedia {
  name: string;
  icon: React.ElementType;
  href: string;
}

const socialMedia: SocialMedia[] = [
  {
    name: "Instagram",
    icon: FaInstagram,
    href: "https://www.instagram.com/omeraydin9826/",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/ömer-aydın-3bb453366",
  },
  {
    name: "GitHub",
    icon: FaGithub,
    href: "https://github.com/Gargamel988",
  },
  {
    name: "X",
    icon: FaXTwitter,
    href: "https://x.com/omerAIdev",
  },
];

const HeroSectionClient: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroSectionRef);

  const shouldAnimate = isInView;

  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.9,
        delay: 0.2,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const socialVariants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.9,
        delay: 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.9,
        delay: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <section
      id="home-section"
      className="flex justify-center items-center bg-gradient-to-b from-green-500 to-black min-h-screen w-full"
    >
      <div
        className="grid grid-cols-1 lg:grid-cols-2 mt-12 md:mt-14 max-w-7xl mx-auto "
        ref={heroSectionRef}
      >
        {/* Text Content */}
        <motion.div
          variants={textVariants as unknown as Variants}
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          className="flex flex-col md:items-center lg:items-start justify-center mb-8 md:mb-10 px-5 lg:px-8 xl:px-10 md:gap-5 text-center lg:text-left order-2 lg:order-1"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 leading-tight">
            Merhaba <br className="block md:hidden lg:block" />
            <span className="text-2xl md:text-3xl lg:text-4xl text-green-500 font-sans mb-4">
              Ben Ömer
            </span>
          </h1>

          <p className="text-base md:text-xl text-gray-200 leading-relaxed mb-8">
            Modern web ve mobil uygulamalar geliştiriyorum. React, Next.js, ve
            React Native ile kullanıcı dostu arayüzler inşa ederken; Supabase ve
            Vercel AI SDK ile yapay zekâ destekli deneyimler oluşturuyorum.
          </p>

          {/* Social Media Links */}
          <motion.div
            variants={socialVariants as unknown as Variants}
            initial="hidden"
            animate={shouldAnimate ? "visible" : "hidden"}
            className="flex items-center justify-center gap-4 md:gap-6 lg:gap-8"
          >
            {socialMedia.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{
                  scale: 1.2,
                  rotate: 10,
                  boxShadow: "0px 0px 25px rgba(34,197,94,0.6)",
                  border: "1px solid rgba(34,197,94,0.6)",
                  backgroundColor: "rgba(34,197,94,0.6)",
                }}
                whileTap={{ scale: 0.95, rotate: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="rounded-full shadow-md shadow-green-500/30 "
              >
                <Link
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="flex items-center justify-center bg-white/10 hover:bg-green-500/20 p-3 md:p-4 lg:p-5 rounded-full shadow-md shadow-green-500/30 transition-colors duration-300 group "
                >
                  <item.icon className="w-6 h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 text-green-500 group-hover:text-white  transition-colors duration-300" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Profile Image */}
        <motion.div
          variants={imageVariants as unknown as Variants}
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          className="flex items-center justify-center order-1 lg:order-2"
        >
          <div
            className="relative w-36 h-36 md:w-52 md:h-52 lg:w-64 lg:h-64 xl:w-72 xl:h-72 flex items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Rotating Borders */}
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: isHovered ? Infinity : 0,
              }}
              className="absolute inset-0 rounded-full border-2 border-green-500 z-10 border-b-transparent border-r-transparent"
            />
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: isHovered ? -360 : 0 }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: isHovered ? Infinity : 0,
              }}
              className="absolute inset-0 rounded-full border-2 border-green-500 z-10 border-r-transparent border-l-transparent"
            />

            {/* Profile Image */}
            <motion.div
              className="rounded-full overflow-hidden z-30"
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
            >
              <Image
                src="/profil.jpg"
                alt="Ömer Aydın"
                width={400}
                height={400}
                className="rounded-full w-36 h-36 md:w-52 md:h-52 lg:w-64 lg:h-64 xl:w-72 xl:h-72 object-cover"
                priority
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSectionClient;
