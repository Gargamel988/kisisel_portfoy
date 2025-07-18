import AboutSectionClient from "./client/about-section-client";
import { FaReact } from "react-icons/fa";
import { SiTypescript, SiCss3, SiJavascript } from "react-icons/si";
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
  { id: 2, icon: <SiJavascript size={32} />, name: "JavaScript", color: "yellow" },
  { id: 3, icon: <FaReact size={32} />, name: "React", color: "cyan" },
  { id: 4, icon: <RiNextjsFill size={32} />, name: "Next.js", color: "white" },
  { id: 5, icon: <RiTailwindCssFill size={32} />, name: "Tailwind", color: "cyan" },
  { id: 6, icon: <SiTypescript size={32} />, name: "TypeScript", color: "blue" },
  { id: 7, icon: <RiSupabaseFill size={32} />, name: "Supabase", color: "green" },
];

const colorClassMap: { [key: string]: string } = {
  blue: "text-blue-400 group-hover:text-blue-300",
  yellow: "text-yellow-300 group-hover:text-yellow-200",
  cyan: "text-cyan-400 group-hover:text-cyan-300",
  white: "text-gray-200 group-hover:text-gray-300",
  green: "text-green-400 group-hover:text-green-300",
};

const aboutText = `Selamlar! Ben Ömer Aydın, frontend ve fullstack web projeleri geliştiren bir yazılımcıyım. 2023-2025 arasında Hatay Mustafa Kemal Üniversitesi'nden mezun oldum. Problem çözme, planlı çalışma ve disiplinli olmamla projelerimi başarıyla tamamlıyorum. "TodoPro" adlı web sitem üzerinde deneyim kazandım. Mobil programlama alanında da kendimi geliştirmeyi hedefliyorum.`;

export default function AboutSection() {
  return   <AboutSectionClient interests={interests} colorClassMap={colorClassMap} aboutText={aboutText} />
  
}
