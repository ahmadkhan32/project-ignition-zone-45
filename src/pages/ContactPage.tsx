import { useState } from "react";
import { NavigationBar } from "@/components/NavigationBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  MessageCircle,
  Calendar,
  Users,
  Wrench,
  HelpCircle,
  Send
} from "lucide-react";
import { toast } from "sonner";

const contactReasons = [
  { value: "test-ride", label: "Schedule Test Ride", icon: Calendar },
  { value: "sales", label: "Sales Inquiry", icon: Users },
  { value: "support", label: "Customer Support", icon: HelpCircle },
  { value: "service", label: "Service & Maintenance", icon: Wrench },
  { value: "partnership", label: "Partnership Opportunities", icon: MessageCircle },
  { value: "other", label: "Other", icon: Mail }
];

const locations = [
  {
    city: "San Francisco",
    type: "Headquarters",
    address: "1234 Electric Avenue, San Francisco, CA 94102",
    phone: "+1 (555) 123-4567",
    email: "sf@evolutionev.com",
    hours: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM"
  },
  {
    city: "Los Angeles",
    type: "Showroom",
    address: "5678 Future Blvd, Los Angeles, CA 90210",
    phone: "+1 (555) 234-5678",
    email: "la@evolutionev.com",
    hours: "Mon-Sat: 10AM-7PM, Sun: 12PM-5PM"
  },
  {
    city: "New York",
    type: "Service Center",
    address: "9012 Innovation Street, New York, NY 10001",
    phone: "+1 (555) 345-6789",
    email: "ny@evolutionev.com",
    hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-3PM"
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
    subject: "",
    message: "",
    preferredContact: "email"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    toast.success("Message sent successfully! We'll get back to you within 24 hours.");
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      reason: "",
      subject: "",
      message: "",
      preferredContact: "email"
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-background via-background to-muted">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Get in
              </span>
              <br />
              Touch
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Have questions about our electric scooters? Want to schedule a test ride? 
              We're here to help you make the switch to electric mobility.
            </p>
            
            {/* Quick Contact Options */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Button className="glow-button" size="lg">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Test Ride
              </Button>
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
                <MessageCircle className="w-5 h-5 mr-2" />
                Live Chat
              </Button>
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <Card className="border-border bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl">Send us a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Personal Info */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            placeholder="Your full name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="your.email@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reason">Reason for Contact *</Label>
                          <Select value={formData.reason} onValueChange={(value) => handleInputChange("reason", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a reason" />
                            </SelectTrigger>
                            <SelectContent>
                              {contactReasons.map((reason) => (
                                <SelectItem key={reason.value} value={reason.value}>
                                  {reason.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => handleInputChange("subject", e.target.value)}
                          placeholder="Brief description of your inquiry"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          placeholder="Please provide details about your inquiry..."
                          rows={5}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Preferred Contact Method</Label>
                        <div className="flex gap-4">
                          <Button
                            type="button"
                            variant={formData.preferredContact === "email" ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleInputChange("preferredContact", "email")}
                          >
                            <Mail className="w-4 h-4 mr-2" />
                            Email
                          </Button>
                          <Button
                            type="button"
                            variant={formData.preferredContact === "phone" ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleInputChange("preferredContact", "phone")}
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            Phone
                          </Button>
                        </div>
                      </div>

                      <Button type="submit" className="w-full glow-button" size="lg">
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                {/* Quick Contact Cards */}
                <div className="grid gap-4">
                  <Card className="border-border bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Phone className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Call Us</h3>
                          <p className="text-muted-foreground">+1 (555) 123-4567</p>
                          <p className="text-sm text-muted-foreground">Mon-Fri: 9AM-6PM PST</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Mail className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Email Us</h3>
                          <p className="text-muted-foreground">contact@evolutionev.com</p>
                          <p className="text-sm text-muted-foreground">Response within 24 hours</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <MessageCircle className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Live Chat</h3>
                          <p className="text-muted-foreground">Chat with our team</p>
                          <Badge variant="secondary" className="mt-1">
                            Online Now
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Office Locations */}
                <div>
                  <h3 className="text-2xl font-bold mb-6">Our Locations</h3>
                  <div className="space-y-4">
                    {locations.map((location, index) => (
                      <Card 
                        key={location.city} 
                        className="border-border bg-card/50 backdrop-blur-sm animate-fade-in"
                        style={{ animationDelay: `${index * 150}ms` }}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-lg">{location.city}</h4>
                              <Badge variant="outline" className="mt-1">
                                {location.type}
                              </Badge>
                            </div>
                            <MapPin className="w-5 h-5 text-primary" />
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <p className="text-muted-foreground">{location.address}</p>
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4 text-primary" />
                              <span>{location.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Mail className="w-4 h-4 text-primary" />
                              <span>{location.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-primary" />
                              <span>{location.hours}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Quick answers to common questions. Can't find what you're looking for? Contact us directly.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-6">
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                  <h3 className="font-semibold mb-2">How do I schedule a test ride?</h3>
                  <p className="text-sm text-muted-foreground">
                    You can schedule a test ride through our contact form, by calling us directly, 
                    or by visiting one of our showrooms.
                  </p>
                </div>
                
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                  <h3 className="font-semibold mb-2">What's included in the warranty?</h3>
                  <p className="text-sm text-muted-foreground">
                    All our scooters come with a 2-year comprehensive warranty covering battery, 
                    motor, and all electrical components.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                  <h3 className="font-semibold mb-2">Do you offer financing options?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes, we offer flexible financing options with 0% APR for qualified buyers. 
                    Contact our sales team for more details.
                  </p>
                </div>
                
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
                  <h3 className="font-semibold mb-2">Where can I get my scooter serviced?</h3>
                  <p className="text-sm text-muted-foreground">
                    We have authorized service centers in major cities, plus mobile service 
                    options for routine maintenance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="py-16 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Need Immediate Assistance?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              For urgent support or roadside assistance, contact our 24/7 emergency hotline.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="glow-button">
                <Phone className="w-5 h-5 mr-2" />
                Emergency: +1 (555) 911-HELP
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                <MessageCircle className="w-5 h-5 mr-2" />
                Live Chat Support
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}