import { useState } from "react";
import { NavigationBar } from "@/components/NavigationBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Play, X, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import scooter1 from "@/assets/scooter-1.jpg";
import scooter2 from "@/assets/scooter-2.jpg";
import scooter3 from "@/assets/scooter-3.jpg";
import scooter4 from "@/assets/scooter-4.jpg";
import scooter5 from "@/assets/scooter-5.jpg";

interface GalleryItem {
  id: number;
  type: "image" | "video" | "360";
  src: string;
  thumbnail: string;
  title: string;
  category: string;
  description: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    type: "image",
    src: scooter1,
    thumbnail: scooter1,
    title: "EV Sport Pro - Side View",
    category: "Performance",
    description: "Sleek aerodynamic design meets cutting-edge technology"
  },
  {
    id: 2,
    type: "360",
    src: scooter2,
    thumbnail: scooter2,
    title: "EV Racing - 360° View",
    category: "Sport",
    description: "Interactive 360-degree view of our flagship racing model"
  },
  {
    id: 3,
    type: "video",
    src: scooter3,
    thumbnail: scooter3,
    title: "EV Urban in Action",
    category: "City",
    description: "Watch the EV Urban navigate through city streets"
  },
  {
    id: 4,
    type: "image",
    src: scooter4,
    thumbnail: scooter4,
    title: "EV Executive - Luxury Details",
    category: "Luxury",
    description: "Premium materials and craftsmanship in every detail"
  },
  {
    id: 5,
    type: "image",
    src: scooter5,
    thumbnail: scooter5,
    title: "EV Adventure - Off-Road",
    category: "Adventure",
    description: "Built for adventure, ready for any terrain"
  },
  {
    id: 6,
    type: "image",
    src: scooter1,
    thumbnail: scooter1,
    title: "Dashboard Technology",
    category: "Technology",
    description: "Smart digital display with comprehensive vehicle data"
  },
  {
    id: 7,
    type: "video",
    src: scooter2,
    thumbnail: scooter2,
    title: "Charging Technology Demo",
    category: "Technology",
    description: "See our fast-charging technology in action"
  },
  {
    id: 8,
    type: "image",
    src: scooter3,
    thumbnail: scooter3,
    title: "Night Riding",
    category: "Lifestyle",
    description: "Advanced LED lighting system for safe night riding"
  },
  {
    id: 9,
    type: "360",
    src: scooter4,
    thumbnail: scooter4,
    title: "Interior 360° View",
    category: "Luxury",
    description: "Explore every detail of our premium interior design"
  }
];

const categories = ["All", "Performance", "Sport", "City", "Luxury", "Adventure", "Technology", "Lifestyle"];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [is360Spinning, setIs360Spinning] = useState(false);

  const filteredItems = selectedCategory === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const openLightbox = (item: GalleryItem) => {
    setSelectedItem(item);
    setCurrentIndex(filteredItems.findIndex(i => i.id === item.id));
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    if (!selectedItem) return;
    
    const newIndex = direction === "next" 
      ? (currentIndex + 1) % filteredItems.length
      : (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    
    setCurrentIndex(newIndex);
    setSelectedItem(filteredItems[newIndex]);
  };

  const toggle360 = () => {
    setIs360Spinning(!is360Spinning);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-background via-background to-muted">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Gallery
              </span>
              <br />
              Showcase
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Explore our electric scooters through stunning photography, interactive 360° views, 
              and immersive video content.
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

        {/* Gallery Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className="group cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => openLightbox(item)}
                >
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      {item.type === "video" && (
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                          <Play className="w-8 h-8 text-primary-foreground ml-1" />
                        </div>
                      )}
                      {item.type === "360" && (
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                          <RotateCcw className="w-8 h-8 text-primary-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Type Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-background/80">
                        {item.type === "360" ? "360°" : item.type}
                      </Badge>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-primary/80 text-primary-foreground">
                        {item.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="pt-4 space-y-2">
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Video Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Featured Content
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Watch our latest promotional video showcasing the future of electric mobility.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-primary/20 group cursor-pointer">
                <img
                  src={scooter2}
                  alt="Featured Video"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-10 h-10 text-primary-foreground ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    EvolutionEV: The Future is Electric
                  </h3>
                  <p className="text-white/80">
                    Experience the revolution in urban mobility
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lightbox Dialog */}
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-6xl w-full h-[90vh] p-0 overflow-hidden">
            {selectedItem && (
              <div className="relative w-full h-full bg-background">
                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 z-10 bg-background/80 hover:bg-background"
                  onClick={() => setSelectedItem(null)}
                >
                  <X className="w-6 h-6" />
                </Button>

                {/* Navigation Buttons */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background"
                  onClick={() => navigateLightbox("prev")}
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background"
                  onClick={() => navigateLightbox("next")}
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>

                {/* 360 Control */}
                {selectedItem.type === "360" && (
                  <Button
                    variant="ghost"
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-background/80 hover:bg-background"
                    onClick={toggle360}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    {is360Spinning ? "Stop 360°" : "Start 360°"}
                  </Button>
                )}

                {/* Media Content */}
                <div className="w-full h-full flex items-center justify-center">
                  {selectedItem.type === "video" ? (
                    <div className="relative w-full h-full bg-black flex items-center justify-center">
                      <div className="text-center text-white">
                        <Play className="w-16 h-16 mx-auto mb-4" />
                        <p className="text-lg">Video player would be implemented here</p>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={selectedItem.src}
                      alt={selectedItem.title}
                      className={`max-w-full max-h-full object-contain transition-transform duration-2000 ${
                        selectedItem.type === "360" && is360Spinning ? "animate-spin" : ""
                      }`}
                    />
                  )}
                </div>

                {/* Info Panel */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/80 to-transparent p-6">
                  <h3 className="text-2xl font-bold mb-2">{selectedItem.title}</h3>
                  <p className="text-muted-foreground">{selectedItem.description}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              See It in Person
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Book a showroom visit or test ride to experience our scooters up close.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="glow-button">
                Visit Showroom
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Schedule Test Ride
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}