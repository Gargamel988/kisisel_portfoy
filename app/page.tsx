
import { Footerdemo } from "@/components/ui/footer-section";
import Head from "next/head";
import Image from "next/image";


const HomePage = () => (
  <section className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-8" id="home-section">
  {/* Profil Fotoğrafı */}
  <div className="w-32 h-32 mb-4 rounded-full overflow-hidden border-4 border-blue-500">
    <Image src="/images/profile.jpg" alt="Ömer Aydın" width={128} height={128} objectFit="cover" />
  </div>
  <h1 className="text-4xl font-bold mb-4">Merhaba, Ben Ömer Aydın</h1>
  <p className="text-lg text-center max-w-2xl mb-8">
    Frontend teknolojileriyle ilgilenen bir geliştiriciyim. HTML, CSS, JavaScript, React, Next.js ve Tailwind CSS kullanarak modern web arayüzleri geliştiriyorum.
  </p>

</section>
);

const AboutSection = () => (
<section className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-8" id="about-section">
    <h2 className="text-3xl font-bold mb-6">Hakkımda</h2>
    <div className="max-w-3xl text-center">
      <p className="mb-4">Ben Ömer Aydın, Frontend geliştiricisiyim. Kullanıcı odaklı ve erişilebilir web arayüzleri oluşturmayı seviyorum.</p>
      <p className="mb-4">HTML, CSS, JavaScript, React, Next.js ve Tailwind CSS konularında bilgi sahibiyim. Sürekli kendimi geliştirmeye ve yeni teknolojiler öğrenmeye çalışıyorum.</p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-background text-foreground p-4 rounded shadow">
          <h3 className="font-bold mb-2">Misyonum</h3>
          <p>Kaliteli ve kullanıcı dostu arayüzler oluşturmak</p>
        </div>
        <div className="bg-background text-foreground p-4 rounded shadow">
          <h3 className="font-bold mb-2">Vizyonum</h3>
          <p>Modern teknolojilerde uzmanlaşarak global projelerde yer almak</p>
        </div>
        <div className="bg-background text-foreground p-4 rounded shadow">
          <h3 className="font-bold mb-2">Değerlerim</h3>
          <p>Yenilikçilik, şeffaflık ve öğrenmeye açıklık</p>
        </div>
      </div>
    </div>
  </section>
);

const ProjectsSection = () => (
<section className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-8" id="projects-section">
    <h2 className="text-3xl font-bold mb-6">Projeler</h2>
    <div className="max-w-3xl text-center">
      <p className="mb-4">Henüz yayınladığım bir projem bulunmamakta. Yakında bu bölümü güncelleyeceğim!</p>
    </div>
  </section>
);

const ContactSection = () => (
  <div id="contact-section">
  <Footerdemo />
  </div>
);

const Home = () => (
  <div>
    <Head>
      <title>Next.js - Tek Sayfa Alt Alta Bölümler</title>
      <meta name="description" content="Next.js ile tek sayfada alt alta bölümler örneği" />
    </Head>
    
      <HomePage />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    
    
  </div>
);

export default Home;

