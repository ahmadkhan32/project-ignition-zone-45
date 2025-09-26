import { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
  location: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Chen",
    role: "Software Engineer",
    avatar: "AC",
    rating: 5,
    text: "The EV Sport Pro has completely transformed my daily commute. The range is incredible and the acceleration is addictive. Best investment I've made!",
    location: "San Francisco, CA"
  },
  {
    id: 2,
    name: "Maria Rodriguez",
    role: "Urban Planner",
    avatar: "MR",
    rating: 5,
    text: "As someone who studies urban mobility, I can confidently say these scooters represent the future of city transportation. Efficient, clean, and fun!",
    location: "Barcelona, Spain"
  },
  {
    id: 3,
    name: "James Thompson",
    role: "Delivery Service Owner",
    avatar: "JT",
    rating: 5,
    text: "We've equipped our entire fleet with these scooters. The reliability and cost savings are phenomenal. Our delivery times improved by 40%!",
    location: "London, UK"
  },
  {
    id: 4,
    name: "Sophie Laurent",
    role: "Environmental Scientist",
    avatar: "SL",
    rating: 5,
    text: "Finally, a vehicle that aligns with my values. Zero emissions, minimal noise, and the build quality is exceptional. Highly recommend!",
    location: "Paris, France"
  },
  {
    id: 5,
    name: "David Kim",
    role: "College Student",
    avatar: "DK",
    rating: 5,
    text: "Perfect for campus life! The compact design makes parking easy, and the range gets me through the entire day. Plus, it's way cooler than walking!",
    location: "Seoul, South Korea"
  },
  {
    id: 6,
    name: "Emma Wilson",
    role: "Marketing Executive",
    avatar: "EW",
    rating: 5,
    text: "The smart features and app connectivity are game-changers. I love tracking my rides and the theft protection gives me peace of mind.",
    location: "Sydney, Australia"
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`w-4 h-4 ${
            index < rating
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

export const TestimonialsSection = () => {
  const [visibleTestimonials, setVisibleTestimonials] = useState(3);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('testimonials');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const loadMoreTestimonials = () => {
    setVisibleTestimonials(prev => Math.min(prev + 3, testimonials.length));
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            What Our{" "}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Riders
            </span>{" "}
            Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of satisfied customers who have made the switch to electric.
            Real experiences from real riders around the world.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.slice(0, visibleTestimonials).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`testimonial-card ${
                isVisible
                  ? 'animate-slide-up opacity-100'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                animationDelay: `${index * 150}ms`,
              }}
            >
              {/* Quote Icon */}
              <div className="relative mb-4">
                <Quote className="w-8 h-8 text-primary/30 absolute -top-2 -left-2" />
              </div>

              {/* Testimonial Text */}
              <p className="text-muted-foreground leading-relaxed mb-6 relative z-10">
                "{testimonial.text}"
              </p>

              {/* Rating */}
              <div className="mb-4">
                <StarRating rating={testimonial.rating} />
              </div>

              {/* User Info */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center text-primary-foreground font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <p className="text-xs text-muted-foreground/70">{testimonial.location}</p>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleTestimonials < testimonials.length && (
          <div className="text-center">
            <button
              onClick={loadMoreTestimonials}
              className="px-8 py-3 border border-primary text-primary rounded-xl hover:bg-primary/10 transition-all duration-300 hover:scale-105"
            >
              Load More Reviews
            </button>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-20 bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">Happy Riders</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">4.9</div>
              <div className="text-muted-foreground">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">Would Recommend</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">25+</div>
              <div className="text-muted-foreground">Countries</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};