import { NavigationBar } from "@/components/NavigationBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Phone, CheckCircle, Zap, Shield } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

// Form validation schema
const testRideSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
  lastName: z.string().trim().min(1, "Last name is required").max(50, "Last name must be less than 50 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(20, "Phone number must be less than 20 characters"),
  model: z.string().min(1, "Please select a model"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  experience: z.string().min(1, "Please select your experience level"),
  message: z.string().trim().max(1000, "Message must be less than 1000 characters").optional(),
});

const TestRidePage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    model: "",
    date: "",
    time: "",
    experience: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

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
      const validatedData = testRideSchema.parse(formData);
      
      // Format WhatsApp message
      const message = `🏍️ *EvolutionEV Test Ride Booking*

📝 *Customer Details:*
• Name: ${validatedData.firstName} ${validatedData.lastName}
• Email: ${validatedData.email}
• Phone: ${validatedData.phone}
• Experience Level: ${validatedData.experience}

🛴 *Test Ride Details:*
• Model: ${validatedData.model}
• Preferred Date: ${validatedData.date}
• Preferred Time: ${validatedData.time}

${validatedData.message ? `💬 *Special Requirements:*\n${validatedData.message}\n\n` : ''}⚡ Please confirm my test ride appointment and let me know what I need to bring.

Thank you!`;

      // Open WhatsApp with formatted message
      window.open(`https://wa.me/923100004068?text=${encodeURIComponent(message)}`, '_blank');
      
      toast({
        title: "Test ride request sent!",
        description: "You'll be redirected to WhatsApp to complete your booking.",
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        model: "",
        date: "",
        time: "",
        experience: "",
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
                            <SelectValue placeholder="Select a model to test" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="evolution-x">Evolution X</SelectItem>
                            <SelectItem value="evolution-pro">Evolution Pro</SelectItem>
                            <SelectItem value="evolution-max">Evolution Max</SelectItem>
                            <SelectItem value="any">Any Available Model</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.model && <p className="text-sm text-destructive mt-1">{errors.model}</p>}
                      </div>
                      
                      <div>
                        <Label htmlFor="date">Preferred Date</Label>
                        <Input 
                          id="date" 
                          type="date"
                          value={formData.date}
                          onChange={(e) => handleInputChange('date', e.target.value)}
                          className={errors.date ? 'border-destructive' : ''}
                        />
                        {errors.date && <p className="text-sm text-destructive mt-1">{errors.date}</p>}
                      </div>
                      
                      <div>
                        <Label htmlFor="time">Preferred Time</Label>
                        <Select value={formData.time} onValueChange={(value) => handleInputChange('time', value)}>
                          <SelectTrigger className={errors.time ? 'border-destructive' : ''}>
                            <SelectValue placeholder="Select preferred time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((slot) => (
                              <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.time && <p className="text-sm text-destructive mt-1">{errors.time}</p>}
                      </div>
                      
                      <div>
                        <Label htmlFor="experience">Riding Experience</Label>
                        <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                          <SelectTrigger className={errors.experience ? 'border-destructive' : ''}>
                            <SelectValue placeholder="Select your experience level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.experience && <p className="text-sm text-destructive mt-1">{errors.experience}</p>}
                      </div>
                      
                      <div>
                        <Label htmlFor="message">Special Requirements</Label>
                        <Textarea 
                          id="message" 
                          placeholder="Any special requirements or questions?"
                          rows={3}
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          className={errors.message ? 'border-destructive' : ''}
                        />
                        {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
                      </div>
                      
                      <div className="flex flex-col gap-4">
                        <Button type="submit" className="glow-button w-full py-6">
                          Book Test Ride
                        </Button>
                        <Button 
                          type="button"
                          variant="outline" 
                          onClick={handleWhatsApp}
                          className="w-full py-6"
                        >
                          <Phone className="w-5 h-5 mr-2" />
                          Book via WhatsApp: +92 310 000 4068
                        </Button>
                      </div>
                    </div>
                  </form>
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