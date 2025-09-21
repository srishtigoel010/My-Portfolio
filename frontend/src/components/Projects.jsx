import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { portfolioData } from '../data/mock';
import { ExternalLink, Folder, Filter } from 'lucide-react';

const Projects = () => {
  const { projects } = portfolioData;
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(projects.map(project => project.category))];
  
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-sage mx-auto mb-6"></div>
            <p className="text-lg text-warm-gray max-w-3xl mx-auto">
              Showcasing innovative marketing solutions and creative strategies that deliver measurable results
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Filter size={20} className="text-sage mt-2" />
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-sage text-white shadow-lg'
                    : 'bg-white text-charcoal hover:bg-sage/10 border border-sage/20'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <Card 
                key={project.id}
                className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white border-0 overflow-hidden"
              >
                {/* Project Image */}
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-sage/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4">
                    <Badge className={`${
                      project.category === 'Strategy' ? 'bg-sage/90 text-white' :
                      project.category === 'Campaign' ? 'bg-muted-brown/90 text-white' :
                      project.category === 'Design' ? 'bg-warm-gray/90 text-white' :
                      'bg-charcoal/90 text-white'
                    }`}>
                      {project.category}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-8">
                  {/* Project Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <Folder className="text-sage mt-1 flex-shrink-0" size={20} />
                    <h3 className="text-xl font-bold text-charcoal group-hover:text-sage transition-colors duration-300">
                      {project.title}
                    </h3>
                  </div>

                  {/* Project Description */}
                  <p className="text-warm-gray leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge 
                        key={techIndex}
                        className="bg-sage/10 text-sage border-sage/20 text-xs px-3 py-1"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Project Actions */}
                  <div className="flex gap-3">
                    <Button 
                      className="bg-sage hover:bg-sage/90 text-white flex-1 group/btn"
                      size="sm"
                    >
                      <span>View Details</span>
                      <ExternalLink size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-200" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-charcoal mb-4">
                Interested in Working Together?
              </h3>
              <p className="text-warm-gray mb-6 max-w-2xl mx-auto">
                These projects represent just a glimpse of what's possible. Let's discuss how AI-powered marketing strategies can transform your brand's digital presence.
              </p>
              <Button 
                onClick={() => {
                  const element = document.getElementById('contact');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-sage hover:bg-sage/90 text-white px-8 py-3"
              >
                Let's Connect
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;