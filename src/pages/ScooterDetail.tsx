import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { NavigationBar } from "@/components/NavigationBar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Battery, 
  Zap, 
  Gauge, 
  Clock, 
  Smartphone, 
  Shield, 
  Navigation, 
  Wifi,
  ArrowLeft,
  RotateCcw
} from "lucide-react";
import scooter1 from "@/assets/scooter-1.jpg";
import scooter2 from "@/assets/scooter-2.jpg";
import scooter3 from "@/assets/scooter-3.jpg";
import scooter4 from "@/assets/scooter-4.jpg";
import scooter5 from "@/assets/scooter-5.jpg";

interface ScooterModel {
  id: number;
  name: string;
  image: string;
  price: string;
  specs: {
    battery: number;
    range: number;
    speed: number;
    charging: string;
    power: number;
    torque: number;
  };
  features: string[];
  description: string;
  colors: string[];
}

const scooters: ScooterModel[] = [
  {
    id: 1,
    name: "EV Sport Pro",
    image: scooter1,
    price: "$4,999",
    specs: {
      battery: 3.2,
      range: 85,
      speed: 65,
      charging: "2.5 hrs",
      power: 3500,
      torque: 180,
    },
    features: [
      "Smart Digital Display",
      "GPS Navigation",
      "Anti-theft System",
      "Mobile App Connectivity",
      "LED Lighting System",
      "Regenerative Braking"
    ],
    description: "The perfect balance of performance and efficiency for urban commuting.",
    colors: ["Midnight Black", "Electric Blue", "Arctic White"]
  },
  {
    id: 2,
    name: "EV Racing",
    image: scooter2,
    price: "$6,499",
    specs: {
      battery: 4.1,
      range: 120,
      speed: 85,
      charging: "3 hrs",
      power: 5000,
      torque: 220,
    },
    features: [
      "Sport Mode",
      "Advanced Suspension",
      "Racing Dashboard",
      "Performance Analytics",
      "Carbon Fiber Elements",
      "Track Mode"
    ],
    description: "Built for speed enthusiasts who demand maximum performance.",
    colors: ["Racing Red", "Carbon Black", "Neon Green"]
  },
  {
    id: 3,
    name: "EV Urban",
    image: scooter3,
    price: "$3,499",
    specs: {
      battery: 2.8,
      range: 65,
      speed: 45,
      charging: "2 hrs",
      power: 2500,
      torque: 140,
    },
    features: [
      "Compact Design",
      "Easy Storage",
      "City Navigation",
      "Eco Mode",
      "Quick Charge",
      "Lightweight Frame"
    ],
    description: "Designed for city dwellers who need efficient urban mobility.",
    colors: ["Urban Gray", "Sky Blue", "Mint Green"]
  },
  {
    id: 4,
    name: "EV Executive",
    image: scooter4,
    price: "$5,799",
    specs: {
      battery: 3.8,
      range: 100,
      speed: 70,
      charging: "2.8 hrs",
      power: 4200,
      torque: 200,
    },
    features: [
      "Premium Materials",
      "Luxury Seat",
      "Advanced Security",
      "Climate Display",
      "Wireless Charging",
      "Premium Sound"
    ],
    description: "Luxury meets performance in this executive-class electric scooter.",
    colors: ["Platinum Silver", "Deep Blue", "Pearl White"]
  },
  {
    id: 5,
    name: "EV Adventure",
    image: scooter5,
    price: "$7,299",
    specs: {
      battery: 4.5,
      range: 140,
      speed: 75,
      charging: "3.5 hrs",
      power: 4800,
      torque: 240,
    },
    features: [
      "All-Terrain Capability",
      "Weather Resistant",
      "Extended Range",
      "Adventure GPS",
      "Rugged Design",
      "Off-road Mode"
    ],
    description: "Built for adventurers who want to explore beyond city limits.",
    colors: ["Adventure Orange", "Forest Green", "Desert Tan"]
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

export default function ScooterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(0);
  const [is360View, setIs360View] = useState(false);

  const scooter = scooters.find(s => s.id === parseInt(id || '1')) || scooters[0];

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      
      <main className="pt-20">
        {/* Back Button */}
        <div className="container mx-auto px-4 py-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-6 hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Hero Section */}
        <section className="container mx-auto px-4 pb-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Image Section */}
            <div className="space-y-6">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10">
                <img
                  src={scooter.image}
                  alt={scooter.name}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    is360View ? 'animate-spin' : 'hover:scale-105'
                  }`}
                />
                
                {/* 360 View Button */}
                <Button
                  onClick={() => setIs360View(!is360View)}
                  className="absolute top-4 right-4 bg-background/80 text-foreground hover:bg-background/90"
                  size="sm"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  {is360View ? 'Stop 360°' : 'Try 360° View'}
                </Button>
              </div>

              {/* Color Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Available Colors</h3>
                <div className="flex space-x-3">
                  {scooter.colors.map((color, index) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(index)}
                      className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                        selectedColor === index
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                    {scooter.name}
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground mb-6">
                  {scooter.description}
                </p>
                <div className="text-3xl font-bold text-primary mb-6">
                  {scooter.price}
                </div>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Battery className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Battery</span>
                  </div>
                  <div className="text-2xl font-bold">
                    <CountUpNumber value={scooter.specs.battery} /> kWh
                  </div>
                  <Progress value={(scooter.specs.battery / 5) * 100} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Range</span>
                  </div>
                  <div className="text-2xl font-bold">
                    <CountUpNumber value={scooter.specs.range} /> km
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Gauge className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Top Speed</span>
                  </div>
                  <div className="text-2xl font-bold">
                    <CountUpNumber value={scooter.specs.speed} /> km/h
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Charging</span>
                  </div>
                  <div className="text-2xl font-bold">{scooter.specs.charging}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <Button size="lg" className="w-full glow-button">
                  Pre-Order Now
                </Button>
                <div className="grid grid-cols-2 gap-4">
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                    Book Test Ride
                  </Button>
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                    Contact Support
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Advanced Features
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scooter.features.map((feature, index) => (
                <div
                  key={feature}
                  className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:shadow-glow transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-semibold">{feature}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Specs */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Technical Specifications
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mb-4">Performance</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Power Output</span>
                      <span className="font-semibold">{scooter.specs.power}W</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Torque</span>
                      <span className="font-semibold">{scooter.specs.torque} Nm</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Weight</span>
                      <span className="font-semibold">65 kg</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mb-4">Connectivity</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Mobile App</span>
                      <Badge variant="secondary">iOS & Android</Badge>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">GPS Tracking</span>
                      <Badge variant="secondary">Built-in</Badge>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Bluetooth</span>
                      <Badge variant="secondary">5.0</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}