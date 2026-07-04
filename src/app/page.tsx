import { Navbar } from "@/components/Navbar";
import { BackToTop } from "@/components/BackToTop";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { About } from "@/components/sections/About";
import { Philosophy } from "@/components/sections/Philosophy";
import { Services } from "@/components/sections/Services";
import { Framework } from "@/components/sections/Framework";
import { Portfolio } from "@/components/sections/Portfolio";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Testimonials } from "@/components/sections/Testimonials";
import { Insights } from "@/components/sections/Insights";
import { LanguagesSection } from "@/components/sections/LanguagesSection";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Philosophy />
        <Services />
        <Framework />
        <Portfolio />
        <CaseStudies />
        <Testimonials />
        <Insights />
        <LanguagesSection />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
