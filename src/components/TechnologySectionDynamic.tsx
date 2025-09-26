import { useEffect, useState } from "react";
import { Battery, Zap, RotateCcw, Smartphone, Settings, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface TechnologyFeature {
  id: string;
  title: string;
  description: string;
  icon_type: string;
  display_order: number;
}

export const TechnologySectionDynamic = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [features, setFeatures] = useState<TechnologyFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchFeatures();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('technology-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'technology_features' }, () => {
        fetchFeatures();
      })
      .subscribe();

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

    return () => {
      supabase.removeChannel(channel);
      observer.disconnect();
    };
  }, []);

  const fetchFeatures = async () => {
    try {
      const { data, error } = await supabase
        .from('technology_features')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setFeatures(data || []);
    } catch (error) {
      console.error('Error fetching technology features:', error);
      toast({
        title: "Error",
        description: "Failed to load technology features",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getIconComponent = (iconType: string) => {
    switch (iconType) {
      case 'battery': return Battery;
      case 'zap': return Zap;
      case 'rotate': return RotateCcw;
      case 'smartphone': return Smartphone;
      case 'settings': return Settings;
      case 'shield': return Shield;
      default: return Zap;
    }
  };

  if (loading) {
    return (
      <section id="technology" className="py-20 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="h-8 bg-muted rounded w-64 mx-auto mb-4" />
            <div className="h-4 bg-muted rounded w-96 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="tech-card animate-pulse">
                <div className="w-16 h-16 bg-muted rounded-xl mb-6" />
                <div className="h-6 bg-muted rounded mb-3" />
                <div className="h-4 bg-muted rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

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
          {features.map((feature, index) => {
            const IconComponent = getIconComponent(feature.icon_type);
            return (
              <div
                key={feature.id}
                className={`tech-card ${
                  isVisible
                    ? 'animate-slide-up opacity-100'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  animationDelay: `${index * 200}ms`,
                }}
              >
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center mb-6 animate-float">
                    <IconComponent className="w-8 h-8 text-primary-foreground" />
                  </div>
                  
                  {/* Glow effect */}
                  <div className="absolute top-0 left-0 w-16 h-16 bg-primary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>

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