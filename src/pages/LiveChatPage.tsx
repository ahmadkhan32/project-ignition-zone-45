import { NavigationBar } from "@/components/NavigationBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageCircle, Phone, Clock, Users, Headphones, Zap } from "lucide-react";

const LiveChatPage = () => {
  const chatFeatures = [
    { icon: Clock, title: "Instant Response", description: "Get answers in real-time during business hours" },
    { icon: Users, title: "Expert Support", description: "Chat with knowledgeable product specialists" },
    { icon: Headphones, title: "Multi-Channel", description: "WhatsApp, web chat, and phone support" },
    { icon: Zap, title: "Quick Solutions", description: "Fast resolution for common questions" },
  ];

  const handleWhatsApp = () => {
    const message = "Hi! I'd like to start a live chat about EvolutionEV scooters. I have some questions about your products.";
    window.open(`https://wa.me/923100004068?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleStartChat = () => {
    // In a real app, this would open a chat widget or redirect to a chat platform
    handleWhatsApp();
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
                Live Chat
                <span className="text-primary"> Support</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Get instant help from our support team. Chat with real experts who can answer 
                your questions about EvolutionEV scooters in real-time.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button 
                  onClick={handleStartChat}
                  className="glow-button px-8 py-6 text-lg"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Start Live Chat
                </Button>
                <Button 
                  variant="outline" 
                  className="px-8 py-6 text-lg"
                  onClick={handleWhatsApp}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  WhatsApp Chat
                </Button>
              </div>
              
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse mr-2"></div>
                <span className="font-semibold">Support team is online</span>
              </div>
            </div>
          </div>
        </section>

        {/* Chat Features */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Live Chat?</h2>
            <div className="grid md:grid-cols-4 gap-8 mb-16">
              {chatFeatures.map((feature, index) => (
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

        {/* Chat Interface Preview */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Chat Options</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* WhatsApp Chat */}
                <Card className="tech-card">
                  <CardHeader>
                    <MessageCircle className="w-12 h-12 text-primary mb-4" />
                    <CardTitle>WhatsApp Chat</CardTitle>
                    <CardDescription>
                      Chat directly through WhatsApp - the most convenient way to get support
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-2" />
                        Available 24/7
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Phone className="w-4 h-4 mr-2" />
                        +92 310 000 4068
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Zap className="w-4 h-4 mr-2" />
                        Instant notifications
                      </div>
                    </div>
                    <Button 
                      className="glow-button w-full"
                      onClick={handleWhatsApp}
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Start WhatsApp Chat
                    </Button>
                  </CardContent>
                </Card>
                
                {/* Contact Form */}
                <Card className="tech-card">
                  <CardHeader>
                    <Headphones className="w-12 h-12 text-primary mb-4" />
                    <CardTitle>Request Callback</CardTitle>
                    <CardDescription>
                      Leave your details and we'll call you back within 30 minutes
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="Your phone number" />
                    </div>
                    <div>
                      <Label htmlFor="topic">Topic</Label>
                      <Input id="topic" placeholder="What do you need help with?" />
                    </div>
                    <Button variant="outline" className="w-full">
                      <Phone className="w-5 h-5 mr-2" />
                      Request Callback
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Support Hours */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Support Availability</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <Clock className="w-8 h-8 text-primary mb-4" />
                    <CardTitle>Live Chat Hours</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Monday - Friday:</span>
                      <span className="font-semibold">9:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Saturday:</span>
                      <span className="font-semibold">10:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Sunday:</span>
                      <span className="font-semibold">12:00 PM - 5:00 PM</span>
                    </div>
                    <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                      <p className="text-sm text-primary font-semibold">
                        Average response time: Under 2 minutes
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <MessageCircle className="w-8 h-8 text-primary mb-4" />
                    <CardTitle>WhatsApp Support</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">WhatsApp Chat:</span>
                      <span className="font-semibold text-primary">24/7 Available</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Response Time:</span>
                      <span className="font-semibold">Within 1 hour</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Direct Number:</span>
                      <span className="font-semibold">+92 310 000 4068</span>
                    </div>
                    <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                      <p className="text-sm text-primary font-semibold">
                        Best for urgent inquiries and immediate assistance
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="text-center mt-12">
                <p className="text-muted-foreground mb-6">
                  Ready to chat? Our team is standing by to help!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    className="glow-button px-8 py-4"
                    onClick={handleWhatsApp}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Start WhatsApp Chat
                  </Button>
                  <a 
                    href="tel:+923100004068"
                    className="inline-flex items-center justify-center px-8 py-4 border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now: +92 310 000 4068
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Quick Help */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Quick Help</h2>
              <p className="text-muted-foreground mb-8">
                Common topics our chat support can help you with instantly:
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Product Information</h4>
                  <p className="text-sm text-muted-foreground">Specs, features, and comparisons</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Pricing & Financing</h4>
                  <p className="text-sm text-muted-foreground">Quotes, payment options, and deals</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Orders & Delivery</h4>
                  <p className="text-sm text-muted-foreground">Order status and shipping info</p>
                </div>
              </div>
              
              <Button 
                className="glow-button px-8 py-4"
                onClick={handleWhatsApp}
              >
                Get Instant Help via WhatsApp
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default LiveChatPage;