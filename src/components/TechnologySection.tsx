import { useEffect, useState } from "react";
import { Battery, Zap, RotateCcw, Smartphone, Settings, Shield } from "lucide-react";

interface TechFeature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  delay: number;
}

const technologies: TechFeature[] = [
  {
    icon: Battery,
    title: "Long-Range Battery",
    description: "Advanced lithium-ion technology with up to 140km range on a single charge.",
    delay: 0,
  },
  {
    icon: Zap,
    title: "Fast Charging",
    description: "Rapid charging technology gets you back on the road in under 3 hours.",
    delay: 200,
  },
  {
    icon: RotateCcw,
    title: "Regenerative Braking",
    description: "Recover energy while braking to extend your range and improve efficiency.",
    delay: 400,
  },
  {
    icon: Smartphone,
    title: "Smart Digital Display",
    description: "Full-color LCD display with GPS navigation, speed monitoring, and diagnostics.",
    delay: 600,
  },
  {
    icon: Settings,
    title: "Riding Modes",
    description: "Switch between Eco, Sport, and Custom modes to match your riding style.",
    delay: 800,
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "Advanced safety features including ABS, traction control, and LED lighting.",
    delay: 1000,
  },
];

export const TechnologySection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('technology');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="technology" className="py-20 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Revolutionary
            </span>{" "}
            Technology
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience cutting-edge innovation in every ride. Our electric scooters are packed
            with advanced features designed for the modern urban commuter.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <div
                key={index}
                className={`tech-card ${
                  isVisible
                    ? 'animate-slide-up opacity-100'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  animationDelay: `${tech.delay}ms`,
                }}
              >
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center mb-6 animate-float">
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  
                  {/* Glow effect */}
                  <div className="absolute top-0 left-0 w-16 h-16 bg-primary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <h3 className="text-xl font-bold mb-3 text-foreground">{tech.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{tech.description}</p>

                {/* Hover indicator */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-primary-glow transition-all duration-300 group-hover:w-full" />
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Ready to Experience the Future?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of riders who have already made the switch to electric.
            </p>
            <button className="glow-button px-8 py-3 rounded-xl font-semibold">
              Schedule a Test Ride
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};