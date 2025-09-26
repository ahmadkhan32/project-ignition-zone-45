import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Calendar, Users, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export const ModernCTASection = () => {
  const handleWhatsApp = () => {
    const message = "Hi! I'm interested in learning more about EvolutionEV scooters.";
    window.open(`https://wa.me/923100004068?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="space-y-16 py-16">
      {/* Ready to Ride Section */}
      <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Ready to Ride the <span className="text-primary">Future?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join the electric revolution and experience the perfect blend of 
              performance, sustainability, and cutting-edge technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/pre-order">
                <Button className="glow-button px-8 py-6 text-lg">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Pre-Order Now
                </Button>
              </Link>
              <Link to="/test-ride">
                <Button variant="outline" className="px-8 py-6 text-lg border-primary text-primary hover:bg-primary/10">
                  Schedule Test Ride
                </Button>
              </Link>
            </div>

            {/* Limited Time Offer */}
            <div className="bg-card/50 backdrop-blur-sm border border-primary/30 rounded-2xl p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-3">
                <div className="px-4 py-1 bg-gradient-to-r from-primary to-primary-glow rounded-full text-primary-foreground text-sm font-semibold">
                  Limited Time Offer
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">
                Early Bird Special - Save $500
              </h3>
              <p className="text-muted-foreground">
                Pre-order any model before December 31st and get $500 off plus free premium 
                accessories worth $200.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Still Have Questions Section */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Still Have Questions?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Our expert support team is here to help you find the perfect electric scooter for your needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact-sales">
                <Button className="glow-button px-8 py-6 text-lg">
                  Contact Support
                </Button>
              </Link>
              <Link to="/live-chat">
                <Button variant="outline" className="px-8 py-6 text-lg border-primary text-primary hover:bg-primary/10">
                  Live Chat
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Experience Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Experience the Future?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of riders who have already made the switch to electric.
            </p>
            
            <Link to="/test-ride">
              <Button className="glow-button px-8 py-6 text-lg">
                Schedule a Test Ride
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* See It in Person Section */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">See It in Person</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Book a showroom visit or test ride to experience our scooters up close.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/showroom">
                <Button className="glow-button px-8 py-6 text-lg">
                  <MapPin className="w-5 h-5 mr-2" />
                  Visit Showroom
                </Button>
              </Link>
              <Link to="/test-ride">
                <Button variant="outline" className="px-8 py-6 text-lg border-primary text-primary hover:bg-primary/10">
                  Schedule Test Ride
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Join the Revolution Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Join the Electric Revolution</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Be part of the future of urban mobility. Experience the EvolutionEV difference today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/scooters">
                <Button className="glow-button px-8 py-6 text-lg">
                  Explore Our Scooters
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="px-8 py-6 text-lg border-primary text-primary hover:bg-primary/10">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Support Section */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Need Immediate Assistance?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              For urgent support or roadside assistance, contact our 24/7 emergency hotline.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="glow-button px-8 py-6 text-lg"
                onClick={handleWhatsApp}
              >
                <Phone className="w-5 h-5 mr-2" />
                Emergency: +92 310 000 4068
              </Button>
              <Link to="/live-chat">
                <Button variant="outline" className="px-8 py-6 text-lg border-primary text-primary hover:bg-primary/10">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Live Chat Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};