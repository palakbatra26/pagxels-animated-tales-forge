import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full py-4 px-6 md:px-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-10 w-10 bg-gradient-to-br from-pagxels-purple to-pagxels-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold">
              <span className="gradient-text">PAGxels</span>
            </h1>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm font-medium hover:text-pagxels-purple transition-colors">
            How It Works
          </a>
          <a href="#examples" className="text-sm font-medium hover:text-pagxels-purple transition-colors">
            Examples
          </a>
          <a href="#features" className="text-sm font-medium hover:text-pagxels-purple transition-colors">
            Features
          </a>
        </nav>
        
        <div className="flex items-center gap-4">
          <Link to="/signin">
            <Button variant="outline" size="sm" className="hidden md:inline-flex">
              Sign In
            </Button>
          </Link>
          <Link to="/create">
            <Button className="bg-gradient-to-r from-pagxels-purple to-pagxels-blue text-white">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
