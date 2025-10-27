import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NavigationBar } from "@/components/NavigationBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Battery, Zap, Gauge, Clock, Monitor, Navigation, Shield, Smartphone, Lightbulb, RotateCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ScooterModel {
  id: string;
  name: string;
  description: string | null;
  price: string;
  max_speed: string;
  max_range: string;
  charge_time: string;
  image_1_url: string | null;
  image_2_url: string | null;
  thumbnail_url: string | null;
  is_active: boolean;
  is_featured: boolean;
  display_order: number;
  
  // Advanced Features
  smart_display: boolean;
  gps_navigation: boolean;
  anti_theft_system: boolean;
  mobile_app_connectivity: boolean;
  led_lighting_system: boolean;
  regenerative_braking: boolean;
  
  // Technical Specifications
  power_output: string;
  torque: string;
  weight: string;
  connectivity_mobile_app: string;
  connectivity_gps_tracking: string;
  connectivity_bluetooth: string;
}

export default function ScootersPage() {
  const [scooters, setScooters] = useState<ScooterModel[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchScooters();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('scooters_page_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'scooters' }, () => {
        fetchScooters();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchScooters = async () => {
    try {
      const { data, error } = await supabase
        .from('scooters')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      
      // Map data to include default values for new fields (they may not exist in DB yet)
      const scootersWithDefaults = (data || []).map((scooter: ScooterModel & Record<string, unknown>) => ({
        ...scooter,
        // Set default values for advanced features (properly handle boolean values)
        smart_display: scooter.smart_display === true || String(scooter.smart_display) === 'true',
        gps_navigation: scooter.gps_navigation === true || String(scooter.gps_navigation) === 'true',
        anti_theft_system: scooter.anti_theft_system === true || String(scooter.anti_theft_system) === 'true',
        mobile_app_connectivity: scooter.mobile_app_connectivity === true || String(scooter.mobile_app_connectivity) === 'true',
        led_lighting_system: scooter.led_lighting_system === true || String(scooter.led_lighting_system) === 'true',
        regenerative_braking: scooter.regenerative_braking === true || String(scooter.regenerative_braking) === 'true',
        // Set default values for technical specs (will be empty if columns don't exist)
        power_output: scooter.power_output ?? "",
        torque: scooter.torque ?? "",
        weight: scooter.weight ?? "",
        connectivity_mobile_app: scooter.connectivity_mobile_app ?? "",
        connectivity_gps_tracking: scooter.connectivity_gps_tracking ?? "",
        connectivity_bluetooth: scooter.connectivity_bluetooth ?? "",
      }));
      
      setScooters(scootersWithDefaults);
    } catch (error) {
      console.error('Error fetching scooters:', error);
      toast({
        title: "Error",
        description: "Failed to load scooters",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTestRide = (scooterId: string, scooterName: string) => {
    const message = `Hi! I'm interested in scheduling a test ride for the ${scooterName}. Could you please help me with the booking?`;
    const whatsappUrl = `https://wa.me/+923100004068?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handlePreOrder = (scooterId: string, scooterName: string) => {
    const message = `Hi! I'd like to pre-order the ${scooterName}. Please provide me with more details about the process and pricing.`;
    const whatsappUrl = `https://wa.me/+923100004068?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationBar />
        <main className="pt-20 flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    );
  }

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

        {/* Scooters Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {scooters.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-2xl font-bold mb-4">No Scooters Available</h3>
                <p className="text-muted-foreground">Check back later for our latest models.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {scooters.map((scooter, index) => (
                  <div
                    key={scooter.id}
                    className="group bg-card/50 backdrop-blur-sm border border-border rounded-2xl overflow-hidden hover:shadow-glow transition-all duration-500 animate-fade-in"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={scooter.image_1_url || scooter.thumbnail_url || '/placeholder.svg'}
                        alt={scooter.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder.svg';
                        }}
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-primary text-primary-foreground">
                          {scooter.price}
                        </Badge>
                      </div>
                      {scooter.is_featured && (
                        <div className="absolute top-4 left-4">
                          <Badge variant="secondary" className="bg-background/80">
                            Featured
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-2">{scooter.name}</h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {scooter.description}
                      </p>

                      {/* Advanced Features */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold mb-2 text-primary">Advanced Features</h4>
                        <div className="flex flex-wrap gap-1">
                          {scooter.smart_display && (
                            <Badge variant="outline" className="text-xs">
                              <Monitor className="w-3 h-3 mr-1" />
                              Smart Display
                            </Badge>
                          )}
                          {scooter.gps_navigation && (
                            <Badge variant="outline" className="text-xs">
                              <Navigation className="w-3 h-3 mr-1" />
                              GPS
                            </Badge>
                          )}
                          {scooter.anti_theft_system && (
                            <Badge variant="outline" className="text-xs">
                              <Shield className="w-3 h-3 mr-1" />
                              Anti-theft
                            </Badge>
                          )}
                          {scooter.mobile_app_connectivity && (
                            <Badge variant="outline" className="text-xs">
                              <Smartphone className="w-3 h-3 mr-1" />
                              Mobile App
                            </Badge>
                          )}
                          {scooter.led_lighting_system && (
                            <Badge variant="outline" className="text-xs">
                              <Lightbulb className="w-3 h-3 mr-1" />
                              LED Lights
                            </Badge>
                          )}
                          {scooter.regenerative_braking && (
                            <Badge variant="outline" className="text-xs">
                              <RotateCw className="w-3 h-3 mr-1" />
                              Regen Braking
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Technical Specs */}
                      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Battery className="w-4 h-4 text-primary" />
                          <span>{scooter.max_range}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Gauge className="w-4 h-4 text-primary" />
                          <span>{scooter.max_speed}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Zap className="w-4 h-4 text-primary" />
                          <span>{scooter.max_range}</span>
                        </div>
                        <div className="flex items-center space-x-2 col-span-2">
                          <Clock className="w-4 h-4 text-primary" />
                          <span>Charge Time: {scooter.charge_time}</span>
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
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-primary text-primary hover:bg-primary/10"
                            onClick={() => handleTestRide(scooter.id, scooter.name)}
                          >
                            Test Ride
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-primary text-primary hover:bg-primary/10"
                            onClick={() => handlePreOrder(scooter.id, scooter.name)}
                          >
                            Pre-Order
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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