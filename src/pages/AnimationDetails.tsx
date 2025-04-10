
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { api, Animation } from '@/lib/api';
import { Loader2 } from "lucide-react";

const AnimationDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [animation, setAnimation] = useState<Animation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    
    if (!storedToken) {
      navigate('/signin');
      return;
    }
    
    setToken(storedToken);
    
    if (id) {
      fetchAnimation(id, storedToken);
    }
  }, [id, navigate]);

  const fetchAnimation = async (animationId: string, authToken: string) => {
    try {
      const data = await api.getAnimation(animationId, authToken);
      setAnimation(data);
    } catch (error) {
      console.error('Error fetching animation:', error);
      setError(error instanceof Error ? error.message : 'Failed to load animation');
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not load animation details.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading animation...</span>
      </div>
    );
  }

  if (error || !animation) {
    return (
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-red-600">Error</h2>
        <p className="text-center">{error || 'Animation not found'}</p>
        <div className="mt-6 text-center">
          <Button onClick={() => navigate('/dashboard')}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-2">{animation.title}</h2>
      <div className="mb-6">
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
          animation.status === 'completed' ? 'bg-green-100 text-green-800' :
          animation.status === 'processing' ? 'bg-blue-100 text-blue-800' :
          animation.status === 'failed' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {animation.status.charAt(0).toUpperCase() + animation.status.slice(1)}
        </span>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Description</h3>
        <p className="text-gray-700">{animation.description}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Prompt</h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p className="text-gray-700 whitespace-pre-wrap">{animation.prompt}</p>
        </div>
      </div>

      {animation.status === 'completed' && animation.animationUrl && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Animation</h3>
          <div className="bg-black rounded-lg overflow-hidden aspect-video">
            <video 
              controls 
              className="w-full h-full" 
              poster={animation.thumbnailUrl}
            >
              <source src={animation.animationUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      {animation.status === 'processing' && (
        <div className="mb-6 text-center p-8 bg-blue-50 rounded-lg">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-lg font-medium text-blue-700">Your animation is being created...</p>
          <p className="text-sm text-blue-600 mt-2">This process typically takes 2-5 minutes depending on complexity.</p>
        </div>
      )}

      {animation.status === 'failed' && (
        <div className="mb-6 p-6 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-lg font-semibold text-red-700 mb-2">Generation Failed</h3>
          <p className="text-red-600 mb-4">Unfortunately, we couldn't generate your animation. This might be due to:</p>
          <ul className="list-disc list-inside text-red-600 space-y-1">
            <li>Complex prompt that exceeds our current capabilities</li>
            <li>Content that violates our terms of service</li>
            <li>Technical issues with our animation service</li>
          </ul>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              if (token) {
                navigate('/create-animation');
              }
            }}
          >
            Try Again with a New Prompt
          </Button>
        </div>
      )}

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
        
        {animation.status === 'completed' && animation.animationUrl && (
          <Button>
            Download Animation
          </Button>
        )}
      </div>
    </div>
  );
};

export default AnimationDetails;
