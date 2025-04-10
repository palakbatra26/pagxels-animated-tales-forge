import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend Request type to include user
declare module 'express' {
  interface Request {
    user?: {
      userId: string;
    };
  }
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key'
    ) as { userId: string };

    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
}; 