
import express from 'express';
import { Animation, IAnimation } from '../models/Animation';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Get all animations
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user?.userId;
    const animations = await Animation.find({ userId }).sort({ createdAt: -1 });
    res.json(animations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching animations', error });
  }
});

// Get a single animation
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const animation = await Animation.findById(req.params.id);
    if (!animation) {
      return res.status(404).json({ message: 'Animation not found' });
    }
    
    // Check if animation belongs to the requesting user
    if (animation.userId !== req.user?.userId) {
      return res.status(403).json({ message: 'Not authorized to access this animation' });
    }
    
    res.json(animation);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching animation', error });
  }
});

// Create a new animation
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, description, prompt } = req.body;
    const userId = req.user?.userId;
    
    if (!userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
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
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { status, animationUrl, thumbnailUrl, metadata } = req.body;
    
    // Find the animation first to check ownership
    const animation = await Animation.findById(req.params.id);
    if (!animation) {
      return res.status(404).json({ message: 'Animation not found' });
    }
    
    // Check if animation belongs to the requesting user
    if (animation.userId !== req.user?.userId) {
      return res.status(403).json({ message: 'Not authorized to update this animation' });
    }
    
    const updatedAnimation = await Animation.findByIdAndUpdate(
      req.params.id,
      { status, animationUrl, thumbnailUrl, metadata },
      { new: true }
    );
    
    res.json(updatedAnimation);
  } catch (error) {
    res.status(500).json({ message: 'Error updating animation', error });
  }
});

// Delete an animation
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    // Find the animation first to check ownership
    const animation = await Animation.findById(req.params.id);
    if (!animation) {
      return res.status(404).json({ message: 'Animation not found' });
    }
    
    // Check if animation belongs to the requesting user
    if (animation.userId !== req.user?.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this animation' });
    }
    
    await Animation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Animation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting animation', error });
  }
});

export default router;
