import React, { useEffect, useState } from 'react';
import { api, Story } from '../lib/api';
import { useToast } from "@/components/ui/use-toast";
import StoryForm from './StoryForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Stories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const data = await api.getStories();
      setStories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch stories",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteStory(id);
      setStories(stories.filter(story => story._id !== id));
      toast({
        title: "Success",
        description: "Story deleted successfully",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete story",
      });
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    fetchStories();
  };

  if (loading) return <div>Loading stories...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Stories</h1>
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Story
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Story</DialogTitle>
            </DialogHeader>
            <StoryForm onSuccess={handleFormSuccess} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div key={story._id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">{story.title}</h2>
            <p className="text-gray-600 mb-2">By {story.author}</p>
            <p className="text-gray-700 mb-4">{story.content.substring(0, 150)}...</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {story.tags.map((tag, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {new Date(story.createdAt).toLocaleDateString()}
              </span>
              <div className="flex gap-2">
                <span className={`px-2 py-1 rounded text-sm ${
                  story.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {story.isPublished ? 'Published' : 'Draft'}
                </span>
                <button
                  onClick={() => handleDelete(story._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 