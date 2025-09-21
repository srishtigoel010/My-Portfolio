import React from 'react';
import { portfolioData } from '../data/mock';
import { Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  const { personal } = portfolioData;
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <footer className="bg-charcoal text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-sage">{personal.name}</h3>
              <p className="text-gray-300 leading-relaxed">
                {personal.tagline} focused on delivering AI-powered marketing solutions 
                that drive measurable growth and innovation.
              </p>
              <div className="pt-4">
                <p className="text-sm text-gray-400">
                  Available for freelance opportunities and consulting projects.
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Quick Links</h4>
              <nav className="space-y-2">
                {quickLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="block text-gray-300 hover:text-sage transition-colors duration-200 text-left"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Get In Touch</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail size={16} className="text-sage" />
                  <a 
                    href={`mailto:${personal.email}`}
                    className="hover:text-sage transition-colors duration-200"
                  >
                    {personal.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone size={16} className="text-sage" />
                  <a 
                    href={`tel:${personal.phone}`}
                    className="hover:text-sage transition-colors duration-200"
                  >
                    {personal.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin size={16} className="text-sage" />
                  <span>{personal.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-400 text-sm">
                © {currentYear} {personal.name}. All rights reserved.
              </div>
              
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span>Made with</span>
                <Heart size={16} className="text-sage fill-current" />
                <span>and lots of coffee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;