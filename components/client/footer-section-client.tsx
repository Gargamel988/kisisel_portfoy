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
      <div className="absolute left-[49%] top-[40%] h-2 w-2 scale-[1] rounded-lg bg-primary transition-all duration-300 group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8] group-hover:bg-primary"></div>
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
    await sendEmail(e);
    setFormData({
      name: "",
      email: "",
      company: "",
      message: "",
    });
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <section
      id="footers-section"
      className="min-h-screen bg-gradient-to-b from-black to-green-500  "
    >
      <div
        ref={footerSectionRef}
        className=" min-h-screen px-4 md:px-6 lg:px-8 xl:px-10 "
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-10 lg:gap-12 xl:gap-16">
          {/* Contact Form Section */}
          <div className=" order-2 lg:order-1">
            {/* Form Header */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={
                isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }
              }
              transition={{
                duration: 0.7,
                ease: [0.25, 0.1, 0.25, 1],
                type: "tween",
              }}
              className="flex flex-col items-center justify-center pt-2  md:pt-6 lg:pt-8 xl:pt-10 "
            >
              <h3 className="text-lg md:text-3xl lg:text-2xl xl:text-3xl  font-bold text-white mb-2 md:mb-6 lg:mb-4 xl:mb-6 text-center">
                Bize Mesaj Gönderin
              </h3>
              <p className="text-white/60 text-xs md:text-lg lg:text-base xl:text-lg text-center mb-2 md:mb-6 lg:mb-4 xl:mb-6">
                Projeniz hakkında bize bilgi verin, 24 saat içinde size geri
                dönelim.
              </p>
            </motion.div>

            <AnimatePresence mode="popLayout">
              {!isSubmitted ? (
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-3 md:space-y-8 lg:space-y-6 xl:space-y-8 "
                  initial={{ opacity: 0, x: -100 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }
                  }
                  transition={{
                    duration: 0.7,
                    ease: [0.25, 0.1, 0.25, 1],
                    type: "tween",
                  }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-8 lg:gap-6 xl:gap-8">
                    <div className="relative">
                      <Label
                        htmlFor="name"
                        className="text-white/80 mb-1 md:mb-3 lg:mb-2 xl:mb-3  block text-xs md:text-lg lg:text-base xl:text-lg"
                      >
                        İsim
                      </Label>
                      <div className="relative">
                        <User className="absolute left-2 md:left-4 lg:left-3 xl:left-4  top-1/2 transform -translate-y-1/2 h-3 w-3 md:h-6 md:w-6 lg:h-5 lg:w-5 xl:h-6 xl:w-6 text-white/40" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="Adınız"
                          value={formData.name}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleInputChange("name", e.target.value)
                          }
                          className={`pl-6 md:pl-12 lg:pl-10 xl:pl-12  bg-white/[0.08] border text-white placeholder-white/40 focus:border-green-400 text-xs md:text-lg lg:text-base xl:text-lg  h-8 md:h-12 lg:h-11 xl:h-12 ${
                            errors.name
                              ? "border-red-400"
                              : "border-white/[0.15]"
                          }`}
                        />
                      </div>
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: 150 }}
                          animate={
                            isInView
                              ? { opacity: 1, y: 0 }
                              : { opacity: 0, y: 150 }
                          }
                          transition={{
                            duration: 0.6,
                            delay: 0.5,
                            ease: "easeInOut",
                          }}
                          className="text-red-400 text-xs  md:text-base lg:text-sm xl:text-base  mt-1  md:mt-3 lg:mt-2 xl:mt-3 "
                        >
                          {errors.name}
                        </motion.p>
                      )}
                    </div>

                    <div className="relative">
                      <Label
                        htmlFor="email"
                        className="text-white/80 mb-1 md:mb-3 lg:mb-2 xl:mb-3 block text-xs md:text-lg lg:text-base xl:text-lg"
                      >
                        E-posta
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-2 md:left-4 lg:left-3 xl:left-4 top-1/2 transform -translate-y-1/2 h-3 w-3 md:h-6 md:w-6 lg:h-5 lg:w-5 xl:h-6 xl:w-6 text-white/40" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="E-posta Adresiniz"
                          value={formData.email}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleInputChange("email", e.target.value)
                          }
                          className={`pl-6 md:pl-12 lg:pl-10 xl:pl-12  bg-white/[0.08] border text-white placeholder-white/40 focus:border-green-400 text-xs md:text-lg lg:text-base xl:text-lg  h-8 md:h-12 lg:h-11 xl:h-12 ${
                            errors.email
                              ? "border-red-400"
                              : "border-white/[0.15]"
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: 150 }}
                          animate={
                            isInView
                              ? { opacity: 1, y: 0 }
                              : { opacity: 0, y: 150 }
                          }
                          transition={{
                            duration: 0.6,
                            delay: 0.5,
                            ease: "easeInOut",
                          }}
                          className="text-red-400 text-xs  md:text-base lg:text-sm xl:text-base  mt-1  md:mt-3 lg:mt-2 xl:mt-3 "
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  <div className="relative">
                    <Label
                      htmlFor="company"
                      className="text-white/80 mb-1 md:mb-3 lg:mb-2 xl:mb-3 block text-xs md:text-lg lg:text-base xl:text-lg"
                    >
                      Şirket (Opsiyonel)
                    </Label>
                    <div className="relative">
                      <Building className="absolute left-2 md:left-4 lg:left-3 xl:left-4 top-1/2 transform -translate-y-1/2 h-3 w-3 md:h-6 md:w-6 lg:h-5 lg:w-5 xl:h-6 xl:w-6 text-white/40" />
                      <Input
                        id="company"
                        type="text"
                        placeholder="Şirket Adı"
                        value={formData.company}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleInputChange("company", e.target.value)
                        }
                        className="pl-6 md:pl-12 lg:pl-10 xl:pl-12  bg-white/[0.08] border border-white/[0.15] text-white placeholder-white/40 focus:border-green-400 text-xs md:text-lg lg:text-base xl:text-lg  h-8 md:h-12 lg:h-11 xl:h-12"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <Label
                      htmlFor="message"
                      className="text-white/80 mb-1 md:mb-3 lg:mb-2 xl:mb-3 block text-xs md:text-lg lg:text-base xl:text-lg"
                    >
                      Mesaj
                    </Label>
                    <div className="relative">
                      <MessageSquare className="absolute left-2 md:left-4 lg:left-3 xl:left-4 top-1/2 transform -translate-y-1/2 h-3 w-3 md:h-6 md:w-6 lg:h-5 lg:w-5 xl:h-6 xl:w-6 text-white/40" />
                      <Textarea
                        id="message"
                        placeholder="Projeniz hakkında bize bilgi verin..."
                        rows={4}
                        value={formData.message}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                          handleInputChange("message", e.target.value)
                        }
                        className={`pl-6 md:pl-12 lg:pl-10 xl:pl-12  bg-white/[0.08] border text-white placeholder-white/40 focus:border-green-400 resize-none text-xs md:text-lg lg:text-base xl:text-lg min-h-[80px] ${
                          errors.message
                            ? "border-red-400"
                            : "border-white/[0.15]"
                        }`}
                      />
                    </div>
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: 150 }}
                        animate={
                          isInView
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 150 }
                        }
                        transition={{
                          duration: 0.6,
                          delay: 0.5,
                          ease: "easeInOut",
                        }}
                        className="text-red-400 text-xs  md:text-base lg:text-sm xl:text-base  mt-1  md:mt-3 lg:mt-2 xl:mt-3 "
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
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 150 }
                  }
                  transition={{ duration: 0.7, delay: 0.5, ease: "easeInOut" }}
                  className="text-center py-4 md:py-10 lg:py-8 xl:py-10 "
                >
                  <motion.div
                    className="w-12 h-12 md:w-20 md:h-20 lg:w-18 lg:h-18 xl:w-20 xl:h-20 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center mx-auto mb-3 md:mb-8 lg:mb-6 xl:mb-8 "
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle className="w-6 h-6 md:w-10 md:h-10 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-green-400" />
                  </motion.div>
                  <h3 className="text-lg md:text-3xl lg:text-2xl xl:text-3xl font-bold text-white mb-2 md:mb-6 lg:mb-4 xl:mb-6">
                    Mesaj Gönderildi!
                  </h3>
                  <p className="text-white/60 text-xs md:text-lg lg:text-base xl:text-lg mb-3 md:mb-8 lg:mb-6 xl:mb-8">
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
                    className="bg-white/[0.08] border border-white/[0.15] text-white hover:bg-white/[0.12] text-xs md:text-lg lg:text-base xl:text-lg px-3 md:px-8 lg:px-6 xl:px-8 py-2 md:py-4 lg:py-3 xl:py-4"
                  >
                    Başka Mesaj Gönder
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Contact Methods Section */}
          <div className="space-y-3 md:space-y-8 lg:space-y-6 xl:space-y-8 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
              transition={{
                duration: 0.7,
                ease: [0.25, 0.1, 0.25, 1],
                type: "tween",
              }}
              className="flex flex-col items-center justify-center pt-2 md:pt-6 lg:pt-8 xl:pt-10"
            >
              <h3 className="text-lg md:text-3xl lg:text-2xl xl:text-3xl font-bold text-white mb-2 md:mb-6 lg:mb-4 xl:mb-6 text-center">
                Diğer İletişim Yolları
              </h3>
              <p className="text-white/60 text-xs md:text-lg lg:text-base xl:text-lg text-center">
                Size en uygun olan yöntemi seçin.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
              transition={{
                duration: 0.7,
                ease: [0.25, 0.1, 0.25, 1],
                type: "tween",
              }}
              className="space-y-3 md:space-y-8 lg:space-y-6 xl:space-y-8 "
            >
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  href={method.link}
                  className="block p-2 md:p-3 lg:p-4 xl:p-5 bg-white/[0.05] backdrop-blur-xl rounded-xl  lg:rounded-2xl  border border-white/[0.15] hover:bg-white/[0.08] transition-all group"
                  transition={{
                    duration: 0.1,
                    ease: [0.25, 0.1, 0.25, 1],
                    type: "tween",
                  }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="flex items-center gap-2 md:gap- lg:gap-4 xl:gap-6  md:ml-1  ">
                    <motion.div
                      className={` p-2 md:p-3 lg:p-4 xl:p-5 rounded-lg md:rounded-2xl lg:rounded-xl xl:rounded-2xl bg-gradient-to-br ${method.gradient} border border-white/20 flex items-center justify-center flex-shrink-0`}
                      whileHover={{ scale: 1.1, rotateY: 180 }}
                      transition={{ duration: 0.6 }}
                    >
                      <method.icon className="size-4 lg:size-5 xl:size-6 text-white" />
                    </motion.div>
                    <div className="flex-1 ">
                      <h4 className="text-sm md:text-base lg:text-lg  font-semibold text-white mb-1">
                        {method.title}
                      </h4>
                      <p className="text-white/60 text-xs md:text-base mb-1">
                        {method.description}
                      </p>
                      <p className="text-white font-medium text-xs  md:text-lg lg:text-base xl:text-lg  break-all">
                        {method.value}
                      </p>
                    </div>
                    <ArrowRight className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactFooter;
