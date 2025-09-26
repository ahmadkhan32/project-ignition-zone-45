import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Zap, Battery, Gauge, Clock } from "lucide-react";
import scooter1 from "@/assets/scooter-1.jpg";
import scooter2 from "@/assets/scooter-2.jpg";
import scooter3 from "@/assets/scooter-3.jpg";
import scooter4 from "@/assets/scooter-4.jpg";
import scooter5 from "@/assets/scooter-5.jpg";

interface ScooterModel {
  id: number;
  name: string;
  image: string;
  specs: {
    battery: number;
    range: number;
    speed: number;
    charging: string;
    power: number;
  };
}

const scooters: ScooterModel[] = [
  {
    id: 1,
    name: "EV Sport Pro",
    image: scooter1,
    specs: {
      battery: 3.2,
      range: 85,
      speed: 65,
      charging: "2.5 hrs",
      power: 3500,
    },
  },
  {
    id: 2,
    name: "EV Racing",
    image: scooter2,
    specs: {
      battery: 4.1,
      range: 120,
      speed: 85,
      charging: "3 hrs",
      power: 5000,
    },
  },
  {
    id: 3,
    name: "EV Urban",
    image: scooter3,
    specs: {
      battery: 2.8,
      range: 65,
      speed: 45,
      charging: "2 hrs",
      power: 2500,
    },
  },
  {
    id: 4,
    name: "EV Executive",
    image: scooter4,
    specs: {
      battery: 3.8,
      range: 100,
      speed: 70,
      charging: "2.8 hrs",
      power: 4200,
    },
  },
  {
    id: 5,
    name: "EV Adventure",
    image: scooter5,
    specs: {
      battery: 4.5,
      range: 140,
      speed: 75,
      charging: "3.5 hrs",
      power: 4800,
    },
  },
];

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

export const HeroSection = () => {
  const [currentScooter, setCurrentScooter] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextScooter = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentScooter((prev) => (prev + 1) % scooters.length);
    setTimeout(() => setIsAnimating(false), 700);
  };

  const prevScooter = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentScooter((prev) => (prev - 1 + scooters.length) % scooters.length);
    setTimeout(() => setIsAnimating(false), 700);
  };

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
              
              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Battery className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Battery</div>
                    <div className="text-lg font-bold counter-up">
                      <CountUpNumber value={currentModel.specs.battery} /> kWh
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Zap className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Range</div>
                    <div className="text-lg font-bold counter-up">
                      <CountUpNumber value={currentModel.specs.range} /> km
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Gauge className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Top Speed</div>
                    <div className="text-lg font-bold counter-up">
                      <CountUpNumber value={currentModel.specs.speed} /> km/h
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Charging</div>
                    <div className="text-lg font-bold">{currentModel.specs.charging}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="glow-button" asChild>
                <a href="/scooters">View Details</a>
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10" asChild>
                <a href="/test-ride">Book Test Ride</a>
              </Button>
            </div>
          </div>

          {/* Right Content - Scooter Display */}
          <div className="relative">
            <div className="relative aspect-video rounded-2xl overflow-hidden">
              <img
                src={currentModel.image}
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