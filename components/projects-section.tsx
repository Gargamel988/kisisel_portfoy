import ModernPortfolioCarousel, {
  PortfolioItem,
} from "./client/modern-portfolio-carousel";
import chefoodai from "@/public/chefoodai.png";
import moneymapai from "@/public/monaymapai.png";
const items: PortfolioItem[] = [
  {
    id: "1",
    title: "CheFoodAI",
    description: "CheFoodAI, yemek tariflerini oluşturan bir AI uygulamasıdır.",
    category: "Web Development",
    image: chefoodai,
    technologies: ["next.js", "tailwind css", "typescript"],
    modalItems: [
      {
        title: "CheFoodAI",
        description:
          "CheFoodAI, yemek tariflerini oluşturan bir AI uygulamasıdır.",
        category: "Web Development",
        image: chefoodai,
        technologies: ["next.js", "tailwind css", "typescript"],
        libraries: [
          "Vercel AI SDK",
          "Shadcn UI",
          "React Query",
          "Lucide React",
        ],
        link: "https://chefoodai.vercel.app/",
        features: [
          "AI ile anlık tarif üretimi",
          "Malzemeye özel akıllı öneriler",
          "Responsive ve modern tasarım",
          "Hızlı performans",
        ],
        duration: "1 Hafta",
        role: "Full Stack Developer",
        team: "Solo Proje",
      },
    ],
    status: "Aktif",
  },
  {
    id: "2",
    title: "MoneyMapAi",
    description:
      "MoneyMapAi, para yönetimi için bir uygulama. ",
    category: "Mobile Development",
    image: moneymapai,
    technologies: ["react native", "expo", "typescript"],
    modalItems: [
      {
        title: "MoneyMapAi",
        description:
          "MoneyMapAi, para yönetimi için bir uygulama. React Native, Vercel AI SDK , Supabase ve TypeScript kullanılarak geliştirildi.",
        category: "Mobile Development",
        image: moneymapai,
        technologies: [
          "react native",
          "typescript",
        ],
        libraries: ["React Native", "Vercel AI SDK", "Expo"],
        features: [
          "Para yönetimi",
          "Hesap takibi",
          "Gelir ve gider takibi",
          "AI ile kolay gider ekleme ve kategori belirleme",
          "Bütçe takibi",
        ],
        duration: "1 ay 2 hafta",
        role: "Mobile Developer",
        team: "Solo Proje",
        link: "",
      },
    ],
    status: "yayınlanma aşamasında",
  },
  {
    id: "3",
    title: "Yakında",
    description: "Bir sonraki projem çok yakında burada olacak.",
    category: "Yeni Proje",
    image: "",
    technologies: [],
    modalItems: [],
    status: "Yakında",
  },
];

export default function ProjectsSection() {
  return <ModernPortfolioCarousel items={items} />;
}
