import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import Stories from './components/Stories';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import CreateAnimation from './pages/CreateAnimation';
import Dashboard from './pages/Dashboard';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow">
              <div className="container mx-auto px-4 py-6">
                <h1 className="text-3xl font-bold text-gray-900">Pagxels Animated Tales</h1>
              </div>
            </header>
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/stories" element={<Stories />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/register" element={<Register />} />
                <Route path="/create" element={<CreateAnimation />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Toaster />
            <Sonner />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
