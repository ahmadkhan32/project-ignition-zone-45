import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const NavigationBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

const navItems = [
  { name: "Home", href: "/" },
  { name: "Scooters", href: "/scooters" },
  { name: "Technology", href: "/technology" },
  { name: "Gallery", href: "/gallery" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg' 
        : 'bg-gradient-to-b from-background/60 to-transparent backdrop-blur-md'
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center py-2 transition-transform hover:scale-105 duration-300">
            <img
              src="https://i.postimg.cc/q7ggYBPn/Chat-GPT-Image-Oct-29-2025-08-07-29-PM.png"
              alt="EV INN Logo"
              className="h-16 md:h-20 w-auto object-contain drop-shadow-lg"
              style={{ imageRendering: 'crisp-edges' }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="relative px-4 py-2 text-sm lg:text-base font-medium text-foreground/80 hover:text-foreground transition-all duration-300 rounded-lg hover:bg-primary/10 group overflow-hidden"
              >
                <span className="relative z-10">{item.name}</span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></span>
                <span className="absolute inset-0 border border-primary/0 group-hover:border-primary/30 rounded-lg transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* CTA Button and Admin Button */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/login">
              <Button className="relative overflow-hidden group bg-transparent border border-primary/30 text-foreground hover:text-primary-foreground transition-all duration-300 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/20">
                <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                <Shield className="w-4 h-4 mr-2 relative z-10" />
                <span className="relative z-10">Admin</span>
              </Button>
            </Link>
            <Link to="/pre-order">
              <Button className="relative overflow-hidden group bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary text-primary-foreground font-semibold shadow-lg hover:shadow-xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105">
                <span className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500"></span>
                <span className="relative z-10">Pre-Order Now</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-foreground hover:bg-primary/10 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border/50 shadow-xl">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-4 py-3 text-foreground/80 hover:text-foreground font-medium rounded-lg hover:bg-primary/10 transition-all duration-300 border border-transparent hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Link to="/login">
                  <Button className="w-full relative overflow-hidden group bg-transparent border border-primary/30 text-foreground hover:text-primary-foreground transition-all duration-300 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/20">
                    <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                    <Shield className="w-4 h-4 mr-2 relative z-10" />
                    <span className="relative z-10">Admin Login</span>
                  </Button>
                </Link>
                <Link to="/pre-order">
                  <Button className="w-full relative overflow-hidden group bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary text-primary-foreground font-semibold shadow-lg hover:shadow-xl hover:shadow-primary/50 transition-all duration-300">
                    <span className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500"></span>
                    <span className="relative z-10">Pre-Order Now</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};