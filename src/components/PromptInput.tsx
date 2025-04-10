
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const PromptInput = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const examplePrompts = [
    "A magical forest with glowing mushrooms and floating lanterns",
    "A futuristic city with flying cars and holographic billboards",
    "An underwater civilization with merfolk and coral architecture"
  ];
  
  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate animation generation
    setTimeout(() => {
      setIsGenerating(false);
      toast.success("Your animation has been generated!");
    }, 3000);
  };
  
  const handleUseExample = (example: string) => {
    setPrompt(example);
  };
  
  return (
    <section className="py-16 px-6 md:px-10 bg-gray-50 dark:bg-gray-900 rounded-3xl mx-6 md:mx-10 my-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Create Your 3D Animation</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Describe what you want to see in your animation and our AI will bring it to life in stunning 3D.
          </p>
        </div>
        
        <div className="mb-8">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your animation scene... (e.g., 'A dragon soaring through mountains at sunset')"
            className="min-h-32 text-lg p-4 resize-none"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button 
            onClick={handleGenerate}
            className="bg-gradient-to-r from-pagxels-purple to-pagxels-blue text-white px-8 py-6 h-auto text-lg flex-1"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <span className="mr-2">Generating</span>
                <span className="flex space-x-1">
                  <span className="animated-dot">.</span>
                  <span className="animated-dot" style={{ animationDelay: '0.2s' }}>.</span>
                  <span className="animated-dot" style={{ animationDelay: '0.4s' }}>.</span>
                </span>
              </>
            ) : 'Generate Animation'}
          </Button>
          <Button variant="outline" className="px-8 py-6 h-auto text-lg flex-1">
            Reset
          </Button>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <p className="text-sm font-medium mb-3 text-gray-500">Try these examples:</p>
          <div className="flex flex-wrap gap-2">
            {examplePrompts.map((example, index) => (
              <button
                key={index}
                className="text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-full hover:bg-pagxels-purple/10 hover:text-pagxels-purple transition-colors"
                onClick={() => handleUseExample(example)}
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromptInput;
