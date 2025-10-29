import { NavigationBar } from "@/components/NavigationBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Clock, Users, MessageCircle, PhoneCall, Headphones } from "lucide-react";

const CallNowPage = () => {
  const callFeatures = [
    { icon: PhoneCall, title: "Direct Connection", description: "Speak directly with our sales and support team" },
    { icon: Clock, title: "Extended Hours", description: "Available during extended business hours" },
    { icon: Users, title: "Expert Staff", description: "Trained professionals ready to assist" },
    { icon: Headphones, title: "Multiple Support", description: "Sales, technical, and customer service" },
  ];

  const departments = [
    {
      name: "Sales Department",
      description: "Product information, pricing, and purchase assistance",
      number: "+92 3311115295",
      hours: "9:00 AM - 7:00 PM (Mon-Sat)",
      whatsapp: true,
      primary: true
    },
    {
      name: "Customer Support",
      description: "Order status, delivery, and general inquiries",
      number: "+92 3311115295",
      hours: "9:00 AM - 6:00 PM (Mon-Fri)",
      whatsapp: true,
      primary: false
    },
    {
      name: "Technical Support",
      description: "Product troubleshooting and technical assistance",
      number: "+92 3311115295",
      hours: "10:00 AM - 5:00 PM (Mon-Fri)",
      whatsapp: true,
      primary: false
    }
  ];

  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  const handleWhatsApp = (department: string) => {
    const message = `Hi! I'd like to speak with someone from ${department}. When is the best time to call?`;
    window.open(`https://wa.me/923311115295?text=${encodeURIComponent(message)}`, '_blank');
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
                Call Now for
                <span className="text-primary"> Instant Support</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Speak directly with our expert team. Get immediate answers to your questions 
                about EV INN scooters, pricing, and services.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button 
                  onClick={() => handleCall("+923311115295")}
                  className="glow-button px-8 py-6 text-lg"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now: +92 3311115295
                </Button>
                <Button 
                  variant="outline" 
                  className="px-8 py-6 text-lg"
                  onClick={() => handleWhatsApp("our team")}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp First
                </Button>
              </div>
              
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse mr-2"></div>
                <span className="font-semibold">Our team is available now</span>
              </div>
            </div>
          </div>
        </section>

        {/* Call Features */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Call Us?</h2>
            <div className="grid md:grid-cols-4 gap-8 mb-16">
              {callFeatures.map((feature, index) => (
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

        {/* Department Contact Info */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Choose Your Department</h2>
            
            <div className="space-y-6">
              {departments.map((dept, index) => (
                <Card key={index} className={`${dept.primary ? 'border-primary/50' : ''}`}>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <CardTitle className="text-xl flex items-center">
                          {dept.name}
                          {dept.primary && (
                            <span className="ml-3 px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                              MAIN
                            </span>
                          )}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          {dept.description}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2 mt-4 md:mt-0">
                        <Button 
                          onClick={() => handleCall(dept.number)}
                          className={dept.primary ? "glow-button" : ""}
                          variant={dept.primary ? "default" : "outline"}
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Call Now
                        </Button>
                        {dept.whatsapp && (
                          <Button 
                            variant="outline"
                            onClick={() => handleWhatsApp(dept.name)}
                          >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            WhatsApp
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-primary" />
                          Phone Number
                        </h4>
                        <a 
                          href={`tel:${dept.number}`}
                          className="text-2xl font-bold text-primary hover:text-primary-glow"
                        >
                          {dept.number}
                        </a>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-primary" />
                          Available Hours
                        </h4>
                        <p className="text-muted-foreground">
                          {dept.hours}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call Preparation Tips */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Before You Call</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Have Ready</CardTitle>
                    <CardDescription>
                      Information that will help us assist you better
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      Your preferred scooter model (if known)
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      Intended use (personal, business, delivery)
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      Budget range or financing questions
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      Location for delivery/service
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      Any specific questions or requirements
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>What We Can Help With</CardTitle>
                    <CardDescription>
                      Topics our phone support team can assist with
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      Product specifications and comparisons
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      Pricing, deals, and financing options
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      Order placement and processing
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      Delivery and shipping information
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      Service and warranty support
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="text-center mt-12">
                <h3 className="text-2xl font-bold mb-4">Ready to Call?</h3>
                <p className="text-muted-foreground mb-6">
                  Our friendly team is standing by to help you find the perfect EV INN scooter
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    className="glow-button px-8 py-4 text-lg"
                    onClick={() => handleCall("+923311115295")}
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now: +92 3311115295
                  </Button>
                  <Button 
                    variant="outline" 
                    className="px-8 py-4 text-lg"
                    onClick={() => handleWhatsApp("schedule a call")}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Schedule Call via WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Business Hours */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Our Phone Hours</h2>
              
              <Card>
                <CardHeader>
                  <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle>When to Call</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center text-lg">
                    <span className="text-muted-foreground">Monday - Friday:</span>
                    <span className="font-bold">9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center text-lg">
                    <span className="text-muted-foreground">Saturday:</span>
                    <span className="font-bold">10:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center text-lg">
                    <span className="text-muted-foreground">Sunday:</span>
                    <span className="font-bold">Closed for calls</span>
                  </div>
                  
                  <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                    <p className="text-primary font-semibold">
                      Outside of phone hours? WhatsApp us anytime at +92 3311115295
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CallNowPage;