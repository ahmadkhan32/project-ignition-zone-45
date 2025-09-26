import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Settings } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import logo from "@/assets/logo.png";

export const NavigationBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAdminLoggedIn } = useAdmin();

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
      isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-border' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-glow rounded-full"></div>
            <span className="font-display font-bold text-xl text-foreground">EvolutionEV</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative text-foreground hover:text-primary transition-colors duration-300 group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* CTA Button & Admin Access */}
          <div className="hidden md:flex items-center space-x-4">
            {isAdminLoggedIn ? (
              <Link to="/admin">
                <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10">
                  <Settings className="w-4 h-4 mr-2" />
                  Admin Panel
                </Button>
              </Link>
            ) : (
              <Link to="/admin/login">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                  Admin
                </Button>
              </Link>
            )}
            <Button className="glow-button">
              Pre-Order Now
            </Button>
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
          <div className="md:hidden bg-background border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
               <div className="px-3 py-2 space-y-2">
                {isAdminLoggedIn ? (
                  <Link to="/admin">
                    <Button variant="outline" size="sm" className="w-full border-primary text-primary hover:bg-primary/10">
                      <Settings className="w-4 h-4 mr-2" />
                      Admin Panel
                    </Button>
                  </Link>
                ) : (
                  <Link to="/admin/login">
                    <Button variant="ghost" size="sm" className="w-full text-muted-foreground hover:text-primary">
                      Admin Access
                    </Button>
                  </Link>
                )}
                <Button className="glow-button w-full">
                  Pre-Order Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};