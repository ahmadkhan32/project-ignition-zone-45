import { NavigationBar } from "@/components/NavigationBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Phone, Mail, MapPin, Calendar, Zap, Shield, Award } from "lucide-react";

const PreOrderPage = () => {
  const features = [
    { icon: Zap, title: "Lightning Fast Delivery", description: "Get your scooter in 2-4 weeks" },
    { icon: Shield, title: "2-Year Warranty", description: "Comprehensive coverage included" },
    { icon: Award, title: "Premium Support", description: "Dedicated customer service" },
  ];

  const handleWhatsApp = () => {
    const message = "Hi! I'm interested in pre-ordering an EvolutionEV scooter. Can you help me with the process?";
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
                Pre-Order Your
                <span className="text-primary"> EvolutionEV</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Secure your spot and be among the first to experience the future of electric mobility. 
                Limited early bird pricing available.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button 
                  onClick={handleWhatsApp}
                  className="glow-button px-8 py-6 text-lg"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Order via WhatsApp
                </Button>
                <Button variant="outline" className="px-8 py-6 text-lg">
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Consultation
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {features.map((feature, index) => (
                <Card key={index} className="tech-card">
                  <CardHeader>
                    <feature.icon className="w-8 h-8 text-primary mb-4" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pre-Order Form */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl text-center">Pre-Order Form</CardTitle>
                  <CardDescription className="text-center">
                    Fill out the form below and we'll contact you within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Enter your first name" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Enter your last name" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="zroxweb@gmail.com" />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Enter your phone number" />
                  </div>
                  
                  <div>
                    <Label htmlFor="model">Preferred Model</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="evolution-x">Evolution X</SelectItem>
                        <SelectItem value="evolution-pro">Evolution Pro</SelectItem>
                        <SelectItem value="evolution-max">Evolution Max</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Additional Requirements</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Any specific requirements or questions?"
                      rows={4}
                    />
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    <Button className="glow-button w-full py-6">
                      Submit Pre-Order Request
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleWhatsApp}
                      className="w-full py-6"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Contact via WhatsApp: +92 310 000 4068
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Get In Touch</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="text-center">
                  <CardHeader>
                    <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
                    <CardTitle>Call Us</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Speak directly with our sales team
                    </p>
                    <a 
                      href="https://wa.me/923100004068"
                      className="text-primary hover:text-primary-glow font-semibold"
                    >
                      +92 310 000 4068
                    </a>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardHeader>
                    <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
                    <CardTitle>Email Us</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Send us your requirements
                    </p>
                    <a 
                      href="mailto:zroxweb@gmail.com"
                      className="text-primary hover:text-primary-glow font-semibold"
                    >
                      zroxweb@gmail.com
                    </a>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardHeader>
                    <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
                    <CardTitle>Visit Us</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      See our showroom location
                    </p>
                    <a 
                      href="/showroom"
                      className="text-primary hover:text-primary-glow font-semibold"
                    >
                      Find Showroom
                    </a>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default PreOrderPage;