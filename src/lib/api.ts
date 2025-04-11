
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

// Helper function to handle API responses and errors
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'An error occurred with the request');
  }
  return response.json();
};

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
    return handleResponse(response);
  },

  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    return handleResponse(response);
  },

  async getProfile(token: string) {
    const response = await fetch(`${API_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
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
    return handleResponse(response);
  },

  // Story-related functions
  async getStories(): Promise<Story[]> {
    const response = await fetch(`${API_URL}/stories`);
    return handleResponse(response);
  },

  async getStory(id: string): Promise<Story> {
    const response = await fetch(`${API_URL}/stories/${id}`);
    return handleResponse(response);
  },

  async createStory(story: Omit<Story, '_id' | 'createdAt' | 'updatedAt'>): Promise<Story> {
    const response = await fetch(`${API_URL}/stories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(story),
    });
    return handleResponse(response);
  },

  async updateStory(id: string, story: Partial<Story>): Promise<Story> {
    const response = await fetch(`${API_URL}/stories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(story),
    });
    return handleResponse(response);
  },

  async deleteStory(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/stories/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to delete story');
    }
  },

  // Animation-related functions
  async getAnimations(token: string): Promise<Animation[]> {
    const response = await fetch(`${API_URL}/animations`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  async getAnimation(id: string, token: string): Promise<Animation> {
    const response = await fetch(`${API_URL}/animations/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
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
    return handleResponse(response);
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
    return handleResponse(response);
  },

  async deleteAnimation(id: string, token: string): Promise<void> {
    const response = await fetch(`${API_URL}/animations/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to delete animation');
    }
  },
};
