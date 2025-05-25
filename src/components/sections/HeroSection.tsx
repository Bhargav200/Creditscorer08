
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowDown, DollarSign, CreditCard, TrendingUp, Coins } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="w-full min-h-[90vh] flex items-center justify-center relative overflow-hidden bg-background">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 bg-background overflow-hidden">
        {/* Large gradient sphere in top right */}
        <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-primary/20 via-transparent to-transparent blur-xl animate-pulse-slow"></div>
        
        {/* Second gradient sphere in bottom left */}
        <div className="absolute bottom-[-30%] left-[-20%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-green-500/10 via-primary/10 to-transparent blur-xl animate-pulse-slower"></div>
        
        {/* Financial growth light streak */}
        <div className="absolute top-[10%] left-[20%] w-[80vw] h-[40vh] bg-gradient-to-r from-green-500/5 via-primary/5 to-transparent blur-3xl transform rotate-[-45deg] animate-pulse-slow"></div>
        
        {/* Animated Dollar Signs - Multiple floating across screen */}
        <div className="absolute top-[15%] right-[30%] text-green-500/30 animate-float">
          <DollarSign className="w-8 h-8" />
        </div>
        <div className="absolute top-[25%] left-[15%] text-primary/30 animate-float" style={{animationDelay: '1s', animationDuration: '8s'}}>
          <DollarSign className="w-6 h-6" />
        </div>
        <div className="absolute bottom-[40%] right-[20%] text-green-400/25 animate-float" style={{animationDelay: '2s', animationDuration: '10s'}}>
          <DollarSign className="w-10 h-10" />
        </div>
        <div className="absolute top-[35%] right-[5%] text-primary/20 animate-float" style={{animationDelay: '3s', animationDuration: '7s'}}>
          <DollarSign className="w-5 h-5" />
        </div>
        
        {/* Animated Financial Icons */}
        <div className="absolute top-[20%] left-[25%] text-green-500/25 animate-float" style={{animationDelay: '1.5s'}}>
          <Coins className="w-7 h-7" />
        </div>
        <div className="absolute bottom-[25%] left-[5%] text-primary/25 animate-float" style={{animationDelay: '2.5s'}}>
          <CreditCard className="w-6 h-6" />
        </div>
        <div className="absolute top-[45%] left-[10%] text-green-400/30 animate-float" style={{animationDelay: '4s'}}>
          <TrendingUp className="w-8 h-8" />
        </div>
        
        {/* Money Bills Animation - SVG-like rectangles representing money */}
        <div className="absolute top-[10%] left-[40%] w-16 h-8 bg-gradient-to-r from-green-500/20 to-green-400/20 border border-green-500/30 rounded-sm animate-money-fall" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-[5%] right-[40%] w-20 h-10 bg-gradient-to-r from-primary/20 to-green-500/20 border border-primary/30 rounded-sm animate-money-fall" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-[8%] left-[60%] w-14 h-7 bg-gradient-to-r from-green-400/25 to-primary/25 border border-green-400/35 rounded-sm animate-money-fall" style={{animationDelay: '4s'}}></div>
        
        {/* Floating geometric shapes representing financial growth */}
        <div className="absolute top-[30%] right-[25%] w-12 h-12 border-2 border-green-500/30 rounded-full animate-float-slow"></div>
        <div className="absolute bottom-[35%] left-[15%] w-8 h-8 bg-primary/20 rotate-45 animate-float" style={{animationDelay: '1s'}}></div>
        
        {/* Rotating financial rings */}
        <div className="absolute top-[20%] right-[10%] w-40 h-40 border border-green-500/20 rounded-full animate-rotate-slow"></div>
        <div className="absolute bottom-[20%] left-[10%] w-60 h-60 border border-primary/10 rounded-full animate-rotate-reverse"></div>
        
        {/* Particle effects - small dots representing financial data points */}
        <div className="absolute top-[25%] left-[50%] w-2 h-2 bg-green-500/40 rounded-full animate-pulse"></div>
        <div className="absolute top-[15%] left-[55%] w-1 h-1 bg-primary/50 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-[35%] left-[45%] w-3 h-3 bg-green-400/30 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      {/* Enhanced Financial Dashboard Glass Card */}
      <div className="absolute top-[15%] right-[5%] md:right-[10%] w-[280px] h-[360px] md:w-[320px] md:h-[400px] glass-effect rounded-xl overflow-hidden z-10 shadow-xl transform rotate-2 hidden md:block animate-float" style={{animationDuration: '8s'}}>
        <div className="w-full h-full p-4 relative">
          {/* Dashboard header with financial indicators */}
          <div className="absolute top-3 left-3 flex space-x-1">
            <div className="w-2 h-2 bg-green-500/60 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="w-2 h-2 bg-green-400/60 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
          
          {/* Credit Score Display */}
          <div className="mt-10 bg-background/30 rounded-lg p-3 mb-3 border border-green-500/20">
            <div className="flex items-center justify-between mb-2">
              <div className="h-2 w-1/3 bg-green-500/40 rounded-full"></div>
              <div className="text-green-400/70 text-xs font-bold">750</div>
            </div>
            <div className="h-1 w-full bg-white/20 rounded-full">
              <div className="h-1 w-3/4 bg-green-500/60 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Financial Chart Simulation */}
          <div className="bg-background/30 rounded-lg p-3 mb-3 border border-primary/20">
            <div className="h-2 w-1/2 bg-primary/30 rounded-full mb-2"></div>
            <div className="flex items-end space-x-1 h-8">
              <div className="w-2 bg-green-500/40 rounded-t animate-pulse" style={{height: '60%'}}></div>
              <div className="w-2 bg-primary/40 rounded-t animate-pulse" style={{height: '80%', animationDelay: '0.5s'}}></div>
              <div className="w-2 bg-green-400/40 rounded-t animate-pulse" style={{height: '40%', animationDelay: '1s'}}></div>
              <div className="w-2 bg-green-500/40 rounded-t animate-pulse" style={{height: '90%', animationDelay: '1.5s'}}></div>
              <div className="w-2 bg-primary/40 rounded-t animate-pulse" style={{height: '70%', animationDelay: '2s'}}></div>
            </div>
          </div>
          
          {/* Financial Growth Indicator */}
          <div className="bg-background/30 rounded-lg p-3 animate-pulse-slow border border-green-400/20">
            <div className="flex items-center justify-between">
              <div className="h-2 w-2/3 bg-green-500/40 rounded-full mb-2"></div>
              <TrendingUp className="w-4 h-4 text-green-400/60" />
            </div>
            <div className="h-2 w-5/6 bg-white/20 rounded-full"></div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 flex flex-col items-center relative z-10">
        <div className="max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight mb-6">
            Transform Your <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-green-400 via-primary to-green-500 bg-clip-text text-transparent animate-glow-financial">Financial Future</span>
              <span className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-primary/10 to-green-400/10 blur-xl rounded-full transform scale-150 -z-10 animate-pulse-slow"></span>
            </span>
          </h1>
          <p className="max-w-2xl mt-4 text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed mx-auto">
            Advanced credit scoring powered by AI. Get accurate insights to achieve your financial goals with personalized recommendations and <span className="text-green-400 font-semibold">real-time analysis</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            <Link to="/apply">
              <Button size="lg" className="bg-gradient-to-r from-green-500 to-primary text-white hover:from-green-600 hover:to-primary/90 text-lg px-10 py-7 rounded-full drop-shadow-primary-lg transition-all duration-300 hover:scale-105 group">
                <DollarSign className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Get Your Free Credit Score
              </Button>
            </Link>
            <Link to="#features">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 text-lg px-10 py-7 rounded-full transition-all border-2 hover:border-green-400 hover:text-green-400">
                Explore Features
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted-foreground flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            No impact on your credit score. Ever.
          </p>
        </div>
        
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex justify-center w-full">
          <a href="#features" className="animate-bounce p-2 bg-gradient-to-r from-green-500/20 to-primary/20 rounded-full border border-green-500/30">
            <ArrowDown className="h-6 w-6 text-green-400" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
