"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  User,
  MessageSquare,
  Building,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendEmail } from "../emailjs";

const contactMethods = [
  {
    icon: Mail,
    title: "E-posta",
    description: "E-posta ile iletişime geçin",
    value: "omeraydin1.web@gmail.com",
    link: "mailto:omeraydin1.web@gmail.com",
    gradient: "from-blue-500/20 to-cyan-500/20",
    hoverColor: "blue",
  },
  {
    icon: Phone,
    title: "Telefon",
    description: "Doğrudan aramak için",
    value: "+90 (553) 731-92-88",
    link: "tel:+905327319288",
    gradient: "from-green-500/20 to-emerald-500/20",
    hoverColor: "green",
  },
  {
    icon: MapPin,
    title: "Adres",
    description: " adresim",
    value: "Hatay, Türkiye",
    link: "#",
    gradient: "from-purple-500/20 to-pink-500/20",
    hoverColor: "purple",
  },
];

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Gönder", className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={`group relative w-full cursor-pointer overflow-hidden rounded-full border bg-background p-3 sm:p-4 md:p-5 lg:p-4 xl:p-5 2xl:p-6 text-center font-semibold text-sm sm:text-base md:text-lg lg:text-base xl:text-lg 2xl:text-xl ${className}`}
      {...props}
    >
      <span className="inline-block translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
        {text}
      </span>
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100">
        <span>{text}</span>
        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7" />
      </div>
      <div className="absolute left-[20%] top-[40%] h-2 w-2 scale-[1] rounded-lg bg-primary transition-all duration-300 group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8] group-hover:bg-primary"></div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

