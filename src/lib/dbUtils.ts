import { Story, IStory } from '../models/Story';

export async function createStory(storyData: {
  title: string;
  content: string;
  author: string;
  tags?: string[];
  metadata?: Record<string, any>;
}): Promise<IStory> {
  try {
    const story = new Story(storyData);
    await story.save();
    return story;
  } catch (error) {
    console.error('Error creating story:', error);
    throw error;
  }
}

export async function getStoryById(id: string): Promise<IStory | null> {
  try {
    const story = await Story.findById(id).exec();
    return story;
  } catch (error) {
    console.error('Error fetching story:', error);
    throw error;
  }
}

export async function updateStory(id: string, updateData: Partial<IStory>): Promise<IStory | null> {
  try {
    const story = await Story.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    ).exec();
    return story;
  } catch (error) {
    console.error('Error updating story:', error);
    throw error;
  }
}

export async function deleteStory(id: string): Promise<boolean> {
  try {
    await Story.findByIdAndDelete(id).exec();
    return true;
  } catch (error) {
    console.error('Error deleting story:', error);
    throw error;
  }
}

export async function getAllStories(): Promise<IStory[]> {
  try {
    const stories = await Story.find().sort({ createdAt: -1 }).exec();
    return stories;
  } catch (error) {
    console.error('Error fetching stories:', error);
    throw error;
  }
} 