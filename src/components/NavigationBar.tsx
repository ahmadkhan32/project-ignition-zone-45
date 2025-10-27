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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-blue-900/95 backdrop-blur-md border-b border-blue-950' : 'bg-blue-900'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="https://i.postimg.cc/xCXqFP7P/Gemini-Generated-Image-mzq9i9mzq9i9mzq9.png"
              alt="EV INN Logo"
              className="w-20 h-26 object-contain"
            />
            <span className="font-display font-bold text-xl text-white">
              EV INN
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="relative text-foreground hover:text-primary transition-colors duration-300 group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* CTA Button and Admin Button */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/login">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Shield className="w-4 h-4 mr-2" />
                Admin
              </Button>
            </Link>
            <Link to="/pre-order">
              <Button className="glow-button">
                Pre-Order Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-blue-900 border-t border-blue-950">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Link to="/login">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Shield className="w-4 h-4 mr-2" />
                    Admin Login
                  </Button>
                </Link>
              </div>
               <div className="px-3 py-2">
                <Link to="/pre-order">
                  <Button className="glow-button w-full">
                    Pre-Order Now
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