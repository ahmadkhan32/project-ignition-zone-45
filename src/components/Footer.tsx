import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "All Models", href: "#scooters" },
      { name: "Accessories", href: "#accessories" },
      { name: "Technology", href: "#technology" },
      { name: "Comparisons", href: "#compare" },
    ],
    support: [
      { name: "User Manual", href: "#manual" },
      { name: "Warranty", href: "#warranty" },
      { name: "Service Centers", href: "#service" },
      { name: "FAQs", href: "#faq" },
    ],
    company: [
      { name: "About Us", href: "#about" },
      { name: "Careers", href: "#careers" },
      { name: "Press Kit", href: "#press" },
      { name: "Sustainability", href: "#sustainability" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Terms of Service", href: "#terms" },
      { name: "Cookie Policy", href: "#cookies" },
      { name: "GDPR", href: "#gdpr" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/share/14MUdGKi18L/", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/evinn_pakistan?igsh=cHp5Z2N4MGdoZ3R4", label: "Instagram" },
  ];

  return (
    <footer className="bg-gradient-to-t from-muted to-background border-t border-border">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <img
                src="https://i.postimg.cc/q7ggYBPn/Chat-GPT-Image-Oct-29-2025-08-07-29-PM.png"
                alt="EV INN Logo"
                className="h-20 md:h-24 w-auto object-contain"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </div>
            
            <p className="text-muted-foreground mb-6 max-w-md">
              Leading the electric revolution with premium scooters designed for the modern world. 
              Sustainable, powerful, and built for the future.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>123 Electric Avenue, Future City, FC 12345</span>
              </div>
              <a 
                href="https://wa.me/923311115295"
                className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span>+92 3311115295 (WhatsApp)</span>
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Stay Updated with EV INN
            </h3>
            <p className="text-muted-foreground mb-6">
              Get the latest news about new models, features, and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
              />
              <button className="glow-button px-6 py-3 rounded-xl whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-muted-foreground text-center md:text-left">
              <p>&copy; {currentYear} EV INN. All rights reserved.</p>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="relative group w-12 h-12 bg-gradient-to-br from-primary/20 to-primary-glow/20 border-2 border-primary/30 rounded-full flex items-center justify-center text-primary hover:text-primary-foreground hover:border-primary hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-110 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-br from-primary to-primary-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <Icon className="w-5 h-5 relative z-10" />
                </a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {footerLinks.legal.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};