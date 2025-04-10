import mongoose, { Document, Model } from 'mongoose';

export interface IStory extends Document {
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  isPublished: boolean;
  tags: string[];
  metadata: Record<string, any>;
}

const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true
  }],
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
});

// Update the updatedAt field before saving
storySchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Story: Model<IStory> = mongoose.models.Story || mongoose.model<IStory>('Story', storySchema);

export default Story; 