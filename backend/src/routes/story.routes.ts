import express from 'express';
import Story from '../models/Story';

const router = express.Router();

// Get all stories
router.get('/', async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stories', error });
  }
});

// Get a single story
router.get('/:id', async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.json(story);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching story', error });
  }
});

// Create a new story
router.post('/', async (req, res) => {
  try {
    const story = new Story(req.body);
    const savedStory = await story.save();
    res.status(201).json(savedStory);
  } catch (error) {
    res.status(400).json({ message: 'Error creating story', error });
  }
});

// Update a story
router.put('/:id', async (req, res) => {
  try {
    const story = await Story.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.json(story);
  } catch (error) {
    res.status(400).json({ message: 'Error updating story', error });
  }
});

// Delete a story
router.delete('/:id', async (req, res) => {
  try {
    const story = await Story.findByIdAndDelete(req.params.id);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.json({ message: 'Story deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting story', error });
  }
});

export default router; 