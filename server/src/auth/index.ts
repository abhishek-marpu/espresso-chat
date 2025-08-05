import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Request } from 'express';
import { User, IUser } from '../models/User';

export const setupAuth = (app: any) => {
  // Skip Google OAuth for now - use simple session-based auth
  console.log('Setting up simplified authentication...');
  
  // Mock user for development
  const mockUser = {
    _id: 'mock-user-id',
    email: 'test@example.com',
    name: 'Test User',
    picture: 'https://via.placeholder.com/40'
  };

  // Serialize user for the session
  passport.serializeUser((user: any, done) => {
    done(null, user.id || user._id);
  });

  // Deserialize user from the session
  passport.deserializeUser(async (id: string, done) => {
    try {
      // Generate unique user based on session ID
      const userNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry'];
      const userIndex = Math.abs(parseInt(id.slice(-1), 16)) % userNames.length;
      const userName = userNames[userIndex] || 'Alice';
      const uniqueUser = {
        _id: id,
        email: `${userName.toLowerCase()}@example.com`,
        name: userName,
        picture: `https://via.placeholder.com/40/4F46E5/FFFFFF?text=${userName.charAt(0)}`
      };
      done(null, uniqueUser);
    } catch (error) {
      done(error, false);
    }
  });

  // Serialize user for the session
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  // Deserialize user from the session
  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  });

  // Auth routes - simplified for development
  app.get('/auth/google', (req: Request, res: any) => {
    // Mock login - just redirect to client
    res.redirect(process.env.CLIENT_URL || 'http://localhost:5173');
  });

  app.get('/auth/google/callback', (req: Request, res: any) => {
    res.redirect(process.env.CLIENT_URL || 'http://localhost:5173');
  });

  app.get('/auth/logout', (req: Request, res: any) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: 'Logout failed' });
      }
      res.redirect(process.env.CLIENT_URL || 'http://localhost:5173');
    });
  });

  app.get('/auth/me', (req: Request, res: any) => {
    // Generate unique user for each session
    const sessionId = req.sessionID || Math.random().toString(36).substr(2, 9);
    const userNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry'];
    const userIndex = Math.abs(parseInt(sessionId.slice(-1), 16)) % userNames.length;
    const userName = userNames[userIndex] || 'Alice';
    
    res.json({
      user: {
        id: `user-${sessionId}`,
        email: `${userName.toLowerCase()}@example.com`,
        name: userName,
        picture: `https://via.placeholder.com/40/4F46E5/FFFFFF?text=${userName.charAt(0)}`
      }
    });
  });
}; 