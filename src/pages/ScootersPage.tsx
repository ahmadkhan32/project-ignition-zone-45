import { useState } from "react";
import { Link } from "react-router-dom";
import { NavigationBar } from "@/components/NavigationBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Battery, Zap, Gauge, Clock } from "lucide-react";
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
  category: string;
  specs: {
    battery: number;
    range: number;
    speed: number;
    charging: string;
  };
  highlights: string[];
}

const scooters: ScooterModel[] = [
  {
    id: 1,
    name: "EV Sport Pro",
    image: scooter1,
    price: "$4,999",
    category: "Performance",
    specs: {
      battery: 3.2,
      range: 85,
      speed: 65,
      charging: "2.5 hrs",
    },
    highlights: ["Smart Display", "GPS Navigation", "Anti-theft"]
  },
  {
    id: 2,
    name: "EV Racing",
    image: scooter2,
    price: "$6,499",
    category: "Sport",
    specs: {
      battery: 4.1,
      range: 120,
      speed: 85,
      charging: "3 hrs",
    },
    highlights: ["Sport Mode", "Racing Dashboard", "Carbon Fiber"]
  },
  {
    id: 3,
    name: "EV Urban",
    image: scooter3,
    price: "$3,499",
    category: "City",
    specs: {
      battery: 2.8,
      range: 65,
      speed: 45,
      charging: "2 hrs",
    },
    highlights: ["Compact Design", "Easy Storage", "Eco Mode"]
  },
  {
    id: 4,
    name: "EV Executive",
    image: scooter4,
    price: "$5,799",
    category: "Luxury",
    specs: {
      battery: 3.8,
      range: 100,
      speed: 70,
      charging: "2.8 hrs",
    },
    highlights: ["Premium Materials", "Luxury Seat", "Wireless Charging"]
  },
  {
    id: 5,
    name: "EV Adventure",
    image: scooter5,
    price: "$7,299",
    category: "Adventure",
    specs: {
      battery: 4.5,
      range: 140,
      speed: 75,
      charging: "3.5 hrs",
    },
    highlights: ["All-Terrain", "Weather Resistant", "Extended Range"]
  },
];

const categories = ["All", "City", "Performance", "Sport", "Luxury", "Adventure"];

export default function ScootersPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredScooters = selectedCategory === "All" 
    ? scooters 
    : scooters.filter(scooter => scooter.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-background via-background to-muted">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Our Scooter
              </span>
              <br />
              Lineup
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Discover our complete range of electric scooters, designed for every lifestyle 
              and built with cutting-edge technology.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="transition-all duration-300"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Scooters Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredScooters.map((scooter, index) => (
                <div
                  key={scooter.id}
                  className="group bg-card/50 backdrop-blur-sm border border-border rounded-2xl overflow-hidden hover:shadow-glow transition-all duration-500 animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={scooter.image}
                      alt={scooter.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-background/80">
                        {scooter.category}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-primary text-primary-foreground">
                        {scooter.price}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{scooter.name}</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {scooter.highlights.map(highlight => (
                          <Badge key={highlight} variant="outline" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Quick Specs */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <Battery className="w-4 h-4 text-primary" />
                        <span>{scooter.specs.battery} kWh</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-primary" />
                        <span>{scooter.specs.range} km</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Gauge className="w-4 h-4 text-primary" />
                        <span>{scooter.specs.speed} km/h</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{scooter.specs.charging}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col space-y-2 pt-4">
                      <Link to={`/scooter/${scooter.id}`}>
                        <Button className="w-full glow-button">
                          View Details
                        </Button>
                      </Link>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10">
                          Test Ride
                        </Button>
                        <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10">
                          Pre-Order
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Experience Electric?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Schedule a test ride today and feel the future of urban mobility.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="glow-button">
                Schedule Test Ride
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Contact Sales
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}