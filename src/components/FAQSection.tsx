import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: "What's the top speed of your electric scooters?",
    answer: "Our scooters range from 45 km/h (EV Urban) to 85 km/h (EV Racing). Each model is designed for different use cases, from city commuting to high-performance riding. All models comply with local speed regulations and can be limited based on your region's requirements."
  },
  {
    id: 2,
    question: "How long does charging take?",
    answer: "Charging times vary by model: EV Urban takes 2 hours, EV Sport Pro takes 2.5 hours, EV Executive takes 2.8 hours, EV Racing takes 3 hours, and EV Adventure takes 3.5 hours. All models support fast charging and can be charged using standard household outlets."
  },
  {
    id: 3,
    question: "What's included in the battery warranty?",
    answer: "All our batteries come with a comprehensive 3-year warranty covering manufacturing defects and capacity degradation. We guarantee that your battery will maintain at least 80% of its original capacity after 1000 charge cycles. The warranty also includes free battery health checks at authorized service centers."
  },
  {
    id: 4,
    question: "Do you offer service and maintenance support?",
    answer: "Yes! We have a network of authorized service centers in major cities worldwide. We offer scheduled maintenance, emergency repairs, and genuine parts replacement. Our mobile service team can also come to your location for basic maintenance in select areas. All services are backed by certified technicians."
  },
  {
    id: 5,
    question: "Can I ride in the rain?",
    answer: "Absolutely! All our scooters have IP65 water resistance rating, making them safe to ride in rain and wet conditions. However, we recommend avoiding deep puddles and using appropriate safety gear. The regenerative braking system is optimized for wet weather performance."
  },
  {
    id: 6,
    question: "What's the weight limit for riders?",
    answer: "Most models support riders up to 120kg (265 lbs), while our EV Adventure model can handle up to 150kg (330 lbs). The weight capacity includes the rider and any cargo. Exceeding the weight limit may affect performance, range, and safety."
  },
  {
    id: 7,
    question: "Do you offer financing options?",
    answer: "Yes, we partner with several financing companies to offer flexible payment plans. Options include 0% APR for qualified buyers, extended payment plans up to 48 months, and leasing programs for businesses. Contact our sales team to discuss the best option for your needs."
  },
  {
    id: 8,
    question: "Can I customize my scooter?",
    answer: "We offer a range of official accessories and customization options including different seat options, storage solutions, performance upgrades, and aesthetic modifications. Custom color schemes are available for bulk orders. All modifications are designed to maintain warranty coverage."
  }
];

export const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-muted to-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Get answers to the most common questions about our electric scooters,
            warranty, and services.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="faq-item bg-card/50 backdrop-blur-sm rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-card/80 transition-colors duration-300"
              >
                <h3 className="text-lg font-semibold text-foreground pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openFAQ === faq.id ? (
                    <ChevronUp className="w-5 h-5 text-primary" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-primary" />
                  )}
                </div>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openFAQ === faq.id
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Support CTA */}
        <div className="mt-16 text-center bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-4 text-foreground">
            Still Have Questions?
          </h3>
          <p className="text-muted-foreground mb-6">
            Our expert support team is here to help you find the perfect electric scooter
            for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="glow-button px-6 py-3 rounded-xl">
              Contact Support
            </button>
            <button className="px-6 py-3 border border-primary text-primary rounded-xl hover:bg-primary/10 transition-all duration-300">
              Live Chat
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};