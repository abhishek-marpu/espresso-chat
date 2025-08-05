import { Server, Socket } from 'socket.io';
import { Room } from '../models/Room';

interface UserSocket extends Socket {
  userId?: string;
  userName?: string;
  userPicture?: string;
  currentRoom?: string;
}

export const setupSocketIO = (io: Server) => {
  io.on('connection', (socket: UserSocket) => {
    console.log('User connected:', socket.id);

    // Handle user authentication
    socket.on('authenticate', async (userData: { id: string; name: string; picture: string }) => {
      socket.userId = userData.id;
      socket.userName = userData.name;
      socket.userPicture = userData.picture;
      console.log('User authenticated:', userData.name);
    });

    // Handle joining a room
    socket.on('join-room', async (roomName: string) => {
      try {
        if (!socket.userId) {
          socket.emit('error', { message: 'Authentication required' });
          return;
        }

        // Leave current room if any
        if (socket.currentRoom) {
          socket.leave(socket.currentRoom);
          await removeUserFromRoom(socket.currentRoom, socket.userId);
        }

        // Join new room
        socket.join(roomName);
        socket.currentRoom = roomName;
        
        // Add user to room's online users
        await addUserToRoom(roomName, socket.userId);
        
        // Get room messages
        const room = await Room.findOne({ name: roomName });
        if (room) {
          socket.emit('room-messages', room.messages);
        }

        // Notify others in the room
        socket.to(roomName).emit('user-joined', {
          userId: socket.userId,
          userName: socket.userName,
          userPicture: socket.userPicture
        });

        // Send updated online users list
        const updatedRoom = await Room.findOne({ name: roomName });
        if (updatedRoom) {
          io.to(roomName).emit('online-users', updatedRoom.onlineUsers);
        }

        console.log(`${socket.userName} joined room: ${roomName}`);
      } catch (error) {
        socket.emit('error', { message: 'Failed to join room' });
      }
    });

    // Handle sending messages
    socket.on('send-message', async (message: string) => {
      try {
        if (!socket.currentRoom || !socket.userId || !socket.userName || !socket.userPicture) {
          socket.emit('error', { message: 'Authentication required' });
          return;
        }

        const messageData = {
          userId: socket.userId,
          userName: socket.userName,
          userPicture: socket.userPicture,
          content: message,
          timestamp: new Date()
        };

        // Save message to database
        await Room.findOneAndUpdate(
          { name: socket.currentRoom },
          { $push: { messages: messageData } }
        );

        // Broadcast message to room
        io.to(socket.currentRoom).emit('new-message', messageData);
        
        console.log(`Message sent in ${socket.currentRoom}: ${message}`);
      } catch (error) {
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    // Handle typing indicator
    socket.on('typing', (isTyping: boolean) => {
      if (socket.currentRoom && socket.userName) {
        socket.to(socket.currentRoom).emit('user-typing', {
          userName: socket.userName,
          isTyping
        });
      }
    });

    // Handle disconnection
    socket.on('disconnect', async () => {
      try {
        if (socket.currentRoom && socket.userId) {
          await removeUserFromRoom(socket.currentRoom, socket.userId);
          
          // Notify others in the room
          socket.to(socket.currentRoom).emit('user-left', {
            userId: socket.userId,
            userName: socket.userName
          });

          // Send updated online users list
          const room = await Room.findOne({ name: socket.currentRoom });
          if (room) {
            io.to(socket.currentRoom).emit('online-users', room.onlineUsers);
          }
        }
        
        console.log('User disconnected:', socket.userName || socket.id);
      } catch (error) {
        console.error('Error handling disconnect:', error);
      }
    });
  });
};

// Helper functions
async function addUserToRoom(roomName: string, userId: string) {
  try {
    await Room.findOneAndUpdate(
      { name: roomName },
      { $addToSet: { onlineUsers: userId } }
    );
  } catch (error) {
    console.error('Error adding user to room:', error);
  }
}

async function removeUserFromRoom(roomName: string, userId: string) {
  try {
    await Room.findOneAndUpdate(
      { name: roomName },
      { $pull: { onlineUsers: userId } }
    );
  } catch (error) {
    console.error('Error removing user from room:', error);
  }
} 