import React, { useEffect, useState } from 'react';
import { ArrowDown, Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { portfolioData } from '../data/mock';

const Hero = () => {
  const { personal } = portfolioData;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-cream via-cream/80 to-sage/5">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large Decorative Circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-sage/5 animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-muted-brown/5 animate-pulse delay-1000"></div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-1/4 left-1/4 w-6 h-6 rotate-45 bg-sage/20 animate-bounce delay-300"></div>
        <div className="absolute top-3/4 right-1/4 w-4 h-4 rounded-full bg-muted-brown/30 animate-bounce delay-700"></div>
        <div className="absolute top-1/2 right-1/6 w-8 h-1 bg-warm-gray/30 animate-pulse delay-500"></div>
        
        {/* Interactive Mouse Following Element */}
        <div 
          className="absolute w-4 h-4 rounded-full bg-sage/10 pointer-events-none transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x * 0.05,
            top: mousePosition.y * 0.05,
            transform: 'translate(-50%, -50%)',
          }}
        ></div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cream/20 to-transparent"></div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Content with Enhanced Design */}
          <div className="space-y-8 mb-12">
            {/* Name with Decorative Elements */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-16 h-16 border-2 border-sage/20 rounded-full animate-spin-slow"></div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 border border-muted-brown/30 rounded-full animate-pulse"></div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-charcoal mb-6 relative">
                <span className="relative">
                  {personal.name}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-sage/60 via-sage to-sage/60 rounded-full"></div>
                </span>
              </h1>
            </div>
            
            {/* Enhanced Tagline Section */}
            <div className="space-y-4 relative">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-sage animate-pulse" />
                <div className="w-8 h-px bg-sage/50"></div>
                <Sparkles className="w-4 h-4 text-muted-brown animate-pulse delay-300" />
                <div className="w-8 h-px bg-sage/50"></div>
                <Sparkles className="w-5 h-5 text-sage animate-pulse delay-600" />
              </div>
              
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-sage/10">
                <h2 className="text-2xl md:text-4xl font-semibold text-sage mb-4">
                  {personal.tagline}
                </h2>
                <p className="text-lg md:text-xl text-warm-gray max-w-3xl mx-auto leading-relaxed">
                  {personal.description}
                </p>
              </div>
            </div>
          </div>



          {/* Enhanced CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              onClick={() => scrollToSection('projects')}
              className="bg-gradient-to-r from-sage to-sage/90 hover:from-sage/90 hover:to-sage text-white px-8 py-4 text-lg font-medium transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 rounded-xl"
            >
              <span className="flex items-center gap-2">
                View My Work
                <div className="w-2 h-2 bg-white/70 rounded-full animate-ping"></div>
              </span>
            </Button>
            <Button 
              onClick={() => scrollToSection('contact')}
              variant="outline"
              className="border-2 border-sage text-sage hover:bg-sage hover:text-white px-8 py-4 text-lg font-medium transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-xl bg-white/70 backdrop-blur-sm"
            >
              Get In Touch
            </Button>
          </div>

          {/* Enhanced Scroll Indicator */}
          <div className="relative">
            <div className="animate-bounce">
              <button 
                onClick={() => scrollToSection('about')}
                className="group flex flex-col items-center gap-2 text-sage hover:text-sage/80 transition-all duration-300"
              >
                <div className="text-sm font-medium opacity-70 group-hover:opacity-100">Scroll to explore</div>
                <div className="p-3 bg-white/60 rounded-full shadow-lg border border-sage/20 group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300">
                  <ArrowDown size={24} className="animate-bounce" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional CSS for custom animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;