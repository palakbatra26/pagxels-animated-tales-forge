import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../lib/db';
import { createStory, getAllStories, getStoryById, updateStory, deleteStory } from '../lib/dbUtils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        if (req.query.id) {
          const story = await getStoryById(req.query.id as string);
          if (!story) {
            return res.status(404).json({ message: 'Story not found' });
          }
          return res.status(200).json(story);
        }
        const stories = await getAllStories();
        return res.status(200).json(stories);
      } catch (error) {
        return res.status(500).json({ message: 'Error fetching stories', error });
      }

    case 'POST':
      try {
        const story = await createStory(req.body);
        return res.status(201).json(story);
      } catch (error) {
        return res.status(500).json({ message: 'Error creating story', error });
      }

    case 'PUT':
      try {
        if (!req.query.id) {
          return res.status(400).json({ message: 'Story ID is required' });
        }
        const story = await updateStory(req.query.id as string, req.body);
        if (!story) {
          return res.status(404).json({ message: 'Story not found' });
        }
        return res.status(200).json(story);
      } catch (error) {
        return res.status(500).json({ message: 'Error updating story', error });
      }

    case 'DELETE':
      try {
        if (!req.query.id) {
          return res.status(400).json({ message: 'Story ID is required' });
        }
        await deleteStory(req.query.id as string);
        return res.status(200).json({ message: 'Story deleted successfully' });
      } catch (error) {
        return res.status(500).json({ message: 'Error deleting story', error });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
} 