import express from 'express';
import cors from 'cors';
import { connectDB } from './lib/db';
import { createStory, getAllStories, getStoryById, updateStory, deleteStory } from './lib/dbUtils';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB().catch(console.error);

// Routes
app.get('/api/stories', async (req, res) => {
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
});

app.post('/api/stories', async (req, res) => {
  try {
    const story = await createStory(req.body);
    return res.status(201).json(story);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating story', error });
  }
});

app.put('/api/stories/:id', async (req, res) => {
  try {
    const story = await updateStory(req.params.id, req.body);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    return res.status(200).json(story);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating story', error });
  }
});

app.delete('/api/stories/:id', async (req, res) => {
  try {
    await deleteStory(req.params.id);
    return res.status(200).json({ message: 'Story deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting story', error });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 