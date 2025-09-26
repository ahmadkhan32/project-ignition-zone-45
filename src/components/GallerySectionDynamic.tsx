import { useState, useEffect } from "react";
import { X, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  thumbnail_url: string;
  item_type: 'image' | 'video';
  display_order: number;
  is_active: boolean;
}

export const GallerySectionDynamic = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchGalleryItems();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('gallery-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'gallery_items' }, () => {
        fetchGalleryItems();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setGalleryItems(data || []);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      toast({
        title: "Error",
        description: "Failed to load gallery items",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <section id="gallery" className="py-20 bg-gradient-to-b from-muted to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="h-8 bg-muted rounded w-64 mx-auto mb-4" />
            <div className="h-4 bg-muted rounded w-96 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-video bg-muted rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

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
                  src={item.thumbnail_url || item.image_url}
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
                {item.item_type === 'video' && (
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
              {selectedItem.item_type === 'image' ? (
                <img
                  src={selectedItem.image_url}
                  alt={selectedItem.title}
                  className="max-w-full max-h-[80vh] object-contain rounded-xl"
                />
              ) : (
                <video
                  src={selectedItem.image_url}
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