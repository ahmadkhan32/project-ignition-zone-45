import { NavigationBar } from "@/components/NavigationBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Calendar, 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Users, 
  Headphones,
  CheckCircle,
  Zap
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

// Form validation schema
const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
  lastName: z.string().trim().min(1, "Last name is required").max(50, "Last name must be less than 50 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(20, "Phone number must be less than 20 characters"),
  reason: z.string().min(1, "Please select a reason"),
  subject: z.string().trim().min(1, "Subject is required").max(100, "Subject must be less than 100 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
  preferredContact: z.string().min(1, "Please select preferred contact method"),
});

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    reason: "",
    subject: "",
    message: "",
    preferredContact: "whatsapp"
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const contactReasons = [
    "General Inquiry",
    "Product Information",
    "Technical Support",
    "Sales Question",
    "Test Ride Request",
    "Partnership Inquiry",
    "Media/Press",
    "Other"
  ];

  const quickActions = [
    {
      title: "Schedule Test Ride",
      description: "Book a free test ride",
      icon: Calendar,
      action: "Schedule Now",
      link: "/test-ride",
      color: "primary"
    },
    {
      title: "Live Chat",
      description: "Get instant help",
      icon: MessageCircle,
      action: "Start Chat",
      link: "/live-chat",
      color: "secondary"
    },
    {
      title: "Call Now",
      description: "Speak with an expert",
      icon: Phone,
      action: "Call +92 3311115295",
      link: "/call-now",
      color: "accent"
    }
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
      const validatedData = contactSchema.parse(formData);
      
      // Format WhatsApp message
      const message = `📞 *EV INN Contact Form*

📝 *Customer Details:*
• Name: ${validatedData.firstName} ${validatedData.lastName}
• Email: ${validatedData.email}
• Phone: ${validatedData.phone}
• Preferred Contact: ${validatedData.preferredContact}

📋 *Inquiry Details:*
• Reason: ${validatedData.reason}
• Subject: ${validatedData.subject}

💬 *Message:*
${validatedData.message}

⚡ Please respond via my preferred contact method. Thank you!`;

      // Open WhatsApp with formatted message
      window.open(`https://wa.me/923311115295?text=${encodeURIComponent(message)}`, '_blank');
      
      toast({
        title: "Message sent!",
        description: "You'll be redirected to WhatsApp to complete sending your message.",
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        reason: "",
        subject: "",
        message: "",
        preferredContact: "whatsapp"
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
    const message = "Hi! I have a question about EV INN scooters and would like to get in touch with your team.";
    window.open(`https://wa.me/923311115295?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      
      <main className="pt-20 md:pt-24">
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
              <Button className="glow-button" size="lg" asChild>
                <a href="/test-ride">
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Test Ride
                </a>
              </Button>
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10" asChild>
                <a href="/live-chat">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Live Chat
                </a>
              </Button>
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10" asChild>
                <a href="/call-now">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </a>
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
                      <div className="grid grid-cols-2 gap-4">
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
                        <Label htmlFor="reason">Reason for Contact</Label>
                        <Select value={formData.reason} onValueChange={(value) => handleInputChange('reason', value)}>
                          <SelectTrigger className={errors.reason ? 'border-destructive' : ''}>
                            <SelectValue placeholder="Select a reason" />
                          </SelectTrigger>
                          <SelectContent>
                            {contactReasons.map((reason) => (
                              <SelectItem key={reason} value={reason.toLowerCase().replace(/\s+/g, '-')}>
                                {reason}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.reason && <p className="text-sm text-destructive mt-1">{errors.reason}</p>}
                      </div>

                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input 
                          id="subject" 
                          placeholder="Brief description of your inquiry"
                          value={formData.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          className={errors.subject ? 'border-destructive' : ''}
                        />
                        {errors.subject && <p className="text-sm text-destructive mt-1">{errors.subject}</p>}
                      </div>

                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea 
                          id="message" 
                          placeholder="Please provide details about your inquiry..."
                          rows={4}
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          className={errors.message ? 'border-destructive' : ''}
                        />
                        {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
                      </div>

                      <div>
                        <Label>Preferred Contact Method</Label>
                        <RadioGroup 
                          value={formData.preferredContact} 
                          onValueChange={(value) => handleInputChange('preferredContact', value)}
                          className="mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="whatsapp" id="whatsapp" />
                            <Label htmlFor="whatsapp">WhatsApp</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="email" id="email" />
                            <Label htmlFor="email">Email</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="phone" id="phone" />
                            <Label htmlFor="phone">Phone Call</Label>
                          </div>
                        </RadioGroup>
                        {errors.preferredContact && <p className="text-sm text-destructive mt-1">{errors.preferredContact}</p>}
                      </div>

                      <div className="space-y-4">
                        <Button type="submit" className="glow-button w-full">
                          Send Message
                        </Button>
                        <Button 
                          type="button"
                          variant="outline" 
                          onClick={handleWhatsApp}
                          className="w-full"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Quick WhatsApp Message
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="grid gap-4">
                  {quickActions.map((action, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="bg-primary/10 p-3 rounded-lg">
                            <action.icon className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">{action.title}</h3>
                            <p className="text-muted-foreground text-sm mb-3">{action.description}</p>
                            <Button asChild variant="outline" size="sm">
                              <a href={action.link}>{action.action}</a>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Contact Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Phone className="w-5 h-5 mr-2 text-primary" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MessageCircle className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">WhatsApp</p>
                        <a 
                          href="https://wa.me/923311115295" 
                          className="text-primary hover:text-primary-glow transition-colors"
                        >
                          +92 3311115295
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Address</p>
                        <p className="text-muted-foreground">
                          123 Electric Avenue<br />
                          Future City, FC 12345
                        </p>
                        <Button 
                          variant="link" 
                          className="px-0 mt-2 text-primary hover:text-primary-glow"
                          onClick={() => window.open('https://www.google.com/maps/place/29%C2%B022\'03.4%22N+71%C2%B041\'39.8%22E/@29.3677971,71.6941323,17z/data=!4m4!3m3!8m2!3d29.3676131!4d71.6943746?entry=ttu&g_ep=EgoyMDI1MTExMi4wIKXMDSoASAFQAw%3D%3D', '_blank')}
                        >
                          View on Google Maps →
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Business Hours</p>
                        <p className="text-muted-foreground text-sm">
                          Monday - Friday: 9:00 AM - 6:00 PM<br />
                          Saturday: 10:00 AM - 4:00 PM<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Response Time */}
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary/20 p-2 rounded-full">
                        <Zap className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Quick Response</h3>
                        <p className="text-sm text-muted-foreground">
                          We typically respond within 1-2 hours during business hours
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Social Media Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Follow Us on Social Media</h2>
              <p className="text-muted-foreground mb-8">
                Stay connected with EV INN for the latest updates, news, and exclusive offers
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
                    <Users className="w-8 h-8 relative z-10 mb-1" />
                    <span className="text-xs font-semibold relative z-10">Instagram</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">How can I schedule a test ride?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      You can schedule a test ride through our online booking system, WhatsApp, or by calling us directly. 
                      Test rides are free and include safety equipment.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What's your response time?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We respond to all inquiries within 1-2 hours during business hours. For urgent matters, 
                      WhatsApp is the fastest way to reach us.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Do you offer financing options?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Yes, we offer various financing options including monthly payment plans and lease options. 
                      Contact our sales team for personalized financing solutions.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What warranty do you provide?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      All our scooters come with a comprehensive 2-year warranty covering manufacturing defects, 
                      battery, and major components with free service during the warranty period.
                    </p>
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

export default ContactPage;