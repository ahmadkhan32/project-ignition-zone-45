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
  RotateCcw,
  Monitor,
  MapPin,
  Lock,
  WifiIcon,
  Lightbulb,
  RotateCw
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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
  motor_output: string;
  battery: string;
  weight: string;
  connectivity_mobile_app: string;
  connectivity_gps_tracking: string;
  connectivity_bluetooth: string;
}

// Interface for database record (may have different field names)
interface DatabaseScooterRecord {
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
  
  // Advanced Features (may not exist in DB yet)
  smart_display?: boolean;
  gps_navigation?: boolean;
  anti_theft_system?: boolean;
  mobile_app_connectivity?: boolean;
  led_lighting_system?: boolean;
  regenerative_braking?: boolean;
  
  // Technical Specifications (may not exist in DB yet)
  motor_output?: string;
  battery?: string;
  weight?: string;
  connectivity_mobile_app?: string;
  connectivity_gps_tracking?: string;
  connectivity_bluetooth?: string;
  
  // Legacy fields (for backward compatibility)
  power_output?: string;
  torque?: string;  
}

// Default colors for display
const defaultColors = ["Midnight Black", "Electric Blue", "Arctic White"];

// Helper functions to get values with proper units
const getMotorOutput = (motorOutput: string | undefined, powerOutput: string | undefined): string => {
  if (motorOutput) {
    // Always ensure it ends with W
    const cleanValue = motorOutput.replace(/[^\d.]/g, '');
    return cleanValue ? `${cleanValue}W` : "";
  }
  if (powerOutput) {
    // Always ensure it ends with W
    const cleanValue = powerOutput.replace(/[^\d.]/g, '');
    return cleanValue ? `${cleanValue}W` : "";
  }
  return "";
};

