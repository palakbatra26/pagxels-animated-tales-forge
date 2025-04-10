import express from 'express';
import { Animation, IAnimation } from '../models/Animation';

const router = express.Router();

// Get all animations
router.get('/', async (req, res) => {
  try {
    const animations = await Animation.find().sort({ createdAt: -1 });
    res.json(animations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching animations', error });
  }
});

// Get a single animation
router.get('/:id', async (req, res) => {
  try {
    const animation = await Animation.findById(req.params.id);
    if (!animation) {
      return res.status(404).json({ message: 'Animation not found' });
    }
    res.json(animation);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching animation', error });
  }
});

// Create a new animation
router.post('/', async (req, res) => {
  try {
    const { title, description, prompt, userId } = req.body;
    
    const animation = new Animation({
      title,
      description,
      prompt,
      userId,
      status: 'pending'
    });

    const savedAnimation = await animation.save();
    
    // TODO: Here you would typically:
    // 1. Send the animation request to your animation generation service
    // 2. Update the animation status based on the service response
    // 3. Store the generated animation URL and metadata
    
    res.status(201).json(savedAnimation);
  } catch (error) {
    res.status(500).json({ message: 'Error creating animation', error });
  }
});

// Update an animation
router.put('/:id', async (req, res) => {
  try {
    const { status, animationUrl, thumbnailUrl, metadata } = req.body;
    const animation = await Animation.findByIdAndUpdate(
      req.params.id,
      { status, animationUrl, thumbnailUrl, metadata },
      { new: true }
    );
    
    if (!animation) {
      return res.status(404).json({ message: 'Animation not found' });
    }
    
    res.json(animation);
  } catch (error) {
    res.status(500).json({ message: 'Error updating animation', error });
  }
});

// Delete an animation
router.delete('/:id', async (req, res) => {
  try {
    const animation = await Animation.findByIdAndDelete(req.params.id);
    if (!animation) {
      return res.status(404).json({ message: 'Animation not found' });
    }
    res.json({ message: 'Animation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting animation', error });
  }
});

export default router; 