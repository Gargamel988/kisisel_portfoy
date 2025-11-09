import AboutSectionClient from "./client/about-section-client";
import { FaReact } from "react-icons/fa";
import { SiTypescript, SiCss3, SiJavascript, SiVercel } from "react-icons/si";
import {
  RiNextjsFill,
  RiTailwindCssFill,
  RiSupabaseFill,
} from "react-icons/ri";

export interface Interest {
  id: number;
  icon: React.ReactNode;
  name: string;
  color: string;
}

const interests: Interest[] = [
  { id: 1, icon: <SiCss3 size={32} />, name: "CSS", color: "blue" },
  {
    id: 6,
    icon: <RiTailwindCssFill size={32} />,
    name: "Tailwind CSS",
    color: "cyan",
  },
  {
    id: 2,
    icon: <SiJavascript size={32} />,
    name: "JavaScript",
    color: "yellow",
  },
  { id: 3, icon: <FaReact size={32} />, name: "React", color: "cyan" },
  { id: 5, icon: <RiNextjsFill size={32} />, name: "Next.js", color: "white" },
  { id: 4, icon: <FaReact size={32} />, name: "React Native", color: "cyan" },
  {
    id: 7,
    icon: <SiTypescript size={32} />,
    name: "TypeScript",
    color: "blue",
  },
  {
    id: 8,
    icon: <RiSupabaseFill size={32} />,
    name: "Supabase",
    color: "green",
  },
  { id: 9, icon: <SiVercel size={32} />, name: "Vercel", color: "black" },
  {
    id: 10,
    icon: <SiVercel size={32} />,
    name: "Vercel AI SDK",
    color: "black",
  },
];

const colorClassMap: { [key: string]: string } = {
  blue: "text-sky-400 group-hover:text-sky-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]",
  yellow:
    "text-amber-300 group-hover:text-amber-200 drop-shadow-[0_0_8px_rgba(252,211,77,0.5)]",
  cyan: "text-teal-400 group-hover:text-teal-300 drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]",
  white:
    "text-gray-100 group-hover:text-gray-200 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]",
  green:
    "text-emerald-400 group-hover:text-emerald-300 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]",
  black:
    "text-slate-300 group-hover:text-gray-100 drop-shadow-[0_0_8px_rgba(0,0,0,0.4)]",
};

const aboutText = `
 Web ve mobil geliştirme alanında uzmanım. 
React, Next.js ve React Native teknolojileriyle modern, hızlı ve kullanıcı odaklı arayüzler geliştiriyorum. 
Tailwind CSS, Shadcn UI ve Framer Motion ile estetik ve dinamik deneyimler sunuyorum.
Supabase ve Vercel AI SDK ile backend ve yapay zeka entegrasyonları gerçekleştirerek, 
uçtan uca profesyonel çözümler geliştirmeye odaklanıyorum.
`;

export default function AboutSection() {
  return (
    <AboutSectionClient
      interests={interests}
      colorClassMap={colorClassMap}
      aboutText={aboutText}
    />
  );
}
