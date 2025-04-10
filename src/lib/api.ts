const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface Story {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
  tags: string[];
  metadata: Record<string, any>;
}

export const api = {
  // Get all stories
  async getStories(): Promise<Story[]> {
    const response = await fetch(`${API_URL}/stories`);
    if (!response.ok) {
      throw new Error('Failed to fetch stories');
    }
    return response.json();
  },

  // Get a single story
  async getStory(id: string): Promise<Story> {
    const response = await fetch(`${API_URL}/stories/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch story');
    }
    return response.json();
  },

  // Create a new story
  async createStory(story: Omit<Story, '_id' | 'createdAt' | 'updatedAt'>): Promise<Story> {
    const response = await fetch(`${API_URL}/stories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(story),
    });
    if (!response.ok) {
      throw new Error('Failed to create story');
    }
    return response.json();
  },

  // Update a story
  async updateStory(id: string, story: Partial<Story>): Promise<Story> {
    const response = await fetch(`${API_URL}/stories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(story),
    });
    if (!response.ok) {
      throw new Error('Failed to update story');
    }
    return response.json();
  },

  // Delete a story
  async deleteStory(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/stories/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete story');
    }
  },
}; 