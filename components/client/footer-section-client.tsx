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
      className={`group relative w-full cursor-pointer overflow-hidden rounded-full border bg-background p-3 sm:p-4 text-center font-semibold text-sm sm:text-base ${className}`}
      {...props}
    >
      <span className="inline-block translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
        {text}
      </span>
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100">
        <span>{text}</span>
        <ArrowRight className="w-4 h-4" />
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
      className="min-h-screen bg-gradient-to-b from-black to-green-500 p-4 sm:p-6 lg:p-10"
    >
      <div
        ref={footerSectionRef}
        className="w-full min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 w-full max-w-7xl">
          {/* Contact Form Section */}
          <motion.div className="space-y-4 sm:space-y-6 lg:space-y-8 order-2 lg:order-1">
            {/* Form Header */}
            <motion.div
              initial={{ opacity: 0, x: -150 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -150 }}
              transition={{ duration: 0.7, delay: 0.5, ease: "easeInOut" }}
              className="flex flex-col items-center justify-center pt-4 sm:pt-6 lg:pt-10"
            >
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-4 text-center">
                Bize Mesaj Gönderin
              </h3>
              <p className="text-white/60 text-sm sm:text-base lg:text-lg text-center px-4">
                Projeniz hakkında bize bilgi verin, 24 saat içinde size geri
                dönelim.
              </p>
            </motion.div>

            <AnimatePresence mode="popLayout">
              {!isSubmitted ? (
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-6 lg:space-y-8 px-4 sm:px-6 lg:px-0"
                  initial={{ opacity: 0, x: -250 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -250 }
                  }
                  transition={{ duration: 0.7, delay: 0.5, ease: "easeInOut" }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="relative">
                      <Label htmlFor="name" className="text-white/80 mb-2 block text-sm sm:text-base">
                        İsim
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-white/40" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="Adınız"
                          value={formData.name}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleInputChange("name", e.target.value)
                          }
                          className={`pl-8 sm:pl-10 bg-white/[0.08] border text-white placeholder-white/40 focus:border-green-400 text-sm sm:text-base h-10 sm:h-11 ${
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
                          className="text-red-400 text-xs sm:text-sm mt-1 sm:mt-2"
                        >
                          {errors.name}
                        </motion.p>
                      )}
                    </div>

                    <div className="relative">
                      <Label htmlFor="email" className="text-white/80 mb-2 block text-sm sm:text-base">
                        E-posta
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-white/40" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="E-posta Adresiniz"
                          value={formData.email}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleInputChange("email", e.target.value)
                          }
                          className={`pl-8 sm:pl-10 bg-white/[0.08] border text-white placeholder-white/40 focus:border-green-400 text-sm sm:text-base h-10 sm:h-11 ${
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
                          className="text-red-400 text-xs sm:text-sm mt-1 sm:mt-2"
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  <div className="relative">
                    <Label htmlFor="company" className="text-white/80 mb-2 block text-sm sm:text-base">
                      Şirket (Opsiyonel)
                    </Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-white/40" />
                      <Input
                        id="company"
                        type="text"
                        placeholder="Şirket Adı"
                        value={formData.company}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleInputChange("company", e.target.value)
                        }
                        className="pl-8 sm:pl-10 bg-white/[0.08] border border-white/[0.15] text-white placeholder-white/40 focus:border-green-400 text-sm sm:text-base h-10 sm:h-11"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <Label htmlFor="message" className="text-white/80 mb-2 block text-sm sm:text-base">
                      Mesaj
                    </Label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-4 h-4 w-4 sm:h-5 sm:w-5 text-white/40" />
                      <Textarea
                        id="message"
                        placeholder="Projeniz hakkında bize bilgi verin..."
                        rows={4}
                        value={formData.message}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                          handleInputChange("message", e.target.value)
                        }
                        className={`pl-8 sm:pl-10 bg-white/[0.08] border text-white placeholder-white/40 focus:border-green-400 resize-none text-sm sm:text-base ${
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
                        className="text-red-400 text-xs sm:text-sm mt-1 sm:mt-2"
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
                  className="text-center py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-0"
                >
                  <motion.div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center mx-auto mb-4 sm:mb-6"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-400" />
                  </motion.div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-4">
                    Mesaj Gönderildi!
                  </h3>
                  <p className="text-white/60 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
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
                    className="bg-white/[0.08] border border-white/[0.15] text-white hover:bg-white/[0.12] text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
                  >
                    Başka Mesaj Gönder
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact Methods Section */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: -150 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -150 }}
              transition={{ duration: 0.7, delay: 0.5, ease: "easeInOut" }}
              className="flex flex-col items-center justify-center pt-4 sm:pt-6 lg:pt-10"
            >
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-4 text-center">
                Diğer İletişim Yolları
              </h3>
              <p className="text-white/60 text-sm sm:text-base lg:text-lg text-center px-4">
                Size en uygun olan yöntemi seçin.
              </p>
            </motion.div>

            <div className="space-y-4 sm:space-y-6 lg:space-y-8 px-4 sm:px-6 lg:px-0">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  href={method.link}
                  className="block p-3 sm:p-4 lg:p-2 bg-white/[0.05] backdrop-blur-xl rounded-2xl border border-white/[0.15] hover:bg-white/[0.08] transition-all group"
                  initial={{ opacity: 0, x: 250 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 250 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.5 + index * 0.1,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="flex items-center gap-3 sm:gap-4 ml-0 sm:ml-2">
                    <motion.div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${method.gradient} border border-white/20 flex items-center justify-center flex-shrink-0`}
                      whileHover={{ scale: 1.1, rotateY: 180 }}
                      transition={{ duration: 0.6 }}
                    >
                      <method.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg sm:text-xl font-semibold text-white mb-1">
                        {method.title}
                      </h4>
                      <p className="text-white/60 text-xs sm:text-sm mb-1 sm:mb-2">
                        {method.description}
                      </p>
                      <p className="text-white font-medium text-sm sm:text-base break-all">
                        {method.value}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0" />
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