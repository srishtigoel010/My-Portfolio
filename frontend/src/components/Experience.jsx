import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { portfolioData } from '../data/mock';
import { Calendar, MapPin, ChevronRight } from 'lucide-react';

const Experience = () => {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">
              Professional Experience
            </h2>
            <div className="w-24 h-1 bg-sage mx-auto mb-6"></div>
            <p className="text-lg text-warm-gray max-w-3xl mx-auto">
              A journey of growth, leadership, and measurable impact across diverse marketing roles
            </p>
          </div>

          {/* Experience Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-sage/30 hidden md:block"></div>

            <div className="space-y-8">
              {experience.map((job, index) => (
                <div key={job.id} className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute left-6 w-4 h-4 bg-sage rounded-full border-4 border-white shadow-lg hidden md:block"></div>
                  
                  {/* Job Card */}
                  <div className="md:ml-16">
                    <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-sage/20">
                      <CardContent className="p-8">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                          <div className="mb-4 lg:mb-0">
                            <h3 className="text-2xl font-bold text-charcoal mb-2">
                              {job.position}
                            </h3>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                              <div className="flex items-center gap-2 text-sage font-semibold text-lg">
                                <MapPin size={16} />
                                {job.company}
                              </div>
                              <div className="flex items-center gap-2 text-warm-gray">
                                <Calendar size={16} />
                                {job.period}
                              </div>
                            </div>
                          </div>
                          
                          <Badge className="bg-sage/10 text-sage border-sage/20 px-4 py-2 text-sm font-medium self-start">
                            #{index + 1}
                          </Badge>
                        </div>

                        {/* Responsibilities */}
                        <div>
                          <h4 className="text-lg font-semibold text-charcoal mb-4">Key Achievements</h4>
                          <ul className="space-y-3">
                            {job.responsibilities.map((responsibility, respIndex) => (
                              <li 
                                key={respIndex}
                                className="flex items-start gap-3 text-warm-gray leading-relaxed"
                              >
                                <ChevronRight size={16} className="text-sage mt-1 flex-shrink-0" />
                                <span>{responsibility}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-20 bg-gradient-to-r from-sage/5 to-muted-brown/5 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-sage mb-2">250+</div>
                <div className="text-charcoal font-medium">YouTube Subscribers Growth</div>
                <div className="text-sm text-warm-gray">In just 3 months at The Study Anchor</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-sage mb-2">2x</div>
                <div className="text-charcoal font-medium">Video Views Increase</div>
                <div className="text-sm text-warm-gray">Through strategic content planning</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-sage mb-2">4+</div>
                <div className="text-charcoal font-medium">Companies Impacted</div>
                <div className="text-sm text-warm-gray">Across different industries</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;