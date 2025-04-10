
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import PromptInput from '@/components/PromptInput';
import HowItWorks from '@/components/HowItWorks';
import Examples from '@/components/Examples';
import Features from '@/components/Features';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <PromptInput />
        <HowItWorks />
        <Examples />
        <Features />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
