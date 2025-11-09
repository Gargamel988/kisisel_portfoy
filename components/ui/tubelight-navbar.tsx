"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
}

interface NavigationProps {
  scrollToSection: (sectionId: string) => void;
}

export function NavBar({
  items,
  className,
  scrollToSection,
}: NavBarProps & NavigationProps) {
  const [activeSection, setActiveSection] = useState(items[0].name);

  useEffect(() => {
    const handleScroll = () => {
      // Viewport'un ortasını baz al
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      // Her section'ın pozisyonunu kontrol et
      for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        const sectionId = item.url.startsWith("#") ? item.url.slice(1) : item.url;
        const element = document.getElementById(sectionId);

        if (element) {
          const sectionTop = element.offsetTop ;
          const sectionBottom = sectionTop + element.offsetHeight;
          // Eğer scroll pozisyonu bu section içindeyse
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(item.name);
            break;
          }
        }
      }
    };

    // İlk yüklemede kontrol et
    handleScroll();

    // Scroll listener ekle
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [items]);

  const handleNavClick = (e: React.MouseEvent, item: NavItem) => {
    e.preventDefault();
    const sectionId = item.url.startsWith("#") ? item.url.slice(1) : item.url;
    
    // Aktif section'ı hemen güncelle
    setActiveSection(item.name);
    
    // Section'a scroll et
    scrollToSection(sectionId);
  };

  return (
    <div
      className={cn(
        "fixed top-6 left-1/2 -translate-x-1/2  z-50",
        className
      )}
    >
      <div className="flex items-center gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.name;

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={(e) => handleNavClick(e, item)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                "text-foreground/80 hover:text-primary",
                isActive && "bg-muted text-primary"
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}