
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Define testimonial type for better type safety
interface Testimonial {
  name: string;
  role: string;
  image: string;
  quote: string;
}

const TestimonialsSection = () => {
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

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-full pl-4 transition-opacity duration-300">
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
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8 gap-2">
            <CarouselPrevious className="relative inset-0 translate-y-0 mx-2" />
            <CarouselNext className="relative inset-0 translate-y-0 mx-2" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;
