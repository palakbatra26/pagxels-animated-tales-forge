
import React from 'react';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="py-16 md:py-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Transform Text into 
              <span className="gradient-text block mt-2">3D Story Animations</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
              Turn your ideas, stories, and concepts into stunning 3D animations with a simple text prompt. No design skills required.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button className="bg-gradient-to-r from-pagxels-purple to-pagxels-blue text-white px-8 py-6 h-auto text-lg">
                Create Your Animation
              </Button>
              <Button variant="outline" className="px-8 py-6 h-auto text-lg">
                View Examples
              </Button>
            </div>
          </div>
          
          <div className="flex-1 relative">
            <div className="relative w-full h-80 md:h-96 lg:h-[500px] bg-gradient-to-br from-pagxels-purple/10 via-pagxels-blue/10 to-pagxels-pink/10 rounded-xl overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-pagxels-purple to-pagxels-blue rounded-full opacity-20 animate-pulse-slow"></div>
                <div className="absolute w-48 h-48 md:w-60 md:h-60 bg-gradient-to-br from-pagxels-blue to-pagxels-pink rounded-full opacity-20 animate-spin-slow"></div>
              </div>
              <div className="relative z-10 text-center px-6">
                <div className="mb-4 flex justify-center">
                  <div className="h-16 w-16 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center shadow-lg">
                    <div className="h-12 w-12 bg-gradient-to-br from-pagxels-purple to-pagxels-blue rounded-full"></div>
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2">Animation Preview</h3>
                <p className="text-gray-600 dark:text-gray-300">Your 3D animations will appear here</p>
              </div>
            </div>
            
            <div className="absolute -bottom-6 right-6 md:right-10 w-20 h-20 md:w-28 md:h-28 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-3 animate-float">
              <div className="w-full h-full bg-gradient-to-br from-pagxels-purple/20 to-pagxels-blue/20 rounded-md flex items-center justify-center">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-pagxels-purple to-pagxels-blue rounded-md"></div>
              </div>
            </div>
            
            <div className="absolute -top-6 -left-3 md:-left-6 w-16 h-16 md:w-24 md:h-24 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-3 rotate-12 animate-float" style={{ animationDelay: '1s' }}>
              <div className="w-full h-full bg-gradient-to-br from-pagxels-pink/20 to-pagxels-purple/20 rounded-md flex items-center justify-center">
                <div className="w-6 h-6 md:w-10 md:h-10 bg-gradient-to-br from-pagxels-pink to-pagxels-purple rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
