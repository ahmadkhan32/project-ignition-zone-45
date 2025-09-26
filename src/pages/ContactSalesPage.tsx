import { NavigationBar } from "@/components/NavigationBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MessageCircle, Clock, Users, Award, HeadphonesIcon } from "lucide-react";

const ContactSalesPage = () => {
  const salesTeamFeatures = [
    { icon: Users, title: "Expert Sales Team", description: "Experienced professionals ready to help" },
    { icon: Clock, title: "Quick Response", description: "Response within 1 hour during business hours" },
    { icon: Award, title: "Best Deals", description: "Exclusive pricing and financing options" },
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: "WhatsApp",
      description: "Instant messaging and calls",
      action: "Chat Now",
      link: "https://wa.me/923100004068?text=Hi! I'm interested in EvolutionEV scooters and would like to speak with your sales team.",
      primary: true
    },
    {
      icon: Mail,
      title: "Email",
      description: "Detailed inquiries and documents",
      action: "Send Email",
      link: "mailto:zroxweb@gmail.com",
      primary: false
    },
    {
      icon: HeadphonesIcon,
      title: "Live Chat",
      description: "Real-time assistance",
      action: "Start Chat",
      link: "/live-chat",
      primary: false
    }
  ];

  const handleWhatsApp = () => {
    const message = "Hi! I'm interested in EvolutionEV scooters and would like to speak with your sales team about pricing, models, and financing options.";
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
                Contact Our
                <span className="text-primary"> Sales Team</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Get expert advice, customized quotes, and exclusive deals from our dedicated sales professionals. 
                We're here to find the perfect EvolutionEV scooter for your needs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button 
                  onClick={handleWhatsApp}
                  className="glow-button px-8 py-6 text-lg"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  WhatsApp Sales Team
                </Button>
                <Button variant="outline" className="px-8 py-6 text-lg">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Request Quote
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Sales Team Features */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Sales Team?</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {salesTeamFeatures.map((feature, index) => (
                <Card key={index} className="tech-card text-center">
                  <CardHeader>
                    <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
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

        {/* Contact Methods */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Choose Your Preferred Contact Method</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {contactMethods.map((method, index) => (
                <Card key={index} className={`tech-card text-center ${method.primary ? 'border-primary/50' : ''}`}>
                  <CardHeader>
                    <method.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <CardTitle>{method.title}</CardTitle>
                    <CardDescription>{method.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <a href={method.link}>
                      <Button 
                        className={method.primary ? 'glow-button w-full' : 'w-full'} 
                        variant={method.primary ? 'default' : 'outline'}
                      >
                        {method.action}
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl text-center">Get a Custom Quote</CardTitle>
                  <CardDescription className="text-center">
                    Fill out this form and our sales team will contact you with a personalized quote
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
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input id="company" placeholder="Your company name" />
                  </div>
                  
                  <div>
                    <Label htmlFor="interest">I'm Interested In</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your interest" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personal">Personal Use</SelectItem>
                        <SelectItem value="business">Business/Fleet</SelectItem>
                        <SelectItem value="delivery">Delivery Service</SelectItem>
                        <SelectItem value="rental">Rental Business</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="quantity">Quantity Needed</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="How many scooters?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Scooter</SelectItem>
                        <SelectItem value="2-5">2-5 Scooters</SelectItem>
                        <SelectItem value="6-10">6-10 Scooters</SelectItem>
                        <SelectItem value="10+">More than 10</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="budget">Budget Range</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-50k">Under $50,000</SelectItem>
                        <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                        <SelectItem value="100k-200k">$100,000 - $200,000</SelectItem>
                        <SelectItem value="200k+">Over $200,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us about your requirements, timeline, or any specific questions..."
                      rows={4}
                    />
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    <Button className="glow-button w-full py-6">
                      Request Custom Quote
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

        {/* Sales Hours & Contact Info */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Sales Department Information</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <Clock className="w-8 h-8 text-primary mb-4" />
                    <CardTitle>Business Hours</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monday - Friday:</span>
                      <span className="font-semibold">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saturday:</span>
                      <span className="font-semibold">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sunday:</span>
                      <span className="font-semibold">Closed</span>
                    </div>
                    <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                      <p className="text-sm text-primary font-semibold">
                        WhatsApp available 24/7 for urgent inquiries
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <Phone className="w-8 h-8 text-primary mb-4" />
                    <CardTitle>Direct Contact</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-muted-foreground mb-2">Sales Hotline (WhatsApp)</p>
                      <a 
                        href="https://wa.me/923100004068"
                        className="text-xl font-bold text-primary hover:text-primary-glow flex items-center"
                      >
                        <Phone className="w-5 h-5 mr-2" />
                        +92 310 000 4068
                      </a>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-2">Sales Email</p>
                      <a 
                        href="mailto:zroxweb@gmail.com"
                        className="text-lg font-semibold text-primary hover:text-primary-glow"
                      >
                        zroxweb@gmail.com
                      </a>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-2">Average Response Time</p>
                      <p className="font-semibold">Within 1 hour during business hours</p>
                    </div>
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

export default ContactSalesPage;