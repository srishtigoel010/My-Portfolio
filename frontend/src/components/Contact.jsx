import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { portfolioData } from '../data/mock';
import { Mail, Phone, MapPin, Send, Linkedin, ExternalLink } from 'lucide-react';

const Contact = () => {
  const { personal } = portfolioData;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock form submission
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: personal.email,
      href: `mailto:${personal.email}`,
      description: "Send me an email"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      value: personal.phone,
      href: `tel:${personal.phone}`,
      description: "Give me a call"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      value: personal.location,
      href: "#",
      description: "Based in India"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">
              Let's Work Together
            </h2>
            <div className="w-24 h-1 bg-sage mx-auto mb-6"></div>
            <p className="text-lg text-warm-gray max-w-3xl mx-auto">
              Ready to transform your marketing strategy with AI-powered solutions? 
              Let's discuss how we can achieve your business goals together.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-charcoal mb-6">Get In Touch</h3>
                <p className="text-warm-gray mb-8 leading-relaxed">
                  I'm always excited to discuss new opportunities, collaborate on innovative projects, 
                  or simply chat about the latest trends in digital marketing and AI. 
                  Feel free to reach out through any of the channels below.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <Card key={index} className="border-sage/20 hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="text-sage bg-sage/10 p-3 rounded-xl">
                          {method.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-charcoal">{method.title}</h4>
                          <p className="text-sm text-warm-gray mb-1">{method.description}</p>
                          {method.href !== "#" ? (
                            <a 
                              href={method.href}
                              className="text-sage hover:text-sage/80 transition-colors duration-200 flex items-center gap-1"
                            >
                              {method.value}
                              <ExternalLink size={14} />
                            </a>
                          ) : (
                            <span className="text-sage">{method.value}</span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-semibold text-charcoal mb-4">Connect on Social</h4>
                <div className="flex gap-4">
                  <Button 
                    className="bg-sage hover:bg-sage/90 text-white p-3"
                    size="sm"
                  >
                    <Linkedin size={20} />
                  </Button>
                  <Button 
                    className="bg-muted-brown hover:bg-muted-brown/90 text-white p-3"
                    size="sm"
                  >
                    <Mail size={20} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="border-sage/20 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-charcoal mb-6">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Your Name
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                        required
                        className="border-sage/30 focus:border-sage focus:ring-sage/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                        className="border-sage/30 focus:border-sage focus:ring-sage/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Subject
                    </label>
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What's this about?"
                      required
                      className="border-sage/30 focus:border-sage focus:ring-sage/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Message
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about your project or how I can help..."
                      rows={5}
                      required
                      className="border-sage/30 focus:border-sage focus:ring-sage/20 resize-none"
                    />
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-sage hover:bg-sage/90 text-white py-3 text-lg font-medium group"
                  >
                    <Send size={20} className="mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;