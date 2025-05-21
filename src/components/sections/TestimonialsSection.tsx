
import React, { useCallback, useEffect, useRef } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

// Define testimonial type for better type safety
interface Testimonial {
  name: string;
  role: string;
  image: string;
  quote: string;
}

const TestimonialsSection = () => {
  // Autoplay plugin with configuration
  const autoplayPlugin = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  // Use embla carousel with custom plugins and options
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
      dragFree: true,
    },
    [autoplayPlugin.current]
  );

  // Testimonial data
  const testimonials: Testimonial[] = [
    {
      name: "Sarah Johnson",
      role: "Homeowner",
      image: "https://i.pravatar.cc/150?img=32",
      quote: "CreditScorer helped me understand my finances better and I was able to secure a loan for my new home with favorable rates."
    },
    {
      name: "Michael Chen",
      role: "Small Business Owner",
      image: "https://i.pravatar.cc/150?img=11",
      quote: "The detailed reports gave me insights I needed to improve my business credit profile and expand my operations."
    },
    {
      name: "Jessica Williams",
      role: "First-time Homebuyer",
      image: "https://i.pravatar.cc/150?img=5",
      quote: "As someone new to credit management, the personalized recommendations were invaluable for building my financial future."
    },
    {
      name: "David Rodriguez",
      role: "Entrepreneur",
      image: "https://i.pravatar.cc/150?img=8",
      quote: "Thanks to CreditScorer, I was able to identify areas to improve my credit score before applying for business financing."
    },
    {
      name: "Emma Thompson",
      role: "Graduate Student",
      image: "https://i.pravatar.cc/150?img=23",
      quote: "The platform made it easy to understand my credit situation as I prepare for life after graduation."
    }
  ];

  return (
    <section className="w-full py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">What Our Users Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied users who have improved their credit score with our platform.
          </p>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="flex-[0_0_100%] md:flex-[0_0_33.333%] min-w-0 pl-4 pr-4"
              >
                <div className="p-6 bg-card/50 backdrop-blur-sm border border-border/30 rounded-xl h-full glass-effect transform transition-all duration-500 hover:scale-[1.02]">
                  <div className="flex items-center mb-4">
                    <div className="mr-4 h-12 w-12 rounded-full overflow-hidden border border-primary/30">
                      <img src={testimonial.image} alt={testimonial.name} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
