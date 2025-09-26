import { NavigationBar } from "@/components/NavigationBar";
import { HeroSection } from "@/components/HeroSection";
import { TechnologySection } from "@/components/TechnologySection";
import { GallerySection } from "@/components/GallerySection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FAQSection } from "@/components/FAQSection";
import { CTASection } from "@/components/CTASection";
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
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
