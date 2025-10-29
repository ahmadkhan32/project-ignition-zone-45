import { useState, useEffect } from "react";
import { NavigationBar } from "@/components/NavigationBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Battery, 
  Zap, 
  RotateCcw, 
  Smartphone, 
  Settings, 
  Shield,
  Cpu,
  Wifi,
  Navigation,
  Thermometer
} from "lucide-react";

interface TechFeature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  details: string;
  stats?: { label: string; value: string; progress?: number }[];
}

const technologies: TechFeature[] = [
  {
    icon: Battery,
    title: "Advanced Battery Technology",
    description: "Next-generation lithium-ion cells with intelligent management systems.",
    details: "Our proprietary battery technology delivers exceptional range and longevity. Each cell is optimized for maximum energy density while maintaining safety and reliability through advanced thermal management and monitoring systems.",
    stats: [
      { label: "Energy Density", value: "250 Wh/kg", progress: 95 },
      { label: "Cycle Life", value: "2000+ cycles", progress: 90 },
      { label: "Charge Retention", value: "95% after 1 year", progress: 95 }
    ]
  },
  {
    icon: Zap,
    title: "Ultra-Fast Charging",
    description: "Revolutionary charging technology that minimizes downtime.",
    details: "Our fast-charging system can replenish 80% of battery capacity in under 2 hours. Smart charging algorithms protect battery health while delivering maximum charging speed.",
    stats: [
      { label: "Fast Charge Rate", value: "2.5C", progress: 85 },
      { label: "Efficiency", value: "96%", progress: 96 },
      { label: "Heat Generation", value: "Minimal", progress: 92 }
    ]
  },
  {
    icon: RotateCcw,
    title: "Regenerative Braking",
    description: "Recover energy while braking to extend range and improve efficiency.",
    details: "Our advanced regenerative braking system can recover up to 15% of total energy consumption, automatically adjusting based on riding conditions and battery state.",
    stats: [
      { label: "Energy Recovery", value: "Up to 15%", progress: 15 },
      { label: "Braking Efficiency", value: "98%", progress: 98 },
      { label: "Response Time", value: "50ms", progress: 88 }
    ]
  },
  {
    icon: Smartphone,
    title: "Smart Digital Ecosystem",
    description: "Full-color display with comprehensive vehicle diagnostics and navigation.",
    details: "Our intelligent dashboard provides real-time information about performance, navigation, and vehicle health. The system learns from your riding patterns to optimize performance.",
    stats: [
      { label: "Display Resolution", value: "1920x1080", progress: 100 },
      { label: "Update Frequency", value: "60Hz", progress: 85 },
      { label: "Brightness", value: "1000 nits", progress: 90 }
    ]
  },
  {
    icon: Cpu,
    title: "AI-Powered Performance",
    description: "Machine learning algorithms optimize performance in real-time.",
    details: "Our onboard AI continuously analyzes riding patterns, terrain, and conditions to automatically adjust power delivery, battery management, and safety systems for optimal performance.",
    stats: [
      { label: "Processing Power", value: "2.5 TOPS", progress: 80 },
      { label: "Learning Speed", value: "Real-time", progress: 95 },
      { label: "Accuracy", value: "99.2%", progress: 99 }
    ]
  },
  {
    icon: Shield,
    title: "Advanced Safety Systems",
    description: "Multiple safety layers including ABS, traction control, and predictive algorithms.",
    details: "Our comprehensive safety suite includes anti-lock braking, traction control, stability management, and predictive safety alerts that anticipate potential hazards.",
    stats: [
      { label: "Accident Reduction", value: "73%", progress: 73 },
      { label: "Response Time", value: "10ms", progress: 95 },
      { label: "System Reliability", value: "99.9%", progress: 99 }
    ]
  }
];

const innovations = [
  {
    title: "Wireless Connectivity",
    icon: Wifi,
    description: "5G and WiFi 6 connectivity for real-time updates and remote diagnostics."
  },
  {
    title: "GPS Precision",
    icon: Navigation,
    description: "Centimeter-accurate positioning with multi-constellation GPS support."
  },
  {
    title: "Thermal Management",
    icon: Thermometer,
    description: "Advanced cooling systems maintain optimal operating temperatures."
  },
  {
    title: "Modular Design",
    icon: Settings,
    description: "Future-proof architecture allows for easy upgrades and customization."
  }
];

export default function TechnologyPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTech, setSelectedTech] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('tech-features');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      
      <main className="pt-20 md:pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-background via-background to-muted">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Revolutionary
              </span>
              <br />
              Technology
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Experience the future of electric mobility with our cutting-edge innovations. 
              Every component is engineered for performance, efficiency, and reliability.
            </p>
            
            {/* Tech Stats */}
            <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">Patents Filed</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">99.2%</div>
                <div className="text-sm text-muted-foreground">Efficiency Rating</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">2000+</div>
                <div className="text-sm text-muted-foreground">Charge Cycles</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">140km</div>
                <div className="text-sm text-muted-foreground">Max Range</div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Technology Detail */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl font-bold mb-4">
                    Deep Dive: {technologies[selectedTech].title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    {technologies[selectedTech].details}
                  </p>
                </div>

                {/* Stats */}
                {technologies[selectedTech].stats && (
                  <div className="space-y-4">
                    {technologies[selectedTech].stats!.map((stat, index) => (
                      <div key={stat.label} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{stat.label}</span>
                          <span className="text-sm font-bold text-primary">{stat.value}</span>
                        </div>
                        {stat.progress && (
                          <Progress value={stat.progress} className="h-2" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {technologies.map((tech, index) => {
                  const Icon = tech.icon;
                  return (
                    <button
                      key={tech.title}
                      onClick={() => setSelectedTech(index)}
                      className={`w-full p-6 rounded-xl border transition-all duration-300 text-left ${
                        selectedTech === index
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          selectedTech === index ? 'bg-primary text-primary-foreground' : 'bg-primary/10'
                        }`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{tech.title}</h3>
                          <p className="text-sm text-muted-foreground">{tech.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Innovation Grid */}
        <section id="tech-features" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                Additional Innovations
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Discover the additional technologies that make our scooters stand out from the competition.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {innovations.map((innovation, index) => {
                const Icon = innovation.icon;
                return (
                  <div
                    key={innovation.title}
                    className={`bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 text-center hover:shadow-glow transition-all duration-500 ${
                      isVisible
                        ? 'animate-slide-up opacity-100'
                        : 'opacity-0 translate-y-8'
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center mb-4 mx-auto">
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{innovation.title}</h3>
                    <p className="text-muted-foreground text-sm">{innovation.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Research & Development */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Continuous Innovation
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our R&D team is constantly pushing the boundaries of what's possible in electric mobility.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-8 text-center">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-lg font-semibold mb-2">Engineers</div>
                <p className="text-muted-foreground">Dedicated to innovation and excellence</p>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-8 text-center">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-lg font-semibold mb-2">Testing</div>
                <p className="text-muted-foreground">Continuous quality assurance and validation</p>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-8 text-center">
                <div className="text-3xl font-bold text-primary mb-2">$50M</div>
                <div className="text-lg font-semibold mb-2">Investment</div>
                <p className="text-muted-foreground">Annual R&D investment in new technologies</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Experience the Technology
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Book a test ride and experience our revolutionary technology firsthand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="glow-button">
                Schedule Test Ride
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Download Spec Sheet
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}