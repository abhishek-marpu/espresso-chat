

https://github.com/user-attachments/assets/d7fe6842-df10-478b-9169-509b7d8ef655



https://github.com/user-attachments/assets/b081153b-09f5-46eb-a9a4-1ee41651387a

# ☕ Espresso - Real-Time Chat Application

A modern, real-time chat application built with React, Node.js, Socket.IO, and MongoDB. Features include multi-user chat rooms, typing indicators, online user tracking, and persistent message history.

![Espresso Chat](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Socket.IO](https://img.shields.io/badge/Socket.IO-4.7.0-green)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-yellow)
![Node.js](https://img.shields.io/badge/Node.js-18.0-green)

## 🚀 Features

### Real-Time Communication
- **Instant Messaging**: Real-time message delivery using Socket.IO
- **Typing Indicators**: See when other users are typing
- **Online User Tracking**: View who's currently online in each room
- **Message History**: Persistent message storage in MongoDB

### Multi-User Experience
- **Dynamic User Generation**: Each session gets a unique user (Alice, Bob, Charlie, etc.)
- **Room Isolation**: Messages stay within their respective chat rooms
- **User Avatars**: Unique avatars for each user with initials
- **Message Attribution**: Clear distinction between your messages and others'

### Room Management
- **Create Rooms**: Dynamic room creation with custom names and descriptions
- **Join Rooms**: Browse and join existing chat rooms
- **Room List**: View all available rooms with online user counts
- **Message Persistence**: All messages are saved to the database

### Modern UI/UX
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Tailwind CSS**: Modern, clean styling with smooth animations
- **Real-time Updates**: Live updates without page refreshes
- **Intuitive Interface**: Easy-to-use chat interface

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation
- **Socket.IO Client** for real-time communication
- **Tailwind CSS** for styling
- **Axios** for HTTP requests
- **Lucide React** for icons

### Backend
- **Node.js** with TypeScript
- **Express.js** for REST API
- **Socket.IO** for real-time communication
- **MongoDB** with Mongoose for data persistence
- **Passport.js** for authentication (simplified for demo)
- **Helmet** for security headers
- **Express Rate Limiting** for API protection

### Development Tools
- **TypeScript** for type safety
- **Nodemon** for server auto-reload
- **Jest** for testing
- **ESLint** for code quality
- **Prettier** for code formatting

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Espresso
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   cp server/env.example server/.env
   ```
   
   Edit `server/.env`:
   ```env
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/espresso-chat
   SESSION_SECRET=your-secret-key-here
   CLIENT_URL=http://localhost:5173
   ```

4. **Start MongoDB** (if using local instance)
   ```bash
   mongod
   ```

5. **Start the development servers**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001
   - Health Check: http://localhost:3001/health

## 🧪 Testing Multi-User Experience

### Method 1: Multiple Browser Tabs (Easiest)
1. Open 3-4 browser tabs to http://localhost:5173
2. Login in each tab - you'll get different users automatically
3. Join the same room in all tabs
4. Send messages from different tabs
5. Watch real-time updates across all tabs

### Method 2: Different Browsers
- **Chrome**: http://localhost:5173 → Alice
- **Firefox**: http://localhost:5173 → Bob  
- **Safari**: http://localhost:5173 → Charlie
- **Edge**: http://localhost:5173 → Diana

### Method 3: Incognito/Private Windows
- **Regular Chrome**: http://localhost:5173 → Eve
- **Incognito Chrome**: http://localhost:5173 → Frank
- **Regular Firefox**: http://localhost:5173 → Grace
- **Private Firefox**: http://localhost:5173 → Henry

## 📁 Project Structure

```
Espresso/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── contexts/      # React contexts
│   │   ├── __tests__/     # Frontend tests
│   │   └── main.tsx       # App entry point
│   ├── package.json
│   └── vite.config.ts
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── auth/          # Authentication logic
│   │   ├── config/        # Database configuration
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   ├── socket/        # Socket.IO handlers
│   │   ├── __tests__/     # Backend tests
│   │   └── index.ts       # Server entry point
│   ├── package.json
│   └── env.example
├── package.json            # Root package.json (monorepo)
└── README.md
```

## 🔧 Available Scripts

### Root Level
```bash
npm run dev              # Start both client and server
npm run build            # Build both client and server
npm run test             # Run all tests
npm run test:client      # Run frontend tests
npm run test:server      # Run backend tests
npm run test:e2e         # Run end-to-end tests
npm run install:all      # Install all dependencies
```

### Client Only
```bash
cd client
npm run dev              # Start Vite dev server
npm run build            # Build for production
npm run test             # Run Jest tests
npm run test:e2e         # Run Playwright tests
```

### Server Only
```bash
cd server
npm run dev              # Start with nodemon
npm run build            # Build TypeScript
npm run test             # Run Jest tests
```

## 🌐 API Endpoints

### Authentication
- `GET /auth/me` - Get current user info
- `GET /auth/google` - Google OAuth login (simplified)
- `GET /auth/logout` - Logout user

### Rooms
- `GET /api/rooms` - Get all rooms
- `POST /api/rooms` - Create new room
- `GET /api/rooms/:name` - Get specific room
- `GET /api/rooms/:name/messages` - Get room messages

### Health Check
- `GET /health` - Server health status

## 🔌 Socket.IO Events

### Client → Server
- `authenticate` - Authenticate user with socket
- `join-room` - Join a chat room
- `send-message` - Send a message
- `typing` - Typing indicator

### Server → Client
- `room-messages` - Load room message history
- `new-message` - New message received
- `user-joined` - User joined the room
- `user-left` - User left the room
- `online-users` - Updated online users list
- `user-typing` - User typing indicator
- `error` - Error messages

## 🗄️ Database Schema

### User Model
```typescript
interface IUser {
  googleId: string;
  email: string;
  name: string;
  picture: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Room Model
```typescript
interface IRoom {
  name: string;
  description: string;
  createdBy: string;
  messages: IMessage[];
  onlineUsers: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface IMessage {
  userId: string;
  userName: string;
  userPicture: string;
  content: string;
  timestamp: Date;
}
```

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the client: `cd client && npm run build`
2. Deploy the `dist` folder to your hosting platform

### Backend Deployment (Railway/Render/Heroku)
1. Set environment variables
2. Deploy the server directory
3. Update client API URLs for production

### Database Setup
- Use MongoDB Atlas for cloud database
- Set `MONGODB_URI` environment variable
- Ensure proper network access

## 🧪 Testing

### Unit Tests
```bash
npm run test:client      # Frontend tests
npm run test:server      # Backend tests
```

### End-to-End Tests
```bash
npm run test:e2e         # Playwright tests
```

## 🔒 Security Features

- **Helmet.js** for security headers
- **Rate limiting** on API endpoints
- **CORS** configuration
- **Input validation** on all endpoints
- **Session management** with secure cookies

## 🎯 Future Improvements

### Planned Features
- [ ] **Real Google OAuth** integration
- [ ] **File sharing** in chat rooms
- [ ] **Voice messages** support
- [ ] **Push notifications** for mobile
- [ ] **Message reactions** and emojis
- [ ] **User profiles** and settings
- [ ] **Private messaging** between users
- [ ] **Message search** functionality
- [ ] **Message editing** and deletion
- [ ] **Read receipts** for messages

### Technical Enhancements
- [ ] **Redis** for session storage
- [ ] **WebRTC** for video/voice calls
- [ ] **Message encryption** end-to-end
- [ ] **GraphQL** API implementation
- [ ] **Microservices** architecture
- [ ] **Docker** containerization
- [ ] **CI/CD** pipeline setup
- [ ] **Performance monitoring** and analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Frontend Developer**: React, TypeScript, Tailwind CSS
- **Backend Developer**: Node.js, Express, Socket.IO
- **Database Engineer**: MongoDB, Mongoose
- **DevOps Engineer**: Deployment, CI/CD

## 📞 Support

If you have any questions or need help:
- Create an issue on GitHub
- Check the [MULTI_USER_TESTING.md](MULTI_USER_TESTING.md) for testing guides
- Review the API documentation above

---

**Built with ❤️ using modern web technologies**

*Real-time chat, simplified.* 
