
import React from 'react';

const Features = () => {
  const features = [
    {
      title: 'Natural Language Processing',
      description: 'Our AI understands complex descriptions and narrative elements.',
      icon: '🔤'
    },
    {
      title: 'High-Quality 3D Rendering',
      description: 'Beautiful, detailed 3D models with realistic textures and lighting.',
      icon: '🎨'
    },
    {
      title: 'Dynamic Animation',
      description: 'Fluid movement and realistic physics bring your story to life.',
      icon: '🎬'
    },
    {
      title: 'Customizable Styles',
      description: 'Choose from various artistic styles from photorealistic to cartoon.',
      icon: '🖌️'
    },
    {
      title: 'Quick Generation',
      description: 'Get results in minutes, not hours or days.',
      icon: '⚡'
    },
    {
      title: 'Export Options',
      description: 'Download in multiple formats for different platforms.',
      icon: '💾'
    }
  ];
  
  return (
    <section id="features" className="py-16 md:py-24 px-6 md:px-10 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to bring your stories to life in 3D
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
              <div className="mb-4 text-4xl">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
