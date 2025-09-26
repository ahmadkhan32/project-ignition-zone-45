import { NavigationBar } from "@/components/NavigationBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Lightbulb, 
  Users, 
  Award,
  Globe,
  Leaf,
  Zap,
  Shield
} from "lucide-react";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Continuously pushing the boundaries of electric mobility technology."
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "Committed to creating a cleaner, greener future for urban transportation."
  },
  {
    icon: Shield,
    title: "Safety",
    description: "Prioritizing rider safety through advanced technology and rigorous testing."
  },
  {
    icon: Users,
    title: "Community",
    description: "Building a global community of electric mobility enthusiasts."
  }
];

const milestones = [
  {
    year: "2018",
    title: "Foundation",
    description: "EvolutionEV founded with a vision to revolutionize urban mobility."
  },
  {
    year: "2019",
    title: "First Prototype",
    description: "Developed our first electric scooter prototype with 50km range."
  },
  {
    year: "2020",
    title: "Series A Funding",
    description: "Secured $10M in Series A funding to accelerate development."
  },
  {
    year: "2021",
    title: "Market Launch",
    description: "Launched our first commercial electric scooter, the EV Urban."
  },
  {
    year: "2022",
    title: "Global Expansion",
    description: "Expanded to 15 countries across Europe and Asia."
  },
  {
    year: "2023",
    title: "Racing Division",
    description: "Introduced the EV Racing series for performance enthusiasts."
  },
  {
    year: "2024",
    title: "AI Integration",
    description: "Launched AI-powered features for enhanced riding experience."
  },
  {
    year: "2025",
    title: "Sustainability Goal",
    description: "Committed to carbon-neutral manufacturing by end of year."
  }
];

const team = [
  {
    name: "Sarah Chen",
    role: "CEO & Co-Founder",
    bio: "Former Tesla engineer with 15 years in electric vehicle development.",
    image: "/api/placeholder/300/300"
  },
  {
    name: "Michael Rodriguez",
    role: "CTO & Co-Founder",
    bio: "PhD in Electrical Engineering, expert in battery technology and AI.",
    image: "/api/placeholder/300/300"
  },
  {
    name: "Emily Watson",
    role: "Head of Design",
    bio: "Award-winning industrial designer with focus on sustainable mobility.",
    image: "/api/placeholder/300/300"
  },
  {
    name: "James Park",
    role: "VP of Engineering",
    bio: "Former BMW engineer specializing in automotive safety systems.",
    image: "/api/placeholder/300/300"
  }
];

const stats = [
  { label: "Countries", value: "25+", icon: Globe },
  { label: "Scooters Sold", value: "50K+", icon: Zap },
  { label: "Awards Won", value: "15", icon: Award },
  { label: "Team Members", value: "200+", icon: Users }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-background via-background to-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  About
                </span>
                <br />
                EvolutionEV
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                We're revolutionizing urban mobility with cutting-edge electric scooters that combine 
                performance, sustainability, and innovation. Our mission is to create a cleaner, 
                more efficient future for city transportation.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="outline" className="px-4 py-2 text-sm">
                  <Leaf className="w-4 h-4 mr-2" />
                  Carbon Neutral
                </Badge>
                <Badge variant="outline" className="px-4 py-2 text-sm">
                  <Award className="w-4 h-4 mr-2" />
                  Industry Leading
                </Badge>
                <Badge variant="outline" className="px-4 py-2 text-sm">
                  <Globe className="w-4 h-4 mr-2" />
                  Global Reach
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl font-bold mb-6">
                    Our Mission
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To accelerate the world's transition to sustainable urban mobility through 
                    innovative electric vehicles that are accessible, reliable, and enjoyable to ride. 
                    We believe that the future of transportation should be clean, smart, and designed 
                    for the cities we live in.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    <Target className="w-6 h-6 text-primary mr-3" />
                    Our Vision
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    A world where every urban journey is powered by clean energy, where cities are 
                    quieter, cleaner, and more livable. We envision a future where our electric 
                    scooters are the preferred choice for millions of commuters worldwide.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div
                        key={stat.label}
                        className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 text-center animate-fade-in"
                        style={{ animationDelay: `${index * 150}ms` }}
                      >
                        <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                        <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                Our Values
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                The principles that guide everything we do and drive us toward our vision of the future.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.title}
                    className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-8 text-center hover:shadow-glow transition-all duration-500 animate-slide-up"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center mb-6 mx-auto">
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                Our Journey
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                From a small startup to a global leader in electric mobility.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary via-primary to-primary-glow"></div>

                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.year}
                    className={`relative flex items-center mb-12 ${
                      index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                    }`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-glow z-10"></div>

                    {/* Content */}
                    <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:shadow-glow transition-all duration-300">
                        <div className="text-2xl font-bold text-primary mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-semibold mb-3">{milestone.title}</h3>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                Leadership Team
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Meet the visionaries and innovators driving EvolutionEV forward.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div
                  key={member.name}
                  className="bg-card/50 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:shadow-glow transition-all duration-500 animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="aspect-square bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                    <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center">
                      <Users className="w-12 h-12 text-primary" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <div className="text-primary font-semibold mb-3">{member.role}</div>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Join the Electric Revolution
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Be part of the future of urban mobility. Experience the EvolutionEV difference today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="glow-button">
                Explore Our Scooters
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Contact Us
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}