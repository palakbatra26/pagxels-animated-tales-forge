
import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Write Your Prompt',
      description: 'Describe your scene, characters, and action in natural language.',
      icon: '✏️'
    },
    {
      number: '02',
      title: 'AI Processing',
      description: 'Our advanced AI interprets your text and plans the 3D scene.',
      icon: '🧠'
    },
    {
      number: '03',
      title: 'Scene Generation',
      description: 'The AI creates 3D models, textures, and environments.',
      icon: '🏗️'
    },
    {
      number: '04',
      title: 'Animation Magic',
      description: 'Characters and elements are animated based on your narrative.',
      icon: '✨'
    }
  ];
  
  return (
    <section id="how-it-works" className="py-16 md:py-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our advanced AI technology makes the process simple and magical
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative">
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-pagxels-purple to-pagxels-blue rounded-full flex items-center justify-center text-white font-bold">
                {index + 1}
              </div>
              <div className="mb-6 text-4xl">{step.icon}</div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
