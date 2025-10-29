import { NavigationBar } from "@/components/NavigationBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Clock, Calendar, Car, Users, Zap, Shield } from "lucide-react";

const ShowroomPage = () => {
  const showrooms = [
    {
      id: 1,
      name: "EV INN Main Showroom",
      address: "123 Electric Avenue, Innovation District, Karachi, Pakistan",
      phone: "+92 3311115295",
      hours: {
        weekdays: "9:00 AM - 7:00 PM",
        saturday: "10:00 AM - 6:00 PM",
        sunday: "12:00 PM - 5:00 PM"
      },
      features: ["Full Model Range", "Test Ride Track", "Service Center", "Parts & Accessories"],
      manager: "Ahmed Hassan",
      isMain: true
    },
    {
      id: 2,
      name: "EV INN Lahore Branch",
      address: "456 Future Street, Tech City, Lahore, Pakistan",
      phone: "+92 3311115295",
      hours: {
        weekdays: "9:00 AM - 6:00 PM",
        saturday: "10:00 AM - 5:00 PM",
        sunday: "Closed"
      },
      features: ["Selected Models", "Test Rides", "Sales Consultation"],
      manager: "Sara Khan",
      isMain: false
    },
    {
      id: 3,
      name: "EV INN Islamabad Outlet",
      address: "789 Green Boulevard, Capital Heights, Islamabad, Pakistan",
      phone: "+92 3311115295",
      hours: {
        weekdays: "10:00 AM - 6:00 PM",
        saturday: "10:00 AM - 4:00 PM",
        sunday: "Closed"
      },
      features: ["Display Models", "Sales & Info", "Appointment Only"],
      manager: "Usman Ali",
      isMain: false
    }
  ];

  const showroomFeatures = [
    { icon: Car, title: "Interactive Displays", description: "Hands-on experience with all models" },
    { icon: Users, title: "Expert Staff", description: "Knowledgeable sales professionals" },
    { icon: Zap, title: "Test Ride Facility", description: "Experience the performance firsthand" },
    { icon: Shield, title: "Service Support", description: "Complete after-sales service" },
  ];

  const handleWhatsApp = (showroomName: string) => {
    const message = `Hi! I'd like to visit the ${showroomName}. Can you help me schedule a visit and provide directions?`;
    window.open(`https://wa.me/923311115295?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleDirections = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://maps.google.com/?q=${encodedAddress}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      
      <main className="pt-20 md:pt-24">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Visit Our
                <span className="text-primary"> Showrooms</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Experience EV INN scooters in person. Visit our showrooms to see, touch, and test ride 
                our complete range of electric scooters.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button 
                  onClick={() => handleWhatsApp("nearest showroom")}
                  className="glow-button px-8 py-6 text-lg"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Schedule Visit
                </Button>
                <Button variant="outline" className="px-8 py-6 text-lg">
                  <MapPin className="w-5 h-5 mr-2" />
                  Find Nearest Location
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Showroom Features */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What to Expect at Our Showrooms</h2>
            <div className="grid md:grid-cols-4 gap-8 mb-16">
              {showroomFeatures.map((feature, index) => (
                <Card key={index} className="tech-card text-center">
                  <CardHeader>
                    <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Showroom Locations */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Locations</h2>
            
            <div className="space-y-8">
              {showrooms.map((showroom) => (
                <Card key={showroom.id} className={`${showroom.isMain ? 'border-primary/50' : ''}`}>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <CardTitle className="text-2xl flex items-center">
                          {showroom.name}
                          {showroom.isMain && (
                            <span className="ml-3 px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                              FLAGSHIP
                            </span>
                          )}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          Managed by {showroom.manager}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2 mt-4 md:mt-0">
                        <Button 
                          onClick={() => handleWhatsApp(showroom.name)}
                          className="glow-button"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Visit
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => handleDirections(showroom.address)}
                        >
                          <MapPin className="w-4 h-4 mr-2" />
                          Directions
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Address & Contact */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-primary" />
                          Address & Contact
                        </h4>
                        <div className="space-y-2 text-muted-foreground">
                          <p>{showroom.address}</p>
                          <a 
                            href={`https://wa.me/923311115295`}
                            className="flex items-center text-primary hover:text-primary-glow"
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            {showroom.phone}
                          </a>
                        </div>
                      </div>
                      
                      {/* Hours */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-primary" />
                          Opening Hours
                        </h4>
                        <div className="space-y-2 text-muted-foreground">
                          <div className="flex justify-between">
                            <span>Mon - Fri:</span>
                            <span className="font-medium">{showroom.hours.weekdays}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Saturday:</span>
                            <span className="font-medium">{showroom.hours.saturday}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Sunday:</span>
                            <span className="font-medium">{showroom.hours.sunday}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Features */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center">
                          <Zap className="w-4 h-4 mr-2 text-primary" />
                          Available Services
                        </h4>
                        <div className="space-y-1">
                          {showroom.features.map((feature, index) => (
                            <div key={index} className="flex items-center text-muted-foreground">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Schedule Visit */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Ready to Visit?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Schedule your visit today and discover why EV INN is the future of electric mobility.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="tech-card">
                  <CardHeader>
                    <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
                    <CardTitle>Schedule Appointment</CardTitle>
                    <CardDescription>
                      Book a personalized consultation with our experts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="glow-button w-full"
                      onClick={() => handleWhatsApp("schedule an appointment")}
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      Book Appointment
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="tech-card">
                  <CardHeader>
                    <Car className="w-12 h-12 text-primary mx-auto mb-4" />
                    <CardTitle>Walk-in Welcome</CardTitle>
                    <CardDescription>
                      Drop by anytime during our business hours
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleDirections("EV INN Showroom near me")}
                    >
                      <MapPin className="w-5 h-5 mr-2" />
                      Find Nearest Location
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <div className="text-center">
                <p className="text-muted-foreground mb-6">
                  Have questions or need directions?
                </p>
                <a 
                  href="https://wa.me/923311115295"
                  className="inline-flex items-center text-primary hover:text-primary-glow text-xl font-semibold"
                >
                  <Phone className="w-6 h-6 mr-2" />
                  WhatsApp Us: +92 3311115295
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

export default ShowroomPage;