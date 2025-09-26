import { NavigationBar } from "@/components/NavigationBar";
import { HeroSection } from "@/components/HeroSection";
import { TechnologySection } from "@/components/TechnologySection";
import { GallerySection } from "@/components/GallerySection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FAQSection } from "@/components/FAQSection";
import { ModernCTASection } from "@/components/ModernCTASection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <HeroSection />
      <TechnologySection />
      <GallerySection />
      <TestimonialsSection />
      <FAQSection />
      <ModernCTASection />
      <Footer />
    </div>
  );
};

export default Index;
