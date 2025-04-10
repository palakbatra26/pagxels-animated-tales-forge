
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

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

export interface Animation {
  _id: string;
  title: string;
  description: string;
  prompt: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  userId: string;
  createdAt: string;
  updatedAt: string;
  animationUrl?: string;
  thumbnailUrl?: string;
  metadata?: {
    duration?: number;
    format?: string;
    size?: number;
    [key: string]: any;
  };
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    lastLogin?: string;
  };
}

export const api = {
  // Auth-related functions
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to sign in');
    }
    return response.json();
  },

  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to register');
    }
    return response.json();
  },

  async getProfile(token: string) {
    const response = await fetch(`${API_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }
    return response.json();
  },

  async updateProfile(token: string, data: { name?: string; email?: string }) {
    const response = await fetch(`${API_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to update profile');
    }
    return response.json();
  },

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

  // Animation-related functions
  async getAnimations(token: string): Promise<Animation[]> {
    const response = await fetch(`${API_URL}/animations`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch animations');
    }
    return response.json();
  },

  async getAnimation(id: string, token: string): Promise<Animation> {
    const response = await fetch(`${API_URL}/animations/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch animation');
    }
    return response.json();
  },

  async createAnimation(animation: Omit<Animation, '_id' | 'createdAt' | 'updatedAt'>, token: string): Promise<Animation> {
    const response = await fetch(`${API_URL}/animations`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(animation),
    });
    if (!response.ok) {
      throw new Error('Failed to create animation');
    }
    return response.json();
  },

  async updateAnimation(id: string, animation: Partial<Animation>, token: string): Promise<Animation> {
    const response = await fetch(`${API_URL}/animations/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(animation),
    });
    if (!response.ok) {
      throw new Error('Failed to update animation');
    }
    return response.json();
  },

  async deleteAnimation(id: string, token: string): Promise<void> {
    const response = await fetch(`${API_URL}/animations/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete animation');
    }
  },
};
