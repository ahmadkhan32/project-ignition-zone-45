import { NavigationBar } from "@/components/NavigationBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, Zap, Battery, Gauge, Weight, Shield, Settings, Phone } from "lucide-react";

const SpecSheetPage = () => {
  const scooterModels = [
    {
      id: "evolution-x",
      name: "Evolution X",
      price: "$2,999",
      image: "/api/placeholder/400/300",
      specs: {
        motor: "1000W Hub Motor",
        battery: "48V 20Ah Lithium-ion",
        range: "65 miles",
        speed: "28 mph",
        weight: "65 lbs",
        charging: "4-6 hours",
        brakes: "Dual Disc Brakes",
        suspension: "Front Suspension"
      }
    },
    {
      id: "evolution-pro",
      name: "Evolution Pro",
      price: "$3,999",
      image: "/api/placeholder/400/300",
      specs: {
        motor: "1500W Hub Motor",
        battery: "60V 25Ah Lithium-ion",
        range: "80 miles",
        speed: "35 mph",
        weight: "75 lbs",
        charging: "5-7 hours",
        brakes: "Hydraulic Disc Brakes",
        suspension: "Front & Rear Suspension"
      }
    },
    {
      id: "evolution-max",
      name: "Evolution Max",
      price: "$5,999",
      image: "/api/placeholder/400/300",
      specs: {
        motor: "2000W Dual Hub Motor",
        battery: "72V 30Ah Lithium-ion",
        range: "100 miles",
        speed: "45 mph",
        weight: "85 lbs",
        charging: "6-8 hours",
        brakes: "Premium Hydraulic Disc",
        suspension: "Advanced Air Suspension"
      }
    }
  ];

  const specCategories = [
    { icon: Zap, name: "motor", label: "Motor Power" },
    { icon: Battery, name: "battery", label: "Battery" },
    { icon: Gauge, name: "range", label: "Range" },
    { icon: Gauge, name: "speed", label: "Top Speed" },
    { icon: Weight, name: "weight", label: "Weight" },
    { icon: Settings, name: "charging", label: "Charging Time" },
    { icon: Shield, name: "brakes", label: "Braking System" },
    { icon: Settings, name: "suspension", label: "Suspension" }
  ];

  const handleDownload = (modelName: string) => {
    // In a real app, this would trigger a PDF download
    alert(`Downloading ${modelName} specification sheet...`);
  };

  const handleWhatsApp = () => {
    const message = "Hi! I'd like to get detailed specifications and pricing information for EvolutionEV scooters.";
    window.open(`https://wa.me/923100004068?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Download
                <span className="text-primary"> Specification Sheets</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Get detailed technical specifications, performance data, and feature comparisons 
                for all EvolutionEV scooter models.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button className="glow-button px-8 py-6 text-lg">
                  <Download className="w-5 h-5 mr-2" />
                  Download All Specs
                </Button>
                <Button 
                  variant="outline" 
                  className="px-8 py-6 text-lg"
                  onClick={handleWhatsApp}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Request Custom Info
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Model Specifications */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Model Specifications</h2>
            
            <Tabs defaultValue="evolution-x" className="max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                {scooterModels.map((model) => (
                  <TabsTrigger key={model.id} value={model.id}>
                    {model.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {scooterModels.map((model) => (
                <TabsContent key={model.id} value={model.id}>
                  <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    {/* Model Image & Basic Info */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-2xl">{model.name}</CardTitle>
                        <CardDescription className="text-xl font-bold text-primary">
                          Starting at {model.price}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="aspect-video bg-muted rounded-lg mb-6 flex items-center justify-center">
                          <span className="text-muted-foreground">Product Image</span>
                        </div>
                        <div className="space-y-4">
                          <Button 
                            className="glow-button w-full"
                            onClick={() => handleDownload(model.name)}
                          >
                            <Download className="w-5 h-5 mr-2" />
                            Download {model.name} Spec Sheet
                          </Button>
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={handleWhatsApp}
                          >
                            <Phone className="w-5 h-5 mr-2" />
                            Get Pricing: +92 310 000 4068
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Detailed Specifications */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Technical Specifications</CardTitle>
                        <CardDescription>
                          Detailed performance and technical data
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4">
                          {specCategories.map((category) => (
                            <div key={category.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <category.icon className="w-5 h-5 text-primary" />
                                <span className="font-medium">{category.label}</span>
                              </div>
                              <span className="font-semibold">
                                {model.specs[category.name as keyof typeof model.specs]}
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Model Comparison</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full max-w-6xl mx-auto bg-card rounded-lg overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-4 font-semibold">Feature</th>
                    {scooterModels.map((model) => (
                      <th key={model.id} className="text-center p-4 font-semibold">
                        {model.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {specCategories.map((category, index) => (
                    <tr key={category.name} className={index % 2 === 0 ? "bg-muted/20" : ""}>
                      <td className="p-4 font-medium flex items-center">
                        <category.icon className="w-4 h-4 mr-2 text-primary" />
                        {category.label}
                      </td>
                      {scooterModels.map((model) => (
                        <td key={model.id} className="p-4 text-center font-semibold">
                          {model.specs[category.name as keyof typeof model.specs]}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="bg-primary/10">
                    <td className="p-4 font-bold">Starting Price</td>
                    {scooterModels.map((model) => (
                      <td key={model.id} className="p-4 text-center font-bold text-primary text-lg">
                        {model.price}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Download Options */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Available Downloads</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="tech-card">
                  <CardHeader>
                    <FileText className="w-12 h-12 text-primary mb-4" />
                    <CardTitle>Complete Specification Package</CardTitle>
                    <CardDescription>
                      All models with detailed specs, features, and pricing
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="glow-button w-full">
                      <Download className="w-5 h-5 mr-2" />
                      Download Complete Package (PDF)
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="tech-card">
                  <CardHeader>
                    <FileText className="w-12 h-12 text-primary mb-4" />
                    <CardTitle>Individual Model Sheets</CardTitle>
                    <CardDescription>
                      Download specific model specifications separately
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {scooterModels.map((model) => (
                      <Button 
                        key={model.id}
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleDownload(model.name)}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        {model.name} Specs
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </div>
              
              <div className="text-center mt-12">
                <p className="text-muted-foreground mb-6">
                  Need custom specifications or have questions?
                </p>
                <a 
                  href="https://wa.me/923100004068"
                  className="inline-flex items-center text-primary hover:text-primary-glow text-xl font-semibold"
                >
                  <Phone className="w-6 h-6 mr-2" />
                  Contact Sales: +92 310 000 4068
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default SpecSheetPage;