
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  CheckCircle, 
  BarChart2, 
  Users, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  MessageSquare
} from "lucide-react";

// Import our new component sections
import HeroSection from "@/components/sections/HeroSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

const HomePage = () => {
  const features = [
    {
      icon: <Zap className="h-12 w-12 text-primary mb-4" />,
      title: "Real-Time Scoring",
      description: "Get your credit assessment instantly with our cutting-edge AI algorithms.",
    },
    {
      icon: <ShieldCheck className="h-12 w-12 text-primary mb-4" />,
      title: "Bank-Grade Security",
      description: "Your data is protected with multi-layered security protocols and encryption.",
    },
    {
      icon: <BarChart2 className="h-12 w-12 text-primary mb-4" />,
      title: "Comprehensive Insights",
      description: "Understand the factors influencing your score with detailed reports.",
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-primary mb-4" />,
      title: "Improve Your Score",
      description: "Actionable advice to help you improve your financial standing over time.",
    }
  ];

  const stats = [
    { value: "750+", label: "Average Score Improvement" },
    { value: "95%", label: "User Satisfaction" },
    { value: "3.2M+", label: "Credit Profiles Analyzed" },
    { value: "60s", label: "Average Processing Time" },
  ];

  const faqItems = [
    {
      question: "How is my credit score calculated?",
      answer: "Our platform uses advanced machine learning models that analyze various financial data points including payment history, credit utilization, length of credit history, types of credit used, and recent credit inquiries. We provide a transparent overview of key factors.",
    },
    {
      question: "Is my personal information secure?",
      answer: "Absolutely. We employ bank-grade security measures, including end-to-end encryption and secure data storage, to protect your personal and financial information. Your privacy is our top priority.",
    },
    {
      question: "How long does it take to get my score?",
      answer: "The credit scoring process is typically completed within minutes. Our real-time system is designed for speed and accuracy, providing you with immediate insights.",
    },
    {
      question: "Can checking my score here affect it?",
      answer: "No, using CreditScorer to check your score is considered a 'soft inquiry' and does not impact your credit score. You can check as often as you like to monitor your financial health.",
    },
  ];

  return (
    <div className="flex flex-col items-center bg-background text-foreground">
      {/* Use our new Hero Section component */}
      <HeroSection />

      {/* Stats Section */}
      <section className="w-full py-16 bg-secondary/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center justify-center p-6 animate-fade-in-up" style={{animationDelay: `${index * 100}ms`}}>
                <span className="text-3xl md:text-5xl font-bold text-primary mb-2 animate-glow">{stat.value}</span>
                <span className="text-sm md:text-base text-muted-foreground text-center">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Showcase Section */}
      <section id="features" className="w-full py-20 md:py-28 relative">
        <div className="absolute inset-0 bg-gradient-hero opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Powerful Credit Analysis</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              An intelligent platform that gives you the insights you need to make informed financial decisions.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-2xl border border-border/50">
              <div className="relative aspect-[9/16] max-w-[300px] mx-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/10 backdrop-blur-sm rounded-2xl border border-white/10"></div>
                <div className="absolute inset-2 bg-background/90 rounded-xl overflow-hidden">
                  <img src="https://placehold.co/600x1200/111/333?text=App+Interface" alt="App Interface" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col items-center text-center p-6 bg-secondary/20 backdrop-blur-sm border border-border/30 rounded-xl animate-fade-in-up hover:border-primary/30 hover:bg-secondary/30 transition-all"
                    style={{animationDelay: `${index * 100}ms`}}
                  >
                    <div className="bg-primary/10 p-4 rounded-full mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>

              <Link to="/apply" className="flex justify-center mt-8">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 rounded-full drop-shadow-primary-lg">
                  Analyze Your Credit Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Solutions Section */}
      <section className="w-full py-20 md:py-28 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Smart, Scalable & Secure Solutions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our advanced platform adapts to your financial journey, providing personalized insights at every step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card/70 backdrop-blur-sm border-border/50 overflow-hidden group hover:border-primary/50 transition-all duration-300">
              <div className="h-40 bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center">
                <Users className="h-16 w-16 text-primary/80 group-hover:text-primary transition-colors" />
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">Personalized Scoring</h3>
                <p className="text-muted-foreground">
                  Get a credit score that reflects your unique financial situation and history, with customized recommendations.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/70 backdrop-blur-sm border-border/50 overflow-hidden group hover:border-primary/50 transition-all duration-300">
              <div className="h-40 bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center">
                <BarChart2 className="h-16 w-16 text-primary/80 group-hover:text-primary transition-colors" />
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">Advanced Analytics</h3>
                <p className="text-muted-foreground">
                  Leverage powerful data analysis to understand trends and patterns in your financial behavior.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/70 backdrop-blur-sm border-border/50 overflow-hidden group hover:border-primary/50 transition-all duration-300">
              <div className="h-40 bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center">
                <ShieldCheck className="h-16 w-16 text-primary/80 group-hover:text-primary transition-colors" />
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">Enterprise Security</h3>
                <p className="text-muted-foreground">
                  Your data is protected by multi-layered security protocols and encryption standards.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Use our new Testimonials Section component */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <section className="w-full py-20 md:py-28 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our credit scoring platform.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
                  <AccordionTrigger className="text-lg font-medium py-6 hover:text-primary">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 pt-2">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-30"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Take Control of Your Credit?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Join thousands of users who have already improved their financial future with our platform.
          </p>
          <Link to="/apply">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-10 py-7 rounded-full drop-shadow-primary-lg transition-transform hover:scale-105">
              Get Started Now
            </Button>
          </Link>
          <p className="mt-6 text-sm text-muted-foreground">No credit card required. Free forever.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
