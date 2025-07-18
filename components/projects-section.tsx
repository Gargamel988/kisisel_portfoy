import ModernPortfolioCarousel, { PortfolioItem } from "./client/modern-portfolio-carousel";
import rawImage from "@/public/rawImage.jpg";  

const items: PortfolioItem[] = [
  {
    id: "1",
    title: "ToDo App",
    description: "Modern ve responsive to-do app. Next.js, Tailwind CSS, Supabase ve TypeScript kullanılarak geliştirildi.",
    category: "Web Development",
    image: rawImage,
    technologies: ["next.js", "tailwind css", "supabase", "typescript"],
    link: "https://todopro-app.vercel.app/",
    github: "https://github.com/your-username/your-repo"
  },
  {
    id: "2",
    title: "Yakında",
    description: "Bu alana yeni projelerim eklenecek.",
    category: "Yeni Proje",
    image: "",
    technologies: [],
    link: "",
    github: ""
  },
  {
    id: "3",
    title: "Yakında",
    description: "Bir sonraki projem çok yakında burada olacak.",
    category: "Yeni Proje",
    image: "",
    technologies: [],
    link: "",
    github: ""
  }
];


export default function ProjectsSection() {
  return (

      <ModernPortfolioCarousel items={items} />

  );
}
