import { Router, Request, Response } from 'express';
import { Room } from '../models/Room';
import { IUser } from '../models/User';

const router = Router();

// Middleware to check if user is authenticated - simplified for development
const requireAuth = (req: Request, res: Response, next: any) => {
  // Skip authentication for development
  return next();
};

// Get all rooms
router.get('/rooms', requireAuth, async (req: Request, res: Response) => {
  try {
    const rooms = await Room.find({}, { messages: { $slice: -50 } })
      .sort({ updatedAt: -1 });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
});

// Create a new room
router.post('/rooms', requireAuth, async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Room name is required' });
    }

    // Check if room already exists
    const existingRoom = await Room.findOne({ name });
    if (existingRoom) {
      return res.status(400).json({ error: 'Room with this name already exists' });
    }

    // Generate a mock user ID for room creation
    const mockUserId = `user-${Math.random().toString(36).substr(2, 9)}`;
    const room = new Room({
      name,
      description: description || '',
      createdBy: mockUserId
    });

    await room.save();
    res.status(201).json(room);
  } catch (error) {
    console.error('Room creation error:', error);
    res.status(500).json({ error: 'Failed to create room' });
  }
});

// Get room by name
router.get('/rooms/:name', requireAuth, async (req: Request, res: Response) => {
  try {
    const room = await Room.findOne({ name: req.params.name });
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.json(room);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch room' });
  }
});

// Get room messages
router.get('/rooms/:name/messages', requireAuth, async (req: Request, res: Response) => {
  try {
    const room = await Room.findOne({ name: req.params.name });
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.json(room.messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

export const setupRoutes = (app: any) => {
  app.use('/api', router);
}; 