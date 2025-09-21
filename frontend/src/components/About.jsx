import React from 'react';
import { portfolioData } from '../data/mock';

const About = () => {
  const { about, education, certifications } = portfolioData;

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">
              {about.title}
            </h2>
            <div className="w-24 h-1 bg-sage mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <img 
                  src={about.image}
                  alt="Srishti Goel"
                  className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-sage/20 rounded-2xl -z-10"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-muted-brown/20 rounded-2xl -z-10"></div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2 space-y-8">
              <div>
                <p className="text-lg text-warm-gray leading-relaxed mb-6 text-justify">
                  {about.content}
                </p>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-2xl font-semibold text-charcoal mb-4">Education</h3>
                <div className="space-y-3">
                  {education.map((edu, index) => (
                    <div key={index} className="border-l-4 border-sage pl-6">
                      <h4 className="font-semibold text-charcoal">{edu.degree}</h4>
                      <p className="text-warm-gray">{edu.institution}</p>
                      <p className="text-sm text-warm-gray">{edu.period} {edu.score && `| Score: ${edu.score}`}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h3 className="text-2xl font-semibold text-charcoal mb-4">Certifications</h3>
                <div className="space-y-3">
                  {certifications.map((cert, index) => (
                    <div key={index} className="border-l-4 border-muted-brown pl-6">
                      <h4 className="font-semibold text-charcoal">{cert.name}</h4>
                      <p className="text-warm-gray">{cert.issuer}</p>
                      <p className="text-sm text-warm-gray">{cert.period}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;