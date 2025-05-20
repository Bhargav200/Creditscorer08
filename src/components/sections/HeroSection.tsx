
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="w-full min-h-[90vh] flex items-center justify-center relative overflow-hidden bg-background">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-background overflow-hidden">
        {/* Large gradient sphere in top right */}
        <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-primary/20 via-transparent to-transparent blur-xl animate-pulse-slow"></div>
        
        {/* Second gradient sphere in bottom left */}
        <div className="absolute bottom-[-30%] left-[-20%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-primary/5 via-primary/10 to-transparent blur-xl animate-pulse-slower"></div>
        
        {/* Blue light streak */}
        <div className="absolute top-[10%] left-[20%] w-[80vw] h-[40vh] bg-primary/5 blur-3xl transform rotate-[-45deg] animate-pulse-slow"></div>
        
        {/* Small orbs floating */}
        <div className="absolute top-[20%] right-[25%] w-8 h-8 rounded-full bg-primary/30 blur-sm animate-float"></div>
        <div className="absolute top-[30%] left-[20%] w-4 h-4 rounded-full bg-primary/20 blur-sm animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-[35%] right-[15%] w-6 h-6 rounded-full bg-primary/20 blur-sm animate-float" style={{animationDelay: '2s'}}></div>
        
        {/* Rotating ring */}
        <div className="absolute top-[20%] right-[10%] w-40 h-40 border border-primary/20 rounded-full animate-rotate-slow"></div>
        <div className="absolute bottom-[20%] left-[10%] w-60 h-60 border border-primary/10 rounded-full animate-rotate-reverse"></div>
      </div>
      
      {/* Glass card mockup floating on right side (inspired by image) */}
      <div className="absolute top-[15%] right-[5%] md:right-[10%] w-[280px] h-[360px] md:w-[320px] md:h-[400px] glass-effect rounded-xl overflow-hidden z-10 shadow-xl transform rotate-2 hidden md:block animate-float" style={{animationDuration: '8s'}}>
        <div className="w-full h-full p-4 relative">
          <div className="absolute top-3 left-3 flex space-x-1">
            <div className="w-2 h-2 bg-primary/60 rounded-full"></div>
            <div className="w-2 h-2 bg-white/60 rounded-full"></div>
            <div className="w-2 h-2 bg-white/60 rounded-full"></div>
          </div>
          
          <div className="mt-10 bg-background/30 rounded-lg p-3 mb-3">
            <div className="h-2 w-2/3 bg-primary/30 rounded-full mb-2"></div>
            <div className="h-2 w-5/6 bg-white/20 rounded-full"></div>
          </div>
          
          <div className="bg-background/30 rounded-lg p-3 mb-3">
            <div className="h-2 w-1/2 bg-primary/30 rounded-full mb-2"></div>
            <div className="h-2 w-full bg-white/20 rounded-full mb-2"></div>
            <div className="h-2 w-3/4 bg-white/20 rounded-full"></div>
          </div>
          
          <div className="bg-background/30 rounded-lg p-3 animate-pulse-slow">
            <div className="h-2 w-2/3 bg-primary/40 rounded-full mb-2"></div>
            <div className="h-2 w-5/6 bg-white/20 rounded-full"></div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 flex flex-col items-center relative z-10">
        <div className="max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight mb-6">
            Transform Your <span className="relative inline-block">
              <span className="relative z-10 text-primary text-glow animate-glow">Financial Future</span>
              <span className="absolute inset-0 bg-primary/5 blur-xl rounded-full transform scale-150 -z-10"></span>
            </span>
          </h1>
          <p className="max-w-2xl mt-4 text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed mx-auto">
            Advanced credit scoring powered by AI. Get accurate insights to achieve your financial goals with personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            <Link to="/apply">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-10 py-7 rounded-full drop-shadow-primary-lg transition-transform hover:scale-105">
                Get Your Free Credit Score
              </Button>
            </Link>
            <Link to="#features">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 text-lg px-10 py-7 rounded-full transition-all">
                Explore Features
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">No impact on your credit score. Ever.</p>
        </div>
        
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex justify-center w-full">
          <a href="#features" className="animate-bounce p-2 bg-primary/10 rounded-full">
            <ArrowDown className="h-6 w-6 text-primary" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
