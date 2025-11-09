"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    title: "E-posta",
    description: "E-posta ile iletişime geçin",
    value: "omeraydin1.web@gmail.com",
    link: "mailto:omeraydin1.web@gmail.com",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: Phone,
    title: "Telefon",
    description: "Doğrudan aramak için",
    value: "+90 (553) 731-92-88",
    link: "tel:+905537319288",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: MapPin,
    title: "Adres",
    description: "Adresim",
    value: "Hatay, Türkiye",
    link: "#",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
];

// Main Component
function ContactFooter() {
  const footerSectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerSectionRef, { once: false, amount: 0.2 });

  return (
    <section
      id="footers-section"
      className="min-h-screen bg-gradient-to-b from-black to-green-500 "
    >
      <div
        ref={footerSectionRef}
        className="px-4 md:px-6 lg:px-8 xl:px-10 py-24 "
      >
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -100 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="flex flex-col items-center justify-center mb-6 md:mb-8"
        >
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4 text-center">
            İletişim Yolları
          </h3>
          <p className="text-white/60 text-sm md:text-base lg:text-lg text-center">
            Size en uygun olan yöntemi seçin.
          </p>
        </motion.div>

        <div className="space-y-4 md:space-y-6 max-w-5xl mx-auto">
          {contactMethods.map((method, index) => {
            // 1. kart soldan, 2. kart sağdan, 3. kart soldan
            const animationX = index % 2 === 0 ? -100 : 100;

            return (
              <motion.a
                key={index}
                href={method.link}
                initial={{ opacity: 0, x: animationX }}
                animate={
                  isInView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: animationX }
                }
                transition={{
                  duration: 0.7,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: index * 0.2,
                }}
                className="block p-4 md:p-6 bg-white/[0.05] backdrop-blur-xl rounded-xl border border-white/[0.15] hover:bg-white/[0.08] transition-all group"
                whileHover={{ scale: 1.02, x: 4 }}
              >
                <div className="flex items-center gap-4 md:gap-6">
                  <motion.div
                    className={`p-3 md:p-4 rounded-xl bg-gradient-to-br ${method.gradient} border border-white/20 flex items-center justify-center flex-shrink-0`}
                    whileHover={{ scale: 1.1, rotateY: 180 }}
                    transition={{ duration: 0.6 }}
                  >
                    <method.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base md:text-lg font-semibold text-white mb-1">
                      {method.title}
                    </h4>
                    <p className="text-white/60 text-xs md:text-sm mb-1">
                      {method.description}
                    </p>
                    <p className="text-white font-medium text-sm md:text-base break-words">
                      {method.value}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-white/40 group-hover:text-white group-hover:translate-x-2 transition-all flex-shrink-0" />
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ContactFooter;
