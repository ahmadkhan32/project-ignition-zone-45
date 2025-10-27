import React, { useState, useEffect, useCallback } from "react";
import { NavigationBar } from "@/components/NavigationBar";
import { HeroSection } from "@/components/HeroSection";
import { TechnologySection } from "@/components/TechnologySection";
import { GallerySection } from "@/components/GallerySection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FAQSection } from "@/components/FAQSection";
import { ModernCTASection } from "@/components/ModernCTASection";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { 
  User, 
  LogIn, 
  UserPlus, 
  Shield, 
  Settings, 
  BarChart3,
  Users,
  ShoppingCart,
  Star,
  Zap,
  Eye,
  Heart,
  Share2
} from "lucide-react";

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
  smart_display: boolean;
  gps_navigation: boolean;
  anti_theft_system: boolean;
  mobile_app_connectivity: boolean;
  led_lighting_system: boolean;
  regenerative_braking: boolean;
  motor_output: string;
  battery: string;
  weight: string;
  connectivity_mobile_app: string;
  connectivity_gps_tracking: string;
  connectivity_bluetooth: string;
}

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [scooters, setScooters] = useState<ScooterModel[]>([]);
  const [scootersLoading, setScootersLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const scootersPerPage = 6;

  // Fetch scooters for display
  const fetchScooters = useCallback(async () => {
    try {
      setScootersLoading(true);
      const { data, error, count } = await supabase
        .from("scooters")
        .select("*", { count: 'exact' })
        .eq("is_active", true)
        .order("display_order", { ascending: true })
        .range((currentPage - 1) * scootersPerPage, currentPage * scootersPerPage - 1);

      if (error) {
        console.error("Error fetching scooters:", error);
        return;
      }

      if (Array.isArray(data)) {
        const mappedData = data.map((item: Record<string, unknown>) => ({
          id: String(item.id || ""),
          name: String(item.name || ""),
          description: String(item.description || ""),
          price: String(item.price || ""),
          max_speed: String(item.max_speed || ""),
          max_range: String(item.max_range || ""),
          charge_time: String(item.charge_time || ""),
          image_1_url: String(item.image_1_url || ""),
          image_2_url: String(item.image_2_url || ""),
          thumbnail_url: String(item.thumbnail_url || ""),
          is_active: Boolean(item.is_active || false),
          is_featured: Boolean(item.is_featured || false),
          display_order: Number(item.display_order || 0),
          smart_display: Boolean(item.smart_display || false),
          gps_navigation: Boolean(item.gps_navigation || false),
          anti_theft_system: Boolean(item.anti_theft_system || false),
          mobile_app_connectivity: Boolean(item.mobile_app_connectivity || false),
          led_lighting_system: Boolean(item.led_lighting_system || false),
          regenerative_braking: Boolean(item.regenerative_braking || false),
          motor_output: getMotorOutput(String(item.motor_output || ""), String(item.power_output || "")),
          battery: getBattery(String(item.battery || ""), String(item.torque || "")),
          weight: String(item.weight || "200 kg"),
          connectivity_mobile_app: String(item.connectivity_mobile_app || "iOS & Android"),
          connectivity_gps_tracking: String(item.connectivity_gps_tracking || "Built-in"),
          connectivity_bluetooth: String(item.connectivity_bluetooth || "5.0"),
        })) as ScooterModel[];
        setScooters(mappedData);
        
        // Calculate total pages
        const totalScooters = count || 0;
        const pages = Math.ceil(totalScooters / scootersPerPage);
        setTotalPages(pages);
      }
    } catch (err) {
      console.error("Unexpected error fetching scooters:", err);
    } finally {
      setScootersLoading(false);
    }
  }, [currentPage, scootersPerPage]);

  useEffect(() => {
    fetchScooters();
  }, [fetchScooters]);

  // Pagination functions
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      
      {/* Admin Access Banner - Only show for authenticated users */}
      {user && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4">
          <div className="container mx-auto px-4">
       
        </div>
        </div>
      )}

      {/* Quick Access Cards */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/scooters")}>
            <CardHeader className="text-center">
              <ShoppingCart className="w-8 h-8 mx-auto text-blue-600 mb-2" />
              <CardTitle className="text-lg">Browse Scooters</CardTitle>
              <CardDescription>View our electric scooter collection</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/technology")}>
            <CardHeader className="text-center">
              <Zap className="w-8 h-8 mx-auto text-green-600 mb-2" />
              <CardTitle className="text-lg">Technology</CardTitle>
              <CardDescription>Advanced features and specs</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/gallery")}>
            <CardHeader className="text-center">
              <Star className="w-8 h-8 mx-auto text-purple-600 mb-2" />
              <CardTitle className="text-lg">Gallery</CardTitle>
              <CardDescription>Visual showcase of our scooters</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/contact")}>
            <CardHeader className="text-center">
              <Users className="w-8 h-8 mx-auto text-orange-600 mb-2" />
              <CardTitle className="text-lg">Contact</CardTitle>
              <CardDescription>Get in touch with our team</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Featured Scooters Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Featured Electric Scooters</h2>
          <p className="text-white text-lg">Discover our latest collection of high-performance electric scooters</p>
        </div>

        {scootersLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-white">Loading scooters...</p>
          </div>
        ) : scooters.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {scooters.map((scooter) => (
              <Card key={scooter.id} className="hover:shadow-xl transition-all duration-300 group">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={scooter.image_1_url || scooter.thumbnail_url || "/placeholder.svg"}
                    alt={scooter.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {scooter.is_featured && (
                    <Badge className="absolute top-4 left-4 bg-yellow-500 text-white">
                      Featured
                    </Badge>
                  )}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Button size="sm" variant="secondary" className="bg-white/80 hover:bg-white">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="bg-white/80 hover:bg-white">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <CardTitle className="text-xl font-bold text-white">{scooter.name}</CardTitle>
                    <span className="text-2xl font-bold text-blue-400">{scooter.price}</span>
                  </div>
                  
                  <p className="text-white mb-4 line-clamp-2">{scooter.description}</p>
                  
                  {/* Key Specifications */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-white/10 rounded-lg">
                      <div className="text-2xl font-bold text-blue-400">{scooter.max_speed}</div>
                      <div className="text-sm text-white">Max Speed</div>
                    </div>
                    <div className="text-center p-3 bg-white/10 rounded-lg">
                      <div className="text-2xl font-bold text-green-400">{scooter.max_range}</div>
                      <div className="text-sm text-white">Range</div>
                    </div>
                  </div>

                  {/* Advanced Features */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-white mb-2">Advanced Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {scooter.smart_display && (
                        <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">Smart Display</Badge>
                      )}
                      {scooter.gps_navigation && (
                        <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">GPS Navigation</Badge>
                      )}
                      {scooter.anti_theft_system && (
                        <Badge variant="secondary" className="bg-red-500/20 text-red-300 border-red-500/30">Anti-Theft</Badge>
                      )}
                      {scooter.mobile_app_connectivity && (
                        <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">Mobile App</Badge>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Button 
                      onClick={() => navigate(`/scooter/${scooter.id}`)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button 
                      onClick={() => navigate("/contact")}
                      variant="outline"
                      className="flex-1"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Contact Sales
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Scooters Available</h3>
            <p className="text-white">Check back later for our latest electric scooter collection.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 space-x-2">
            <Button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded ${
                currentPage === 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Previous
            </Button>
            
            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-3 py-2 rounded ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {page}
              </Button>
            ))}
            
            <Button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 rounded ${
                currentPage === totalPages
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Next
            </Button>
          </div>
        )}

        {/* Page info */}
        <div className="text-center mt-4 text-white">
          <span>
            Showing page {currentPage} of {totalPages} ({scooters.length} scooters on this page)
          </span>
        </div>

        {/* View All Button */}
        {scooters.length > 0 && (
          <div className="text-center mt-8">
            <Button 
              onClick={() => navigate("/scooters")}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              View All Scooters
            </Button>
          </div>
        )}
      </div>

      <HeroSection />
      <TechnologySection />
      <GallerySection />
      <TestimonialsSection />
      <FAQSection />
      <ModernCTASection />
      <Footer />
    </div>
  );
};

export default Index;
