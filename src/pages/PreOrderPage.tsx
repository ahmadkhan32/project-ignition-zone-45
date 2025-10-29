import { NavigationBar } from "@/components/NavigationBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, ShoppingCart, Zap, Shield, CheckCircle, Clock, Star, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

// Form validation schema
const preOrderSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
  lastName: z.string().trim().min(1, "Last name is required").max(50, "Last name must be less than 50 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(20, "Phone number must be less than 20 characters"),
  model: z.string().min(1, "Please select a model"),
  message: z.string().trim().max(1000, "Message must be less than 1000 characters").optional(),
});

const PreOrderPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    model: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const benefits = [
    { icon: Zap, title: "Exclusive Early Access", description: "Be among the first to experience cutting-edge technology" },
    { icon: Shield, title: "Priority Support", description: "Dedicated customer service and priority maintenance" },
    { icon: CheckCircle, title: "Special Pricing", description: "Lock in pre-order discounts and exclusive offers" },
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
      const validatedData = preOrderSchema.parse(formData);
      
      // Format WhatsApp message
      const message = `🚀 *EV INN Pre-Order Request*

📝 *Customer Details:*
• Name: ${validatedData.firstName} ${validatedData.lastName}
• Email: ${validatedData.email}
• Phone: ${validatedData.phone}

🛴 *Product Information:*
• Model: ${validatedData.model}

${validatedData.message ? `💬 *Additional Requirements:*\n${validatedData.message}\n\n` : ''}⚡ Please process this pre-order request and send me the payment details and estimated delivery timeline.

Thank you!`;

      // Open WhatsApp with formatted message
      window.open(`https://wa.me/923311115295?text=${encodeURIComponent(message)}`, '_blank');
      
      toast({
        title: "Pre-order request sent!",
        description: "You'll be redirected to WhatsApp to complete your request.",
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        model: "",
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
    const message = "Hi! I'm interested in pre-ordering an EV INN scooter. Can you provide me with more details about available models and pricing?";
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
                Pre-Order Your
                <span className="text-primary"> EV INN</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Be among the first to experience the future of electric mobility. 
                Secure your scooter today with exclusive pre-order benefits.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button 
                  onClick={handleWhatsApp}
                  className="glow-button px-8 py-6 text-lg"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Quick Order via WhatsApp
                </Button>
                <Button variant="outline" className="px-8 py-6 text-lg">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  View Models
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Pre-Order Benefits</h2>
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
                        <Label htmlFor="model">Preferred Model</Label>
                        <Select value={formData.model} onValueChange={(value) => handleInputChange('model', value)}>
                          <SelectTrigger className={errors.model ? 'border-destructive' : ''}>
                            <SelectValue placeholder="Select a model" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ev-inn-x">EV INN X - $2,999</SelectItem>
                            <SelectItem value="ev-inn-pro">EV INN Pro - $3,999</SelectItem>
                            <SelectItem value="ev-inn-max">EV INN Max - $5,999</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.model && <p className="text-sm text-destructive mt-1">{errors.model}</p>}
                      </div>
                      
                      <div>
                        <Label htmlFor="message">Additional Requirements</Label>
                        <Textarea 
                          id="message" 
                          placeholder="Any specific requirements or questions?"
                          rows={4}
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          className={errors.message ? 'border-destructive' : ''}
                        />
                        {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
                      </div>
                      
                      <div className="flex flex-col gap-4">
                        <Button type="submit" className="glow-button w-full py-6">
                          Submit Pre-Order Request
                        </Button>
                        <Button 
                          type="button"
                          variant="outline" 
                          onClick={handleWhatsApp}
                          className="w-full py-6"
                        >
                          <Phone className="w-5 h-5 mr-2" />
                          Contact via WhatsApp: +92 3311115295
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Need Help?</h2>
              <div className="grid md:grid-cols-1 gap-8">
                <Card className="text-center">
                  <CardHeader>
                    <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
                    <CardTitle>Visit Us</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      See our scooters in person
                    </p>
                    <a 
                      href="/showroom"
                      className="text-primary hover:text-primary-glow font-semibold"
                    >
                      Find Our Showroom
                    </a>
                  </CardContent>
                </Card>
              </div>
              
              <div className="text-center mt-12">
                <p className="text-muted-foreground mb-6">
                  Questions about pre-ordering? We're here to help!
                </p>
                <a 
                  href="https://wa.me/923311115295"
                  className="inline-flex items-center text-primary hover:text-primary-glow text-xl font-semibold"
                >
                  <Phone className="w-6 h-6 mr-2" />
                  +92 3311115295 (WhatsApp)
                </a>
              </div>

              {/* Social Media */}
              <div className="text-center mt-16">
                <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
                <p className="text-muted-foreground mb-8">
                  Stay updated with EV INN on social media
                </p>
                <div className="flex justify-center items-center space-x-6">
                  <a
                    href="https://www.facebook.com/share/14MUdGKi18L/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <div className="relative w-20 h-20 bg-gradient-to-br from-primary/20 to-primary-glow/20 border-2 border-primary/30 rounded-2xl flex flex-col items-center justify-center text-primary hover:text-primary-foreground hover:border-primary hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-110 overflow-hidden">
                      <span className="absolute inset-0 bg-gradient-to-br from-primary to-primary-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <MessageCircle className="w-8 h-8 relative z-10 mb-1" />
                      <span className="text-xs font-semibold relative z-10">Facebook</span>
                    </div>
                  </a>
                  <a
                    href="https://www.instagram.com/evinn_pakistan?igsh=cHp5Z2N4MGdoZ3R4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <div className="relative w-20 h-20 bg-gradient-to-br from-primary/20 to-primary-glow/20 border-2 border-primary/30 rounded-2xl flex flex-col items-center justify-center text-primary hover:text-primary-foreground hover:border-primary hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-110 overflow-hidden">
                      <span className="absolute inset-0 bg-gradient-to-br from-primary to-primary-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <Mail className="w-8 h-8 relative z-10 mb-1" />
                      <span className="text-xs font-semibold relative z-10">Instagram</span>
                    </div>
                  </a>
                </div>
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