import React from 'react';
import { ArrowDown, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { portfolioData } from '../data/mock';

const Hero = () => {
  const { personal } = portfolioData;

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream via-cream/50 to-sage/10">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Content */}
          <div className="space-y-6 mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-charcoal mb-4">
              {personal.name}
            </h1>
            
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-semibold text-sage">
                {personal.tagline}
              </h2>
              <p className="text-lg md:text-xl text-warm-gray max-w-3xl mx-auto leading-relaxed">
                {personal.description}
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm">
            <div className="flex items-center gap-2 text-warm-gray">
              <MapPin size={16} />
              <span>{personal.location}</span>
            </div>
            <div className="flex items-center gap-2 text-warm-gray">
              <Mail size={16} />
              <span>{personal.email}</span>
            </div>
            <div className="flex items-center gap-2 text-warm-gray">
              <Phone size={16} />
              <span>{personal.phone}</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              onClick={() => scrollToSection('projects')}
              className="bg-sage hover:bg-sage/90 text-white px-8 py-3 text-lg font-medium transition-all duration-300 hover:shadow-lg"
            >
              View My Work
            </Button>
            <Button 
              onClick={() => scrollToSection('contact')}
              variant="outline"
              className="border-sage text-sage hover:bg-sage hover:text-white px-8 py-3 text-lg font-medium transition-all duration-300"
            >
              Get In Touch
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-sage hover:text-sage/80 transition-colors"
            >
              <ArrowDown size={32} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;