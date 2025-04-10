
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { api, Animation } from '@/lib/api';
import { Loader2, Plus, Film, AlertCircle } from "lucide-react";

const Dashboard = () => {
  const [animations, setAnimations] = useState<Animation[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (!storedToken || !storedUser) {
      navigate('/signin');
      return;
    }
    
    setToken(storedToken);
    try {
      setUser(JSON.parse(storedUser));
    } catch (error) {
      console.error('Failed to parse user data', error);
      navigate('/signin');
      return;
    }
    
    fetchAnimations(storedToken);
  }, [navigate]);

  const fetchAnimations = async (authToken: string) => {
    try {
      const data = await api.getAnimations(authToken);
      setAnimations(data);
    } catch (error) {
      console.error('Error fetching animations:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load animations.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
          <p className="text-gray-600 mt-1">Manage your 3D animations</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Button onClick={() => navigate('/create-animation')} className="bg-gradient-to-r from-purple-600 to-blue-500">
            <Plus className="mr-2 h-4 w-4" />
            Create New Animation
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      {animations.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <Film className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No animations yet</h3>
          <p className="mt-1 text-gray-500">Get started by creating your first animation.</p>
          <Button 
            onClick={() => navigate('/create-animation')} 
            className="mt-6"
          >
            Create Your First Animation
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {animations.map((animation) => (
            <Link 
              to={`/animations/${animation._id}`} 
              key={animation._id}
              className="block bg-white rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden border border-gray-200"
            >
              <div className="h-40 bg-gray-200 relative">
                {animation.thumbnailUrl ? (
                  <img 
                    src={animation.thumbnailUrl} 
                    alt={animation.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    {animation.status === 'failed' ? (
                      <AlertCircle className="h-10 w-10 text-red-400" />
                    ) : animation.status === 'processing' ? (
                      <Loader2 className="h-10 w-10 text-blue-400 animate-spin" />
                    ) : (
                      <Film className="h-10 w-10 text-gray-400" />
                    )}
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    animation.status === 'completed' ? 'bg-green-100 text-green-800' :
                    animation.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                    animation.status === 'failed' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {animation.status}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-lg mb-1 truncate">{animation.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{animation.description}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(animation.createdAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
