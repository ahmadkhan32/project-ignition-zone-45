import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Phone } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted to-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-primary/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-primary/8 rounded-full blur-lg animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main CTA */}
          <div className="mb-16">
            <h2 className="text-5xl lg:text-7xl font-bold mb-6">
              Ready to Ride the{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Future?
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Join the electric revolution and experience the perfect blend of performance,
              sustainability, and cutting-edge technology.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Button size="lg" className="glow-button text-lg px-8 py-4 group" asChild>
                <a href="/pre-order">
                  Pre-Order Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-4 border-primary text-primary hover:bg-primary/10 hover:scale-105 transition-all duration-300"
                asChild
              >
                <a href="/test-ride">Schedule Test Ride</a>
              </Button>
            </div>

            {/* Limited Time Offer */}
            <div className="bg-card/50 backdrop-blur-sm border border-primary/30 rounded-2xl p-6 max-w-2xl mx-auto mb-12">
              <div className="flex items-center justify-center mb-3">
                <div className="px-4 py-1 bg-gradient-to-r from-primary to-primary-glow rounded-full text-primary-foreground text-sm font-semibold">
                  Limited Time Offer
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">
                Early Bird Special - Save $500
              </h3>
              <p className="text-muted-foreground">
                Pre-order any model before December 31st and get $500 off plus free premium accessories worth $200.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-glow">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Mail className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Email Us</h3>
              <p className="text-muted-foreground mb-4">
                Get personalized recommendations from our experts
              </p>
              <a 
                href="mailto:zroxweb@gmail.com" 
                className="text-primary hover:text-primary-glow transition-colors duration-300 font-medium"
              >
                zroxweb@gmail.com
              </a>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-glow">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Phone className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">WhatsApp</h3>
              <p className="text-muted-foreground mb-4">
                Get instant support and quick responses
              </p>
              <a 
                href="https://wa.me/923100004068" 
                className="text-primary hover:text-primary-glow transition-colors duration-300 font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                +92 310 000 4068
              </a>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>Free Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>3-Year Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>30-Day Returns</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};