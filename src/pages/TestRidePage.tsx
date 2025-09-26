import { NavigationBar } from "@/components/NavigationBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Phone, CheckCircle, Zap, Shield } from "lucide-react";

const TestRidePage = () => {
  const benefits = [
    { icon: Zap, title: "Experience Performance", description: "Feel the power and acceleration firsthand" },
    { icon: Shield, title: "Safety First", description: "All safety gear and instruction provided" },
    { icon: CheckCircle, title: "No Obligation", description: "Free test ride with no purchase pressure" },
  ];

  const timeSlots = [
    "9:00 AM - 10:00 AM",
    "10:30 AM - 11:30 AM", 
    "12:00 PM - 1:00 PM",
    "2:00 PM - 3:00 PM",
    "3:30 PM - 4:30 PM",
    "5:00 PM - 6:00 PM"
  ];

  const handleWhatsApp = () => {
    const message = "Hi! I'd like to schedule a test ride for an EvolutionEV scooter. What dates are available?";
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
                Schedule Your
                <span className="text-primary"> Test Ride</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Experience the future of electric mobility. Book a free test ride and discover 
                why EvolutionEV is leading the electric revolution.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button 
                  onClick={handleWhatsApp}
                  className="glow-button px-8 py-6 text-lg"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Book via WhatsApp
                </Button>
                <Button variant="outline" className="px-8 py-6 text-lg">
                  <Calendar className="w-5 h-5 mr-2" />
                  Check Availability
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Take a Test Ride?</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {benefits.map((benefit, index) => (
                <Card key={index} className="tech-card text-center">
                  <CardHeader>
                    <benefit.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <CardTitle>{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{benefit.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Form */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl text-center">Book Your Test Ride</CardTitle>
                  <CardDescription className="text-center">
                    Fill out the form below and we'll confirm your appointment within 2 hours
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
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Enter your phone number" />
                  </div>
                  
                  <div>
                    <Label htmlFor="model">Preferred Model</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a model to test" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="evolution-x">Evolution X</SelectItem>
                        <SelectItem value="evolution-pro">Evolution Pro</SelectItem>
                        <SelectItem value="evolution-max">Evolution Max</SelectItem>
                        <SelectItem value="any">Any Available Model</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="date">Preferred Date</Label>
                    <Input id="date" type="date" />
                  </div>
                  
                  <div>
                    <Label htmlFor="time">Preferred Time</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select preferred time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="experience">Riding Experience</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Special Requirements</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Any special requirements or questions?"
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    <Button className="glow-button w-full py-6">
                      Book Test Ride
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleWhatsApp}
                      className="w-full py-6"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Book via WhatsApp: +92 310 000 4068
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What to Expect */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">What to Expect</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <Clock className="w-8 h-8 text-primary mb-4" />
                    <CardTitle>Duration & Process</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      • 60-minute session including briefing
                    </p>
                    <p className="text-muted-foreground">
                      • Safety equipment and helmet provided
                    </p>
                    <p className="text-muted-foreground">
                      • Guided route with expert instructor
                    </p>
                    <p className="text-muted-foreground">
                      • Q&A session and model comparison
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <MapPin className="w-8 h-8 text-primary mb-4" />
                    <CardTitle>Location & Requirements</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      • Valid driving license required
                    </p>
                    <p className="text-muted-foreground">
                      • Comfortable clothing recommended
                    </p>
                    <p className="text-muted-foreground">
                      • Meeting point at our showroom
                    </p>
                    <p className="text-muted-foreground">
                      • Free parking available
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="text-center mt-12">
                <p className="text-muted-foreground mb-6">
                  Ready to experience the future? Contact us now!
                </p>
                <a 
                  href="https://wa.me/923100004068"
                  className="inline-flex items-center text-primary hover:text-primary-glow text-xl font-semibold"
                >
                  <Phone className="w-6 h-6 mr-2" />
                  +92 310 000 4068 (WhatsApp)
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

export default TestRidePage;