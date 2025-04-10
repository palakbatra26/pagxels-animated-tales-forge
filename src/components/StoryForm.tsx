import React, { useState } from 'react';
import { api, Story } from '../lib/api';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface StoryFormProps {
  story?: Story;
  onSuccess?: () => void;
}

const StoryForm: React.FC<StoryFormProps> = ({ story, onSuccess }) => {
  const [formData, setFormData] = useState<Partial<Story>>({
    title: story?.title || '',
    content: story?.content || '',
    author: story?.author || '',
    isPublished: story?.isPublished || false,
    tags: story?.tags || [],
    metadata: story?.metadata || {},
  });
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (story?._id) {
        await api.updateStory(story._id, formData);
        toast({
          title: "Success",
          description: "Story updated successfully",
        });
      } else {
        await api.createStory(formData as Omit<Story, '_id' | 'createdAt' | 'updatedAt'>);
        toast({
          title: "Success",
          description: "Story created successfully",
        });
      }
      onSuccess?.();
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: story?._id ? "Failed to update story" : "Failed to create story",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim()) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: (prev.tags || []).filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          required
        />
      </div>

      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
          required
        />
      </div>

      <div>
        <Label htmlFor="author">Author</Label>
        <Input
          id="author"
          value={formData.author}
          onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
          required
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="isPublished"
          checked={formData.isPublished}
          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPublished: checked }))}
        />
        <Label htmlFor="isPublished">Published</Label>
      </div>

      <div>
        <Label>Tags</Label>
        <div className="flex gap-2">
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Add a tag"
          />
          <Button type="button" onClick={handleAddTag}>
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.tags?.map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center gap-1"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="text-blue-800 hover:text-blue-900"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : story?._id ? 'Update Story' : 'Create Story'}
      </Button>
    </form>
  );
};

export default StoryForm; 