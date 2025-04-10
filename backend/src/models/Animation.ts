import mongoose, { Schema, Document } from 'mongoose';

export interface IAnimation extends Document {
  title: string;
  description: string;
  prompt: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  animationUrl?: string;
  thumbnailUrl?: string;
  metadata?: {
    duration?: number;
    format?: string;
    size?: number;
    [key: string]: any;
  };
}

const animationSchema = new Schema<IAnimation>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  prompt: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending'
  },
  userId: { type: String, required: true },
  animationUrl: { type: String },
  thumbnailUrl: { type: String },
  metadata: { type: Schema.Types.Mixed }
}, {
  timestamps: true
});

export const Animation = mongoose.model<IAnimation>('Animation', animationSchema); 