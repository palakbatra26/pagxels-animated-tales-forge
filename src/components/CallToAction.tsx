
import React from 'react';
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="py-16 md:py-24 px-6 md:px-10 bg-gradient-to-r from-pagxels-purple via-pagxels-blue to-pagxels-pink text-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          Ready to Bring Your Stories to Life?
        </h2>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-white/90">
          Join thousands of creators who are already transforming their ideas into stunning 3D animations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-white text-pagxels-purple hover:bg-gray-100 px-8 py-6 h-auto text-lg">
            Get Started for Free
          </Button>
          <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-6 h-auto text-lg">
            Watch Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
