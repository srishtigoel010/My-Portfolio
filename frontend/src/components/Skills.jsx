import React from 'react';
import { Badge } from './ui/badge';
import { portfolioData } from '../data/mock';
import { Code, Users, Lightbulb, TrendingUp } from 'lucide-react';

const Skills = () => {
  const { skills } = portfolioData;

  const skillCategories = [
    {
      title: "Technical Skills",
      icon: <Code className="w-8 h-8" />,
      skills: skills.technical,
      color: "bg-sage/10 text-sage border-sage/20"
    },
    {
      title: "Transferable Skills", 
      icon: <Users className="w-8 h-8" />,
      skills: skills.transferable,
      color: "bg-muted-brown/10 text-muted-brown border-muted-brown/20"
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">
              Skills & Expertise
            </h2>
            <div className="w-24 h-1 bg-sage mx-auto mb-6"></div>
            <p className="text-lg text-warm-gray max-w-3xl mx-auto">
              A comprehensive toolkit combining technical proficiency with strategic thinking and creative problem-solving
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <div 
                key={categoryIndex}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-xl ${category.color}`}>
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-charcoal">
                    {category.title}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge 
                      key={skillIndex}
                      className={`${category.color} px-4 py-2 text-sm font-medium hover:scale-105 transition-transform duration-200 cursor-default`}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Key Strengths */}
          <div className="mt-16">
            <h3 className="text-3xl font-semibold text-charcoal text-center mb-8">
              Key Strengths
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Lightbulb className="w-8 h-8" />,
                  title: "Creative Problem Solving",
                  description: "Innovative approaches to marketing challenges"
                },
                {
                  icon: <TrendingUp className="w-8 h-8" />,
                  title: "Performance Optimization",
                  description: "Data-driven strategies for measurable growth"
                },
                {
                  icon: <Users className="w-8 h-8" />,
                  title: "Team Leadership",
                  description: "Cross-functional collaboration and mentoring"
                },
                {
                  icon: <Code className="w-8 h-8" />,
                  title: "Tech Adaptability",
                  description: "Quick mastery of emerging marketing tools"
                }
              ].map((strength, index) => (
                <div 
                  key={index}
                  className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="text-sage mb-4 flex justify-center">
                    {strength.icon}
                  </div>
                  <h4 className="font-semibold text-charcoal mb-2">
                    {strength.title}
                  </h4>
                  <p className="text-sm text-warm-gray">
                    {strength.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;