function ContactFooter() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const footerSectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerSectionRef);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "İsim gerekli";
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-posta gerekli";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Geçerli bir e-posta adresi girin";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Mesaj gerekli";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Mesaj en az 10 karakter olmalı";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!validateForm()) return;
  setIsSubmitting(false);
  setIsSubmitted(true);
  await sendEmail(e);     
  setIsSubmitting(true);
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  setIsSubmitting(true);
  setIsSubmitted(false);
}; 

  return (
    <section
      id="footers-section"
      className="min-h-screen bg-gradient-to-b from-black to-green-500 p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 2xl:p-12"
    >
      <div
        ref={footerSectionRef}
        className="w-full min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 2xl:gap-20 w-full max-w-xs xs:max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-8xl">
          {/* Contact Form Section */}
          <motion.div className="space-y-3 xs:space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-6 xl:space-y-8 2xl:space-y-10 order-2 lg:order-1">
            {/* Form Header */}
            <motion.div
              initial={{ opacity: 0, x: -150 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -150 }}
              transition={{ duration: 0.7, delay: 0.5, ease: "easeInOut" }}
              className="flex flex-col items-center justify-center pt-2 xs:pt-3 sm:pt-4 md:pt-6 lg:pt-8 xl:pt-10 2xl:pt-12"
            >
              <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-white mb-2 xs:mb-3 sm:mb-4 md:mb-6 lg:mb-4 xl:mb-6 2xl:mb-8 text-center">
                Bize Mesaj Gönderin
              </h3>
              <p className="text-white/60 text-xs xs:text-sm sm:text-base md:text-lg lg:text-base xl:text-lg 2xl:text-xl text-center px-2 xs:px-3 sm:px-4 md:px-6 lg:px-4 xl:px-6 2xl:px-8">
                Projeniz hakkında bize bilgi verin, 24 saat içinde size geri
                dönelim.
              </p>
            </motion.div>

            <AnimatePresence mode="popLayout">
              {!isSubmitted ? (
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-3 xs:space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-6 xl:space-y-8 2xl:space-y-10 px-2 xs:px-3 sm:px-4 md:px-6 lg:px-0 xl:px-0 2xl:px-0"
                  initial={{ opacity: 0, x: -250 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -250 }
                  }
                  transition={{ duration: 0.7, delay: 0.5, ease: "easeInOut" }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4 sm:gap-6 md:gap-8 lg:gap-6 xl:gap-8 2xl:gap-10">
                    <div className="relative">
                      <Label htmlFor="name" className="text-white/80 mb-1 xs:mb-2 sm:mb-2 md:mb-3 lg:mb-2 xl:mb-3 2xl:mb-4 block text-xs xs:text-sm sm:text-base md:text-lg lg:text-base xl:text-lg 2xl:text-xl">
                        İsim
                      </Label>
                      <div className="relative">
                        <User className="absolute left-2 xs:left-3 sm:left-3 md:left-4 lg:left-3 xl:left-4 2xl:left-5 top-1/2 transform -translate-y-1/2 h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-5 lg:w-5 xl:h-6 xl:w-6 2xl:h-7 2xl:w-7 text-white/40" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="Adınız"
                          value={formData.name}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleInputChange("name", e.target.value)
                          }
                          className={`pl-6 xs:pl-8 sm:pl-10 md:pl-12 lg:pl-10 xl:pl-12 2xl:pl-14 bg-white/[0.08] border text-white placeholder-white/40 focus:border-green-400 text-xs xs:text-sm sm:text-base md:text-lg lg:text-base xl:text-lg 2xl:text-xl h-8 xs:h-9 sm:h-10 md:h-12 lg:h-11 xl:h-12 2xl:h-14 ${
                            errors.name ? "border-red-400" : "border-white/[0.15]"
                          }`}
                        />
                      </div>
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: 150 }}
                          animate={
                            isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 150 }
                          }
                          transition={{ duration: 0.6, delay: 0.5, ease: "easeInOut" }}
                          className="text-red-400 text-xs xs:text-xs sm:text-sm md:text-base lg:text-sm xl:text-base 2xl:text-lg mt-1 xs:mt-1 sm:mt-2 md:mt-3 lg:mt-2 xl:mt-3 2xl:mt-4"
                        >
                          {errors.name}
                        </motion.p>
                      )}
                    </div>

                    <div className="relative">
                      <Label htmlFor="email" className="text-white/80 mb-1 xs:mb-2 sm:mb-2 md:mb-3 lg:mb-2 xl:mb-3 2xl:mb-4 block text-xs xs:text-sm sm:text-base md:text-lg lg:text-base xl:text-lg 2xl:text-xl">
                        E-posta
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-2 xs:left-3 sm:left-3 md:left-4 lg:left-3 xl:left-4 2xl:left-5 top-1/2 transform -translate-y-1/2 h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-5 lg:w-5 xl:h-6 xl:w-6 2xl:h-7 2xl:w-7 text-white/40" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="E-posta Adresiniz"
                          value={formData.email}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleInputChange("email", e.target.value)
                          }
                          className={`pl-6 xs:pl-8 sm:pl-10 md:pl-12 lg:pl-10 xl:pl-12 2xl:pl-14 bg-white/[0.08] border text-white placeholder-white/40 focus:border-green-400 text-xs xs:text-sm sm:text-base md:text-lg lg:text-base xl:text-lg 2xl:text-xl h-8 xs:h-9 sm:h-10 md:h-12 lg:h-11 xl:h-12 2xl:h-14 ${
                            errors.email ? "border-red-400" : "border-white/[0.15]"
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: 150 }}
                          animate={
                            isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 150 }
                          }
                          transition={{ duration: 0.6, delay: 0.5, ease: "easeInOut" }}
                          className="text-red-400 text-xs xs:text-xs sm:text-sm md:text-base lg:text-sm xl:text-base 2xl:text-lg mt-1 xs:mt-1 sm:mt-2 md:mt-3 lg:mt-2 xl:mt-3 2xl:mt-4"
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  <div className="relative">
                    <Label htmlFor="company" className="text-white/80 mb-1 xs:mb-2 sm:mb-2 md:mb-3 lg:mb-2 xl:mb-3 2xl:mb-4 block text-xs xs:text-sm sm:text-base md:text-lg lg:text-base xl:text-lg 2xl:text-xl">
                      Şirket (Opsiyonel)
                    </Label>
                    <div className="relative">
                      <Building className="absolute left-2 xs:left-3 sm:left-3 md:left-4 lg:left-3 xl:left-4 2xl:left-5 top-1/2 transform -translate-y-1/2 h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-5 lg:w-5 xl:h-6 xl:w-6 2xl:h-7 2xl:w-7 text-white/40" />
                      <Input
                        id="company"
                        type="text"
                        placeholder="Şirket Adı"
                        value={formData.company}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleInputChange("company", e.target.value)
                        }
                        className="pl-6 xs:pl-8 sm:pl-10 md:pl-12 lg:pl-10 xl:pl-12 2xl:pl-14 bg-white/[0.08] border border-white/[0.15] text-white placeholder-white/40 focus:border-green-400 text-xs xs:text-sm sm:text-base md:text-lg lg:text-base xl:text-lg 2xl:text-xl h-8 xs:h-9 sm:h-10 md:h-12 lg:h-11 xl:h-12 2xl:h-14"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <Label htmlFor="message" className="text-white/80 mb-1 xs:mb-2 sm:mb-2 md:mb-3 lg:mb-2 xl:mb-3 2xl:mb-4 block text-xs xs:text-sm sm:text-base md:text-lg lg:text-base xl:text-lg 2xl:text-xl">
                      Mesaj
                    </Label>
                    <div className="relative">
                      <MessageSquare className="absolute left-2 xs:left-3 sm:left-3 md:left-4 lg:left-3 xl:left-4 2xl:left-5 top-3 xs:top-4 sm:top-4 md:top-5 lg:top-4 xl:top-5 2xl:top-6 h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-5 lg:w-5 xl:h-6 xl:w-6 2xl:h-7 2xl:w-7 text-white/40" />
                      <Textarea
                        id="message"
                        placeholder="Projeniz hakkında bize bilgi verin..."
                        rows={4}
                        value={formData.message}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                          handleInputChange("message", e.target.value)
                        }
                        className={`pl-6 xs:pl-8 sm:pl-10 md:pl-12 lg:pl-10 xl:pl-12 2xl:pl-14 bg-white/[0.08] border text-white placeholder-white/40 focus:border-green-400 resize-none text-xs xs:text-sm sm:text-base md:text-lg lg:text-base xl:text-lg 2xl:text-xl min-h-[80px] xs:min-h-[90px] sm:min-h-[100px] md:min-h-[120px] lg:min-h-[110px] xl:min-h-[130px] 2xl:min-h-[150px] ${
                          errors.message ? "border-red-400" : "border-white/[0.15]"
                        }`}
                      />
                    </div>
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: 150 }}
                        animate={
                          isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 150 }
                        }
                        transition={{ duration: 0.6, delay: 0.5, ease: "easeInOut" }}
                        className="text-red-400 text-xs xs:text-xs sm:text-sm md:text-base lg:text-sm xl:text-base 2xl:text-lg mt-1 xs:mt-1 sm:mt-2 md:mt-3 lg:mt-2 xl:mt-3 2xl:mt-4"
                      >
                        {errors.message}
                      </motion.p>
                    )}
                  </div>

                  <InteractiveHoverButton
                    type="submit"
                    disabled={isSubmitting}
                    text={isSubmitting ? "Gönderiliyor..." : "Mesaj Gönder"}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white disabled:opacity-50"
                  />
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 150 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 150 }}
                  transition={{ duration: 0.7, delay: 0.5, ease: "easeInOut" }}
                  className="text-center py-4 xs:py-6 sm:py-8 md:py-10 lg:py-8 xl:py-10 2xl:py-12 px-2 xs:px-3 sm:px-4 md:px-6 lg:px-0 xl:px-0 2xl:px-0"
                >
                  <motion.div
                    className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-18 lg:h-18 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center mx-auto mb-3 xs:mb-4 sm:mb-6 md:mb-8 lg:mb-6 xl:mb-8 2xl:mb-10"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-9 lg:h-9 xl:w-10 xl:h-10 2xl:w-12 2xl:h-12 text-green-400" />
                  </motion.div>
                  <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-white mb-2 xs:mb-3 sm:mb-4 md:mb-6 lg:mb-4 xl:mb-6 2xl:mb-8">
                    Mesaj Gönderildi!
                  </h3>
                  <p className="text-white/60 text-xs xs:text-sm sm:text-base md:text-lg lg:text-base xl:text-lg 2xl:text-xl mb-3 xs:mb-4 sm:mb-6 md:mb-8 lg:mb-6 xl:mb-8 2xl:mb-10">
                    İletişime geçtiğiniz için teşekkürler. 24 saat içinde size
                    geri dönüş yapacağız.
                  </p>
                  <Button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        company: "",
                        message: "",
                      });
                    }}
                    className="bg-white/[0.08] border border-white/[0.15] text-white hover:bg-white/[0.12] text-xs xs:text-sm sm:text-base md:text-lg lg:text-base xl:text-lg 2xl:text-xl px-3 xs:px-4 sm:px-6 md:px-8 lg:px-6 xl:px-8 2xl:px-10 py-2 xs:py-2 sm:py-3 md:py-4 lg:py-3 xl:py-4 2xl:py-5"
                  >
                    Başka Mesaj Gönder
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact Methods Section */}
          <div className="space-y-3 xs:space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-6 xl:space-y-8 2xl:space-y-10 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: -150 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -150 }}
              transition={{ duration: 0.7, delay: 0.5, ease: "easeInOut" }}
              className="flex flex-col items-center justify-center pt-2 xs:pt-3 sm:pt-4 md:pt-6 lg:pt-8 xl:pt-10 2xl:pt-12"
            >
              <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-white mb-2 xs:mb-3 sm:mb-4 md:mb-6 lg:mb-4 xl:mb-6 2xl:mb-8 text-center">
                Diğer İletişim Yolları
              </h3>
              <p className="text-white/60 text-xs xs:text-sm sm:text-base md:text-lg lg:text-base xl:text-lg 2xl:text-xl text-center px-2 xs:px-3 sm:px-4 md:px-6 lg:px-4 xl:px-6 2xl:px-8">
                Size en uygun olan yöntemi seçin.
              </p>
            </motion.div>

            <div className="space-y-3 xs:space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-6 xl:space-y-8 2xl:space-y-10 px-2 xs:px-3 sm:px-4 md:px-6 lg:px-0 xl:px-0 2xl:px-0">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  href={method.link}
                  className="block p-3 xs:p-3 sm:p-4 md:p-6 lg:p-4 xl:p-6 2xl:p-8 bg-white/[0.05] backdrop-blur-xl rounded-xl xs:rounded-xl sm:rounded-2xl md:rounded-3xl lg:rounded-2xl xl:rounded-3xl 2xl:rounded-3xl border border-white/[0.15] hover:bg-white/[0.08] transition-all group"
                  initial={{ opacity: 0, x: 250 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 250 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.5 + index * 0.1,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="flex items-center gap-2 xs:gap-3 sm:gap-4 md:gap-6 lg:gap-4 xl:gap-6 2xl:gap-8 ml-0 xs:ml-0 sm:ml-2 md:ml-3 lg:ml-2 xl:ml-3 2xl:ml-4">
                    <motion.div
                      className={`w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-12 lg:h-12 xl:w-16 xl:h-16 2xl:w-20 2xl:h-20 rounded-lg xs:rounded-xl sm:rounded-xl md:rounded-2xl lg:rounded-xl xl:rounded-2xl 2xl:rounded-2xl bg-gradient-to-br ${method.gradient} border border-white/20 flex items-center justify-center flex-shrink-0`}
                      whileHover={{ scale: 1.1, rotateY: 180 }}
                      transition={{ duration: 0.6 }}
                    >
                      <method.icon className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 lg:w-5 lg:h-5 xl:w-7 xl:h-7 2xl:w-9 2xl:h-9 text-white" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl 2xl:text-2xl font-semibold text-white mb-1 xs:mb-1 sm:mb-1 md:mb-2 lg:mb-1 xl:mb-2 2xl:mb-3">
                        {method.title}
                      </h4>
                      <p className="text-white/60 text-xs xs:text-xs sm:text-sm md:text-base lg:text-sm xl:text-base 2xl:text-lg mb-1 xs:mb-1 sm:mb-2 md:mb-3 lg:mb-2 xl:mb-3 2xl:mb-4">
                        {method.description}
                      </p>
                      <p className="text-white font-medium text-xs xs:text-sm sm:text-base md:text-lg lg:text-base xl:text-lg 2xl:text-xl break-all">
                        {method.value}
                      </p>
                    </div>
                    <ArrowRight className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactFooter;