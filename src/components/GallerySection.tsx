import { useState } from "react";
import { X, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// For demo purposes, using the scooter images. In a real app, you'd have more diverse gallery content
import scooter1 from "@/assets/scooter-1.jpg";
import scooter2 from "@/assets/scooter-2.jpg";
import scooter3 from "@/assets/scooter-3.jpg";
import scooter4 from "@/assets/scooter-4.jpg";
import scooter5 from "@/assets/scooter-5.jpg";

interface GalleryItem {
  id: number;
  type: 'image' | 'video';
  src: string;
  thumbnail: string;
  title: string;
  description: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    type: 'image',
    src: scooter1,
    thumbnail: scooter1,
    title: "EV Sport Pro in Action",
    description: "Experience the thrill of electric performance"
  },
  {
    id: 2,
    type: 'image',
    src: scooter2,
    thumbnail: scooter2,
    title: "Racing Edition",
    description: "Built for speed, designed for champions"
  },
  {
    id: 3,
    type: 'image',
    src: scooter3,
    thumbnail: scooter3,
    title: "Urban Commuting",
    description: "Perfect for city adventures"
  },
  {
    id: 4,
    type: 'image',
    src: scooter4,
    thumbnail: scooter4,
    title: "Executive Class",
    description: "Luxury meets sustainability"
  },
  {
    id: 5,
    type: 'image',
    src: scooter5,
    thumbnail: scooter5,
    title: "Adventure Ready",
    description: "Conquer any terrain with confidence"
  },
  {
    id: 6,
    type: 'image',
    src: scooter1,
    thumbnail: scooter1,
    title: "Night Ride",
    description: "LED lighting system in full glory"
  },
];

export const GallerySection = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (item: GalleryItem, index: number) => {
    setSelectedItem(item);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedItem(null);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (currentIndex - 1 + galleryItems.length) % galleryItems.length
      : (currentIndex + 1) % galleryItems.length;
    
    setCurrentIndex(newIndex);
    setSelectedItem(galleryItems[newIndex]);
  };

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-muted to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Gallery
            </span>{" "}
            & Media
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our collection of stunning visuals showcasing the beauty and performance
            of our electric scooters in various settings.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className="relative group cursor-pointer overflow-hidden rounded-xl bg-card border border-border"
              onClick={() => openLightbox(item, index)}
            >
              <div className="aspect-video relative">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover gallery-image"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-white/80 text-sm">{item.description}</p>
                  </div>
                </div>

                {/* Play button for videos */}
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-8 h-8 text-primary-foreground ml-1" />
                    </div>
                  </div>
                )}

                {/* Hover glow effect */}
                <div className="absolute inset-0 ring-0 group-hover:ring-2 ring-primary/50 rounded-xl transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* 360° View Promo */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4 text-foreground">
            Experience 360° Interactive Views
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Get up close and personal with our scooters. Rotate, zoom, and explore every detail
            in our interactive 360° viewer.
          </p>
          <Button className="glow-button">
            Try 360° View
          </Button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-6xl max-h-full">
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-background/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background/40 transition-colors duration-300"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation buttons */}
            <button
              onClick={() => navigateLightbox('prev')}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-background/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background/40 transition-colors duration-300"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={() => navigateLightbox('next')}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-background/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background/40 transition-colors duration-300"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Media content */}
            <div className="relative">
              {selectedItem.type === 'image' ? (
                <img
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  className="max-w-full max-h-[80vh] object-contain rounded-xl"
                />
              ) : (
                <video
                  src={selectedItem.src}
                  controls
                  autoPlay
                  className="max-w-full max-h-[80vh] object-contain rounded-xl"
                />
              )}
              
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-xl">
                <h3 className="text-white font-bold text-xl mb-2">{selectedItem.title}</h3>
                <p className="text-white/80">{selectedItem.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};