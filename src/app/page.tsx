import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExpertiseSection from "@/components/ExpertiseSection";
import CertificationsSection from "@/components/CertificationsSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Chatbot from "@/components/Chatbot";
import AOSInit from "@/components/AOSInit";

export default function Home() {
  return (
    <>
      <AOSInit />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ExpertiseSection />
        <CertificationsSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <BlogSection />
        <ContactSection />
      </main>
      <CTASection />
      <Footer />
      <BackToTop />
      <Chatbot />
    </>
  );
}
