"use client"
import { Home, User, Briefcase, Info } from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"

const MainNavbar = () => {
  const navItems = [
    { name: 'anasayfa', url: "#home-section", icon: Home }, 
    { name: 'hakkımda', url: "#about-section", icon: User },
    { name: 'projeler', url: "#projects-section", icon: Briefcase },
    { name: 'bilgilerim', url: "#footers-section", icon: Info } 
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000; 
    let start: number | null = null;

    function easeInOutQuad(t: number) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function animationStep(timestamp: number) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeInOutQuad(progress);

      window.scrollTo(0, startPosition + distance * ease); 
 
      if (elapsed < duration) {
        requestAnimationFrame(animationStep);
      }
    }

    requestAnimationFrame(animationStep);
  };

  return <NavBar items={navItems} scrollToSection={scrollToSection} /> 
};
export default MainNavbar;
