
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Examples = () => {
  const [activeTab, setActiveTab] = useState("stories");
  
  const exampleCategories = {
    stories: [
      {
        title: "The Enchanted Forest",
        prompt: "A magical forest where trees glow with blue light and fairy creatures float between branches.",
        color: "from-blue-500 to-green-500"
      },
      {
        title: "Futuristic Cityscape",
        prompt: "A cyberpunk city with neon lights, flying vehicles, and towering skyscrapers.",
        color: "from-purple-500 to-pink-500"
      },
      {
        title: "Ocean Adventure",
        prompt: "An underwater scene with colorful coral reefs, schools of fish, and a treasure chest.",
        color: "from-blue-400 to-teal-500"
      }
    ],
    characters: [
      {
        title: "Robot Guardian",
        prompt: "A friendly robot with glowing eyes and mechanical arms that protect a small village.",
        color: "from-gray-500 to-blue-500"
      },
      {
        title: "Forest Spirit",
        prompt: "A nature spirit made of leaves, flowers, and vines that heals the forest.",
        color: "from-green-400 to-yellow-300"
      },
      {
        title: "Dragon King",
        prompt: "A majestic dragon with shimmering scales and golden horns resting on a mountain peak.",
        color: "from-red-500 to-yellow-500"
      }
    ],
    landscapes: [
      {
        title: "Floating Islands",
        prompt: "Islands suspended in the sky with waterfalls flowing over the edges and bridges connecting them.",
        color: "from-blue-300 to-indigo-600"
      },
      {
        title: "Crystal Cavern",
        prompt: "A vast underground cavern filled with giant, glowing crystals of various colors.",
        color: "from-purple-400 to-indigo-400"
      },
      {
        title: "Desert Oasis",
        prompt: "A lush oasis in the middle of a vast desert with palm trees and a clear blue pool.",
        color: "from-yellow-400 to-green-400"
      }
    ]
  };
  
  return (
    <section id="examples" className="py-16 md:py-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Example Animations</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            See what's possible with PAGxels text-to-animation technology
          </p>
        </div>
        
        <Tabs defaultValue="stories" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="stories" onClick={() => setActiveTab("stories")}>
                Stories
              </TabsTrigger>
              <TabsTrigger value="characters" onClick={() => setActiveTab("characters")}>
                Characters
              </TabsTrigger>
              <TabsTrigger value="landscapes" onClick={() => setActiveTab("landscapes")}>
                Landscapes
              </TabsTrigger>
            </TabsList>
          </div>
          
          {Object.keys(exampleCategories).map((category) => (
            <TabsContent value={category} key={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {exampleCategories[category as keyof typeof exampleCategories].map((example, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className={`h-48 bg-gradient-to-br ${example.color} flex items-center justify-center p-6`}>
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <div className="w-12 h-12 bg-white/40 rounded-full"></div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">{example.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Prompt:</span> {example.prompt}
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        Try This Prompt
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Examples;
