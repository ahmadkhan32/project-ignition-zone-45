import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Zap, Battery, Gauge, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ScooterModel {
  id: string;
  name: string;
  description: string;
  image_1_url: string;
  image_2_url: string;
  thumbnail_url: string;
  price_type: string;
  display_order: number;
}

interface ProductHighlight {
  id: string;
  title: string;
  icon_type: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

const CountUpNumber = ({ value, duration = 2000 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [value, duration]);

  return <span>{count}</span>;
};

export const HeroSectionDynamic = () => {
  const [currentScooter, setCurrentScooter] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scooters, setScooters] = useState<ScooterModel[]>([]);
  const [highlights, setHighlights] = useState<ProductHighlight[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
    
    // Set up real-time subscriptions
    const scootersChannel = supabase
      .channel('scooters-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => {
        fetchScooters();
      })
      .subscribe();

    const highlightsChannel = supabase
      .channel('highlights-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'product_highlights' }, () => {
        fetchHighlights();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(scootersChannel);
      supabase.removeChannel(highlightsChannel);
    };
  }, []);

  const fetchData = async () => {
    await Promise.all([fetchScooters(), fetchHighlights()]);
    setLoading(false);
  };

  const fetchScooters = async () => {
    try {
      const { data, error } = await supabase
        .from('scooters')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setScooters(data || []);
    } catch (error) {
      console.error('Error fetching scooters:', error);
      toast({
        title: "Error",
        description: "Failed to load scooter data",
        variant: "destructive",
      });
    }
  };

  const fetchHighlights = async () => {
    try {
      const { data, error } = await supabase
        .from('product_highlights')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setHighlights(data || []);
    } catch (error) {
      console.error('Error fetching highlights:', error);
    }
  };

  const nextScooter = () => {
    if (isAnimating || scooters.length === 0) return;
    setIsAnimating(true);
    setCurrentScooter((prev) => (prev + 1) % scooters.length);
    setTimeout(() => setIsAnimating(false), 700);
  };

  const prevScooter = () => {
    if (isAnimating || scooters.length === 0) return;
    setIsAnimating(true);
    setCurrentScooter((prev) => (prev - 1 + scooters.length) % scooters.length);
    setTimeout(() => setIsAnimating(false), 700);
  };

  const getIconComponent = (iconType: string) => {
    switch (iconType) {
      case 'battery': return Battery;
      case 'zap': return Zap;
      case 'gauge': return Gauge;
      case 'clock': return Clock;
      default: return Zap;
    }
  };

  if (loading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </section>
    );
  }

  if (scooters.length === 0) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">No Scooters Available</h2>
          <p className="text-muted-foreground">Check back later for our latest models.</p>
        </div>
      </section>
    );
  }

  const currentModel = scooters[currentScooter];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-background via-background to-muted">
      {/* Animated Background Particles */}
      <div className="particles-bg">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 pt-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Future
                </span>
                <br />
                <span className="text-foreground">Is Electric</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Experience the next generation of urban mobility with our premium electric scooters.
                Built for performance, designed for the future.
              </p>
            </div>

            {/* Current Scooter Info */}
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-primary mb-4">{currentModel.name}</h3>
              <p className="text-muted-foreground mb-4">{currentModel.description}</p>
              
              {/* Product Highlights */}
              {highlights.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {highlights.slice(0, 4).map((highlight) => {
                    const IconComponent = getIconComponent(highlight.icon_type);
                    return (
                      <div key={highlight.id} className="flex items-center space-x-3">
                        <IconComponent className="w-5 h-5 text-primary" />
                        <div>
                          <div className="text-lg font-bold">{highlight.title}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="glow-button">
                View Details
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Book Test Ride
              </Button>
            </div>
          </div>

          {/* Right Content - Scooter Display */}
          <div className="relative">
            <div className="relative aspect-video rounded-2xl overflow-hidden">
              <img
                src={currentModel.image_1_url || currentModel.thumbnail_url}
                alt={currentModel.name}
                className={`w-full h-full object-cover scooter-image ${
                  isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
                }`}
              />
              
              {/* Navigation Arrows */}
              <button
                onClick={prevScooter}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6 text-primary" />
              </button>
              
              <button
                onClick={nextScooter}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="w-6 h-6 text-primary" />
              </button>
            </div>

            {/* Scooter Indicators */}
            <div className="flex justify-center space-x-2 mt-6">
              {scooters.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setCurrentScooter(index);
                      setTimeout(() => setIsAnimating(false), 700);
                    }
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentScooter
                      ? 'bg-primary shadow-glow'
                      : 'bg-border hover:bg-primary/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};