const getBattery = (battery: string | undefined, torque: string | undefined): string => {
  if (battery) {
    // Always ensure it ends with Ah
    const cleanValue = battery.replace(/[^\d.]/g, '');
    return cleanValue ? `${cleanValue}Ah` : "";
  }
  if (torque) {
    // Always ensure it ends with Ah
    const cleanValue = torque.replace(/[^\d.]/g, '');
    return cleanValue ? `${cleanValue}Ah` : "";
  }
  return "";
};

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
  const [scooter, setScooter] = useState<ScooterModel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScooter = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('scooters')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Error fetching scooter:', error);
          return;
        }

        // Map data to include default values for new fields (they may not exist in DB yet)
        const scooterData = data as DatabaseScooterRecord;
        const scooterWithDefaults: ScooterModel = {
          ...scooterData,
          // Set default values for advanced features (will be false if columns don't exist)
          smart_display: scooterData.smart_display ?? false,
          gps_navigation: scooterData.gps_navigation ?? false,
          anti_theft_system: scooterData.anti_theft_system ?? false,
          mobile_app_connectivity: scooterData.mobile_app_connectivity ?? false,
          led_lighting_system: scooterData.led_lighting_system ?? false,
          regenerative_braking: scooterData.regenerative_braking ?? false,
          // Set default values for technical specs (will be empty if columns don't exist)
          // Use legacy fields if new fields don't exist yet
          motor_output: getMotorOutput(scooterData.motor_output, scooterData.power_output),
          battery: getBattery(scooterData.battery, scooterData.torque),
          weight: scooterData.weight ?? "",
          connectivity_mobile_app: scooterData.connectivity_mobile_app ?? "",
          connectivity_gps_tracking: scooterData.connectivity_gps_tracking ?? "",
          connectivity_bluetooth: scooterData.connectivity_bluetooth ?? "",
        };
        setScooter(scooterWithDefaults);
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchScooter();
    
    // Set up real-time subscription for automatic updates
    const channel = supabase
      .channel('scooter_detail_changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'scooters',
        filter: `id=eq.${id}`
      }, () => {
        console.log('Scooter data changed, refreshing...');
        fetchScooter();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading scooter details...</p>
        </div>
      </div>
    );
  }

  if (!scooter) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Scooter Not Found</h1>
          <Button onClick={() => navigate('/scooters')}>
            Back to Scooters
          </Button>
        </div>
      </div>
    );
  }

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
                  src={scooter.image_1_url || scooter.thumbnail_url || '/placeholder.svg'}
                  alt={scooter.name}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    is360View ? 'animate-spin' : 'hover:scale-105'
                  }`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
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
                  {defaultColors.map((color, index) => (
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
                    <Zap className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Range</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {scooter.max_range}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Gauge className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Top Speed</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {scooter.max_speed}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Charging</span>
                  </div>
                  <div className="text-2xl font-bold">{scooter.charge_time}</div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Battery className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Motor Output (W)</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {scooter.motor_output}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <Button size="lg" className="w-full glow-button">
                  Pre-Order Now
                </Button>
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-primary text-primary hover:bg-primary/10"
                    onClick={() => {
                      const message = `Hi! I'm interested in booking a test ride for the ${scooter.name}. Can you please provide more details?`;
                      const whatsappUrl = `https://wa.me/+923100004068?text=${encodeURIComponent(message)}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                  >
                    Book Test Ride
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-primary text-primary hover:bg-primary/10"
                    onClick={() => {
                      const message = `Hi! I need support regarding the ${scooter.name}. Can you please help me?`;
                      const whatsappUrl = `https://wa.me/+923100004068?text=${encodeURIComponent(message)}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                  >
                    Contact Support
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">
              Advanced Features
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scooter.smart_display && (
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 animate-fade-in">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Monitor className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="font-semibold text-white">Smart Digital Display</span>
                  </div>
                </div>
              )}
              {scooter.gps_navigation && (
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 animate-fade-in">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Navigation className="w-5 h-5 text-green-400" />
                    </div>
                    <span className="font-semibold text-white">GPS Navigation</span>
                  </div>
                </div>
              )}
              {scooter.anti_theft_system && (
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 animate-fade-in">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-red-400" />
                    </div>
                    <span className="font-semibold text-white">Anti-theft System</span>
                  </div>
                </div>
              )}
              {scooter.mobile_app_connectivity && (
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 animate-fade-in">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-purple-400" />
                    </div>
                    <span className="font-semibold text-white">Mobile App Connectivity</span>
                  </div>
                </div>
              )}
              {scooter.led_lighting_system && (
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 animate-fade-in">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <Lightbulb className="w-5 h-5 text-yellow-400" />
                    </div>
                    <span className="font-semibold text-white">LED Lighting System</span>
                  </div>
                </div>
              )}
              {scooter.regenerative_braking && (
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 animate-fade-in">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <RotateCw className="w-5 h-5 text-orange-400" />
                    </div>
                    <span className="font-semibold text-white">Regenerative Braking</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Additional Specs */}
        <section className="py-16 bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">
              Technical Specifications
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mb-4 text-white">Performance</h3>
                  <div className="space-y-3">
                    {scooter.motor_output && (
                      <div className="flex justify-between items-center py-3 border-b border-white/20 bg-white/5 rounded-lg px-4">
                        <span className="text-gray-300">Motor Output (W)</span>
                        <span className="font-semibold text-white">{scooter.motor_output}</span>
                      </div>
                    )}
                    {scooter.battery && (
                      <div className="flex justify-between items-center py-3 border-b border-white/20 bg-white/5 rounded-lg px-4">
                        <span className="text-gray-300">Battery (Ah)</span>
                        <span className="font-semibold text-white">{scooter.battery}</span>
                      </div>
                    )}
                    {scooter.weight && (
                      <div className="flex justify-between items-center py-3 border-b border-white/20 bg-white/5 rounded-lg px-4">
                        <span className="text-gray-300">Weight</span>
                        <span className="font-semibold text-white">{scooter.weight}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mb-4 text-white">Connectivity</h3>
                  <div className="space-y-3">
                    {scooter.connectivity_mobile_app && (
                      <div className="flex justify-between items-center py-3 border-b border-white/20 bg-white/5 rounded-lg px-4">
                        <span className="text-gray-300">Mobile App</span>
                        <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">{scooter.connectivity_mobile_app}</Badge>
                      </div>
                    )}
                    {scooter.connectivity_gps_tracking && (
                      <div className="flex justify-between items-center py-3 border-b border-white/20 bg-white/5 rounded-lg px-4">
                        <span className="text-gray-300">GPS Tracking</span>
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30">{scooter.connectivity_gps_tracking}</Badge>
                      </div>
                    )}
                    {scooter.connectivity_bluetooth && (
                      <div className="flex justify-between items-center py-3 border-b border-white/20 bg-white/5 rounded-lg px-4">
                        <span className="text-gray-300">Bluetooth</span>
                        <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">{scooter.connectivity_bluetooth}</Badge>
                      </div>
                    )}
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