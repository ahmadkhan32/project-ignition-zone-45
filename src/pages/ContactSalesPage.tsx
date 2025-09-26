import { NavigationBar } from "@/components/NavigationBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Phone, Mail, HeadphonesIcon, Users, Zap, Shield, Clock, Award, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

// Form validation schema
const contactSalesSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
  lastName: z.string().trim().min(1, "Last name is required").max(50, "Last name must be less than 50 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(20, "Phone number must be less than 20 characters"),
  company: z.string().trim().max(100, "Company name must be less than 100 characters").optional(),
  interest: z.string().min(1, "Please select your interest"),
  quantity: z.string().min(1, "Please select quantity"),
  budget: z.string().min(1, "Please select budget range"),
  message: z.string().trim().max(1000, "Message must be less than 1000 characters").optional(),
});

const ContactSalesPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    interest: "",
    quantity: "",
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Instant messaging and quick responses",
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

  const salesTeamFeatures = [
    { icon: Users, title: "Expert Sales Team", description: "Knowledgeable specialists to guide your purchase" },
    { icon: Zap, title: "Quick Response", description: "Get answers to your questions within hours" },
    { icon: Shield, title: "Trusted Advice", description: "Honest recommendations based on your needs" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate form data
      const validatedData = contactSalesSchema.parse(formData);
      
      // Format WhatsApp message
      const message = `💼 *EvolutionEV Sales Inquiry*

📝 *Customer Details:*
• Name: ${validatedData.firstName} ${validatedData.lastName}
• Email: ${validatedData.email}
• Phone: ${validatedData.phone}
${validatedData.company ? `• Company: ${validatedData.company}` : ''}

🎯 *Requirements:*
• Interest: ${validatedData.interest}
• Quantity: ${validatedData.quantity}
• Budget Range: ${validatedData.budget}

${validatedData.message ? `💬 *Message:*\n${validatedData.message}\n\n` : ''}⚡ Please provide me with a custom quote and detailed information for my requirements.

Thank you!`;

      // Open WhatsApp with formatted message
      window.open(`https://wa.me/923100004068?text=${encodeURIComponent(message)}`, '_blank');
      
      toast({
        title: "Sales inquiry sent!",
        description: "You'll be redirected to WhatsApp to complete your inquiry.",
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        interest: "",
        quantity: "",
        budget: "",
        message: "",
      });

    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  const handleWhatsApp = () => {
    const message = "Hi! I'm interested in EvolutionEV scooters and would like to speak with your sales team about pricing and options.";
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
                Get personalized recommendations, custom quotes, and expert advice 
                from our dedicated sales specialists.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button 
                  onClick={handleWhatsApp}
                  className="glow-button px-8 py-6 text-lg"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat with Sales
                </Button>
                <Button variant="outline" className="px-8 py-6 text-lg">
                  <Phone className="w-5 h-5 mr-2" />
                  Schedule a Call
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
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input 
                            id="firstName" 
                            placeholder="Enter your first name"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            className={errors.firstName ? 'border-destructive' : ''}
                          />
                          {errors.firstName && <p className="text-sm text-destructive mt-1">{errors.firstName}</p>}
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input 
                            id="lastName" 
                            placeholder="Enter your last name"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            className={errors.lastName ? 'border-destructive' : ''}
                          />
                          {errors.lastName && <p className="text-sm text-destructive mt-1">{errors.lastName}</p>}
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={errors.email ? 'border-destructive' : ''}
                        />
                        {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className={errors.phone ? 'border-destructive' : ''}
                        />
                        {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
                      </div>
                      
                      <div>
                        <Label htmlFor="company">Company (Optional)</Label>
                        <Input 
                          id="company" 
                          placeholder="Your company name"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          className={errors.company ? 'border-destructive' : ''}
                        />
                        {errors.company && <p className="text-sm text-destructive mt-1">{errors.company}</p>}
                      </div>
                      
                      <div>
                        <Label htmlFor="interest">I'm Interested In</Label>
                        <Select value={formData.interest} onValueChange={(value) => handleInputChange('interest', value)}>
                          <SelectTrigger className={errors.interest ? 'border-destructive' : ''}>
                            <SelectValue placeholder="Select your interest" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="personal">Personal Use</SelectItem>
                            <SelectItem value="business">Business/Fleet</SelectItem>
                            <SelectItem value="delivery">Delivery Service</SelectItem>
                            <SelectItem value="rental">Rental Business</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.interest && <p className="text-sm text-destructive mt-1">{errors.interest}</p>}
                      </div>
                      
                      <div>
                        <Label htmlFor="quantity">Quantity Needed</Label>
                        <Select value={formData.quantity} onValueChange={(value) => handleInputChange('quantity', value)}>
                          <SelectTrigger className={errors.quantity ? 'border-destructive' : ''}>
                            <SelectValue placeholder="How many scooters?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Scooter</SelectItem>
                            <SelectItem value="2-5">2-5 Scooters</SelectItem>
                            <SelectItem value="6-10">6-10 Scooters</SelectItem>
                            <SelectItem value="10+">More than 10</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.quantity && <p className="text-sm text-destructive mt-1">{errors.quantity}</p>}
                      </div>
                      
                      <div>
                        <Label htmlFor="budget">Budget Range</Label>
                        <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                          <SelectTrigger className={errors.budget ? 'border-destructive' : ''}>
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-50k">Under $50,000</SelectItem>
                            <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                            <SelectItem value="100k-200k">$100,000 - $200,000</SelectItem>
                            <SelectItem value="200k+">Over $200,000</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.budget && <p className="text-sm text-destructive mt-1">{errors.budget}</p>}
                      </div>
                      
                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea 
                          id="message" 
                          placeholder="Tell us about your requirements, timeline, or any specific questions..."
                          rows={4}
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          className={errors.message ? 'border-destructive' : ''}
                        />
                        {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
                      </div>
                      
                      <div className="flex flex-col gap-4">
                        <Button type="submit" className="glow-button w-full py-6">
                          Request Custom Quote
                        </Button>
                        <Button 
                          type="button"
                          variant="outline" 
                          onClick={handleWhatsApp}
                          className="w-full py-6"
                        >
                          <Phone className="w-5 h-5 mr-2" />
                          Contact via WhatsApp: +92 310 000 4068
                        </Button>
                      </div>
                    </div>
                  </form>
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
                    <div className="border-t border-border pt-3 mt-3">
                      <p className="text-muted-foreground mb-2">WhatsApp Support</p>
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
                
                <Card>
                  <CardHeader>
                    <Award className="w-8 h-8 text-primary mb-4" />
                    <CardTitle>What You'll Get</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-semibold">Personalized Consultation</h4>
                        <p className="text-muted-foreground text-sm">Expert advice tailored to your needs</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-semibold">Custom Pricing</h4>
                        <p className="text-muted-foreground text-sm">Competitive quotes for bulk orders</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-semibold">Product Demos</h4>
                        <p className="text-muted-foreground text-sm">Schedule test rides and demos</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-semibold">Ongoing Support</h4>
                        <p className="text-muted-foreground text-sm">Dedicated account management</p>
                      </div>
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