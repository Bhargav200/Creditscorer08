
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, BarChart2, Users, ShieldCheck, Zap, TrendingUp, MessageSquare } from "lucide-react"; // More icons

const HomePage = () => {
  const features = [
    {
      icon: <Zap className="h-10 w-10 text-primary mb-4" />,
      title: "Real-Time Scoring",
      description: "Get your credit assessment instantly with our cutting-edge AI algorithms.",
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-primary mb-4" />,
      title: "Bank-Grade Security",
      description: "Your data is protected with multi-layered security protocols and encryption.",
    },
    {
      icon: <BarChart2 className="h-10 w-10 text-primary mb-4" />,
      title: "Comprehensive Insights",
      description: "Understand the factors influencing your score with detailed reports.",
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-primary mb-4" />,
      title: "Improve Your Score",
      description: "Actionable advice to help you improve your financial standing over time.",
    }
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
    <div className="flex flex-col items-center text-center bg-background text-foreground">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 lg:py-40 bg-gradient-hero">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
            Unlock Your <span className="text-primary text-glow">Financial</span> Future
          </h1>
          <p className="max-w-2xl mt-4 text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
            Experience the next generation of credit scoring. Fast, accurate, and secure insights powered by advanced AI to help you achieve your financial goals.
          </p>
          <Link to="/apply">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-10 py-6 rounded-full drop-shadow-primary-lg transition-transform hover:scale-105">
              Get Your Free Credit Score
            </Button>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground">No impact on your credit score. Ever.</p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-16 md:py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-4">Why Choose CreditScorer?</h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            We provide a modern, transparent, and secure way to understand and manage your credit.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card/70 backdrop-blur-sm border-border/50 hover:border-primary/70 transition-all duration-300 transform hover:scale-105 hover:shadow-xl drop-shadow-md">
                <CardHeader className="items-center">
                  {feature.icon}
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works (Placeholder) - Could be a 3-step visual */}
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-12">Simple Steps to Your Score</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="flex flex-col items-center p-6 bg-secondary/30 rounded-lg animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <div className="bg-primary/10 p-4 rounded-full mb-4"><Users className="h-8 w-8 text-primary"/></div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">1. Apply Online</h3>
              <p className="text-muted-foreground text-sm">Fill out our secure and straightforward application form in minutes.</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-secondary/30 rounded-lg animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <div className="bg-primary/10 p-4 rounded-full mb-4"><Zap className="h-8 w-8 text-primary"/></div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">2. Instant Analysis</h3>
              <p className="text-muted-foreground text-sm">Our AI engine processes your information securely and in real-time.</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-secondary/30 rounded-lg animate-fade-in-up" style={{animationDelay: '0.5s'}}>
              <div className="bg-primary/10 p-4 rounded-full mb-4"><CheckCircle className="h-8 w-8 text-primary"/></div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">3. Get Your Score</h3>
              <p className="text-muted-foreground text-sm">Receive your detailed credit score and insights instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section (Placeholder) */}
      <section className="w-full py-16 md:py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-12">Trusted by Thousands</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3].map(i => (
              <Card key={i} className="bg-card/70 backdrop-blur-sm border-border/50 p-6 text-left">
                <div className="flex items-center mb-4">
                  <img src={`https://i.pravatar.cc/48?u=test${i}`} alt="User" className="w-12 h-12 rounded-full mr-4"/>
                  <div>
                    <p className="font-semibold text-foreground">User {i}</p>
                    <p className="text-xs text-primary">Verified Customer</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm italic">"CreditScorer helped me understand my finances better and I was able to secure a loan for my new home. Highly recommended!"</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-12">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
                <AccordionTrigger className="text-lg hover:text-primary py-5 text-left">{item.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base text-left leading-relaxed pb-5">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 md:py-32 bg-gradient-to-t from-primary/20 to-transparent">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Ready to Take Control?
          </h2>
          <p className="max-w-xl mt-4 text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
            Join thousands of satisfied users who have transformed their financial understanding with CreditScorer.
          </p>
          <Link to="/apply">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-10 py-6 rounded-full drop-shadow-primary-lg transition-transform hover:scale-105">
              Check Your Score Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
