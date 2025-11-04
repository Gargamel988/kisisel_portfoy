"use client";
import React, { useState, useRef, useEffect } from "react";
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

// Contact Methods Data - Component dışında tanımlandı
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

// Interactive Button Component
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

// Shadcn UI Components (Basitleştirilmiş versiyonlar)
const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={`flex w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
));
Input.displayName = "Input";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={`flex w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
));
Textarea.displayName = "Textarea";

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    {...props}
  />
));
Label.displayName = "Label";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 ${className}`}
    {...props}
  />
));
Button.displayName = "Button";

// Main Component
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
  const isInView = useInView(footerSectionRef, { once: false, amount: 0.2 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

    setIsSubmitting(true);

    // Simulate email sending (replace with actual sendEmail function)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setFormData({
      name: "",
      email: "",
      company: "",
      message: "",
    });
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const contactMethodsVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section
      id="footers-section"
      className="min-h-screen bg-gradient-to-b from-black to-green-500 w-full"
    >
      <div
        ref={footerSectionRef}
        className="min-h-screen px-4 md:px-6 lg:px-8 xl:px-10 py-8 md:py-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 xl:gap-16 max-w-7xl mx-auto">
          {/* Contact Form Section */}
          <div className="order-2 lg:order-1">
            {/* Form Header */}
            <motion.div
              variants={formVariants}
              initial={false}
              animate={isMounted && isInView ? "visible" : "hidden"}
              className="flex flex-col items-center justify-center mb-6 md:mb-8"
            >
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4 text-center">
                Bize Mesaj Gönderin
              </h3>
              <p className="text-white/60 text-sm md:text-base lg:text-lg text-center max-w-md">
                Projeniz hakkında bize bilgi verin, 24 saat içinde size geri
                dönelim.
              </p>
            </motion.div>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  variants={formVariants}
                  initial={false}
                  animate={isMounted && isInView ? "visible" : "hidden"}
                  exit={{ opacity: 0, x: -100 }}
                  className="space-y-4 md:space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {/* Name Field */}
                    <div className="relative">
                      <Label
                        htmlFor="name"
                        className="text-white/80 mb-2 block text-sm md:text-base"
                      >
                        İsim
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-white/40" />
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Adınız"
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          className={`pl-10 md:pl-12 bg-white/[0.08] border text-white placeholder-white/40 focus:border-green-400 text-sm md:text-base h-10 md:h-12 ${
                            errors.name
                              ? "border-red-400"
                              : "border-white/[0.15]"
                          }`}
                        />
                      </div>
                      {errors.name && (
                        <p className="text-red-400 text-xs md:text-sm mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="relative">
                      <Label
                        htmlFor="email"
                        className="text-white/80 mb-2 block text-sm md:text-base"
                      >
                        E-posta
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-white/40" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="E-posta Adresiniz"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className={`pl-10 md:pl-12 bg-white/[0.08] border text-white placeholder-white/40 focus:border-green-400 text-sm md:text-base h-10 md:h-12 ${
                            errors.email
                              ? "border-red-400"
                              : "border-white/[0.15]"
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-400 text-xs md:text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Company Field */}
                  <div className="relative">
                    <Label
                      htmlFor="company"
                      className="text-white/80 mb-2 block text-sm md:text-base"
                    >
                      Şirket (Opsiyonel)
                    </Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-white/40" />
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        placeholder="Şirket Adı"
                        value={formData.company}
                        onChange={(e) =>
                          handleInputChange("company", e.target.value)
                        }
                        className="pl-10 md:pl-12 bg-white/[0.08] border border-white/[0.15] text-white placeholder-white/40 focus:border-green-400 text-sm md:text-base h-10 md:h-12"
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="relative">
                    <Label
                      htmlFor="message"
                      className="text-white/80 mb-2 block text-sm md:text-base"
                    >
                      Mesaj
                    </Label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-4 h-4 w-4 md:h-5 md:w-5 text-white/40" />
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Projeniz hakkında bize bilgi verin..."
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          handleInputChange("message", e.target.value)
                        }
                        className={`pl-10 md:pl-12 pt-3 bg-white/[0.08] border text-white placeholder-white/40 focus:border-green-400 resize-none text-sm md:text-base min-h-[100px] ${
                          errors.message
                            ? "border-red-400"
                            : "border-white/[0.15]"
                        }`}
                      />
                    </div>
                    {errors.message && (
                      <p className="text-red-400 text-xs md:text-sm mt-1">
                        {errors.message}
                      </p>
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
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-8 md:py-12"
                >
                  <motion.div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-green-500/20 border-2 border-green-400/30 flex items-center justify-center mx-auto mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-green-400" />
                  </motion.div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Mesaj Gönderildi!
                  </h3>
                  <p className="text-white/60 text-sm md:text-base mb-6">
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
                    className="bg-white/[0.08] border border-white/[0.15] text-white hover:bg-white/[0.12] text-sm md:text-base px-6 py-3"
                  >
                    Başka Mesaj Gönder
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Contact Methods Section */}
          <div className="space-y-6 md:space-y-8 order-1 lg:order-2">
            <motion.div
              variants={contactMethodsVariants}
              initial={false}
              animate={isMounted && isInView ? "visible" : "hidden"}
              className="flex flex-col items-center justify-center mb-6 md:mb-8"
            >
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4 text-center">
                Diğer İletişim Yolları
              </h3>
              <p className="text-white/60 text-sm md:text-base lg:text-lg text-center">
                Size en uygun olan yöntemi seçin.
              </p>
            </motion.div>

            <motion.div
              variants={contactMethodsVariants}
              initial={false}
              animate={isMounted && isInView ? "visible" : "hidden"}
              className="space-y-4 md:space-y-6"
            >
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  href={method.link}
                  className="block p-4 md:p-6 bg-white/[0.05] backdrop-blur-xl rounded-xl border border-white/[0.15] hover:bg-white/[0.08] transition-all group"
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-4 md:gap-6">
                    <motion.div
                      className={`p-3 md:p-4 rounded-xl bg-gradient-to-br ${method.gradient} border border-white/20 flex items-center justify-center flex-shrink-0`}
                      whileHover={{ scale: 1.1, rotate: 360 }}
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
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactFooter;